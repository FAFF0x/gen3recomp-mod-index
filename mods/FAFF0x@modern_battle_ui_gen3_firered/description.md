# Modern Battle UI - Gen 3 / FireRed + LeafGreen

Version 1.4.0 supports both FireRed and LeafGreen without changing native battle logic.

## Complete battle presentation in 1.4.0

The modern renderer now also owns the battle presentation states that previously fell back to vanilla FRLG chrome:

- **Battle dialogue**: attack results, status text, EXP messages and other battle messages are redrawn in the Modern Battle UI style while the native `Message` system still owns timing and input.
- **Level-up**: the `grew to Lv.` message uses the modern dialogue panel, and the two-page stat-growth window is redrawn as a modern high-resolution card.
- **Opponent switch prompt**: the battle question and its YES/NO choice are redrawn with the modern decision panel.
- **Move learning during battle**: all learn/forget dialogue is modern, and the fullscreen `select_move` summary screen is covered by a dedicated modern move-learning interface using the same native cursor and callbacks.
- The fix is presentation-only: no damage, EXP, switching, move replacement, HM protection or battle sequencing rules are changed.

The mod reads the shared live `src.core.game3.battle` / `src.core.game3.battle.ui` runtime and renders the modern presentation after the native FRLG frame.

## Move information in 1.3.0

- The highlighted move now shows a **short explanation immediately** in the normal move-selection panel. Example: Growl reports that it lowers the foe's Attack by one stage.
- Press **SELECT** while the move grid is open to toggle a large **MOVE INFO** panel.
- The panel shows **Type, Category, Power, Accuracy, current/max PP, Priority, Target, current matchup, secondary-effect chance and a detailed explanation**.
- While MOVE INFO is open, **D-pad remains active** so all four moves can be inspected without closing it. **A, B and START are temporarily blocked** to prevent accidental move use or cancellation. Press SELECT again to close.
- Explanations are generated from the live FRLG move definition/effect metadata, so the feature is not limited to a small hardcoded list of starter moves.

## Existing battle information

- Every damaging move shows its matchup immediately: `×4 SUPER`, `×2 SUPER`, `×1 NORMAL`, `×½ RESIST`, `×¼ RESIST`, or `×0 IMMUNE`.
- Status moves show `STATUS`.
- The active player's card has a live EXP bar.
- The opposing Pokémon card displays CAUGHT / NOT CAUGHT from the live FRLG Pokédex.

## Visual style

The presentation keeps the Modern UI Gen3-inspired Kanto blue, white, Poké Ball red and yellow selection language, with high-resolution window-space typography.

FireRed/LeafGreen remain authoritative for battle input, damage, animations, Bag, Party, captures, experience gains, dialogue timing, choices and move-learning callbacks. Modern Battle UI now redraws those battle-facing dialogue/choice/learning states instead of exposing the vanilla chrome. The MOVE INFO panel remains read-only.
