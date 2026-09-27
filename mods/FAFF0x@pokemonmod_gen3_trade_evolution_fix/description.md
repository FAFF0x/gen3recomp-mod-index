# Trade Evolution Fix - Gen 3

FireRed/LeafGreen port of **Trade Evolution Fix** for Pokémon Recomp.

Version **1.2.2** replaces FRLG's vanilla trade-evolution rows with real level-up rows, so solo play and data-driven UI mods report the new method as a level evolution instead of `TRADE`.

## Evolutions

- Kadabra → Alakazam — Level 40
- Machoke → Machamp — Level 40
- Graveler → Golem — Level 40
- Haunter → Gengar — Level 40
- Poliwhirl + King's Rock → Politoed — Level 40
- Slowpoke + King's Rock → Slowking — Level 37
- Onix + Metal Coat → Steelix — Level 40
- Scyther + Metal Coat → Scizor — Level 40
- Seadra + Dragon Scale → Kingdra — Level 40
- Porygon + Up-Grade → Porygon2 — Level 40
- Clamperl + DeepSeaTooth → Huntail — Level 40
- Clamperl + DeepSeaScale → Gorebyss — Level 40

For held-item evolutions, the Pokémon must still hold the original FRLG item when it levels up. The item is consumed only after a successful evolution. If the evolution is canceled, the item remains held.

Slowpoke is handled specially: at level 37, King's Rock selects Slowking; without King's Rock, the normal Slowbro evolution remains available.

## Compatibility

- FireRed + LeafGreen (`games: ["firered", "leafgreen"]`).
- Unique Gen3 mod id: `pokemonmod_gen3_trade_evolution_fix`.
- Uses the public `evolution.check` hook and `pokemon.evolved` event.
- Does not globally replace the Game3 evolution engine.
- Leaves a path untouched if another mod has already supplied a level evolution to the same target, avoiding duplicate conversions.
- No runtime Gen2 modules are used.
