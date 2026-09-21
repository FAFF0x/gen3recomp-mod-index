# Moves Manager - Gen 3

FireRed-only port of `moves_manager_gen2`.

## Features

- Adds **MOVES** to the out-of-battle Pokémon Party action menu.
- Shows the four live move slots with PP and move type.
- **SELECT** selects a move, then SELECT/A on another slot safely reorders the moves.
- Remembers naturally learned moves from the Pokémon's evolutionary line up to its current level, plus moves it has actually known while the mod is installed.
- Lets you restore a remembered move into a selected slot.
- Uses FireRed's native `Pokemon.swapMoves`, `Pokemon.replaceMove` and `Pokemon.teachMove` APIs.
- HM moves cannot be overwritten.
- Includes a high-resolution presenter that remains readable with `gen3_modern_ui`; the native FireRed layer still owns input and serves as a fallback.

## Controls

- **Up / Down**: select move / remembered move.
- **A**: details / teach / confirm swap.
- **SELECT**: begin or confirm move reordering.
- **Left / Right**: page remembered moves or move-detail pages.
- **B**: back.

## Compatibility

- Generation: **Gen 3 only**
- Game: **Pokémon FireRed** (`firered`)
- Optional dependency: `gen3_modern_ui`
- Gen2 and Gen3 packages use different internal IDs.
- No installer-level `conflicts` are declared.
