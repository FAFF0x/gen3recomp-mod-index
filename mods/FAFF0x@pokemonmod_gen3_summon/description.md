# Summon - Gen 3

Versione **solo FireRed / Gen 3** di Summon per Pokémon Recomp.

Aggiunge **SUMMON** al menu Start di FireRed. Inserendo un numero del National Pokédex viene avviato un normale incontro selvatico con il Pokémon corrispondente. Il Pokémon non viene regalato direttamente: deve essere catturato normalmente.

## Uso

1. Apri il menu Start.
2. Seleziona **SUMMON**.
3. Inserisci il numero National Pokédex.
4. Controlla nome e livello mostrati.
5. Seleziona **OK** oppure premi START/Invio.
6. Inizia il normale incontro selvatico FireRed.

Il livello del Pokémon evocato corrisponde al livello del primo Pokémon sano della squadra.

## Port FireRed reale

La mod usa `src.core.game3.pokemon` per risolvere National Dex → species ID interno FireRed e `src.world.game3.WorldAPI:startWildBattle()` per avviare l'incontro attraverso il percorso nativo Gen 3. Cattura, EXP, transizione, musica, PP, ritorno dall'incontro e white-out restano quindi gestiti dal runtime FireRed.

## Compatibilità / anti-conflitto

- Manifest ID: `pokemonmod_gen3_summon`
- Screen ID: `pokemonmod_gen3_summon_screen`
- Target: `games: ["firered"]`
- Nessuna dipendenza dalla versione Gen 2.
- Nessun `conflict`/`incompatible` generico.
- Se un'altra mod ha già inserito una voce **SUMMON** nel menu Start, questa mod non ne aggiunge una seconda.
- La riga viene inserita nel vero Start menu FireRed tramite `ui.start_menu.items`, quindi resta compatibile con renderer alternativi come Modern UI che leggono la stessa lista.

## Controlli

- Frecce / D-pad: muovi il cursore
- A: seleziona
- B: annulla
- SELECT: cancella tutto il numero
- START: conferma
- Tastiera 0-9 / tastierino numerico: inserimento diretto
- DEL / Backspace: cancella una cifra
- Invio: conferma
- ESC: annulla


## Novità v1.0.2

- schermata **SUMMON** ridisegnata in stile **Modern UI**;
- niente più finestre FireRed vanilla per il keypad;
- pannello info più leggibile con numero Dex, nome Pokémon e livello evocato;
- pulsanti numerici, DEL, OK e CANCEL con evidenza chiara del cursore;
- compatibilità logica invariata con Start Menu, Modern UI e il runtime FireRed.


## Fix v1.0.3 - Modern UI ad alta risoluzione

La schermata SUMMON non viene più presentata attraverso il solo canvas GBA 240×160.
Il layer nativo resta attivo per input e stato, mentre l'interfaccia visibile viene
ridisegnata in `render.hud` usando `viewport.gameWidth/gameHeight`, come Modern UI.
I font vengono quindi rasterizzati direttamente alla risoluzione finale con filtro
lineare, evitando il testo pixellato della v1.0.2.
