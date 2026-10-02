# Performance Monitor - Gen 3 (Emerald) v1.1.0

Emerald-only performance monitor for Pokémon Recomp Gen 3.

## Compatibility

- Loads only for `emerald`.
- Uses the dedicated mod id `pokemonmod_gen3_performance_monitor_emerald`, so it can coexist with the FireRed/LeafGreen build.
- Uses Emerald's Game3/RSE profile while reading the shared `src.ui.game3.stack`, `src.core.game3.runtime` session and `src.core.game3.map` state.
- Runtime activation is guarded by `GameVersion`: if the package is forced onto FireRed/LeafGreen it does not register profiling hooks.
- Diagnostic environment snapshots record the active Emerald game plus the RSE profile/layout.
- Uses its own `mod.storage` namespace, so Emerald reports do not overwrite reports created by the FR/LG or Gen 2 monitor builds.
- Runtime profiler markers remain Gen 3-namespaced and do not unwrap/replace wrappers installed by a different performance-monitor mod.
- No manifest conflict/incompatible entry is declared.

## Controls

- **F3** — show / hide overlay
- **F4** — compact / detailed view
- **F6** — reset rolling samples
- **F8** — start/stop the 10-second diagnostic capture
- **F9** — re-export the last completed diagnostic report

## Diagnostic reports

Reports are written through the public `mod.storage` API in this mod's own Emerald storage namespace. Main export keys:

- `exports/performance_report_latest_json`
- `exports/performance_report_latest_txt`

The exported `.bin` JSON payload is plain UTF-8 JSON and can be shared for analysis. The report format identifier remains `pokemon-recomp-gen3-performance-report`, while the environment section identifies `game = emerald`, `profileFamily = rse`, and `layout = rse`.

## What it measures

The overlay/report combines FPS and frame-time statistics, renderer counters, Lua/texture memory, logic-step rate, exclusive mod hook/event timing, slow-frame correlation, provenance-owned callbacks and (when the host exposes the Lua debug API) deep Lua sampling. Slow frames without enough evidence remain explicitly `UNATTRIBUTED`.

## Emerald / RSE behavior

The monitor does not replace Emerald menus or battle screens. Because the RSE UI still passes through the shared Game3 HUD/render hooks, the profiler observes Emerald field, battle, PokeNav, Battle Frontier and other RSE screens without patching their gameplay logic. Active-screen and map names are read from the live Emerald Stack/Map state.

## Modern UI

The overlay uses the shared `render.hud` hook in window space and therefore remains compatible with `gen3_modern_ui`.
