# Gen3 Modern UI Enhanced — Emerald Standalone v1.1.2

This build is a **Pokémon Emerald-only** conversion of the former FireRed/LeafGreen Modern UI mod for Pokémon Recomp. It is not a manifest-only retarget: the presentation layer now follows the runtime's Emerald/RSE profile and its dedicated screen implementations.

## Compatibility

- Game: `emerald` only
- Generation: Gen 3
- Runtime API: mod API 2
- Engine range: `>=0.0.0-dev <1.0.0`
- Runtime families used: shared `src.ui.game3.*` plus Emerald-specific `src.ui.game3.rse.*`
- FireRed / LeafGreen: intentionally unsupported by this package

This package uses the dedicated mod id `gen3_modern_ui_emerald`. The FireRed/LeafGreen package keeps `gen3_modern_ui`, so the two editions are separate installations and can coexist without the installer reporting “already installed”.

## Emerald conversion

The port now accounts for the major UI differences between FRLG and Emerald:

- **Start Menu** uses Emerald's live `StartMenu.ENTRIES`, including PokéNav and Battle Frontier-specific entries such as Pyramid Bag, Rest and Retire.
- **Bag** keeps the shared Emerald-aware Bag state but renders item icons from the RSE/Emerald icon atlas.
- **Party / Summary** keep native shared state; Summary reads Emerald's RSE page semantics, including Battle Moves and Contest Moves.
- **Pokédex** is routed to `src.ui.game3.rse.pokedex`. The normal list and search-results list receive the modern presentation.
- **PokéNav** main, Condition and Condition Search menus receive a modern presenter while their dedicated feature screens keep native Emerald rendering.
- **Trainer Card** uses Hoenn identity instead of Kanto identity.
- **Save** understands Emerald's RSE save phases, including `saving_msg` and `save_failed`.
- **Options** reads the RSE option-menu state (`src.ui.game3.rse.option_menu`) and Emerald cart rows.
- **PC** follows Emerald root rows and player-PC behavior (Lanette/Someone, Item Storage, Mailbox, optional Decoration, Turn Off).
- **Dialogue / choices** continue to use the Modern UI overlay while native Message/Choice logic remains authoritative.

## Native fail-open screens

Emerald has several full-screen systems that are structurally different from FRLG. This build deliberately leaves them native when a faithful overlay would risk hiding information or breaking controls:

- PokéNav feature screens such as Region Map, Match Call, condition graphs and ribbon lists;
- Frontier Pass and other dedicated Battle Frontier screens;
- complex Pokédex pages: Info, Search form, Area, Cry, Size and Caught/registration;
- unknown RSE stack layers;
- battle presentation.

This is intentional: the mod changes presentation only where the Emerald runtime state can be represented safely. Native modules keep ownership of input, callbacks, saves, item use and script results.

## Visual changes

The default theme is now Hoenn/Emerald-oriented: deep green and sea-teal surfaces with warm gold accents. Start/Trainer/Save terminology defaults to Hoenn rather than Kanto, and PokéNav receives its own Start Menu icon.

## Test checklist

See `tests/v1.1.2_emerald_runtime.md` for the Emerald-specific regression checklist.


### v1.1.2 shop fix

The Emerald Poké Mart BUY list now tracks the RSE list-menu cursor (`scroll` + `row`) instead of the FRLG/root cursor. Decoration marts stay on the native Emerald UI to preserve their separate decoration inventory behavior.
