# Performance Monitor - Gen 3 v1.0.1

FireRed-only performance monitor for Pokémon Recomp Gen 3.

## Compatibility

- Loads only for `firered`.
- Uses the unique mod id `pokemonmod_gen3_performance_monitor`.
- Uses FireRed's real `src.ui.game3.stack`, `src.core.game3.runtime` session and `src.core.game3.map` data for active-screen/map reporting.
- Uses its own `mod.storage` namespace, so reports do not overwrite the Gen 2 build or another differently-ID'd monitor.
- Runtime profiler markers are Gen 3-namespaced and do not unwrap/replace wrappers installed by a different performance-monitor mod.
- No manifest conflict/incompatible entry is declared.

## Controls

- **F3** — show / hide overlay
- **F4** — compact / detailed view
- **F6** — reset rolling samples
- **F8** — start/stop the 10-second diagnostic capture
- **F9** — re-export the last completed diagnostic report

## Diagnostic reports

Reports are written through the public `mod.storage` API in this mod's own FireRed storage namespace. Main export keys:

- `exports/performance_report_latest_json`
- `exports/performance_report_latest_txt`

The exported `.bin` JSON payload is plain UTF-8 JSON and can be shared for analysis. The report format identifier is `pokemon-recomp-gen3-performance-report`.

## What it measures

The overlay/report combines FPS and frame-time statistics, renderer counters, Lua/texture memory, logic-step rate, exclusive mod hook/event timing, slow-frame correlation, provenance-owned callbacks and (when the host exposes the Lua debug API) deep Lua sampling. Slow frames without enough evidence remain explicitly `UNATTRIBUTED`.

## Modern UI

The overlay uses the shared `render.hud` hook in window space. It does not replace FireRed menus and is compatible with `gen3_modern_ui`.
