# Pokédex Plus - Gen 3 (Emerald) v1.1.1

Emerald-only conversion of the FireRed/LeafGreen `Pokédex Plus` mod.

This is a real RSE conversion rather than a manifest rename. Before the National Dex is unlocked, the list follows **Emerald's Hoenn Dex order**. After unlocking the National Dex, the list expands to the full Gen 3 National Pokédex.

## v1.1.1 crash fix

- Fixed the Emerald detail-screen crash `ROM text gText_Lbs is not in the script cache`.
- Pokédex Plus no longer calls the FRLG-oriented `PokedexData.getEntry()` formatter when building Emerald detail data.
- Height and weight now use Emerald/RSE's native `rse.pokedex.heightText()` / `weightText()` formatting.
- Category and Pokédex description are read directly from the active Emerald species entry.
- Modern UI detection now prefers `gen3_modern_ui_emerald`.

## Emerald conversion

- Targets only `emerald` and uses a separate mod id: `pokemonmod_gen3_pokedex_plus_emerald`.
- Uses the Emerald/RSE profile and refuses to activate on FireRed/LeafGreen.
- Replaces the START-menu Pokédex entry with `POKéDEX+` only while running Emerald.
- Uses `Dex.regionalNumber` / `Dex.regionalMax` for the real Hoenn regional order.
- Uses Emerald's `rse.pokedex_area` logic for Habitat data, including RSE map sections and Emerald-specific wild-area rules.
- START on the Habitat tab opens the native Emerald AREA screen.
- DEX ENTRY shows the active Emerald Pokédex entry rather than FireRed/LeafGreen dual-version text.
- Vanilla fallback no longer uses FireRed `PokedexChrome`; it has an Emerald-style 240×160 green/teal renderer.
- Modern UI support is preserved, including the v1.0.24 text-fitting fixes.
- Search & Filter Lab, type/status filters, sort modes, base stats, evolution data, level-up moves and cry playback are preserved.

## Controls

### Main list
- Up/Down: one Pokémon
- Left/Right or L/R: page jump
- A: details
- START / SELECT: Search & Filter Lab
- Physical keyboard: type to begin name search
- B: close

### Details
- Left/Right or L/R: change tab
- Up/Down: scroll Evolution / Level Moves / Habitat lists
- SELECT: play cry
- START on Habitat: open native Emerald AREA screen
- B: back

## Detail tabs

1. Overview
2. Dex Entry
3. Stats
4. Evolution
5. Level Moves
6. Habitat

## Compatibility

- Game: **Pokémon Emerald only**
- Generation: **Gen 3**
- Optional: `gen3_modern_ui_emerald`
- Optional display integration: `pokemonmod_gen3_trade_evolution_fix`
