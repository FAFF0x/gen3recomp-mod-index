# Nickname Changer - Gen 3 Emerald

Emerald-only conversion of **Nickname Changer** for Pokémon Recomp.

It adds **RENAME** to the normal field action menu of every non-Egg party Pokémon and opens the native Gen 3 naming screen using Emerald's active naming-screen data.

## Usage

1. Open **POKéMON** from Emerald's Start menu.
2. Select a non-Egg Pokémon.
3. Choose **RENAME**.
4. Edit the current nickname on Emerald's naming screen.
5. Confirm with **OK**.

Entering the Pokémon's species name clears the custom nickname, so future evolutions display the evolved species name normally.

## Emerald / RSE implementation

- Target is **Emerald only**: `games: ["emerald"]`.
- Uses `src.ui.game3.party_menu`, but respects Emerald's RSE party action manifest and text insets.
- Uses `src.ui.game3.naming`; the engine loads the naming keyboard/template data from the currently active Emerald cache.
- The current nickname (or species name when no nickname exists) is pre-filled in the naming screen.
- Adds `RENAME` after `SUMMARY` without replacing Emerald field-move rows such as CUT, SURF, FLY, ROCK SMASH, WATERFALL or DIVE.
- Includes a native-renderer bridge because Emerald's PartyMenu asserts on unknown cursor-option ids. Vanilla temporarily sees `CANCEL` for that single row while the visible label remains `RENAME`.
- Input is kept modal while the naming screen is active, and one confirm edge is swallowed after close to avoid accidental PartyMenu activation on older HUD paths.
- `RENAME` is not exposed for Eggs, battle party menus, tutor/multi-selection flows, Safari, Battle Pike, Battle Pyramid, Multi Partner Room, Link or Union Room contexts.
- `gen3_modern_ui` remains optional. Modern UI reads the same live `PartyMenu.ACTIONS` list.

## Compatibility

- Pokémon Emerald only.
- Manifest id: `pokemonmod_gen3_nickname_changer_emerald`.
- Does not replace or conflict by id with the FireRed/LeafGreen package.
- Requires `engine_internals` because the current Game3 PartyMenu does not expose a public custom-action registration API.
