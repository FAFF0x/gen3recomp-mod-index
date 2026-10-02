# Moves Manager - Gen 3 Emerald

Emerald/RSE conversion of `moves_manager_gen3` for **Pokémon Emerald only**.

## Features

- Adds **MOVES** to the normal, out-of-battle Pokémon Party action menu in Emerald.
- Uses an Emerald-safe action renderer so the custom `MOVES` entry does not hit the native Party Menu cursor-option assert.
- Shows the four live move slots with PP and move type.
- **SELECT** selects a move, then SELECT/A on another slot safely reorders the moves.
- Remembers naturally learned moves from the Pokémon's evolutionary line up to its current level, plus moves it has actually known while the mod is installed.
- Lets you restore a remembered move into a selected slot.
- Uses the profile-aware Gen 3 `Pokemon.swapMoves`, `Pokemon.replaceMove` and `Pokemon.teachMove` APIs.
- Protects every Gen 3 HM move from being overwritten, including Emerald's **HM08 Dive**.
- Adds an Emerald-specific third detail page with Contest category, Appeal, Jam and Contest effect text from the RSE contest move data.
- Includes a high-resolution presenter compatible with `gen3_modern_ui`; the native Game3 layer remains the input owner and fallback.

## Emerald-specific restrictions

`MOVES` is deliberately not injected in contexts where Emerald uses special Party rules:

- battles;
- Eggs;
- multi-selection / move-tutor Party modes;
- Safari mode;
- Battle Pike;
- Battle Pyramid;
- Battle Tower Multi Partner room;
- active Link / Union Room contexts.

This keeps the manager from bypassing RSE facility or multiplayer restrictions.

## Controls

- **Up / Down**: select move / remembered move.
- **A**: details / teach / confirm swap.
- **SELECT**: begin or confirm move reordering.
- **Left / Right**: page remembered moves or move-detail pages.
- **B**: back.

The detail screen has three pages in Emerald: battle stats, effect/description, and Contest data.

## Compatibility

- Generation: **Gen 3 only**
- Game: **Pokémon Emerald only** (`emerald`)
- Mod ID: `moves_manager_gen3_emerald`
- Optional dependency: `gen3_modern_ui`
- Separate package/namespace from the FireRed/LeafGreen build, so both can exist in the same mod library without import collisions.
