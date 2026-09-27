# Gen3 Modern UI Enhanced — v1.0.19

FireRed/LeafGreen Modern UI built on the real shared `src.ui.game3.*` runtime.

## v1.0.19 polish + Pokémon identity

- Keeps the stable Game3 hooks, readable typography and Pokémon color palette across FireRed and LeafGreen.
- Adds vector-style icons to every standard Start Menu entry, including third-party rows through a safe generic fallback.
- Reworks the Party cards with Pokémon type accent colors, type pills, status badges and three-stage HP colors.
- Upgrades the Bag with visible pocket tabs, a larger item focus panel, clearer quantity badge and icon-led action menu.
- Adds subtle 120 ms screen fade-in and a restrained animated selection highlight; animations can be disabled in mod options.
- Redesigns Trainer Card as a more recognizable Kanto/Pokémon card with Poké Ball motif, trainer identity panel and eight visible badge slots.
- Leaves native FRLG modules in control of input, saves, item use, menu callbacks and unsupported sub-screens.

The mod supports FireRed and LeafGreen while keeping the isolated `gen3_modern_ui` identity.


## Compatibility

- Games: `firered`, `leafgreen`
- Runtime: shared `src.ui.game3.*` / `src.core.game3.*`
