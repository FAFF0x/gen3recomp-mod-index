# Item Shortcut - Gen 3 Emerald (Pokemon MOD)

Emerald-only conversion of the Gen 3 Item Shortcut mod for the Game3/RSE runtime. This build is **not** a FireRed/LeafGreen reskin: it targets the Emerald profile, Emerald BAG model and RSE item presentation paths.

## Features

- Five persistent BAG shortcut slots.
- One slot can be marked **FAST**.
- Default shortcut menu: **I** on keyboard / **Y** on controller.
- Default FAST item: **K** on keyboard / **X** on controller.
- Full control remapping from the shortcut menu.
- Uses Emerald's native/shared Game3 BAG, Party Menu and profile-aware `ItemUse.useField` paths.
- Party-target items open the native profile-aware Party screen.
- Emerald field items such as the Mach/Acro Bike, rods, Repels, Escape Rope and Itemfinder remain governed by Emerald's native item-use rules.
- Uses the RSE 24x24 item-icon atlas for the custom high-resolution presenter.
- Adds `ITEM SHORTCUT` to the Emerald/RSE Start menu as a safe fallback route.

## Assigning items

Open Item Shortcut and select a slot, then choose **ASSIGN ITEM** / **CHANGE ITEM**.

You can also highlight an item in the normal Emerald BAG and press the Item Shortcut menu control (default **I/Y**) to open the five-slot assignment picker directly.

## Emerald conversion details

The FireRed/LeafGreen package assumed FRLG bag chrome and FRLG pocket ordering. This build explicitly applies the `emerald` item profile before enumerating the BAG, so the RSE order is used even when the shortcut is opened before the native BAG screen. Item icons are drawn through `src.ui.game3.rse.bag_chrome`, whose vertical 24x24 atlas differs from the FRLG helper.

The old VS Seeker follow-up was removed because Emerald does not use that FRLG field-item flow. Other field items are delegated to the shared profile-aware Emerald item-use implementation.

## Compatibility

- Target: **Pokemon Emerald only** (`games: ["emerald"]`).
- Separate mod ID: `pokemonmod_gen3_item_shortcut_emerald`.
- The original FireRed/LeafGreen Item Shortcut may remain installed because this build has a different ID and target.
- Optional Modern UI dependency: `gen3_modern_ui_emerald`. The custom shortcut screen also works without it and paints its own overlay.
- Requires `engine_internals` for the native Game3/RSE BAG, Party and UI modules.
- Does not intentionally affect link gameplay state.

## Modern UI compatibility

The shortcut screen owns a custom stack ID, `item_shortcut_gen3_emerald`, and paints its presentation through `render.hud` after downstream UI renderers. Its hook uses elevated presentation priority so the shortcut panel remains visible over compatible Emerald UI overhauls without taking ownership of their menus.
