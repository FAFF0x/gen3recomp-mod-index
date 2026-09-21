# Modern Bag - Gen 3 (Pokemon MOD)

FireRed-only port of `modern_bag_gen2_v1.0.0` for Pokemon Recomp Game3.

## Identity / coexistence

- ID: `pokemonmod_gen3_modern_bag`
- Version: `1.0.3`
- Target: `games: ["firered"]`
- No Gen2 runtime modules
- No hard manifest conflicts
- Defers to an active `modern_bag_gen3` or `modern_bag` equivalent instead of installing a second Bag dispatcher
- Uses a Game3 module sentinel so two equivalent runtime patches cannot double-wrap the Bag
- Optional `gen3_modern_ui` integration is automatic because Modern UI reads the live Game3 `BagMenu`

## FireRed design

FireRed stores inventory in five physical pockets: Items, Key Items, Poke Balls, TM Case and Berry Pouch. This mod does **not** move items between those physical pockets. It provides eight logical views over the same live data:

1. Favorites
2. Medicine
3. Balls
4. TM / HM
5. Berries
6. Battle
7. Key Items
8. Other

The native FireRed item-use paths remain authoritative for USE, GIVE, TOSS, REGISTER and TM/HM teaching.

## Controls

- Left / Right: logical category
- Up / Down: item
- A: native FireRed action menu
- SELECT: Modern Bag tools (favorite, pin, register, move info, sort)
- START: search; in TM/HM opens the dedicated NAME / TYPE / CLASS / SORT hub

TM/HM filters include move-name search, all FireRed move types, physical/special/status class and machine-number/move-name/power sorting. All filters can be combined.


### TM/HM catalogue and move information

The **TM / HM** category now has its own two-pane catalogue instead of the generic Bag list. Six machines are visible on the left; the selected move's technical sheet stays visible on the right with machine number, move name, type, Physical/Special/Status class, Power, Accuracy, PP and the wrapped move effect.

Press **START** for the redesigned filter centre. Use Up/Down to select NAME, TYPE, CLASS or SORT. TYPE/CLASS/SORT change immediately with Left/Right and the full choice set stays visible; NAME opens the move-name search with A. Filters apply live and combine.

Press **Controller Y** or **Keyboard I** on a highlighted TM/HM to open the expanded **MOVE INFORMATION** sheet. It uses a two-column layout with identity/type/class/stats on the left and the complete move effect on the right. Press Y/I again, A or B to return.

All TM/HM layouts use responsive scaling, clipping, ellipsis and wrapped effect text so long names and descriptions stay inside their cards with or without `gen3_modern_ui`.

## Inventory capacity

Like the Gen2 source mod, the Game3 item slot/stack caps are expanded while the mod is active. Mutations still go through `src.core.game3.bag`; the mod does not replace item effects or removal semantics.
