#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import {
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
const VERSIONED_ZIP_RE = /^(.+)_v(\d+\.\d+\.\d+(?:[-+][A-Za-z0-9.-]+)?)\.zip$/i;
const temp = mkdtempSync(join(tmpdir(), 'gen3recomp-index-'));
const modsRoot = 'mods';

const SOURCE_GROUPS = [
  {
    key: 'firered-leafgreen',
    label: 'FireRed / LeafGreen',
    path: 'FIRERED-LEAFGREEN',
  },
  {
    key: 'emerald',
    label: 'Emerald',
    path: 'EMERALD',
  },
];

function semver(v) {
  return String(v).split(/[+-]/)[0].split('.').map(Number);
}

function newer(a, b) {
  const A = semver(a);
  const B = semver(b);
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
  const matches = names.filter(
    (name) => basename(name).toLowerCase() === wanted.toLowerCase(),
  );
  matches.sort(
    (a, b) =>
      a.split('/').length - b.split('/').length || a.localeCompare(b),
  );
  return matches[0] || null;
}

function cleanText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function truncate(value, max = 200) {
  const text = cleanText(value);
  return text.length <= max
    ? text
    : `${text.slice(0, max - 1).trimEnd()}…`;
}

function categoryFor(manifest) {
  const raw = String(manifest.category || '')
    .trim()
    .toUpperCase()
    .replace(/[ -]+/g, '_');

  const valid = new Set([
    'GAMEPLAY',
    'CONTENT',
    'BALANCE',
    'ART',
    'AUDIO',
    'UI',
    'QOL',
    'TRANSLATION',
    'TOTAL_CONVERSION',
    'LIBRARY',
    'TOOL',
    'OTHER',
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
  if (value !== undefined && value !== null && value !== '') {
    target[key] = value;
  }
}

function syncArray(target, key, value) {
  if (Array.isArray(value) && value.length) {
    target[key] = value;
  }
}

async function collectSourceZips() {
  const latest = new Map();

  for (const group of SOURCE_GROUPS) {
    const files = await gh(
      `https://api.github.com/repos/${SOURCE_REPO}/contents/${encodeURIComponent(group.path)}?ref=${encodeURIComponent(SOURCE_REF)}`,
    );

    if (!Array.isArray(files)) {
      throw new Error(`Could not list ${SOURCE_REPO}/${group.path}`);
    }

    for (const file of files) {
      if (
        file?.type !== 'file' ||
        typeof file.name !== 'string' ||
        typeof file.download_url !== 'string'
      ) {
        continue;
      }

      const match = VERSIONED_ZIP_RE.exec(file.name);
      if (!match) continue;

      const row = {
        groupKey: group.key,
        groupLabel: group.label,
        sourcePath: group.path,
        base: match[1],
        version: match[2],
        filename: file.name,
        downloadURL: file.download_url,
      };

      // FireRed/LeafGreen and Emerald have independent release lines.
      const key = `${group.key}:${row.base.toLowerCase()}`;
      const old = latest.get(key);
      if (!old || newer(row.version, old.version)) {
        latest.set(key, row);
      }
    }
  }

  return [...latest.values()];
}

try {
  const candidates = await collectSourceZips();

  if (candidates.length === 0) {
    throw new Error(
      `No versioned ZIPs found in ${SOURCE_REPO}/FIRERED-LEAFGREEN or EMERALD`,
    );
  }

  const mods = [];
  const ids = new Map();

  for (const row of candidates) {
    const zipPath = join(
      temp,
      `${row.groupKey}__${row.filename}`,
    );
    await download(row.downloadURL, zipPath);

    const names = execFileSync('unzip', ['-Z1', zipPath], {
      encoding: 'utf8',
    })
      .split(/\r?\n/)
      .filter(Boolean);

    const manifestPath = chooseEntry(names, 'manifest.json');
    if (!manifestPath) {
      console.warn(
        `Skipping ${row.sourcePath}/${row.filename}: manifest.json missing`,
      );
      continue;
    }

    const manifest = JSON.parse(
      execFileSync('unzip', ['-p', zipPath, manifestPath], {
        encoding: 'utf8',
      }),
    );

    const readmePath = chooseEntry(names, 'README.md');
    const readme = readmePath
      ? execFileSync('unzip', ['-p', zipPath, readmePath], {
          encoding: 'utf8',
        }).trim()
      : '';

    const id = String(manifest.id || row.base).trim();
    if (!/^[A-Za-z0-9_-]{1,64}$/.test(id)) {
      console.warn(
        `Skipping ${row.sourcePath}/${row.filename}: invalid manifest id "${id}"`,
      );
      continue;
    }

    const previous = ids.get(id.toLowerCase());
    if (previous) {
      throw new Error(
        `Duplicate manifest id "${id}" in ${previous.sourcePath}/${previous.filename} and ${row.sourcePath}/${row.filename}. FireRed/LeafGreen and Emerald packages need unique manifest ids in one shared index.`,
      );
    }
    ids.set(id.toLowerCase(), row);

    const version = String(manifest.version || row.version).trim();
    const title = cleanText(manifest.name) || id;
    const description = cleanText(manifest.description);
    const summary = truncate(
      description || `${title} for Gen3Recomp.`,
    );

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
      description:
        readme ||
        description ||
        `${title} for Gen3Recomp.`,
      filename: row.filename,
      game_group: row.groupKey,
      game_label: row.groupLabel,
      source_path: row.sourcePath,
    });
  }

  mods.sort(
    (a, b) =>
      a.game_label.localeCompare(b.game_label) ||
      a.title.localeCompare(b.title),
  );

  mkdirSync(modsRoot, { recursive: true });

  // Only synchronized FAFF0x entries are replaced. Community entries remain.
  for (const name of readdirSync(modsRoot)) {
    if (name.startsWith(`${AUTHOR}@`)) {
      rmSync(join(modsRoot, name), {
        recursive: true,
        force: true,
      });
    }
  }

  for (const mod of mods) {
    const dir = join(modsRoot, mod.folder);
    mkdirSync(dir, { recursive: true });

    const {
      folder,
      description,
      filename,
      game_group,
      game_label,
      source_path,
      ...meta
    } = mod;

    writeFileSync(
      join(dir, 'meta.json'),
      `${JSON.stringify(meta, null, 2)}\n`,
    );

    writeFileSync(
      join(dir, 'description.md'),
      description.startsWith('#')
        ? `${description.trim()}\n`
        : `# ${meta.title}\n\n${description.trim()}\n`,
    );
  }

  mkdirSync('site/data', { recursive: true });

  const groups = SOURCE_GROUPS.map((group) => ({
    key: group.key,
    label: group.label,
    source_path: group.path,
    count: mods.filter((mod) => mod.game_group === group.key).length,
  }));

  writeFileSync(
    'site/data/index.json',
    `${JSON.stringify(
      {
        schema_version: 1,
        generation: 3,
        source_repo: SOURCE_REPO,
        generated_at: new Date().toISOString(),
        count: mods.length,
        groups,
        mods: mods.map(
          ({
            description,
            ...mod
          }) => ({
            ...mod,
            description_url: `data/mods/${mod.folder}/description.md`,
          }),
        ),
      },
      null,
      2,
    )}\n`,
  );

  rmSync('site/data/mods', {
    recursive: true,
    force: true,
  });

  for (const mod of mods) {
    const dest = join(
      'site',
      'data',
      'mods',
      mod.folder,
    );
    mkdirSync(dest, { recursive: true });

    const src = join(
      modsRoot,
      mod.folder,
      'description.md',
    );

    writeFileSync(
      join(dest, 'description.md'),
      readFileSync(src, 'utf8'),
    );
  }

  console.log(
    `Generated Gen 3 index with ${mods.length} mod(s).`,
  );

  for (const group of groups) {
    console.log(
      `- ${group.label}: ${group.count} mod(s) from ${group.source_path}`,
    );
  }
} finally {
  rmSync(temp, {
    recursive: true,
    force: true,
  });
}
