# Reusable Machines - Gen 3 Emerald v2.2.0

Conversione **esclusiva Pokémon Emerald / Gen 3** della mod Reusable Machines. Questa build non è un semplice cambio di manifest: le patch runtime sono protette dal profilo `emerald` / famiglia `rse` e la compatibilità con l'interfaccia moderna usa l'ID Emerald dedicato.

## Funzioni

- **TM01-TM50 riutilizzabili**: dopo un insegnamento riuscito la TM resta nella tasca TM/HM di Emerald.
- **HM sostituibili nel normale flusso di apprendimento**: durante Learn Move è possibile scegliere una mossa HM da dimenticare. Fuori da quel flusso la normale protezione HM resta attiva.
- **TM/HM native Emerald**: per le specie Gen 1-3 la compatibilità viene letta dai dati TM/HM estratti dalla ROM Emerald attiva.
- **Compatibilità estesa Gen 4+**: per specie oltre il National Dex #386 viene usata la tabella estesa a 58 macchine (TM01-TM50 + HM01-HM08), fino al National Dex #1025.
- **Vendita e rimozione manuale restano native**: la mod sopprime solo la rimozione della TM dovuta a un insegnamento riuscito.
- Non sostituisce Bag, Party Menu, Summary o Learn Move: il rendering e l'input RSE restano del motore Emerald.

## Compatibilità Emerald

Manifest: `games: ["emerald"]`.

ID: `reusable_machines_gen3_emerald`. È diverso dall'ID FR/LG `reusable_machines_gen3`, quindi le due build possono essere installate contemporaneamente senza risultare la stessa mod.

La dipendenza opzionale per l'interfaccia moderna è `gen3_modern_ui_emerald`. Se Modern UI Emerald è presente, il badge di compatibilità TM/HM viene disegnato sopra il suo presenter senza sostituire lo stato o l'input del Party Menu.

La mod non richiede HM Anywhere e non modifica il comportamento delle field move: cambia soltanto consumo TM, compatibilità delle macchine e protezione HM nel flusso Learn Move.

## Note tecniche

Le patch su `Bag.remove`, `ItemUse.useTm`, `Pokemon.canLearnTmIndex`, `Pokemon.isHmMove` e `LearnMove.begin` sono protette da un controllo runtime del profilo Emerald. Questo evita che la build Emerald alteri un'altra versione Game3 in caso di riuso dello stesso processo/runtime.
