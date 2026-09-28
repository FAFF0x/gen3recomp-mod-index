# Stable Menu Navigation - Gen 3

FireRed/LeafGreen quality-of-life mod for Pokemon Recomp / Gen1Recomp.

## What it fixes

GAME SPEED can run several fixed logic updates during one rendered frame. FRLG's native Bag and Help screens count held-direction repeat in those logic updates, so their cursors can scroll much too quickly at high GAME SPEED values.

This mod keeps navigation independent from GAME SPEED and deliberately slows the held-repeat cadence:

- directional edge presses still move immediately;
- Bag: about 0.750 s before the first held repeat, then about 0.200 s between repeats;
- Help: about 0.600 s before the first held repeat, then about 0.200 s between repeats;
- multiple fast-forward fixed updates at the same real-time instant cannot produce a burst of cursor moves.

Other FRLG menus that are edge-only remain untouched.

## Compatibility

- FireRed + LeafGreen (`games: ["firered", "leafgreen"]`).
- Uses a generation-specific mod ID and global patch marker.
- Does not change GAME SPEED or `core.logic_speed`.
- Does not touch overworld movement, battle input, animation timing or text speed.
- Does not patch the shared Gen1/Gen2 `MenuRepeat` helper.
- Compatible with Modern UI: the mod changes native menu input timing, not rendering.
- Compatible with a separate mod that disables the L/R Help screen; in that case the Help timing patch simply remains dormant.
- No hard conflicts are declared.

The mod requests `engine_internals` because the FRLG Bag and Help repeat counters currently have no dedicated public timing hook.

## v1.0.4 - Slower menu navigation

The previous repeat interval of 5/60 s (~0.083 s) could still feel too fast when holding a direction.

This release changes the cadence to:

- immediate response on the first physical press;
- Bag: 40/60 s initial hold delay, then one repeat every 8/60 s;
- Help: 30/60 s initial hold delay, then one repeat every 8/60 s;
- at most one synthetic movement per real-time deadline, so high GAME SPEED cannot create bursts.

This is roughly 7.5 repeated cursor steps per second instead of 12.


## v1.1.0 - Directional input de-duplication

This release fixes the case where the Bag could still move too quickly even after increasing the repeat timer.

The cause was that raw directional `wasPressed()` edges were still reaching the native Bag code. At high GAME SPEED, the same physical press can be observed by multiple fixed updates before the rendered input frame changes.

v1.1.0 therefore:

- blocks raw UP/DOWN/LEFT/RIGHT edges from reaching the Bag and Help systems;
- emits exactly one immediate movement for a new physical direction;
- rearms only after release or direction change;
- allows held repeat only in the Bag's main item list;
- keeps Bag action, quantity and confirmation menus one-step-per-physical-press;
- uses a much slower held cadence: Bag 0.75 s initial delay, then 0.20 s per repeat;
- uses Help 0.60 s initial delay, then 0.20 s per repeat;
- remains independent from GAME SPEED.


## v1.2.0 - Final input gate after Modern Bag

The previous builds could still feel extremely fast when **Modern Bag Gen 3** was installed.

Modern Bag has its own held-scroll system and loads at a higher priority than the older Stable Menu Navigation builds. Its default `Fast` mode uses logic-frame timing, so it could reintroduce rapid scrolling after Stable Menu Navigation had already patched the native Bag.

v1.2.0 fixes the load order directly:

- Stable Menu Navigation now uses priority **900**, after Modern UI and Modern Bag;
- it wraps the final `BagMenu.handleInput`, including the Modern Bag wrapper when present;
- Modern Bag receives UP/DOWN with `isDown = false`, so its internal fast held-repeat cannot fire;
- directional `wasPressed` is still de-duplicated, so high GAME SPEED cannot turn one physical press into several cursor moves;
- Bag held scrolling is intentionally slow: first repeat after **1.00 s**, then one row every **0.30 s**;
- action menus, quantity screens, confirmations and Modern Bag custom menus remain **one movement per physical press**;
- Help uses a 0.75 s initial delay and the same 0.30 s repeat interval.

If you tap the D-pad/stick once, the cursor should move exactly one row. Holding it should now scroll slowly.
