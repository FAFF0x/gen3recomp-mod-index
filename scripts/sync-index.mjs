#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const SOURCE_REPO = process.env.MOD_SOURCE_REPO || 'FAFF0x/gen3recomp';
const SOURCE_REF = process.env.MOD_SOURCE_REF || 'main';
const TOKEN = process.env.GITHUB_TOKEN || '';
const ZIP_RE = /^(.+)_gen3_v(\d+\.\d+\.\d+(?:[-+][A-Za-z0-9.-]+)?)\.zip$/i;
const temp = mkdtempSync(join(tmpdir(), 'gen3recomp-index-'));

function semver(v) {
  return String(v).split(/[+-]/)[0].split('.').map(Number);
}
function newer(a,b) {
  const A=semver(a), B=semver(b);
  for(let i=0;i<3;i++) if(A[i]!==B[i]) return A[i]>B[i];
  return false;
}
async function gh(url) {
  const r = await fetch(url, { headers:{
    Accept:'application/vnd.github+json',
    'User-Agent':'gen3recomp-mod-index',
    ...(TOKEN ? {Authorization:`Bearer ${TOKEN}`} : {})
  }});
  if(!r.ok) throw new Error(`GitHub HTTP ${r.status}: ${url}`);
  return r.json();
}
async function download(url, path) {
  const r = await fetch(url, {headers: TOKEN ? {Authorization:`Bearer ${TOKEN}`} : {}});
  if(!r.ok) throw new Error(`Download HTTP ${r.status}: ${url}`);
  writeFileSync(path, Buffer.from(await r.arrayBuffer()));
}

try {
  const files = await gh(`https://api.github.com/repos/${SOURCE_REPO}/contents?ref=${encodeURIComponent(SOURCE_REF)}`);
  const latestByName = new Map();

  for (const f of files) {
    if (f?.type !== 'file' || !f.name || !f.download_url) continue;
    const m = ZIP_RE.exec(f.name);
    if (!m) continue;
    const row = { base:m[1], version:m[2], filename:f.name, downloadURL:f.download_url };
    const old = latestByName.get(row.base.toLowerCase());
    if (!old || newer(row.version, old.version)) latestByName.set(row.base.toLowerCase(), row);
  }

  const mods = [];
  for (const row of latestByName.values()) {
    const zipPath = join(temp, row.filename);
    await download(row.downloadURL, zipPath);
    const names = execFileSync('unzip',['-Z1',zipPath],{encoding:'utf8'}).split(/\r?\n/).filter(Boolean);
    const manifestPath = names.find(n => /(^|\/)manifest\.json$/i.test(n));
    if (!manifestPath) {
      console.warn(`Skipping ${row.filename}: manifest.json missing`);
      continue;
    }
    const manifest = JSON.parse(execFileSync('unzip',['-p',zipPath,manifestPath],{encoding:'utf8'}));
    const id = String(manifest.id || row.base).trim();
    const version = String(manifest.version || row.version).trim();
    mods.push({
      id,
      title: manifest.name || id,
      author: manifest.author || 'FAFF0x',
      description: manifest.description || '',
      version,
      api: manifest.api ?? null,
      game_version: manifest.game_version ?? null,
      profile: manifest.profile ?? null,
      dependencies: Array.isArray(manifest.dependencies) ? manifest.dependencies : [],
      conflicts: Array.isArray(manifest.conflicts) ? manifest.conflicts : [],
      source_repo: `https://github.com/${SOURCE_REPO}`,
      filename: row.filename,
      downloadURL: row.downloadURL
    });
  }

  mods.sort((a,b)=>a.title.localeCompare(b.title));
  mkdirSync('site/data',{recursive:true});
  writeFileSync('site/data/index.json', JSON.stringify({
    schema_version: 1,
    generation: 3,
    source_repo: SOURCE_REPO,
    generated_at: new Date().toISOString(),
    count: mods.length,
    mods
  }, null, 2) + '\n');

  console.log(`Generated Gen 3 index with ${mods.length} mod(s).`);
} finally {
  rmSync(temp,{recursive:true,force:true});
}
