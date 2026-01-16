---
title: Impostazioni
description: Configura le preferenze di Claude Forge
---

# Impostazioni

Claude Forge offre varie impostazioni per personalizzare la tua esperienza. Accedi tramite l'icona ingranaggio in alto a destra.

## Aprire le Impostazioni

1. Clicca l'**icona ingranaggio** in alto a destra dell'app
2. Oppure usa la scorciatoia `Ctrl+,`
3. Il pannello Impostazioni si apre come overlay modale

## Impostazioni Generali

### Percorso Claude CLI

Configura il percorso dell'installazione di Claude Code CLI:

- **Default**: Auto-rilevato dal PATH
- **Personalizzato**: Sfoglia per selezionare l'eseguibile
- Clicca **Sfoglia** per aprire il selettore file

::: tip
Posizioni comuni:
- `C:\Users\<username>\AppData\Local\Claude\claude.exe`
- `C:\Program Files\Claude\claude.exe`
:::

### Larghezza Sidebar

Regola la larghezza predefinita della sidebar:

- **Range**: 200px - 400px
- **Default**: 280px
- Trascina lo slider per regolare

## Aspetto

### Tema

Scegli la tua combinazione colori preferita:

| Opzione | Descrizione |
|---------|-------------|
| **Scuro** | Sfondo scuro (predefinito) |
| **Chiaro** | Sfondo chiaro |
| **Sistema** | Segue la preferenza del SO |

::: info
Attualmente, solo la modalita Scura e completamente implementata. Le modalita Chiaro e Sistema sono pianificate per release future.
:::

## Notifiche

### Notifiche Desktop

Abilita o disabilita le notifiche desktop:

- **ON**: Ricevi notifiche quando task in background completano
- **OFF**: Nessuna notifica (predefinito)

Le notifiche appaiono quando:
- Un task lungo completa
- Si verifica un errore in un task in background
- L'app e minimizzata o non in focus

### Suono Notifiche

Attiva/disattiva i suoni delle notifiche:
- **ON**: Riproduci un suono con le notifiche
- **OFF**: Notifiche silenziose

## Cronologia

### Massimo Cronologia Prompt

Imposta quanti prompt ricordare:

- **Range**: 10 - 100
- **Default**: 50
- I prompt piu vecchi vengono rimossi automaticamente

### Cancella Cronologia

Rimuovi tutta la cronologia prompt salvata:

1. Clicca **Cancella Cronologia Prompt**
2. Conferma l'azione
3. La cronologia di tutti i progetti viene eliminata

::: warning
Questa azione non puo essere annullata.
:::

## Storage Dati

### Posizione Storage

Claude Forge salva i suoi dati in:

```
%APPDATA%\claude-forge\
```

Questo include:
- `settings.json` - Le tue preferenze
- `prompt-history.json` - Cronologia prompt
- `projects.json` - Lista progetti aperti

### Esporta Impostazioni

Per fare backup o trasferire le impostazioni:

1. Naviga alla posizione storage
2. Copia i file di cui vuoi fare backup
3. Ripristina copiandoli indietro

### Ripristina Predefiniti

Per resettare tutte le impostazioni:

1. Chiudi Claude Forge
2. Elimina `%APPDATA%\claude-forge\settings.json`
3. Riavvia l'applicazione
4. Le impostazioni predefinite vengono ripristinate

## Riferimento Impostazioni

| Impostazione | Default | Range/Opzioni |
|--------------|---------|---------------|
| Tema | Scuro | Scuro, Chiaro, Sistema |
| Notifiche | Off | On, Off |
| Max Cronologia | 50 | 10-100 |
| Larghezza Sidebar | 280px | 200-400px |
| Percorso CLI | Auto | Percorso file |

## Scorciatoie da Tastiera

| Scorciatoia | Azione |
|-------------|--------|
| `Ctrl+,` | Apri Impostazioni |
| `Escape` | Chiudi Impostazioni |

## Funzionalita Pianificate

Future release delle impostazioni potrebbero includere:

- **Dimensione font** - Regola la dimensione del testo UI
- **Integrazione editor** - Apri file in editor esterno
- **Personalizzazione shortcut** - Rimappa le scorciatoie
- **Impostazioni plugin** - Configura estensioni
- **Sync** - Sincronizzazione impostazioni cloud

## Risoluzione Problemi

### Le impostazioni non si salvano

**Possibili cause:**
- Problema di permessi disco
- Quota storage superata
- File impostazioni corrotto

**Soluzioni:**
1. Controlla i permessi di scrittura per `%APPDATA%\claude-forge\`
2. Elimina `settings.json` e lascialo rigenerare
3. Esegui Claude Forge come Amministratore

### Impostazioni resettate dopo aggiornamento

**Soluzioni:**
1. Questo puo succedere con aggiornamenti di versione major
2. Riconfigura le tue preferenze
3. Considera di fare backup delle impostazioni prima degli aggiornamenti

### CLI non trovato dopo aggiornamento

**Soluzioni:**
1. Il percorso CLI potrebbe essere cambiato
2. Apri Impostazioni e riseleziona il percorso CLI
3. Verifica che il CLI sia ancora installato
