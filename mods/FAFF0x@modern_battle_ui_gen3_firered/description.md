# Modern Battle UI - Gen 3 / FireRed

Version 1.3.0 extends the working FireRed battle overlay without changing native battle logic.

The mod reads the live `src.core.game3.battle` / `src.core.game3.battle.ui` runtime and renders the modern presentation after the native FireRed frame.

## Move information in 1.3.0

- The highlighted move now shows a **short explanation immediately** in the normal move-selection panel. Example: Growl reports that it lowers the foe's Attack by one stage.
- Press **SELECT** while the move grid is open to toggle a large **MOVE INFO** panel.
- The panel shows **Type, Category, Power, Accuracy, current/max PP, Priority, Target, current matchup, secondary-effect chance and a detailed explanation**.
- While MOVE INFO is open, **D-pad remains active** so all four moves can be inspected without closing it. **A, B and START are temporarily blocked** to prevent accidental move use or cancellation. Press SELECT again to close.
- Explanations are generated from the live FireRed move definition/effect metadata, so the feature is not limited to a small hardcoded list of starter moves.

## Existing battle information

- Every damaging move shows its matchup immediately: `×4 SUPER`, `×2 SUPER`, `×1 NORMAL`, `×½ RESIST`, `×¼ RESIST`, or `×0 IMMUNE`.
- Status moves show `STATUS`.
- The active player's card has a live EXP bar.
- The opposing Pokémon card displays CAUGHT / NOT CAUGHT from the live FireRed Pokédex.

## Visual style

The presentation keeps the Modern UI Gen3-inspired Kanto blue, white, Poké Ball red and yellow selection language, with high-resolution window-space typography.

FireRed remains authoritative for battle input, damage, animations, Bag, Party, dialogue, captures and experience gains. The MOVE INFO panel is read-only.
