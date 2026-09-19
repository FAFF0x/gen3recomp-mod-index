# Universal Free TM/HM Shop Gen 3 — v1.1.4

FireRed-only port of `all_tm_shop_gen2` for Pokémon Recomp.

## v1.1.4 UI / filters upgrade

The TM/HM catalogue now has its own high-resolution Modern-UI-style renderer instead of being compressed through the generic Poké Mart presenter.

- Left pane: 8-row TM/HM list with machine number, move name and visible type badge/icon.
- Right pane: move name, TM/HM number, owned count, large type badge, physical/special/status icon, POWER / ACCURACY / PP cards, full move description, effect and effect chance.
- Persistent filter chips show the active Machine / Type / Category filters and live result count.
- Filters:
  - Machine: ALL / TM / HM
  - Type: ALL + all 17 FireRed types
  - Category: ALL / PHYSICAL / SPECIAL / STATUS
- The catalogue uses a unique Game3 stack id, so `gen3_modern_ui` no longer replaces it with the generic Mart layout. The visual language remains compatible with Modern UI.

## Controls

### List
- Up / Down: select machine
- Left / Right: page
- A: take / buy for ¥0
- SELECT: move details mode
- START: filters
- B: return to Poké Mart

### Filters
- Up / Down: select filter
- Left / Right: change value
- A: apply / reset
- SELECT / START / B: close filter panel

### Quantity
- Up / Down: ±1
- Left / Right: ±10
- A: confirm
- B: cancel

## Core behavior

- TM01–TM50 and HM01–HM08 are free.
- TMs support quantities up to 99.
- HMs are reusable and limited to one owned copy.
- Machines are removed from the normal Mart stock to prevent duplicates.
- Their runtime price is ¥0, so they cannot be resold for profit.
- Native FireRed TM CASE, Bag limits and teaching logic are preserved.
- Other shop entries from other mods are preserved.
- Equivalent TM/HM shop entries suppress duplicates.
- Target is FireRed only (`games: ["firered"]`).
