# Nickname Changer - Gen 3

FireRed-only port of **Nickname Changer** for Pokémon Recomp.

It adds **RENAME** directly to the normal action menu of every non-Egg party Pokémon. The intended order is:

```text
SUMMARY
RENAME
SWITCH
ITEM
CANCEL
```

Contextual field moves such as CUT, SURF, FLY, STRENGTH, FLASH, ROCK SMASH, etc. remain untouched and stay above the normal actions.

## Usage

1. Open **POKéMON** from the Start menu.
2. Select a non-Egg Pokémon.
3. Choose **RENAME**.
4. Enter the nickname in FireRed's native naming screen.
5. Confirm with **END**.

Entering the Pokémon's species name clears its custom nickname, so a future evolution can display the new species name normally.

## FireRed implementation

- Uses `src.ui.game3.party_menu` and `src.ui.game3.naming`.
- Uses FireRed's native 10-character nickname screen.
- While the naming screen is open, PartyMenu input is explicitly blocked so D-pad/A/B presses cannot leak to the menu underneath.
- The confirm edge is consumed once after closing the naming screen to prevent the same A press from activating PartyMenu in the same frame.
- Never adds RENAME to battle party menus or Egg menus.
- Detects an existing `RENAME` / `NICKNAME` action and does not add a duplicate.
- Does not replace any vanilla field-move callback or party action.
- Compatible with `gen3_modern_ui`: Modern UI reads the same live `PartyMenu.ACTIONS` list, so RENAME is rendered in its normal modern action modal.

## Compatibility

- FireRed only (`games: ["firered"]`).
- Unique Gen 3 manifest id: `pokemonmod_gen3_nickname_changer`.
- No declared conflicts or incompatibilities.
- `gen3_modern_ui` is optional, not required.
- Requires `engine_internals` because FireRed's current PartyMenu does not expose its action list through the public `ui.party.submenu` hook.
