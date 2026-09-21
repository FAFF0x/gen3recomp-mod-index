# Reusable Machines - Gen 3 v2.0.1

Port nativo FireRed/Game3 di **Reusable Machines**.

## Funzioni

- **TM01-TM50 riutilizzabili**: una TM non viene rimossa dal TM CASE dopo un insegnamento riuscito.
- **HM sostituibili nel normale apprendimento mosse**: se un Pokémon conosce già quattro mosse, una HM può essere scelta come mossa da dimenticare durante il flusso standard di apprendimento.
- Le HM restano naturalmente riutilizzabili come nel comportamento FireRed.
- **Vendita e rimozione manuale delle TM restano native**: la mod sopprime solo la rimozione causata dall'insegnamento riuscito.
- Non sostituisce TM CASE, Party Menu, Summary o Learn Move UI: resta quindi compatibile con presenter come **Modern UI Gen3**.

## FireRed only

Manifest: `games: ["firered"]`. Non contiene moduli Gen2.

ID: `reusable_machines_gen3`, separato da `reusable_machines_gen2`.

## Compatibilità

La patch usa sentinelle sui moduli Game3 reali per evitare doppi wrapper in presenza di copie/equivalenti. È compatibile con `hm_anywhere_gen3` perché non modifica le field move; modifica solo consumo TM e sostituzione mosse nel flusso LearnMove.


## v2.0.2 compatibility preview
When a TM/HM is used and the Party target screen opens, each Pokémon is labelled **CAN LEARN**, **LEARNED**, **NOT ABLE**, or **EGG** before you press A. The selected machine and move name are shown in the header. The overlay is designed to sit on top of Modern UI Gen3 without replacing PartyMenu input or state.
