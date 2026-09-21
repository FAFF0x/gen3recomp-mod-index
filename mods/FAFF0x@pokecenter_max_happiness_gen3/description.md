# Pokecenter Max Happiness Gen 3 v1.0.3

FireRed-only Gen 3 port of `pokecenter_max_happiness_gen2`.

## Behavior

When the normal Pokemon Center nurse executes FireRed's `HealPlayerParty` special while the player is inside a `*_POKEMON_CENTER_1F` map:

1. the vanilla FireRed heal runs normally;
2. every non-Egg Pokemon in the current party gets `friendship = 255` and `happiness = 255`.

Eggs are intentionally excluded.

Other Game3 heals are left vanilla because this mod does **not** replace `Party.healAll` globally. Whiteout recovery, scripted battle heals and other engine healing paths therefore do not trigger the friendship bonus unless they are the Pokemon Center nurse special on a Pokemon Center 1F map.

## Compatibility

- Target: FireRed only (`games: ["firered"]`).
- Mod id: `pokecenter_max_happiness_gen3`.
- Uses the composable `script.command` hook rather than replacing Game3 engine functions.
- Does not add or replace UI, so it is compatible with Modern UI Gen3.
- The Gen2 mod has a different id and target and can coexist in the same mod library without an import collision.
