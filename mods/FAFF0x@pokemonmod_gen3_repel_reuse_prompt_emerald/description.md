# Repel Reuse Prompt - Emerald v1.2.0

Emerald-only conversion of the Gen 3 FireRed/LeafGreen Repel Reuse Prompt mod for Pokémon Recomp.

When the active Repel reaches 0 steps, Emerald first runs its native RSE `repel_wore_off` event and shows the normal wear-off message. The mod then asks:

`Use another REPEL?`

If YES is selected, it prefers the same Repel type used most recently. If that type is no longer in the Bag, fallback priority is:

1. MAX REPEL
2. SUPER REPEL
3. REPEL

The replacement is activated through the native Game3 `ItemUse.useField` path, so item consumption and the Emerald Repel counter remain runtime-owned.

## Emerald/RSE conversion

This is not the FireRed/LeafGreen package with only the manifest changed. The build:

- targets only `emerald`;
- has its own id: `pokemonmod_gen3_repel_reuse_prompt_emerald`;
- requires the active Game3 profile to be `emerald` / family `rse`;
- resolves the Repel counter through Emerald field semantics;
- preserves Emerald's Battle Pike / Battle Pyramid Repel-step exclusions;
- keeps Emerald's RSE encounter generator responsible for terrain, rate, slots, level, abilities, outbreaks and roamers;
- temporarily hides only the Repel counter during a hooked walking encounter roll, then restores it;
- restores Emerald's encounter-immunity state when a rolled candidate is suppressed by the mod;
- integrates `REPEL MODE` with the shared option-row model used by Emerald's RSE Options screen;
- optionally orders after `gen3_modern_ui_emerald` when that mod is installed.

## REPEL MODE

Open **START → OPTION → EXTRAS → REPEL MODE**.

- **UNCAUGHT** (default): while a Repel is active, already-caught species are suppressed. Uncaught species may appear regardless of the native lead-level Repel check.
- **BLOCK ALL**: while a Repel is active, random walking encounters are suppressed.
- With no active Repel, encounter behavior is native Emerald.

Fishing is not changed by this walking `encounter.roll` hook. Battle Pike and Battle Pyramid keep their dedicated RSE behavior.

## Compatibility

- Pokémon Emerald only.
- Gen 3 only.
- FireRed and LeafGreen are intentionally unsupported by this package.
- The Emerald id is different from the FR/LG mod, so both packages can remain installed for their respective games.
