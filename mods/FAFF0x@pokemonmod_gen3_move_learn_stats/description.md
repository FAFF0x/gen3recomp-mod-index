# Move Learn Stats - Gen 3 (Pokemon MOD)

FireRed / Gen 3 port of Move Learn Stats.

When a Pokémon already knows four moves and must forget one to learn a new move, this mod adds a live **SELECTED vs LEARNING** comparison panel. It shows move name, type, power, accuracy and maximum PP, and warns when the selected move is an HM.

## FireRed coverage

The mod observes FireRed's native `SummaryMenu` in `select_move` mode, so the same panel works for:

- battle level-up move learning;
- Rare Candy / field level-up learning;
- TM/HM teaching;
- moves learned during evolution;
- every other Gen 3 flow that uses the native `LearnMove` pipeline.

The fifth Summary row is treated as **KEEP CURRENT MOVESET / cancel learning**.

## Compatibility

- Manifest ID: `pokemonmod_gen3_move_learn_stats`
- Game scope: `firered` only
- No hard conflicts or incompatibilities
- Optional coexistence/defer protection for `move_learn_stats_gen3` and `move_learn_stats`
- Compatible with `gen3_modern_ui`: the comparison is rendered after the normal HUD/UI chain and does not replace Modern UI's Summary screen
- Does not patch FireRed's move replacement, HM protection, item consumption, PP or input logic

This Gen3 build contains no Gen2 runtime imports.
