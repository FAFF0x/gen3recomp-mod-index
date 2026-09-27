# Random Starter Roster - Gen 3

FireRed/LeafGreen mod for Pokémon Recomp / Gen1Recomp.

At the beginning of a new game, Professor Oak's three starter Poké Balls are replaced by a stable random roster of three different Pokémon. Every candidate is the base stage of a family with at least one complete three-stage evolution path (base → middle → final).

## Behaviour

- The three candidates are generated once per save and persisted in the save's mod data.
- Returning to a Poké Ball does not reroll the roster.
- All three choices are distinct.
- The starter remains level 5, like vanilla FRLG.
- The three physical Poké Ball positions and FRLG's internal starter index remain intact for story compatibility.
- Blue chooses the corresponding counter-slot from the same random roster.
- Blue keeps that random evolution family in later rival/champion battles; the mod substitutes the appropriate base/middle/final stage for the vanilla Bulbasaur/Squirtle/Charmander line.
- Other gifts, wild encounters, trainers, evolutions and Pokémon data are not changed.

## Eligibility

The pool is built from the active FRLG Gen 3 evolution data. A Pokémon is eligible when:

1. it has no pre-evolution;
2. it evolves into at least one middle stage;
3. that middle stage itself evolves into a final stage.

This naturally supports branching three-stage families too.

## Compatibility

- Generation: Gen 3
- Games: FireRed and LeafGreen
- Modern UI: no dependency; this mod does not replace UI rendering.
