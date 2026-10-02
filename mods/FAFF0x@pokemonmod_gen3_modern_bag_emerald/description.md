# Modern Bag - Gen 3 Emerald (Pokemon MOD)

Emerald-only conversion of the Gen 3 Modern Bag. This build targets the RSE/Emerald Game3 runtime rather than the FireRed/LeafGreen presentation layer.

## Identity / coexistence

- ID: `pokemonmod_gen3_modern_bag_emerald`
- Version: `1.1.1`
- Target: `games: ["emerald"]`
- Family: RSE / Emerald only
- Separate ID from the FireRed/LeafGreen build, so both can remain installed
- Optional Modern UI integration uses `gen3_modern_ui_emerald`
- Uses a dedicated Emerald runtime sentinel so another Modern Bag implementation cannot double-wrap the live Bag


## v1.1.1 tab synchronization fix

Emerald's native `BagMenu.show()` reapplies the RSE bag profile during opening. In v1.1.0 this silently restored the five native pocket entries after Modern Bag had already installed its eight logical tabs, so the visible tab index and the logical category could diverge. v1.1.1 reapplies the logical order after the native open path and keeps it synchronized before RSE input/render passes. Physical save pockets remain unchanged.

## Emerald inventory model

Emerald uses five physical pockets in this order:

1. Items
2. Poké Balls
3. TM / HM
4. Berries
5. Key Items

The mod does **not** move items between those physical pockets. It creates eight logical views over the live Emerald Bag:

1. Favorites
2. Medicine
3. Balls
4. TM / HM
5. Berries
6. Battle
7. Key Items
8. Other

Native Emerald/RSE item handling remains authoritative for USE, GIVE, TOSS, REGISTER and TM/HM teaching.

## Emerald-specific conversion

The port is not only a manifest change. It now:

- verifies that the active Game3 profile is `emerald`;
- applies the Emerald bag profile before reading pocket order/capacity;
- uses `src.ui.game3.rse.bag_menu` and `src.ui.game3.rse.bag_chrome`;
- adapts the RSE 24×24 vertical item-icon atlas to the high-resolution TM/HM panels;
- maps synthetic logical categories onto Emerald's Items bag frame while keeping their logical labels;
- lets the RSE skin own ordinary list navigation and native action grids;
- bypasses the RSE action grid only while a Modern Bag custom panel is active, preventing double navigation;
- uses Emerald's eight-row native list behavior outside the custom six-row TM/HM catalogue;
- tracks logical pocket changes even when RSE consumes Left/Right before the shared BagMenu handler;
- remains compatible with Modern UI Emerald through the live `BagMenu` / `ItemsData` model.

## Controls

- Left / Right: logical category
- Up / Down: item
- A: native Emerald action menu
- SELECT: Modern Bag tools (favorite, pin, register, move info, sort)
- START: search; in TM/HM opens the NAME / TYPE / CLASS / SORT filter hub
- Controller Y / Keyboard I: expanded Move Information on a highlighted TM/HM

## TM/HM catalogue

The TM/HM category keeps the two-pane catalogue from the original mod. Six machines are visible on the left and the selected move's technical sheet remains visible on the right with machine number, move name, type, Gen III Physical/Special/Status class, Power, Accuracy, PP and move effect.

The custom TM/HM renderer uses Emerald's item atlas and is shown only while the Bag layer is topmost, so Party/Naming screens are not covered.

## Inventory capacity

The expanded slot/stack capacity behavior is preserved. Mutations still go through `src.core.game3.bag`; this mod does not replace Emerald item effects or removal semantics.

## Compatibility note

This build is intended for Pokémon Emerald only. The original FireRed/LeafGreen Modern Bag should use its own package/ID.
