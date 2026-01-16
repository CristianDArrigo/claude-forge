---
title: Cronologia Prompt
description: Naviga e riutilizza i prompt precedenti in Claude Forge
---

# Cronologia Prompt

Claude Forge ricorda i tuoi prompt precedenti, permettendoti di navigare e riutilizzarli rapidamente.

## Come Funziona

Ogni prompt che invii viene automaticamente salvato nella cronologia. La cronologia e:

- **Per-progetto** - Ogni progetto ha la propria cronologia
- **Persistente** - Salvata tra le sessioni
- **Limitata** - Memorizza i 50 prompt piu recenti

## Navigare nella Cronologia

### Navigazione da Tastiera

Mentre sei nell'input prompt:

| Tasto | Azione |
|-------|--------|
| **Freccia Su** | Prompt precedente |
| **Freccia Giu** | Prompt successivo |
| **Escape** | Torna al prompt corrente/vuoto |

### Come Funziona la Navigazione

1. Inizia a scrivere o lascia l'input vuoto
2. Premi **Freccia Su** per vedere l'ultimo prompt
3. Continua a premere **Su** per andare piu indietro
4. Premi **Giu** per andare avanti nella cronologia
5. Premi **Escape** per tornare a quello che stavi scrivendo

::: tip
Il tuo input corrente e preservato durante la navigazione. Premi Escape per tornare a quello che stavi scrivendo.
:::

## Indicatore Visivo

Quando visualizzi un prompt storico, vedrai:

- Un indicatore sottile che mostra che stai visualizzando la cronologia
- Il testo del prompt popolato nel campo di input
- Premi Invio per eseguire il prompt storico

## Modificare Prompt Storici

Puoi modificare un prompt storico prima di inviarlo:

1. Naviga al prompt desiderato (frecce Su/Giu)
2. Modifica il testo come necessario
3. Premi Invio per inviare la versione modificata

La versione modificata diventa una nuova voce nella cronologia.

## Comportamento della Cronologia

### Nuovo Progetto

Quando apri un nuovo progetto per la prima volta:
- La cronologia parte vuota
- Costruisci la cronologia mentre lavori

### Tornare a un Progetto

Quando riapri un progetto:
- La cronologia precedente viene ripristinata
- I nuovi prompt vengono aggiunti alla cronologia esistente

### Indipendenza dei Progetti

Ogni progetto mantiene cronologia separata:

```
Progetto A:
  - "Correggi il bug di login"
  - "Aggiungi test per auth"

Progetto B:
  - "Aggiorna README"
  - "Ristruttura query database"
```

## Best Practice per la Cronologia

### Prompt Descrittivi

Scrivi prompt che saranno utili da rivisitare:

**Buono:**
```
Aggiungi validazione input al form di registrazione:
- Valida formato email
- Controlla robustezza password
- Mostra messaggi di errore inline
```

**Meno utile:**
```
aggiusta
```

### Pattern Comuni

Mantieni template per prompt usati frequentemente:

```
Rivedi le modifiche in [file] e suggerisci miglioramenti
```

```
Scrivi unit test per [funzione] in [file]
```

```
Spiega cosa fa [file] e documentalo
```

## Storage

La cronologia prompt e salvata localmente in:
```
%APPDATA%\claude-forge\prompt-history.json
```

Il file e gestito automaticamente da Claude Forge.

## Cancellare la Cronologia

Per cancellare la cronologia prompt:

1. Apri **Impostazioni** (icona ingranaggio)
2. Trova la sezione **Cronologia**
3. Clicca **Cancella Cronologia Prompt**
4. Conferma l'azione

::: warning
Questa azione non puo essere annullata. Tutta la cronologia di tutti i progetti sara eliminata.
:::

## Limitazioni

- Massimo 50 prompt per progetto
- Prompt molto lunghi potrebbero essere troncati nello storage
- La cronologia e solo locale (non sincronizzata tra dispositivi)
