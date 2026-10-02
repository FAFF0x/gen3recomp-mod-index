# Area DexNav Gen 3 — Emerald

Press **SELECT** while freely exploring **Pokémon Emerald** to immediately encounter an **uncaught Pokémon** that belongs to the current map's real Emerald encounter table.

This package is an Emerald-only conversion of the FireRed/LeafGreen mod. It targets the RSE runtime and is intentionally kept separate from the Kanto build.

## Emerald behaviour

- Uses Emerald map encounter records from `mod.content.encounters` (for example `EM_ROUTE101`).
- Land uses Emerald's native 12-slot weights: `20,20,10,10,10,10,5,5,4,4,1,1`.
- Surf and **underwater** maps use Emerald's native 5-slot water weights: `60,30,5,4,1`.
- Species already caught in the Emerald Pokédex are removed from the candidate set.
- Duplicate slots remain separate, so the original slot probabilities are preserved before the remaining uncaught slots are renormalized.
- Encounter level is rolled from the real slot's `minLevel..maxLevel` range.
- The DexNav intentionally bypasses normal step encounter-rate and Repel checks; its purpose is to trigger a target encounter on demand.

## Emerald-specific safeguards

Area DexNav does **not** force a normal wild battle when Emerald is using a special encounter controller. In particular it is blocked during Safari mode, the Battle Pyramid/Pike special wild rooms, and the Sootopolis story state that disables normal water encounters.

The candidate list intentionally remains the normal LAND/WATER table. Emerald-only systems such as outbreaks/swarms, roaming Pokémon, Feebas fishing spots, fishing and Rock Smash are not mixed into Area DexNav.

## SELECT

Emerald also uses SELECT for the registered item. When Area DexNav successfully starts a message or battle in the free overworld, the field becomes busy in that fixed update so the registered-item action does not also execute.

## Compatibility

- **Generation:** 3
- **Game:** Pokémon Emerald only
- **Mod id:** `area_dexnav_gen3_emerald`
- **Version:** `1.1.0`

The dedicated id allows this package to coexist in a mod library with the FireRed/LeafGreen build `area_dexnav_gen3`. The mod does not replace battle UI or menu screens and keeps `gen3_modern_ui` as an optional dependency.
