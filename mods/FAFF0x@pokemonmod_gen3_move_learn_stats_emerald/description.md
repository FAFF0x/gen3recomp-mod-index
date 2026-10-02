# Move Learn Stats - Gen 3 Emerald (Pokemon MOD)

Emerald-only conversion of `move_learn_stats_gen3_v2.0.2`.

When a Pokémon already knows four moves and must forget one to learn a new move, this mod adds a live **SELECTED vs LEARNING** comparison panel without replacing Emerald's native learn/forget logic.

## Emerald / RSE integration

Pokémon Emerald renders the shared Game3 Summary state through the RSE Summary skin. This build observes the native `SummaryMenu` `select_move` state while leaving Emerald authoritative for cursor movement, HM protection, cancellation, move replacement, PP, messages, fanfares and item consumption.

The overlay follows Emerald's Summary mode:

- **BATTLE MOVES**: name, type, power, accuracy and maximum PP;
- **CONTEST MOVES**: Contest category, Appeal, Jam and Contest description;
- HM moves are marked as non-forgettable, including Emerald's HM08 **DIVE**;
- the fifth row remains the native cancel / keep-current-moveset choice.

The same comparison therefore works for level-up learning, Rare Candy/field level-up, TM/HM teaching, evolution move learning and other flows that use the native Game3 learn-move pipeline.

## Compatibility

- Manifest ID: `pokemonmod_gen3_move_learn_stats_emerald`
- Game scope: **Emerald only**
- Runtime profile guard also refuses activation outside Emerald
- Separate ID from the FireRed/LeafGreen build, so both packages can coexist in a mod collection
- Compatible with Emerald's native `src.ui.game3.rse.summary_menu` skin
- Compatible with `gen3_modern_ui`: the comparison is drawn after the normal HUD/UI chain and does not replace the Summary screen
- Does not patch move replacement, HM protection, item consumption, PP or input logic
- No FireRed/LeafGreen/Kanto UI assumptions are used for activation
