# Advanced Box System Gen 3 v1.2.0

FireRed-only storage overhaul for Pokemon Recomp.

## PC-first workflow

The Start-menu shortcut now opens FireRed's real PC instead of jumping straight into one generic box action.

Use:

**START -> PC -> SOMEONE'S/BILL'S PC**

Then choose the native FireRed storage action:

- **WITHDRAW POKéMON** -> opens Advanced Box in WITHDRAW mode.
- **DEPOSIT POKéMON** -> opens Advanced Box in DEPOSIT mode.
- **MOVE POKéMON** -> opens Advanced Box in MOVE / SWAP mode.
- **MOVE ITEMS** -> keeps FireRed's native item-transfer screen.
- **SEE YA!** -> returns normally.

The same integration is used when the player accesses a physical PC in FireRed.

## Mode behavior

### WITHDRAW

The cursor starts on the BOX. Press **A** on a stored Pokémon and it is withdrawn directly to the first free PARTY slot. If the PARTY is full, the screen tells you to use MOVE / SWAP instead.

### DEPOSIT

The cursor starts on the PARTY. Press **A** on a PARTY Pokémon and it is deposited directly into the first free slot of the current BOX. FireRed's native rule preventing deposit of the last PARTY Pokémon is preserved. Change BOX first if the current one is full.

### MOVE / SWAP

This keeps the two-step advanced workflow:

- **A on a BOX Pokémon** -> choose a PARTY slot -> **A** to swap or withdraw into an empty slot.
- **A on a PARTY Pokémon** -> choose a BOX slot -> **A** to swap or deposit into an empty slot.

## Layout and live details

The Advanced Box screen always shows PARTY, the current BOX, and a live detail panel together. Hovering a Pokémon shows nickname/species, level, gender, shiny marker, types, HP/status, nature, ability, held item, calculated stats, IVs, EVs, four moves with PP, total EXP and friendship.

## Controls

- **A** performs the action for the selected PC mode.
- **SELECT** switches inspection focus between PARTY and BOX.
- **L/R** changes BOX; on the default keyboard controls these are **Q/E**.
- Alternatively, from the first BOX row press **UP** to select the BOX header, then **LEFT/RIGHT** to change BOX. **DOWN/A** returns to the grid.
- **B** cancels a pending MOVE / SWAP, or returns to the PC menu.

## HELP compatibility

FireRed normally reserves L/R for the HELP system and processes HELP before menu input. While Advanced Box is open, HELP is temporarily suspended and restored as soon as Advanced Box closes. This lets L/R page BOX 1..14 without breaking HELP elsewhere.

## Storage safety

The mod does not create a parallel save format. Deposit, withdraw and swap operations use `src.core.game3.storage`, while the PC menu and MOVE ITEMS remain native FireRed systems. The mod targets only `firered`, keeps the unique id `advanced_box_system_gen3`, and declares no broad mod conflicts.
