# Advanced Box System Gen 3 — Emerald v1.3.1

Emerald-only storage overhaul for Pokemon Recomp. This package intentionally does **not** support FireRed, LeafGreen, Ruby or Sapphire.

## Emerald integration

The mod is tied to the `emerald` Game3 profile and uses Emerald's RSE storage flow. The **Start-menu PC shortcut now opens the native Emerald Pokémon Storage submenu directly**. This avoids the shared FRLG root prompt (`Text_AccessWhichPC`), which is not present in Emerald's ROM-text cache.

Use:

**START -> PC**

Then choose the native storage action:

- **WITHDRAW POKéMON** -> opens Advanced Box in WITHDRAW mode.
- **DEPOSIT POKéMON** -> opens Advanced Box in DEPOSIT mode.
- **MOVE POKéMON** -> opens Advanced Box in MOVE / SWAP mode.
- **MOVE ITEMS** -> stays on Emerald's native storage screen.
- **SEE YA!** -> returns normally.

Physical PCs in Pokémon Emerald keep their native RSE script flow (including SOMEONE'S/LANETTE'S PC and Player PC). The mod only replaces the Pokémon box browser after you choose WITHDRAW / DEPOSIT / MOVE.

## Why this is a real Emerald conversion

This is not only a manifest change. The mod now:

- declares only `emerald` in `manifest.json`;
- has a dedicated mod id so it can coexist with the FireRed/LeafGreen build;
- validates the active Game3 profile at runtime and refuses non-Emerald sessions;
- uses the profile-aware PC screen while routing the **remote Start shortcut** directly to Emerald storage, avoiding the FRLG-only `Text_AccessWhichPC`;
- patches the shared Box Storage entry point only when the active session is Emerald;
- removes the FireRed/LeafGreen L/R HELP-system override, which is not part of Emerald;
- keeps Emerald's native MOVE ITEMS path untouched;
- continues to use `src.core.game3.storage`, so no parallel save or box format is introduced.

## Mode behavior

### WITHDRAW

The cursor starts on the BOX. Press **A** on a stored Pokémon to withdraw it to the first free PARTY slot. If the PARTY is full, use MOVE / SWAP.

### DEPOSIT

The cursor starts on the PARTY. Press **A** on a PARTY Pokémon to deposit it in the first free slot of the current BOX. The native rule preventing deposit of the last PARTY Pokémon is preserved.

### MOVE / SWAP

- **A on a BOX Pokémon** -> choose a PARTY slot -> **A** to swap or withdraw into an empty slot.
- **A on a PARTY Pokémon** -> choose a BOX slot -> **A** to swap or deposit into an empty slot.

## Layout and live details

The Advanced Box screen shows PARTY, current BOX and a live detail panel together. Hovering a Pokémon shows nickname/species, level, gender, shiny marker, types, HP/status, nature, ability, held item, calculated stats, IVs, EVs, moves with PP, total EXP and friendship.

## Controls

- **A** performs the action for the selected mode.
- **SELECT** switches inspection focus between PARTY and BOX.
- **L/R** changes BOX.
- From the first BOX row, **UP** selects the BOX header; then **LEFT/RIGHT** changes BOX.
- **B** cancels a pending MOVE / SWAP or returns to the storage submenu; from the remote Start shortcut, B then returns to the Start Menu.

## Compatibility contract

Target game: **Pokémon Emerald only** (`games: ["emerald"]`).

The package uses the current Game3 Emerald/RSE profile contract: shared `storage.lua`, shared profile-aware `pc_menu.lua`, shared `box_storage_ui.lua`, and the Game3 UI stack. FireRed/LeafGreen HELP behavior is deliberately not touched.
