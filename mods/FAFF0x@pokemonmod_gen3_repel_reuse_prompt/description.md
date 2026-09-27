# Repel Reuse Prompt - Gen 3

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
