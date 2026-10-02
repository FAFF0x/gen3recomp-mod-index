# DV EV Editor Gen 3 - Emerald v2.1.0

Emerald-only RSE conversion of `dv_ev_editor_gen3_v2.0.3`.

Open **POKéMON**, choose a party Pokémon, then select **IV/EV** immediately after **SUMMARY**. The entry is added only to the normal Emerald field party action menu. It is not added to battle party menus, multi-selection flows, Eggs, or the restricted Battle Pike party menu.

## Emerald / Generation 3 model

Pokémon Emerald uses six independent **IVs** and six independent **EVs**:

- HP
- Attack
- Defense
- Sp. Atk
- Sp. Def
- Speed

IVs are editable from **0-31**. Raw EV bytes are editable from **0-255**; the editor also shows the effective `floor(EV / 4)` contribution (`0-63`). Normal Gen 3 training is capped at 510 EVs total, but this mod intentionally remains a direct value editor and preserves the source mod's ability to exceed that gameplay cap.

Stats are recalculated immediately through the shared Game3 `Pokemon.applyStats`, which is also used by Emerald. Missing HP is preserved after recalculation, and a fainted Pokémon remains fainted.

## Controls

- **Up / Down** - choose a stat
- **Left / Right** - switch IV / EV page
- **SELECT** - switch IV / EV page
- **A** - edit / confirm
- While editing: **Left / Right** selects the digit and **Up / Down** changes it
- **B** - cancel editing / return to the Emerald party action menu
- **START** - maximize all six IVs and all six raw EV values

`START` sets every IV to **31** and every raw EV byte to **255**, matching the original mod behavior.

## Emerald-specific conversion

- Manifest target is **only** `emerald`.
- Uses a dedicated mod id: `dv_ev_editor_gen3_emerald`.
- Runtime checks refuse FireRed/LeafGreen even if the package is force-loaded.
- Integrates with the shared Game3 Party Menu while respecting Emerald's RSE party manifest and field-move action rows.
- Avoids battle, multi-select and Battle Pike restricted action menus.
- Includes an Emerald-safe renderer bridge for the custom `IV/EV` action so the vanilla RSE party menu does not assert on an unknown action id.
- Keeps `gen3_modern_ui` optional; the editor retains its high-resolution overlay and a native 240x160 fallback.
