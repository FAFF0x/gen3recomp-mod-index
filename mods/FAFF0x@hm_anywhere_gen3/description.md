# HM & Field TM Anywhere - Gen 3 v2.1.3

Native FireRed/Game3 port of `hm_anywhere_gen2_v2.1.0`.

## Features

- Owning an HM in the TM Case is enough to use its supported FireRed field action without teaching it.
- START always exposes an **HM** entry; the opened screen lists only supported HMs you actually own.
- START always exposes a **TM** entry; the opened screen lists TM28 DIG only when you own it.
- Contextual overworld interactions (Cut tree, Surf water, Rock Smash rock, Strength, etc.) can use an owned machine through the native Game3 `field_moves` engine.
- Badge and location checks remain delegated to FireRed `FieldMoves.fromMenu` / `try*OW` logic.
- `CONTEXT: ON/OFF` can be toggled inside either menu.
- FLY uses a mod-owned destination list populated from places visited while the mod is active (plus the current/heal location) and warps through the native Game3 warp system. The current Game3 region map has no public Fly destination seam.

## Gen3 differences from the Gen2 release

FireRed's machine list is different from Gold/Silver/Crystal:

- ROCK SMASH is HM06, not a TM.
- HEADBUTT and SWEET SCENT are not FireRed TMs.
- DIG remains TM28 and is the supported field TM exposed by this port.
- FireRed's usable HM set is CUT, FLY, SURF, STRENGTH, FLASH, ROCK SMASH and WATERFALL.

## Compatibility

- `games: ["firered"]` only.
- ID: `hm_anywhere_gen3`.
- Does not load Gen2 engine modules.
- Uses a runtime sentinel so equivalent HM Anywhere patches do not stack the `FieldMoves.partyMoveUser` replacement twice.
- START entries use unique IDs and are not duplicated if already present.
- Modern UI is optional; the menu exposes stable `title`, `rows`, `items`, `cursor` and `screenId` fields and has a native Game3 fallback renderer.


## v2.1.2 menu visibility fix

`HM` and `TM` are now always present in the FireRed START menu. Ownership is checked after opening the screen, so Start-menu construction can no longer hide the entries because of TM Case/session timing. If no supported machine is owned, the screen explicitly shows `NO OWNED HM` or `NO OWNED FIELD TM`.

## v2.1.3 Modern UI bridge

When HM/TM Anywhere is opened from START, the custom controller now presents itself through the native Game3 `option` stack surface and mirrors its rows into a temporary OptionMenu page. Modern UI Gen3 therefore renders the HM/TM list with the same modern options layout instead of exposing the fallback vanilla screen. Input and field-move execution remain owned by HM Anywhere; the original OptionMenu state is restored when the submenu closes.
