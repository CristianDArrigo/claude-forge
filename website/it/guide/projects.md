---
title: Progetti
description: Gestione dei progetti in Claude Forge
---

# Progetti

Claude Forge ti permette di lavorare con piu progetti contemporaneamente, ognuno con il proprio contesto e cronologia.

## Aprire un Progetto

### Usando la Sidebar

1. Nella sezione **Progetti** della sidebar, clicca **Apri Progetto**
2. Naviga alla cartella del tuo progetto
3. Clicca **Seleziona Cartella**

### Usando la Scorciatoia

Premi `Ctrl+O` per aprire direttamente il selettore cartelle.

### Drag and Drop

Trascina una cartella da Esplora Risorse sulla finestra di Claude Forge per aprirla.

## Passare tra Progetti

Quando hai piu progetti aperti, appaiono come lista nella sezione **Progetti** della sidebar.

- **Clicca** sul nome di un progetto per passare ad esso
- Il progetto attivo e evidenziato
- Ogni progetto mantiene i propri:
  - Cronologia conversazioni
  - Stato file explorer
  - Stato git

## Informazioni Progetto

Sotto la lista progetti, vedrai informazioni sul progetto selezionato:

- **Percorso completo** alla cartella del progetto
- **Numero di conversazioni** (se presenti)

## Chiudere un Progetto

Per chiudere un progetto:

1. Passa il mouse sul nome del progetto nella sidebar
2. Clicca il pulsante **X** che appare
3. Il progetto viene rimosso dalla lista

::: info
Chiudere un progetto non elimina file o cronologia conversazioni. Puoi riaprirlo in qualsiasi momento.
:::

## Contesto del Progetto

Quando invii un prompt, Claude Forge fornisce il seguente contesto all'AI:

1. **Cartella progetto** - Il percorso root del tuo progetto
2. **File selezionato** - Se hai selezionato un file nell'explorer
3. **Stato git** - Branch corrente e file modificati
4. **Contesto precedente** - Cronologia conversazione recente

Questo contesto aiuta Claude a capire il tuo codebase e fornire risposte pertinenti.

## Best Practice

### Organizza per Funzionalita

Quando lavori su un codebase grande, considera di aprire sottocartelle specifiche come "progetti" separati per focalizzare l'attenzione dell'AI:

```
myapp/
├── frontend/    <- Apri come progetto separato
├── backend/     <- Apri come progetto separato
└── shared/
```

### Usa .gitignore

Claude Forge rispetta il tuo file `.gitignore` quando indicizza i file del progetto. Questo significa:

- `node_modules/` non ingombra il file explorer
- Gli artifact di build sono esclusi
- I file sensibili rimangono privati

### Un Task per Sessione

Per task complessi, e spesso meglio:

1. Aprire una conversazione nuova
2. Focalizzarsi su un obiettivo specifico
3. Rivedere e committare le modifiche
4. Iniziare una nuova conversazione per il prossimo task

Questo mantiene il contesto focalizzato e le modifiche organizzate.

## Limitazioni

- **Massimo progetti**: Nessun limite rigido, ma avere molti progetti aperti puo influire sulle prestazioni
- **Codebase grandi**: Progetti con oltre 10.000 file potrebbero richiedere piu tempo per l'indicizzazione
- **File binari**: I file binari sono esclusi dal contesto AI

## Risoluzione Problemi

### Il progetto non si apre

**Possibili cause:**
- La cartella non esiste
- Permessi insufficienti
- Il percorso contiene caratteri speciali

**Soluzioni:**
1. Verifica che la cartella esista
2. Controlla i permessi della cartella
3. Prova ad aprire una cartella padre

### Prestazioni lente con progetti grandi

**Soluzioni:**
1. Apri una sottocartella specifica invece
2. Assicurati che `.gitignore` escluda `node_modules/` e cartelle di build
3. Chiudi i progetti non utilizzati
