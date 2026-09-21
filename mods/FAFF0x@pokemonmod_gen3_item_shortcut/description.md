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


## v1.0.4 Modern UI presentation

Version 1.0.4 adds a high-resolution window-space presenter matching the default `gen3_modern_ui` visual language: Kanto blue chrome, white cards, yellow selection bands, Poké Ball red accents, smooth readable fonts, item icons, live quantities, pocket labels, descriptions, and a FAST badge. The underlying FireRed stack still owns input/state, so functionality remains independent and stable.

## v1.0.3 access fix
The raw I/Y hotkey now queues the menu for the next FireRed input tick instead of mutating the UI stack inside the raw event callback. A permanent `ITEM SHORTCUT` entry is also added to the FireRed Start menu as a safe fallback.

## FireRed / Modern UI compatibility

Version 1.0.4 keeps the corrected Game3 stack contract from v1.0.3, but no longer relies on the native 240x160 appearance. Item Shortcut now paints its own opaque window-space presentation after the FireRed frame, so it visually matches `gen3_modern_ui` while remaining a separate mod.
