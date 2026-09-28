# Reusable Machines - Gen 3 v2.1.0

Port nativo FireRed/LeafGreen Game3 di **Reusable Machines**.

## Funzioni

- **TM01-TM50 riutilizzabili**: una TM non viene rimossa dal TM CASE dopo un insegnamento riuscito.
- **HM sostituibili nel normale apprendimento mosse**: se un Pokémon conosce già quattro mosse, una HM può essere scelta come mossa da dimenticare durante il flusso standard di apprendimento.
- Le HM restano naturalmente riutilizzabili come nel comportamento FRLG.
- **Vendita e rimozione manuale delle TM restano native**: la mod sopprime solo la rimozione causata dall'insegnamento riuscito.
- Non sostituisce TM CASE, Party Menu, Summary o Learn Move UI: resta quindi compatibile con presenter come **Modern UI Gen3**.

## FireRed + LeafGreen

Manifest: `games: ["firered", "leafgreen"]`. Non contiene moduli Gen2.

ID: `reusable_machines_gen3`, separato da `reusable_machines_gen2`.

## Compatibilità

La patch usa sentinelle sui moduli Game3 reali per evitare doppi wrapper in presenza di copie/equivalenti. È compatibile con `hm_anywhere_gen3` perché non modifica le field move; modifica solo consumo TM e sostituzione mosse nel flusso LearnMove.


## v2.0.2 compatibility preview
When a TM/HM is used and the Party target screen opens, each Pokémon is labelled **CAN LEARN**, **LEARNED**, **NOT ABLE**, or **EGG** before you press A. The selected machine and move name are shown in the header. The overlay is designed to sit on top of Modern UI Gen3 without replacing PartyMenu input or state.


## v2.1.0 — Extended TM/HM compatibility

The native FRLG `Pokemon.canLearnTmItem()` lookup only has ROM TM/HM bitfields for
the original species roster. That makes later-generation Pokémon appear unable
to learn every machine even when the move is valid for that species.

v2.1.0 keeps the exact FRLG compatibility for National Dex #001-#386 and adds a
separate compatibility table for later National Dex species through #1025.

The extended table covers the native 58 FireRed/LeafGreen machines:

- TM01-TM50
- HM01-HM08

This is a real teaching fix, not only a UI badge fix: the patch is applied to
`Pokemon.canLearnTmIndex`, so `ItemUse.checkTmPreflight()` and the Party preview
use the same result.

Example: Buzzwole (#794) is compatible with TM31 Brick Break and can now pass the
TM preflight instead of being rejected as `NOT ABLE`.
