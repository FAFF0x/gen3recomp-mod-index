# Pokédex Plus - Gen 3 v1.0.21

FireRed-only port of `pokedex_plus_gen2_v1.0.3`.



## v1.0.21 stable-base rebuild

This release is rebuilt directly from the user-confirmed working **v1.0.8** codebase. The later experimental renderer/input rewrites are not used.

- Added a sixth detail tab: **DEX ENTRY**.
- DEX ENTRY reads FireRed/LeafGreen Pokédex data from Game3 `PokedexData.getEntry`: category, formatted height/weight and flavor text.
- When FireRed and LeafGreen descriptions differ, **Up/Down** switches between them.
- Kept the v1.0.8 list navigation, A-to-open-details behavior, Search & Filter Lab, caching and Modern UI bridge unchanged.
- Vanilla FireRed rendering stays on the original 240×160 v1.0.8 path, but graphics-state cleanup is now guaranteed even if a draw fails.
- The native renderer is always kept underneath the Modern UI overlay, so a Modern UI presentation error cannot leave a transparent/blank Pokédex.


## v1.0.8 Search & Filter Lab rebuild

- Replaced the old START naming-screen search + blind SELECT type cycling with a dedicated **SEARCH & FILTER LAB**.
- START or SELECT from the Pokédex list opens the lab; on PC you can also start typing a Pokémon name immediately.
- Search has an integrated controller keyboard plus direct physical-keyboard typing, backspace, clear and done actions.
- Live filters: **NAME**, **TYPE**, **STATUS** (ANY / SEEN / CAUGHT / UNSEEN), and **SORT** (NUMBER / NAME / TYPE).
- Filters combine instantly and the panel always shows a live result count and preview.
- Modern UI shows all TYPE / STATUS / SORT choices visually instead of cycling them blindly.
- RESET restores the full visible Pokédex in one action.
- Native FireRed 240×160 fallback has a matching compact Filter Lab.
- Search/filter rebuilding remains event-driven; there is still no full-Dex scan during normal draw frames.

### Search & Filter controls
- **START / SELECT**: open Filter Lab
- **Up / Down**: choose SEARCH, TYPE, STATUS, SORT, RESET, APPLY
- **Left / Right**: change TYPE / STATUS / SORT
- **A**: edit/search, cycle option, RESET, or APPLY
- Search keyboard: **A** enter key, **B** delete, **SELECT** clear, **START** done
- Physical keyboard: type letters/numbers directly; Backspace/Delete/Enter are supported

## v1.0.7 Trade Evolution Fix integration

- When `pokemonmod_gen3_trade_evolution_fix` is active, Evolution pages show the **actual solo requirement** instead of FireRed's vanilla TRADE / TRADE + ITEM text.
- Examples: `LEVEL 40 -> ALAKAZAM`, `LEVEL 40 + METAL COAT -> STEELIX`, `LEVEL 37 + KING'S ROCK -> SLOWKING`.
- Supports all 12 trade evolutions handled by Trade Evolution Fix, including both Clamperl branches.
- If Trade Evolution Fix is disabled or absent, Pokédex Plus continues to show the vanilla FireRed requirement.
- This is display-only integration; evolution mechanics remain owned by Trade Evolution Fix.

## v1.0.6 Modern UI integration

- Keeps the stable/cached v1.0.5 data model and input owner.
- Detects `gen3_modern_ui` and switches Pokédex Plus to a window-space modern presenter.
- Main list: Seen/Caught sidebar, filter summary, modern Pokémon rows and highlighted selection.
- Detail view: Pokémon identity card plus modern Overview, Stats, Evolution, Level Moves and Habitat panels.
- The custom presenter draws after Modern UI on `render.hud`, while the native 240×160 renderer remains the fallback when Modern UI is absent.
- No native Pokédex state is spoofed or replaced.

## v1.0.5 stability/UI fix

- Replaced the high-resolution custom canvas from v1.0.4 with a native FireRed **240×160** renderer.
- Removed all `love.graphics.getDimensions()` based scaling from the Pokédex+ screen.
- Species rows are cached and rebuilt only on open/search/type-filter changes, instead of scanning up to 386 Pokémon multiple times every frame.
- Fixed the type-filter table (`ANY` is now an explicit `-1` sentinel instead of a leading `nil`).
- The list now follows the native FireRed Pokédex density: 9 visible rows, native type badges, caught marker, native header/footer and controls.
- Full 64×64 front sprite is lazy-loaded only after opening a Pokémon's Overview page.
- Detail pages are compact native-resolution pages: Overview, Stats, Evolution, Level Moves, Habitat.
- Habitat START action still opens FireRed's native AREA screen.

## Controls

### Main list
- Up/Down: one Pokémon
- Left/Right or L/R: page jump
- A: details
- START / SELECT: Search & Filter Lab
- Physical keyboard: begin typing to jump straight into name search
- B: close

### Details
- Left/Right or L/R: change page
- Up/Down on DEX ENTRY: switch FireRed / LeafGreen text when both entries differ
- Up/Down: scroll long Evolution/Move/Habitat lists
- SELECT: cry
- START on Habitat: native AREA map
- B: back

## FireRed only

Manifest target is exactly `games: ["firered"]` and no Gen2 runtime modules are used.
