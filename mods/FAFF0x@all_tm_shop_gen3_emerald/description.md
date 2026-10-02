# Universal Free TM/HM Shop Gen 3 — Emerald v1.2.2

Emerald-only conversion of the Gen 3 Universal Free TM/HM Shop for Pokémon Recomp.

## Emerald conversion

This is not a manifest-only port. Pokémon Emerald uses the RSE shop implementation (`src.ui.game3.rse.shop_menu`) instead of the FireRed/LeafGreen root-menu path. v1.2.0 integrates directly with that Emerald flow.

- Target: **Pokémon Emerald only** (`games: ["emerald"]`).
- Adds **TM/HM SHOP** to normal Emerald Poké Marts before QUIT.
- Keeps Emerald Decoration Shops native and unchanged.
- Preserves other composable Mart rows exposed through the shared shop root model.
- Native BUY / SELL / QUIT actions are still handed back to Emerald's own RSE shop implementation.
- Native machine stock is removed from normal marts to avoid duplicate TM/HM entries.
- TM01–TM50 and HM01–HM08 use Emerald's native item IDs and Bag TM/HM pocket.
- FireRed/LeafGreen Quest Log calls were removed because Emerald does not use that system.
- Runtime profile checks prevent the Emerald integration from activating on FireRed, LeafGreen, Ruby or Sapphire.

## Catalogue

The dedicated catalogue keeps the features from the FR/LG release:

- 50 TMs + 8 HMs, all free;
- 8-row list with move name and type badge;
- move type, category, power, accuracy, PP, description, effect and effect chance;
- filters for machine type (TM/HM), Pokémon type and move category;
- TMs can be taken up to the normal quantity limit;
- HMs are reusable and limited to one owned copy;
- unique stack id so the specialized catalogue is not replaced by a generic Mart presenter.

### Modern UI compatibility

v1.2.2 includes an explicit compatibility bridge for `gen3_modern_ui_emerald`.

Modern UI Emerald v1.1.x renders the Poké Mart root separately from the native RSE window. The TM/HM row therefore existed in the shop state but could be visually hidden behind Modern UI's fixed BUY / SELL / QUIT presentation. This build draws the root menu from the live shared `ShopMenu.ROOT` model after other HUD presenters, so **TM/HM SHOP is visible and selectable**.

Only the root Poké Mart menu is bridged. BUY lists, SELL, quantity dialogs, Decoration Marts and the dedicated TM/HM catalogue keep their existing Emerald behavior.

The high-resolution catalogue palette is adjusted toward an Emerald/Hoenn green presentation.

## Controls

### List
- Up / Down: select machine
- Left / Right: page
- A: take for free
- SELECT: details
- START: filters
- B: return to the Emerald Poké Mart

### Filters
- Up / Down: select filter
- Left / Right: change value
- A: apply / reset
- SELECT / START / B: close filters

### Quantity
- Up / Down: ±1
- Left / Right: ±10
- A: confirm
- B: cancel

## Compatibility notes

Use this package with **Emerald only**. Keep the original `all_tm_shop_gen3` package for FireRed/LeafGreen. This Emerald build uses the separate mod id `all_tm_shop_gen3_emerald`, so it does not collide with the FireRed/LeafGreen package.

For Modern UI Emerald, use `gen3_modern_ui_emerald` (the Emerald standalone ID). v1.2.2 declares it as an optional dependency so load ordering is deterministic when both mods are installed.


## Compatibility fix in v1.2.2

When `Free Master/Rare + Evolution + Max Repel - Emerald` is enabled, that mod owns the public Poké Mart root input handler. v1.2.2 loads after it and intercepts only the `TM/HM SHOP` activation before delegating the rest, so both custom shops can coexist. The Modern UI root renderer also uses a contained FREE badge that cannot overflow the menu row.
