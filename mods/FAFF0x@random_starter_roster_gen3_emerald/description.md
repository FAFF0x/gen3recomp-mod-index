# Random Starter Roster - Gen 3 Emerald

**Version 1.2.0**  
**Game:** Pokémon Emerald only  
**Generation:** Gen 3

This is the Emerald-specific conversion of Random Starter Roster. It does **not** use FireRed/LeafGreen's Oak's Lab starter scripts.

## What it does

When Professor Birch's bag opens the starter selection screen on **Route 101**, the normal Treecko / Torchic / Mudkip roster is replaced with three random, distinct Pokémon.

Every candidate must be:

- the base stage of an evolution family;
- part of a genuine three-stage evolution chain;
- a valid Gen 1-3 species available to the Emerald engine.

The three choices remain stable while the application is running. If the application is closed and reopened before choosing a starter, a new trio is generated. Once a starter is chosen, that trio is committed for the save/mod state.

## Emerald-native integration

The mod is connected to Emerald's real starter flow:

- Birch's Route 101 `ChooseStarter` sequence;
- Emerald's RSE `starter_choose` screen and its dynamic Pokémon labels/sprites;
- `VAR_STARTER_MON` semantics used by Emerald after the selection;
- level 5 starter gift through the native Emerald `giveStarter` path.

It does **not** patch the FireRed/LeafGreen Oak Poké Ball variables or FR/LG confirmation text.

## Rival consistency

May/Brendan retain the appropriate random counterpart family across Emerald's rival battles. The conversion covers the starter-dependent rival trainer variants used at:

- Route 103;
- the optional Rustboro battle;
- Route 110;
- Route 119;
- Lilycove City.

The replacement follows the same evolutionary stage as Emerald's normal rival starter at that point in the game and recalculates a legal level-up moveset for the substituted species.

## Compatibility

- **Pokémon Emerald only**
- Not compatible with FireRed
- Not compatible with LeafGreen
- Not compatible with Ruby
- Not compatible with Sapphire

The manifest declares only `emerald`, and the runtime logic includes an additional Emerald profile guard before rival-party replacement.

## Notes

The mod keeps its own Emerald-specific mod ID (`random_starter_roster_gen3_emerald`) so it does not overwrite the separate FireRed/LeafGreen build in a mod library.
