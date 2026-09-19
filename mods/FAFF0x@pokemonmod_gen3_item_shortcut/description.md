# Item Shortcut - Gen 3 (Pokemon MOD)

FireRed-only port of `item_shortcut_gen2` for the Gen1Recomp FireRed runtime.

## Features

- Five persistent BAG shortcut slots.
- One slot can be marked **FAST**.
- Default shortcut menu: **I** on keyboard / **Y** on controller.
- Default FAST item: **K** on keyboard / **X** on controller.
- Full control remapping from the shortcut menu.
- Uses FireRed's native BAG, Party Menu and `ItemUse.useField` paths.
- Party-target items open the native FireRed Party screen.
- Town Map, Bicycle, Repels, Escape Rope, VS Seeker, TM Case and Berry Pouch use the native FireRed item routes.

## Assigning items

Open Item Shortcut and select a slot, then choose **ASSIGN ITEM** / **CHANGE ITEM**.

You can also highlight an item in the normal FireRed BAG and press the Item Shortcut menu control (default **I/Y**) to open the five-slot assignment picker directly.

## Compatibility

- Target: **FireRed only** (`games: ["firered"]`).
- Unique mod ID: `pokemonmod_gen3_item_shortcut`.
- No hard manifest conflicts or incompatibilities.
- Gen2 save/options are not reused or overwritten.
- The mod uses raw `input.key` and `input.gamepad` hooks instead of replacing Game3 input methods.
- Requires `engine_internals` for the native FireRed BAG/Party/UI modules.
