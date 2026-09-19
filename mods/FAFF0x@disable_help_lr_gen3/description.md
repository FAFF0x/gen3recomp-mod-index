# Disable L/R Help Gen 3

FireRed-only quality-of-life mod for Pokemon Recomp.

## What it does

FireRed normally opens the blue HELP screen when **L** or **R** is pressed. This mod disables that HELP trigger globally.

It does **not** consume or remap L/R. Shoulder input remains available to:

- Advanced Box System box switching;
- native FireRed menus that use L/R;
- other Gen3 mods that listen for L/R.

The mod re-applies the setting after new-game/load/title transitions because FireRed's Help system resets its `enabled` flag during session resets.

## Target

- Generation: 3 only
- Game: FireRed only (`firered`)
- Mod API: 2

No dependencies and no conflict declarations.
