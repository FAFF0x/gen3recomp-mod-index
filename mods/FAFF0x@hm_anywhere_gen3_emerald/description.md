# HM & Field TM Anywhere - Gen 3 (Emerald) v2.2.0

Emerald-only conversion of the Gen 3 HM Anywhere mod. This build targets the Pokémon Emerald / RSE runtime and is intentionally separate from the FireRed/LeafGreen version.

## Features

- `games: ["emerald"]` only.
- Owning an HM is enough to use its supported field action without teaching it to a Pokémon.
- START -> **HM** lists owned Emerald HMs: Cut, Fly, Surf, Strength, Flash, Rock Smash, Waterfall and **Dive (HM08)**.
- START -> **TM** lists supported Emerald field TMs: **TM28 Dig** and **TM43 Secret Power**.
- Badge and location requirements are still enforced by Emerald's native `src.core.game3.field_moves` implementation.
- FLY uses Emerald's native RSE Fly region map and visited Fly destinations instead of the old Kanto/Sevii fallback list.
- DIVE uses Emerald's native dive/emerge warp system.
- CUT uses Emerald grass behavior (tall grass, long grass and ash grass), including the native RSE cut plan.
- FLASH, ROCK SMASH, STRENGTH and WATERFALL use Emerald profile flags, event-object IDs and metatile behavior.
- `CONTEXT: ON/OFF` controls whether normal overworld field-move interactions can substitute an owned machine for a learned move.
- Emerald's script-driven `checkpartymove` path is bridged as well, so contextual Cut/Rock Smash/Strength-style scripts work without teaching the move.
- Modern UI remains optional. The submenu mirrors itself into the active Emerald option presenter while keeping a native fallback renderer.

## Emerald-specific safeguards

The HM/TM entries are injected only into Emerald's normal START menu. They are not forced into Safari, link/Union, Battle Pike, Battle Pyramid, multi-partner or other restricted RSE START-menu variants.

The runtime also checks the active profile before substituting a field-move user, so this Emerald package does not alter FireRed, LeafGreen, Ruby or Sapphire behavior even if loaded incorrectly.

## Compatibility

- Mod ID: `hm_anywhere_gen3_emerald`
- Version: `2.2.0`
- Game: Pokémon Emerald only
- Optional: `gen3_modern_ui`
