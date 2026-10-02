# EXP Share Modes - Gen 3 / Emerald

Emerald-only EXP distribution modes for the Gen 3 RSE runtime.

## Change the mode in game

Open **START → OPTION → BATTLE OPTIONS** and change **EXP SHARE MODE** with Left/Right:

- **OFF** — only conscious Pokémon that participated against the defeated foe receive EXP.
- **CLASSIC** — all conscious, non-Egg Pokémon owned by the player split one normal EXP pool.
- **MODERN** — participating Pokémon split 100% of the normal pool, while the conscious player-owned bench splits an additional 50% pool.

The selection is saved by the mod and applies immediately to later EXP awards. The Mod Manager option remains available as a fallback.

## Emerald conversion

This is a dedicated Emerald build, not a manifest-only rename of the FireRed/LeafGreen version.

- Targets only `emerald`.
- Uses Emerald's RSE Options screen through the shared `option_rows` registry.
- Preserves Emerald's native EV gain for every EXP recipient.
- Preserves the normal friendship increase for each level gained.
- Preserves Lucky Egg, trainer-battle and traded-Pokémon bonuses through the current Game3 recipient pipeline.
- Handles normal Emerald double battles and excludes an NPC partner's half of a merged party (`playerHalf` / `partyOwner`) from CLASSIC and MODERN sharing.
- Keeps `exp.gain` and `battle.exp_gained` mod hooks working.
- Falls back to the native award function if the runtime is not Emerald.

The dedicated mod ID is `pokemonmod_gen3_exp_share_modes_emerald`, so it does not replace the FireRed/LeafGreen package.
