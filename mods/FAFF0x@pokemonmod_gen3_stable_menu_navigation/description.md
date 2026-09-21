# Stable Menu Navigation - Gen 3

FireRed-only quality-of-life mod for Pokemon Recomp / Gen1Recomp.

## What it fixes

GAME SPEED can run several fixed logic updates during one rendered frame. FireRed's native Bag and Help screens count held-direction repeat in those logic updates, so their cursors can scroll much too quickly at high GAME SPEED values.

This mod keeps their native cadence but measures it in real time:

- directional edge presses still move immediately;
- Bag: about 0.667 s before the first held repeat, then about 0.083 s between repeats;
- Help: about 0.333 s before the first held repeat, then about 0.083 s between repeats;
- multiple fast-forward fixed updates at the same real-time instant cannot produce a burst of cursor moves.

Other FireRed menus that are edge-only remain untouched.

## Compatibility

- FireRed only (`games: ["firered"]`).
- Uses a generation-specific mod ID and global patch marker.
- Does not change GAME SPEED or `core.logic_speed`.
- Does not touch overworld movement, battle input, animation timing or text speed.
- Does not patch the shared Gen1/Gen2 `MenuRepeat` helper.
- Compatible with Modern UI: the mod changes native menu input timing, not rendering.
- Compatible with a separate mod that disables the L/R Help screen; in that case the Help timing patch simply remains dormant.
- No hard conflicts are declared.

The mod requests `engine_internals` because the FireRed Bag and Help repeat counters currently have no dedicated public timing hook.
