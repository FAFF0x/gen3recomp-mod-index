# Summon - Gen 3 (Emerald)

Versione **solo Pokémon Emerald / Gen 3** di Summon per Pokémon Recomp.

Aggiunge **SUMMON** al normale menu Start di Emerald. Inserendo un numero del National Pokédex viene avviato un normale incontro selvatico con il Pokémon corrispondente. Il Pokémon non viene regalato direttamente: va catturato normalmente.

## Uso

1. Apri il normale menu Start di Emerald.
2. Seleziona **SUMMON**.
3. Inserisci il numero del National Pokédex (1-386).
4. Controlla nome e livello mostrati.
5. Seleziona **OK** oppure premi START/Invio.
6. Parte un normale incontro selvatico Emerald.

Il livello del Pokémon evocato corrisponde al livello del primo Pokémon sano e non-Uovo della squadra.

## Conversione Emerald reale

Questa build non è la versione FireRed/LeafGreen con il manifest rinominato.

- target esclusivo `games: ["emerald"]`;
- runtime guard sul profilo `emerald` / family `rse`;
- voce SUMMON solo nel **menu Start normale** di Emerald;
- nessuna iniezione nei menu speciali Safari, Battle Pyramid, Link/Union o altri contesti RSE;
- National Dex -> species risolto dal dataset Gen 3 attivo di Emerald;
- incontro avviato tramite il Game3 `WorldAPI:startWildBattle`, che inoltra al `battle_bridge` profile-aware;
- transizione, musica, mappa/terreno, side effect RSE (TV/rematch) e ritorno al field vengono quindi gestiti dal runtime Emerald;
- interfaccia ad alta risoluzione ridisegnata con palette Emerald/teal;
- compatibilità opzionale con `gen3_modern_ui` mantenuta.

## Compatibilità / anti-conflitto

- Manifest ID: `pokemonmod_gen3_summon_emerald`
- Screen ID: `pokemonmod_gen3_summon_emerald_screen`
- Target: `emerald` soltanto
- La vecchia build FR/LG può restare installata perché questa usa un ID distinto.
- Se un'altra mod ha già inserito una voce `SUMMON`, non viene creata una seconda voce.

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
