# Free Master/Rare + Evolution + Max Repel - Gen 3

FireRed-only combined port of three Gen 2 shop mods:

- Free Master Ball + Rare Candy
- Free Evolution Shop
- Free Max Repel

## What it does

Every FireRed Poké Mart keeps the native BUY/SELL flow and additionally:

- sells **MASTER BALL** for ¥0;
- sells **RARE CANDY** for ¥0;
- sells **MAX REPEL** for ¥0;
- exposes an **EVOLUTION SHOP** entry from the Mart root menu;
- the Evolution Shop is built dynamically from FireRed's actual evolution data and sells the discovered evolution items for ¥0.

The mod deliberately reuses `src.ui.game3.shop_menu`, so bag-capacity checks, quantity selection, confirmations and purchase logic remain native.

## Compatibility

- Target: **Pokémon FireRed / Game3 only** (`games: ["firered"]`).
- Compatible with **Gen3 Modern UI**: Modern UI reads `ShopMenu.ROOT` and `_items`, so the extra Evolution Shop and free stock are represented without a separate UI fork.
- Coexistence-safe wrappers chain the existing `ShopMenu.show`, `handleInput` and item metadata functions instead of replacing the whole shop system.
- Duplicate stock entries are removed automatically.
- If another mod already provides an Evolution Shop root entry, this mod does not add a second one.
- Zero buy price also makes the affected items unsellable through the native Mart, preventing free-money sellback loops.

Trade-held evolution items keep FireRed's underlying evolution semantics; this mod makes them available in the Evolution Shop but does not redefine the game's trade rules.
