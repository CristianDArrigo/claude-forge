---
title: Integrazione Git
description: Gestisci le operazioni git direttamente in Claude Forge
---

# Integrazione Git

Claude Forge include integrazione Git incorporata, permettendoti di gestire il version control senza uscire dall'applicazione.

## Panoramica

Il pannello Git nella sidebar mostra:

- Nome del branch corrente
- Numero di commit ahead/behind rispetto al remote
- File modificati (staged e unstaged)
- Controlli commit e push/pull

## Stato Git

### Informazioni Branch

In cima al pannello Git, vedrai:

- **Icona branch** - Indica lo stato git
- **Nome branch** - Branch attualmente attivo
- **Stato sync** - Mostra `+N` per ahead, `-N` per behind

Esempio:
```
🔀 main  +2 -1
```
Significa che sei su `main`, 2 commit avanti, 1 indietro.

### File Modificati

I file sono raggruppati in due sezioni:

**Modifiche Staged**
- File pronti per il commit
- Mostrati con un segno di spunta
- Clicca per togliere dallo stage

**Modifiche Unstaged**
- File modificati non ancora in stage
- Clicca per fare stage individualmente
- Usa il pulsante `+` per fare stage di tutti

### Indicatori Stato File

| Icona | Significato |
|-------|-------------|
| **M** | Modificato |
| **A** | Aggiunto (nuovo file) |
| **D** | Eliminato |
| **R** | Rinominato |
| **?** | Untracked |

## Staging dei File

### Stage File Individuali

1. Trova il file nella sezione "Modifiche"
2. Clicca la **checkbox** accanto ad esso
3. Il file si sposta in "Staged"

### Stage di Tutti i File

1. Nell'header "Modifiche", clicca il pulsante **+**
2. Tutti i file unstaged vengono messi in stage

### Unstage dei File

1. Trova il file nella sezione "Staged"
2. Clicca la **checkbox** per toglierlo dallo stage
3. Il file torna in "Modifiche"

## Commit

### Scrivi un Messaggio di Commit

1. Clicca l'**input messaggio commit** in basso
2. Scrivi un messaggio descrittivo
3. Segui lo stile conventional commit:
   ```
   feat: aggiungi autenticazione utente
   fix: risolvi bug redirect login
   docs: aggiorna documentazione API
   ```

### Crea il Commit

1. Assicurati di avere modifiche in stage
2. Inserisci il messaggio di commit
3. Clicca **Commit** o premi **Invio**
4. Il commit viene creato localmente

::: tip
Il pulsante Commit e disabilitato se:
- Non ci sono file in stage
- Non e inserito un messaggio di commit
:::

## Push e Pull

### Push delle Modifiche

1. Dopo aver committato, clicca **Push**
2. I tuoi commit vengono inviati al remote
3. Il contatore "ahead" si resetta a 0

### Pull delle Modifiche

1. Clicca **Pull** per scaricare e unire le modifiche remote
2. Il tuo branch locale viene aggiornato
3. Il contatore "behind" si resetta a 0

### Stati dei Pulsanti

| Pulsante | Abilitato Quando |
|----------|------------------|
| Push | Hai commit ahead del remote |
| Pull | Sempre (controlla aggiornamenti) |

## Gestione Errori

Le operazioni git comuni possono fallire per varie ragioni:

### Conflitti di Merge

Se il pull risulta in conflitti:
1. L'errore viene mostrato nel pannello Git
2. Risolvi i conflitti manualmente nel tuo editor
3. Fai stage dei file risolti
4. Committa la risoluzione del merge

### Push Rifiutato

Se il push viene rifiutato:
1. Di solito significa che il remote ha nuovi commit
2. Fai prima pull per unire le modifiche remote
3. Risolvi eventuali conflitti
4. Fai push di nuovo

### Errori di Autenticazione

Se l'autenticazione fallisce:
1. Controlla che le credenziali git siano configurate
2. Assicurati che le chiavi SSH siano impostate (se usi SSH)
3. Prova ad autenticarti prima via terminale

## Toggle Sezione

Come altre sezioni della sidebar, Git puo essere compresso:

1. Clicca il **chevron** accanto a "Git" nell'header
2. Il pannello si comprime solo all'header
3. Le info del branch rimangono visibili
4. Clicca di nuovo per espandere

## Non e un Repository Git

Se apri un progetto che non e un repo git:

- Il pannello Git mostra "Non e un repository git"
- Nessuna operazione git e disponibile
- Inizializza git via terminale: `git init`

## Best Practice

### Committa Spesso

Fai commit piccoli e focalizzati:
- Una modifica logica per commit
- Messaggi chiari e descrittivi
- Piu facile da revisionare e revertare

### Rivedi Prima del Commit

Controlla sempre cosa stai mettendo in stage:
1. Guarda la lista dei file
2. Comprendi ogni modifica
3. Non committare modifiche non intenzionali

### Pull Prima del Push

Riduci i conflitti:
1. Scaricando le ultime modifiche
2. Risolvendo eventuali problemi localmente
3. Poi facendo push dei tuoi commit

## Scorciatoie da Tastiera

| Scorciatoia | Azione |
|-------------|--------|
| `Invio` nell'input commit | Crea commit |

## Limitazioni

- **Solo operazioni base** - Niente rebase, cherry-pick, ecc.
- **Nessuna vista diff** - Usa strumenti esterni per diff dettagliati
- **Nessuna gestione branch** - Cambia branch via terminale
- **Nessuno stash** - Fai stash via terminale

Per operazioni git avanzate, usa:
- Linea di comando
- Funzionalita git del tuo IDE
- Strumenti GUI git dedicati
