# Free Master/Rare + Evolution + Max Repel - Emerald

Emerald-only Gen 3 conversion of the FireRed/LeafGreen combined shop mod.

## What it does

Every **normal Pokémon Emerald Poké Mart** keeps Emerald's native RSE shop flow and additionally:

- sells **MASTER BALL** for ¥0;
- sells **RARE CANDY** for ¥0;
- sells **MAX REPEL** for ¥0;
- adds an **EVOLUTION SHOP** entry to the Mart root menu;
- builds the Evolution Shop dynamically from **Emerald's own evolution data** and sells the discovered evolution items for ¥0.

The port deliberately reuses Emerald's `src.ui.game3.rse.shop_menu` purchase state machine for item lists, quantities, confirmations, bag checks, Premier Ball handling and shop history. Only the normal-Mart root is adapted, because Emerald's RSE root menu is private and does not read the FRLG-style `ShopMenu.ROOT` table by itself.

## Emerald-specific conversion

This is not a manifest-only rename of the FRLG mod:

- target is **only `emerald`**;
- the mod has a separate package ID, so it can coexist with the FR/LG build;
- normal stock is added only after Emerald has identified the Mart type, so **decoration marts are not modified**;
- evolution stones are resolved by symbolic Emerald item names rather than FRLG numeric assumptions;
- held-item and item-use evolutions are discovered from the active Emerald species dataset;
- the Evolution Shop uses the Emerald/RSE BUY state machine;
- the custom root renderer follows Emerald window sizing and labels;
- free items allow the native Emerald quantity cap even when the player has ¥0.

## Compatibility

- Target: **Pokémon Emerald / Gen 3 only** (`games: ["emerald"]`).
- Separate mod ID: `pokemonmod_gen3_emerald_free_master_rare_evolution_repel`.
- Optional compatibility target: `gen3_modern_ui_emerald`.
- Decoration marts remain untouched.
- Duplicate normal-Mart stock entries are removed automatically.
- Zero buy price is also seen by the sell path, preventing free-money sellback loops.

Trade-held evolution items are made available for purchase, but the mod does not change Emerald's underlying trade-evolution rules.
