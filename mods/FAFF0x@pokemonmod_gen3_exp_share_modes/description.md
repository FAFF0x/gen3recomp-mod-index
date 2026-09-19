# EXP Share Modes - Gen 3 / FireRed

FireRed-native EXP distribution modes.

## Change the mode in game

Open **START → OPTION → BATTLE OPTIONS** and change **EXP SHARE MODE** with Left/Right:

- **OFF** — only conscious participants receive EXP.
- **CLASSIC** — all conscious, non-Egg party Pokémon split one normal EXP pool.
- **MODERN** — participants split 100% and the conscious bench splits an additional 50% pool.

The selection is saved by the mod and is used immediately for subsequent EXP awards. The Mod Manager option remains defined as a fallback for older installs.

## Compatibility

- FireRed only (`games: ["firered"]`).
- Integrates into the native Game3 Options menu, so Modern UI Gen3 can render it like the other FireRed options.
- Keeps FireRed trainer/traded/Lucky Egg bonuses and the public `exp.gain` hook.
- Uses a unique Gen3 ID and defers to equivalent active EXP Share Modes packages rather than double-awarding EXP.
