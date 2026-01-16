---
title: Agenti
description: Creare e gestire agenti AI personalizzati in Claude Forge
---

# Agenti

Gli agenti sono assistenti AI personalizzati con ruoli, permessi e comportamenti specifici. Crea agenti specializzati per diversi task come code review, documentazione o testing.

## Capire gli Agenti

Un agente in Claude Forge consiste di:

| Proprieta | Descrizione |
|-----------|-------------|
| **Nome** | Un identificativo amichevole per l'agente |
| **Ruolo** | Prompt di sistema che definisce il comportamento dell'agente |
| **Permessi** | Quali azioni l'agente puo eseguire |

## Agente Predefinito

Claude Forge include un agente **Default** che:

- Ha le capacita standard di Claude Code CLI
- Puo leggere e scrivere file
- Puo eseguire comandi shell
- Non ha comportamenti specializzati

## Creare un Agente

1. Nella sidebar, scorri alla sezione **Agenti**
2. Clicca **+ Nuovo Agente**
3. Compila i dettagli dell'agente:

### Nome

Scegli un nome descrittivo come:
- "Revisore Codice"
- "Scrittore Documentazione"
- "Generatore Test"
- "Cercatore Bug"

### Ruolo (Prompt di Sistema)

Il ruolo definisce come si comporta l'agente. Scrivilo come istruzioni:

```
Sei uno specialista di code review. Il tuo lavoro e:
- Trovare potenziali bug e problemi di sicurezza
- Suggerire miglioramenti delle prestazioni
- Assicurare che il codice segua le best practice
- Essere costruttivo ed educativo nel feedback

Spiega sempre PERCHE qualcosa dovrebbe essere cambiato, non solo cosa.
```

### Permessi

Imposta cosa puo fare l'agente:

| Permesso | Descrizione |
|----------|-------------|
| **Lettura** | Puo leggere file nel progetto |
| **Scrittura** | Puo creare e modificare file |
| **Esecuzione** | Puo eseguire comandi shell |

::: warning
Fai attenzione con i permessi di Esecuzione. Abilita solo per agenti fidati.
:::

## Esempi di Agenti

### Revisore Codice

```
Nome: Revisore Codice
Ruolo: Sei uno sviluppatore senior che esegue code review. Concentrati su:
- Qualita e leggibilita del codice
- Potenziali bug e casi limite
- Vulnerabilita di sicurezza
- Considerazioni sulle prestazioni
Sii sempre costruttivo e spiega il tuo ragionamento.
Permessi: Solo Lettura
```

### Scrittore Documentazione

```
Nome: Doc Writer
Ruolo: Sei uno specialista di documentazione tecnica. I tuoi task:
- Scrivere documentazione chiara e concisa
- Aggiungere commenti JSDoc/TSDoc alle funzioni
- Creare file README
- Documentare API e interfacce
Usa formattazione consistente e includi esempi.
Permessi: Lettura, Scrittura
```

### Generatore Test

```
Nome: Generatore Test
Ruolo: Sei un ingegnere QA specializzato in testing automatizzato. Tu:
- Scrivi unit test per le funzioni
- Crei integration test
- Assicuri buona copertura dei test
- Usi pattern di testing appropriati
Segui la struttura dei test esistente nel progetto.
Permessi: Lettura, Scrittura
```

## Usare gli Agenti

### Selezionare un Agente

1. Clicca su un agente nella sezione **Agenti** della sidebar
2. L'agente selezionato diventa attivo
3. Tutti i prompt successivi usano questo agente

### Cambiare Agente

Clicca semplicemente un agente diverso per cambiare. Ogni agente:

- Mantiene il proprio comportamento
- Condivide lo stesso contesto del progetto
- Ha cronologia conversazione indipendente

## Modificare Agenti

1. Clicca sull'agente che vuoi modificare
2. Modifica nome, ruolo o permessi
3. Le modifiche sono salvate automaticamente

## Eliminare Agenti

1. Seleziona l'agente
2. Clicca il pulsante **Elimina** (o click destro e seleziona Elimina)
3. Conferma l'eliminazione

::: info
L'agente Default non puo essere eliminato.
:::

## Best Practice per gli Agenti

### Sii Specifico nei Ruoli

Invece di:
```
Aiuti con il codice.
```

Scrivi:
```
Sei un esperto TypeScript che aiuta a convertire codice JavaScript in TypeScript.
Concentrati su:
- Aggiungere annotazioni di tipo appropriate
- Usare interface per oggetti complessi
- Sfruttare funzionalita TypeScript come i generics
- Mantenere retrocompatibilita
```

### Abbina Permessi allo Scopo

| Tipo Agente | Permessi Raccomandati |
|-------------|----------------------|
| Revisore/Analizzatore | Solo Lettura |
| Scrittore/Generatore | Lettura, Scrittura |
| Script automazione | Lettura, Scrittura, Esecuzione |

### Crea Agenti per Task Specifici

Invece di un unico agente generico, creane diversi focalizzati:

- **Agente Frontend** - Specializzato in React, CSS, accessibilita
- **Agente Backend** - Focalizzato su API, database, sicurezza
- **Agente DevOps** - Gestisce CI/CD, Docker, deployment
