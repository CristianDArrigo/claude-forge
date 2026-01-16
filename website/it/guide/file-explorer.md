---
title: Esplora File
description: Sfoglia i file del progetto con l'esplora file integrato
---

# Esplora File

L'Esplora File in Claude Forge ti permette di sfogliare i file del tuo progetto direttamente nella sidebar, fornendo accesso rapido e contesto per i tuoi prompt AI.

## Panoramica

L'Esplora File mostra il tuo progetto come albero comprimibile:

```
src/
├── components/
│   ├── Button.tsx
│   └── Modal.tsx
├── utils/
│   └── helpers.ts
└── App.tsx
```

## Uso Base

### Espandere Cartelle

- **Clicca** su una cartella per espandere/comprimere
- **Clicca** l'icona chevron per lo stesso effetto
- Le cartelle espanse mostrano i loro contenuti

### Selezionare File

- **Clicca** su un file per selezionarlo
- Il file selezionato e evidenziato
- La selezione fornisce contesto per i tuoi prompt

### Comprimi Tutto

- Clicca l'**icona comprimi** nell'header per comprimere tutte le cartelle
- Utile per resettare la vista in progetti grandi

## Toggle Sezione

L'Esplora File puo essere compresso per risparmiare spazio:

1. Clicca il **chevron** accanto a "File" nell'header
2. L'intero explorer si comprime solo all'header
3. Clicca di nuovo per espandere

## Icone File

I file sono mostrati con icone basate sul tipo:

| Estensione | Mostrato Come |
|------------|---------------|
| `.js`, `.ts` | JavaScript/TypeScript |
| `.jsx`, `.tsx` | Componenti React |
| `.css`, `.scss` | Fogli di stile |
| `.json` | Configurazione |
| `.md` | Markdown |
| Altri | File generico |

Le cartelle hanno un'icona distintiva che cambia quando espanse.

## Filtri

L'Esplora File esclude automaticamente certi file e cartelle:

### Esclusi di Default

- `node_modules/`
- `.git/`
- `dist/`, `build/`
- `.cache/`
- Varie cartelle IDE (`.idea/`, `.vscode/`)

### Rispetta .gitignore

Se il tuo progetto ha un file `.gitignore`, quei pattern sono anche esclusi dall'explorer.

## Contesto File

Quando selezioni un file:

1. Il percorso del file e mostrato come selezionato
2. I tuoi prompt possono riferirsi a "il file selezionato"
3. Claude capisce con quale file stai lavorando

Esempio di workflow:

1. Naviga a `src/components/Button.tsx`
2. Clicca per selezionarlo
3. Scrivi: "Aggiungi prop types a questo componente"
4. Claude sa di modificare `Button.tsx`

## Prestazioni

Per progetti grandi, l'Esplora File usa ottimizzazioni:

- **Lazy loading** - I contenuti delle cartelle si caricano all'espansione
- **Virtual scrolling** - Solo gli elementi visibili sono renderizzati
- **Caching** - Le directory precedentemente caricate sono in cache

## Aggiornamento

Se i file cambiano fuori da Claude Forge:

- L'explorer si aggiorna automaticamente al cambio progetto
- Chiudi e riapri il progetto per forzare un refresh
- L'albero si ricostruisce quando il percorso del progetto cambia

## Limitazioni

- **Nidificazione profonda** - Strutture di cartelle molto profonde potrebbero essere difficili da navigare
- **Directory grandi** - Cartelle con migliaia di file potrebbero essere lente
- **File binari** - Mostrati ma non selezionabili per il contesto AI

## Best Practice

### Mantieni i Progetti Focalizzati

Apri sottocartelle specifiche invece di interi monorepo:

```
# Invece di aprire la root:
/my-monorepo/

# Apri package specifici:
/my-monorepo/packages/frontend/
/my-monorepo/packages/backend/
```

### Usa .gitignore

Assicurati che il tuo `.gitignore` escluda:

```
node_modules/
dist/
build/
.cache/
*.log
```

Questo mantiene l'explorer pulito e veloce.

### Naviga con i Prompt

Puoi anche chiedere a Claude di trovare file:

```
Trova tutti i file che contengono commenti "TODO"
```

```
Elenca tutti i componenti React in questo progetto
```
