# Repel Reuse Prompt - Gen 3 v1.1.0

FireRed/LeafGreen Gen 3 port of `repel_reuse_prompt_gen2` for Pokemon Recomp.

When the active Repel reaches 0 steps, FireRed or LeafGreen first shows its normal
`Repel's effect wore off...` message. The mod then asks:

`Use another REPEL?`

If YES is selected, the mod prefers the same Repel type used most recently.
If that type is no longer in the Bag, fallback priority is:

1. MAX REPEL
2. SUPER REPEL
3. REPEL

The replacement is activated through FRLG's native `ItemUse.useField`, so
item consumption and the Repel step counter remain owned by the Gen 3 runtime.

## Compatibility

- FireRed + LeafGreen / Gen 3 (`games: ["firered", "leafgreen"]`).
- No Gen 2 runtime modules are used.
- No generic conflicts or incompatibilities are declared.
- Uses a Gen 3-specific mod id so it does not collide with the Gen 2 version.
- The native `repel_wore_off` event is decorated rather than replaced, keeping
  the original FRLG wear-off behavior and reducing interference with other
  step-event mods.


## v1.1.0 — Repel encounter mode

A new auto-rendered mod option is available in the mod settings menu:

**REPEL: UNCAUGHT ONLY**

- **ON (default):** while a Repel is active, the normal lead-Pokémon level restriction is replaced by a Pokédex filter. Pokémon already caught cannot start a random encounter; uncaught Pokémon can appear regardless of whether their level is below, equal to, or above the lead Pokémon.
- **OFF:** while a Repel is active, all random walking encounters are blocked. A same-level or higher-level Pokémon is also blocked.
- With no active Repel, encounters remain completely native.

The setting is read live on every encounter roll, so changing it does not require starting a new save. The Repel step counter, item consumption and the existing "Use another REPEL?" prompt remain native/shared Game3 behavior.


## v1.1.1 — REPEL MODE in the Start menu

The setting is now directly accessible in-game.

Open the normal **Start Menu** and choose **REPEL MODE**. You can select:

- **UNCAUGHT ONLY** — while Repel is active, only species that are not yet caught may start a random encounter. The vanilla lead-level Repel rule is ignored.
- **BLOCK ALL** — while Repel is active, every random wild encounter is suppressed, including Pokémon at the same or higher level than the lead.

The choice is saved in the mod's save namespace and takes effect immediately.

The existing Mod Manager option is retained as the initial/default value for saves that have never changed REPEL MODE from the Start menu.


## v1.1.2 — Start → Options → Extras

`REPEL MODE` is no longer added as a separate Start-menu command.

Open:

**Start → Options → Extras → REPEL MODE**

The row shows the currently selected behavior and can be changed with
LEFT/RIGHT or A:

- **UNCAUGHT** — active Repels allow random encounters only with species that
  are not yet caught. The normal lead-level Repel restriction is ignored.
- **BLOCK ALL** — active Repels suppress every random wild encounter.

The setting is stored by the mod and takes effect immediately. The existing
Mod Manager toggle remains only as the initial/default fallback when no
in-game REPEL MODE choice has been saved yet.


## v1.1.3 — EXTRAS integration rebuilt from EXP Share Modes

The previous EXTRAS integration has been replaced with the exact option-row
installation pattern used by the working **EXP Share Modes Gen 3** mod.

Open:

**START → OPTION → EXTRAS**

There must now be a row named **REPEL MODE**.

Its values are:

- **UNCAUGHT** — active Repels filter already-caught species and allow only
  uncaught species to encounter, regardless of lead level.
- **BLOCK ALL** — active Repels prevent every random wild encounter.

LEFT / RIGHT or A toggles the value. The selected value is stored in the mod
save namespace.

Implementation details:
- `src.ui.game3.option_rows` is required lazily with `pcall`;
- the row uses the unique id `pokemonmod_repel_mode`;
- that id is appended to `group.extras`;
- the current `Rows.build` is wrapped through `previousBuild`, preserving
  Modern UI and other option mods in the same chain.
