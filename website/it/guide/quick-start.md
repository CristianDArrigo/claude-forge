---
title: Avvio Rapido
description: Inizia a usare Claude Forge in pochi minuti
---

# Avvio Rapido

Inizia con Claude Forge in pochi minuti. Questa guida ti accompagnera nella tua prima sessione di sviluppo assistito da AI.

## Passo 1: Apri un Progetto

1. Avvia Claude Forge
2. Nella sidebar, vedrai la sezione **Progetti**
3. Clicca **Apri Progetto** o usa la scorciatoia `Ctrl+O`
4. Naviga alla cartella del tuo progetto e selezionala

::: tip
Scegli un progetto con codice esistente. Claude Forge funziona meglio quando puo comprendere il contesto del tuo codebase.
:::

## Passo 2: Scrivi il Tuo Primo Prompt

Con il progetto aperto, vedrai l'area **Input Prompt** in cima al pannello principale.

Prova uno di questi prompt iniziali:

```
Spiega la struttura di questo codebase
```

```
Cosa fa il punto di ingresso principale?
```

```
Trova tutti i commenti TODO in questo progetto
```

Premi **Invio** o clicca il pulsante **Invia** per eseguire.

## Passo 3: Rivedi la Risposta

La risposta di Claude apparira in una **Card di Esecuzione** sotto l'input. Vedrai:

- **Indicatore di stato** - Mostra se il task e in esecuzione o completato
- **Contenuto risposta** - La risposta formattata dell'AI
- **File scritti** - Qualsiasi file creato o modificato
- **Durata** - Quanto tempo ha impiegato il task

## Passo 4: Prova un Task di Codice

Ora facciamo modificare del codice a Claude:

```
Aggiungi validazione input alla funzione login in src/auth.js
```

Dopo l'esecuzione, noterai:

1. La **Timeline dei Commit** mostra le modifiche
2. Ogni card commit elenca i file modificati
3. Clicca un file per vedere cosa e cambiato

::: warning
Rivedi sempre le modifiche al codice generate dall'AI prima di committare su git.
:::

## Passo 5: Usa la Cronologia Prompt

Hai fatto una richiesta simile prima? Usa le **frecce** per navigare la cronologia:

- **Freccia Su** - Vai al prompt precedente
- **Freccia Giu** - Vai al prompt successivo

Questo fa risparmiare tempo quando esegui variazioni di comandi.

## Passo 6: Esplora il File Explorer

Nella sidebar, espandi la sezione **File** per sfogliare il tuo progetto:

- **Clicca** una cartella per espandere/comprimere
- **Clicca** un file per selezionarlo
- Il file selezionato fornisce contesto per i tuoi prompt

## Passo 7: Controlla lo Stato Git

Se il tuo progetto e un repository git, il pannello **Git** mostra:

- Nome del branch corrente
- Modifiche staged e unstaged
- Stato ahead/behind rispetto al remote

Puoi:
- **Fare stage dei file** cliccando la checkbox
- **Scrivere un messaggio di commit** nel campo di input
- **Committare** le modifiche con un click
- **Push/Pull** per sincronizzare con il remote

## Workflow Comuni

### Code Review

```
Rivedi le modifiche in src/components/ e suggerisci miglioramenti
```

### Investigazione Bug

```
Trova potenziali bug nella gestione degli errori
```

### Documentazione

```
Genera commenti JSDoc per tutte le funzioni esportate in src/utils.js
```

### Refactoring

```
Ristruttura la classe UserService per usare dependency injection
```

### Testing

```
Scrivi unit test per la funzione calculateTotal in src/cart.js
```

## Scorciatoie da Tastiera

| Scorciatoia | Azione |
|-------------|--------|
| `Ctrl+O` | Apri progetto |
| `Ctrl+,` | Apri impostazioni |
| `Invio` | Invia prompt |
| `Su/Giu` | Naviga cronologia prompt |
| `Escape` | Annulla task corrente |

## Prossimi Passi

Ora che hai completato le basi, esplora queste funzionalita:

- [Progetti](/it/guide/projects) - Gestisci progetti multipli
- [Agenti](/it/guide/agents) - Crea assistenti AI specializzati
- [Impostazioni](/it/guide/settings) - Personalizza la tua esperienza
