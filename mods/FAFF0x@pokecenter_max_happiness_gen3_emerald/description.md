# Pokecenter Max Happiness Gen 3 — Emerald v1.1.0

Emerald-only standalone port of `pokecenter_max_happiness_gen3`.

## Behavior

When the normal Pokemon Center nurse executes Emerald's `HealPlayerParty` special while the player is inside an `EM_*_POKEMON_CENTER_1F` map:

1. Emerald's native RSE heal runs normally;
2. every non-Egg Pokemon in the current party gets `friendship = 255` and `happiness = 255`.

Eggs are intentionally excluded.

Other Game3 heals stay vanilla. Whiteout recovery, Battle Frontier/link healing, scripted battle heals and other healing paths do not receive the friendship bonus unless the command is the nurse's `HealPlayerParty` special on an Emerald Pokemon Center 1F map.

## Emerald conversion details

- Target: `games: ["emerald"]` only.
- Standalone mod id: `pokecenter_max_happiness_gen3_emerald`.
- Runtime guard requires the active profile to be `emerald` / family `rse`.
- Pokemon Center map matching requires the `EM_` prefix and `_POKEMON_CENTER_1F` suffix.
- Emerald uses `HealPlayerParty` as special id `0`, so the port keeps that native special rather than replacing `Party.healAll`.
- Egg detection uses the Game3 Pokemon helper when available, with a safe fallback.
- No UI is replaced, so it can coexist with Emerald UI mods.

## Coexistence

The FireRed/LeafGreen package uses a different id (`pokecenter_max_happiness_gen3`), so both packages may be installed in the same mod library without an import-id collision.
