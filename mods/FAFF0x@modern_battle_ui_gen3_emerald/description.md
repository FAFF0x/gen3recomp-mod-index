# Modern Battle UI - Gen 3 / Pokémon Emerald

Version **1.5.0** is an Emerald-only conversion of Modern Battle UI. It is intentionally separate from the FireRed/LeafGreen package because Emerald uses the RSE battle profile and has different battle flows and UI behavior.

## Emerald conversion

This release targets only the `emerald` game id and uses the shared Gen 3 battle state through Emerald's RSE profile. It does not patch FireRed/LeafGreen behavior and it includes a runtime Emerald guard in addition to the manifest restriction.

Emerald-specific presentation handled by this version includes:

- **Professor Birch's first battle** and the normal RSE battle presentation path.
- **Wally's catching tutorial** without replacing its scripted battle logic.
- **Single battles** with modern player/enemy health cards, live HP, EXP, status and Pokédex caught state.
- **Double battles and two-opponent battles** with compact modern cards for battlers 0/1/2/3. The active player battler is marked and the native double-battle state remains authoritative.
- **Double-battle targeting**: effectiveness display follows the currently selected target when Emerald exposes one.
- **Emerald Safari Zone commands**: BALL, POKéBLOCK, GO NEAR and RUN. This replaces the FRLG-only BAIT/ROCK presentation.
- **Battle Frontier / RSE battle variants** continue to use native mechanics and state; the mod only redraws the battle-facing chrome.

## Complete battle presentation

The modern renderer also covers battle states that would otherwise expose vanilla battle chrome:

- battle dialogue and typewriter/wait states;
- YES/NO and battle choices;
- two-page level-up stat growth;
- in-battle move learning / move forgetting;
- HM warning presentation;
- command and move panels;
- move effectiveness badges;
- full SELECT move-information overlay.

The native Emerald runtime still owns damage, targeting rules, AI, PP, EXP, switching, captures, item use, animations, battle scripts, move replacement and callbacks.

## Move information

Every damaging move can show `×4 SUPER`, `×2 SUPER`, `×1 NORMAL`, `×½ RESIST`, `×¼ RESIST`, or `×0 IMMUNE`; status moves show `STATUS`.

Press **SELECT** in the move grid to open the large **MOVE INFO** panel. It shows type, category, power, accuracy, current/max PP, priority, target, matchup and an explanation derived from the live Emerald Gen 3 move definition. While it is open, the D-pad remains available and A/B/START are blocked to prevent accidental battle actions. Press SELECT again to close it.

## Visual style

The Emerald build uses a Hoenn-inspired emerald/sea-green header palette with white surfaces, red accents and yellow selection highlights. Battle scenery, Pokémon sprites and native animations remain visible underneath the presentation layer.

## Recommended in-game checks

For a full integration check, start a new Emerald save and verify the Birch/Zigzagoon battle, the first normal wild and trainer battles, Wally's tutorial, a double battle, the Safari Zone command menu, a level-up, a move-learning event, and a later two-opponent/Battle Frontier battle. Static package tests cover the Emerald-only manifest/runtime contract, singles, doubles, Safari labels, target-aware move matchup, EXP/caught state and the SELECT information overlay.
