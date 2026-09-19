# Area DexNav Gen 3

Press **SELECT** while exploring FireRed to immediately encounter an **uncaught Pokémon** that really appears in the current area's FireRed encounter table.

## FireRed behaviour

- Uses the current map's merged Gen3 encounter registry (`mod.content.encounters`).
- On land it uses the native 12-slot FireRed weights: `20,20,10,10,10,10,5,5,4,4,1,1`.
- While **SURFing**, it exclusively uses the native 5-slot water table: `60,30,5,4,1`.
- Species already caught in the Game3 Pokédex are excluded.
- Duplicate slots remain separate, preserving their original probability before the remaining uncaught slots are renormalized.
- The encounter level is rolled from the real slot's `minLevel..maxLevel` range.
- DexNav intentionally bypasses the normal step encounter-rate roll and repel check, matching the purpose of the original Area DexNav.
- Fishing, Rock Smash, static encounters, gifts, trades and evolutions are not scanned because they are not the normal LAND/WATER table selected by this mod.

## SELECT

FireRed normally uses SELECT for a registered item. While Area DexNav successfully handles SELECT in the free overworld, it starts the DexNav battle/message first, preventing the registered-item action from also firing in that fixed update. START and the rest of the controls are unchanged.

## Compatibility

This is a separate FireRed-only port with id `area_dexnav_gen3`. It can be installed alongside the Gen2 package because the manifest id, filename, target game and runtime namespace are different. It does not replace battle UI or menu screens and is compatible with `gen3_modern_ui`.
