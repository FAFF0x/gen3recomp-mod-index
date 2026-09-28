# Gen3 Modern UI Enhanced — v1.0.22

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


## v1.0.21 — Global dialogue and choices

The Modern UI now also covers Game3 text that does not live on a normal menu stack.

Modern presentation is applied to:

- NPC dialogue;
- sign / information text;
- ordinary script messages;
- stayed prompts;
- YES / NO questions;
- generic multi-choice script menus.

The native `src.ui.game3.message` and `src.ui.game3.choice` modules still own typing, page advancement, cursor input, callbacks and script results. The mod only replaces their presentation at `render.hud`.

Battle-frame messages are deliberately left to **Modern Battle UI** to avoid drawing two different battle overlays on top of each other.


## v1.0.22 — Pill label fitting

This release fixes type and status badge labels that could wrap or spill outside their rounded pills in compact layouts, especially in the Party screen. Badge widths are now computed from the rendered text and the label font automatically shrinks to stay on a single line when space is tight.


## v1.0.23 — Electric compact badge color

This release fixes the compact Party-screen Electric badge. The shortened label **ELECTR** now maps to the same yellow palette as **ELECTRIC**, instead of falling back to the red accent color.
