# Stable Menu Navigation - Gen 3 (Emerald)

Emerald-only port for Pokemon Recomp / Gen1Recomp.

## What it fixes

High **GAME SPEED** values can execute several fixed logic updates while the rendered input frame has not changed. A menu can therefore observe the same physical directional press multiple times or advance a logic-frame held-repeat counter too quickly.

Pokemon Emerald does not use FireRed/LeafGreen's L/R Help System. Its relevant inventory navigation is instead split between two RSE screens:

- the native Emerald **Bag** (`src.ui.game3.rse.bag_menu`);
- the separate **Battle Pyramid Bag** (`src.ui.game3.rse.pyramid_bag`).

This port gates both screens at the final RSE input layer.

### Timing

- A new physical UP/DOWN/LEFT/RIGHT press moves immediately and exactly once.
- Normal Bag: first held repeat after **1.00 s**, then one step every **0.30 s**.
- Battle Pyramid Bag: first held repeat after **1.00 s**, then one step every **0.30 s**.
- Action grids, toss quantity, confirmations and other submodes remain one movement per physical press.
- Timing is based on wall-clock time, not GAME SPEED logic updates.

## Emerald-specific implementation

The FRLG build patched `src.ui.game3.bag_menu` and the FRLG Help system. That is not sufficient on Emerald because the RSE bag skin consumes directional input before the shared BagMenu.

The Emerald port therefore:

- wraps `src.ui.game3.rse.bag_menu.handleInput` as the final normal-Bag input gate;
- suppresses downstream directional `isDown`, so RSE or Modern Bag repeat code cannot bypass the limiter;
- wraps `src.ui.game3.rse.pyramid_bag.handleInput`, preventing its snapshot-based 40/5 logic-frame repeat from accelerating with GAME SPEED;
- does **not** patch the FRLG Help system;
- does **not** alter PokeNav, battle controls, overworld movement, animations or text speed.

## Compatibility

- **Pokemon Emerald only** (`games: ["emerald"]`).
- Runtime guard requires the `emerald` profile with RSE family.
- Separate mod ID from the FireRed/LeafGreen build, so both packages can coexist in the mod library.
- Priority **900**, preserving the original intention of installing the final navigation gate after UI/Bag visual mods.
- Optional compatibility with `gen3_modern_ui`.
- Requires `engine_internals` because the RSE Bag/Pyramid input handlers do not expose a dedicated public timing hook.

## Regression checklist

See `tests/realtime_repeat_regression.md`.
