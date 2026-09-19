#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join } from 'node:path';

const SOURCE_REPO = process.env.MOD_SOURCE_REPO || 'FAFF0x/gen3recomp';
const SOURCE_REF = process.env.MOD_SOURCE_REF || 'main';
const AUTHOR = process.env.MOD_INDEX_AUTHOR || 'FAFF0x';
const TOKEN = process.env.GITHUB_TOKEN || '';
const ZIP_RE = /^(.+)_gen3_v(\d+\.\d+\.\d+(?:[-+][A-Za-z0-9.-]+)?)\.zip$/i;
const temp = mkdtempSync(join(tmpdir(), 'gen3recomp-index-'));
const modsRoot = 'mods';

function semver(v) {
  return String(v).split(/[+-]/)[0].split('.').map(Number);
}
function newer(a, b) {
  const A = semver(a), B = semver(b);
  for (let i = 0; i < 3; i += 1) {
    if (A[i] !== B[i]) return A[i] > B[i];
  }
  return false;
}
async function gh(url) {
  const r = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'gen3recomp-mod-index',
      ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
    },
  });
  if (!r.ok) throw new Error(`GitHub HTTP ${r.status}: ${url}`);
  return r.json();
}
async function download(url, path) {
  const r = await fetch(url, {
    headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
  });
  if (!r.ok) throw new Error(`Download HTTP ${r.status}: ${url}`);
  writeFileSync(path, Buffer.from(await r.arrayBuffer()));
}
function chooseEntry(names, wanted) {
  const matches = names.filter((name) => basename(name).toLowerCase() === wanted.toLowerCase());
  matches.sort((a, b) => a.split('/').length - b.split('/').length || a.localeCompare(b));
  return matches[0] || null;
}
function cleanText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}
function truncate(value, max = 200) {
  const text = cleanText(value);
  return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;
}
function categoryFor(manifest) {
  const raw = String(manifest.category || '').trim().toUpperCase().replace(/[ -]+/g, '_');
  const valid = new Set([
    'GAMEPLAY','CONTENT','BALANCE','ART','AUDIO','UI','QOL',
    'TRANSLATION','TOTAL_CONVERSION','LIBRARY','TOOL','OTHER',
  ]);
  const aliases = {
    QUALITY_OF_LIFE: 'QOL',
    QUEST: 'CONTENT',
    QUESTS: 'CONTENT',
    OVERHAUL: 'GAMEPLAY',
  };
  const category = aliases[raw] || raw;
  return valid.has(category) ? category : 'OTHER';
}
function syncOptional(target, key, value) {
  if (value !== undefined && value !== null && value !== '') target[key] = value;
}
function syncArray(target, key, value) {
  if (Array.isArray(value) && value.length) target[key] = value;
}

try {
  const files = await gh(
    `https://api.github.com/repos/${SOURCE_REPO}/contents?ref=${encodeURIComponent(SOURCE_REF)}`,
  );
  const latestByName = new Map();

  for (const f of files) {
    if (f?.type !== 'file' || !f.name || !f.download_url) continue;
    const match = ZIP_RE.exec(f.name);
    if (!match) continue;
    const row = {
      base: match[1],
      version: match[2],
      filename: f.name,
      downloadURL: f.download_url,
    };
    const old = latestByName.get(row.base.toLowerCase());
    if (!old || newer(row.version, old.version)) {
      latestByName.set(row.base.toLowerCase(), row);
    }
  }

  if (latestByName.size === 0) {
    throw new Error(`No Gen 3 ZIPs found in ${SOURCE_REPO}`);
  }

  const mods = [];
  for (const row of latestByName.values()) {
    const zipPath = join(temp, row.filename);
    await download(row.downloadURL, zipPath);

    const names = execFileSync('unzip', ['-Z1', zipPath], { encoding: 'utf8' })
      .split(/\r?\n/)
      .filter(Boolean);

    const manifestPath = chooseEntry(names, 'manifest.json');
    if (!manifestPath) {
      console.warn(`Skipping ${row.filename}: manifest.json missing`);
      continue;
    }

    const manifest = JSON.parse(
      execFileSync('unzip', ['-p', zipPath, manifestPath], { encoding: 'utf8' }),
    );
    const readmePath = chooseEntry(names, 'README.md');
    const readme = readmePath
      ? execFileSync('unzip', ['-p', zipPath, readmePath], { encoding: 'utf8' }).trim()
      : '';

    const id = String(manifest.id || row.base).trim();
    if (!/^[A-Za-z0-9_-]{1,64}$/.test(id)) {
      console.warn(`Skipping ${row.filename}: invalid manifest id "${id}"`);
      continue;
    }

    const version = String(manifest.version || row.version).trim();
    const title = cleanText(manifest.name) || id;
    const description = cleanText(manifest.description);
    const summary = truncate(description || `${title} for Gen3Recomp.`);

    const meta = {
      id,
      title,
      author: AUTHOR,
      summary,
      version,
      categories: [categoryFor(manifest)],
      repo: `https://github.com/${SOURCE_REPO}`,
      downloadURL: row.downloadURL,
      automatic_version_check: false,
    };

    syncOptional(meta, 'api', manifest.api);
    syncOptional(meta, 'game_version', manifest.game_version);
    syncOptional(meta, 'profile', manifest.profile);
    syncOptional(meta, 'affects_link', manifest.affects_link);
    syncOptional(meta, 'experimental', manifest.experimental);
    syncArray(meta, 'permissions', manifest.permissions);
    syncArray(meta, 'dependencies', manifest.dependencies);
    syncArray(meta, 'conflicts', manifest.conflicts);

    mods.push({
      folder: `${AUTHOR}@${id}`,
      ...meta,
      description: readme || description || `${title} for Gen3Recomp.`,
      filename: row.filename,
    });
  }

  mods.sort((a, b) => a.title.localeCompare(b.title));

  mkdirSync(modsRoot, { recursive: true });
  for (const name of readdirSync(modsRoot)) {
    if (name.startsWith(`${AUTHOR}@`)) {
      rmSync(join(modsRoot, name), { recursive: true, force: true });
    }
  }

  for (const mod of mods) {
    const dir = join(modsRoot, mod.folder);
    mkdirSync(dir, { recursive: true });

    const {
      folder,
      description,
      filename,
      ...meta
    } = mod;

    writeFileSync(join(dir, 'meta.json'), `${JSON.stringify(meta, null, 2)}\n`);
    writeFileSync(
      join(dir, 'description.md'),
      description.startsWith('#')
        ? `${description.trim()}\n`
        : `# ${meta.title}\n\n${description.trim()}\n`,
    );
  }

  mkdirSync('site/data', { recursive: true });
  writeFileSync(
    'site/data/index.json',
    `${JSON.stringify({
      schema_version: 1,
      generation: 3,
      source_repo: SOURCE_REPO,
      generated_at: new Date().toISOString(),
      count: mods.length,
      mods: mods.map(({ description, filename, ...mod }) => ({
        ...mod,
        description_url: `data/mods/${mod.folder}/description.md`,
        filename,
      })),
    }, null, 2)}\n`,
  );

  rmSync('site/data/mods', { recursive: true, force: true });
  for (const mod of mods) {
    const dest = join('site', 'data', 'mods', mod.folder);
    mkdirSync(dest, { recursive: true });
    const src = join(modsRoot, mod.folder, 'description.md');
    writeFileSync(join(dest, 'description.md'), readFileSync(src, 'utf8'));
  }

  console.log(`Generated Gen 3 index with ${mods.length} mod(s).`);
  for (const mod of mods) {
    console.log(`- ${mod.folder} ${mod.version}`);
  }
} finally {
  rmSync(temp, { recursive: true, force: true });
}
