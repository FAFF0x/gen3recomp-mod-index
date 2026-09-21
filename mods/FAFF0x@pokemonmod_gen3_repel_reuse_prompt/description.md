# Repel Reuse Prompt - Gen 3

FireRed / Gen 3 port of `repel_reuse_prompt_gen2` for Pokemon Recomp.

When the active Repel reaches 0 steps, FireRed first shows its normal
`Repel's effect wore off...` message. The mod then asks:

`Use another REPEL?`

If YES is selected, the mod prefers the same Repel type used most recently.
If that type is no longer in the Bag, fallback priority is:

1. MAX REPEL
2. SUPER REPEL
3. REPEL

The replacement is activated through FireRed's native `ItemUse.useField`, so
item consumption and the Repel step counter remain owned by the Gen 3 runtime.

## Compatibility

- FireRed / Gen 3 only (`games: ["firered"]`).
- No Gen 2 runtime modules are used.
- No generic conflicts or incompatibilities are declared.
- Uses a Gen 3-specific mod id so it does not collide with the Gen 2 version.
- The native `repel_wore_off` event is decorated rather than replaced, keeping
  the original FireRed wear-off behavior and reducing interference with other
  step-event mods.
