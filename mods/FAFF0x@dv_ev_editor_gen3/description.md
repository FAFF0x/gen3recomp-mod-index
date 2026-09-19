# DV EV Editor Gen 3 v2.0.2

FireRed/Game3 port of `dv_ev_editor_gen2_v2.0.1`.

Open **POKéMON**, choose a party Pokémon, then select **IV/EV** immediately after **SUMMARY**. The entry is only added to the normal field party menu and is deliberately not added to battle party menus.

## Generation 3 model

FireRed uses six independent **IVs** and six independent **EVs**:

- HP
- Attack
- Defense
- Sp. Atk
- Sp. Def
- Speed

IVs are editable from **0–31**. EV bytes are editable from **0–255**; the editor also shows the effective `floor(EV / 4)` contribution (`0–63`). FireRed normally limits EVs gained through gameplay to 510 total, but this is a direct save-value editor and intentionally allows the raw six EV bytes to exceed that training cap.

Stats are recalculated immediately through `src.core.game3.pokemon.applyStats`. Missing HP is preserved after recalculation, and a fainted Pokémon remains fainted.

## Controls

- **Up / Down** — choose a stat
- **Left / Right** — switch IV / EV page
- **SELECT** — switch IV / EV page
- **A** — edit / confirm
- While editing: **Left / Right** selects the digit and **Up / Down** changes it
- **B** — cancel editing / return to the party action menu
- **START** — maximize all six IVs and all six raw EV values

`START` sets every IV to **31** and every EV byte to **255**.

## FireRed / compatibility

- Target is exclusively `firered`.
- Uses `src.ui.game3.party_menu`, `src.ui.game3.stack`, and `src.core.game3.pokemon`.
- Does not load any Gen2 modules.
- The party input wrapper preserves any handler installed before this mod and only adds the `IV/EV` action when appropriate.
- The action is deduplicated if an equivalent `IV/EV` / `DV/EV` row is already present.
- `gen3_modern_ui` is optional. A high-resolution overlay is provided for the editor layer while native Game3 rendering remains the fallback.
