---
title: Installazione
description: Come installare Claude Forge sul tuo sistema
---

# Installazione

Questa guida ti accompagna nell'installazione di Claude Forge sul tuo sistema Windows.

## Prerequisiti

Prima di installare Claude Forge, assicurati di avere:

### 1. Claude Code CLI

Claude Forge richiede che Claude Code CLI sia installato. Visita la [documentazione di Claude Code](https://docs.anthropic.com/claude-code) per le istruzioni di installazione.

Verifica la tua installazione:

```bash
claude --version
```

### 2. Requisiti di Sistema

| Requisito | Minimo |
|-----------|--------|
| **Sistema Operativo** | Windows 10 (64-bit) o successivo |
| **RAM** | 4 GB |
| **Spazio su Disco** | 200 MB disponibili |

## Download

1. Vai alla [pagina Download](/it/download)
2. Clicca "Scarica Installer"
3. Salva il file `.exe` sul tuo computer

In alternativa, visita la pagina [GitHub Releases](https://github.com/CristianDArrigo/claude-forge/releases) per tutte le versioni disponibili.

## Installazione

1. **Esegui l'installer**
   - Doppio clic su `Claude Forge Setup x.x.x.exe`
   - Se appare Windows SmartScreen, clicca "Ulteriori informazioni" poi "Esegui comunque"

2. **Segui la procedura guidata**
   - Scegli la cartella di installazione (quella predefinita e consigliata)
   - Seleziona se creare un collegamento sul desktop
   - Clicca "Installa"

3. **Avvia**
   - L'app si avviera automaticamente dopo l'installazione
   - Oppure trovala nel menu Start sotto "Claude Forge"

## Prima Configurazione

Quando avvii Claude Forge per la prima volta, potresti dover configurare il percorso del CLI:

1. Clicca l'icona **Impostazioni** (ingranaggio) in alto a destra
2. In "Generale", trova "Percorso Claude CLI"
3. Se il percorso non e corretto, clicca "Sfoglia" e seleziona l'eseguibile

::: tip
Sulla maggior parte dei sistemi, il CLI si trova in:
- `C:\Users\<username>\AppData\Local\Claude\claude.exe`
:::

## Verifica Installazione

Per verificare che Claude Forge funzioni correttamente:

1. Avvia l'applicazione
2. Clicca "Apri Progetto" nella sidebar
3. Seleziona una cartella con del codice
4. Scrivi un prompt nel campo di input
5. Premi Invio e verifica di ricevere una risposta

Se vedi un errore, controlla la sezione [Risoluzione Problemi](#risoluzione-problemi) sotto.

## Aggiornamenti

Claude Forge controlla automaticamente gli aggiornamenti. Quando un aggiornamento e disponibile:

1. Apparira una notifica nell'app
2. Clicca "Scarica Aggiornamento" per ottenere l'ultima versione
3. L'app si riavviera con la nuova versione

Puoi anche aggiornare manualmente scaricando l'ultimo installer dalla [pagina Releases](https://github.com/CristianDArrigo/claude-forge/releases).

## Disinstallazione

Per rimuovere Claude Forge:

1. Apri **Impostazioni Windows** > **App** > **App installate**
2. Trova "Claude Forge" nella lista
3. Clicca il menu a tre puntini e seleziona "Disinstalla"
4. Segui le istruzioni

Le tue impostazioni e configurazioni sono salvate in:
- `%APPDATA%\claude-forge\`

Elimina questa cartella per rimuovere completamente tutti i dati.

## Risoluzione Problemi

### Errore "Claude CLI non trovato"

**Soluzione:** Configura il percorso del CLI nelle Impostazioni:
1. Apri Impostazioni (icona ingranaggio)
2. Imposta il percorso corretto del Claude CLI
3. Riavvia l'applicazione

### Installazione bloccata dall'antivirus

**Soluzione:** Aggiungi un'eccezione per Claude Forge:
1. Apri le impostazioni del tuo antivirus
2. Aggiungi `C:\Program Files\Claude Forge\` alla lista delle esclusioni
3. Riesegui l'installer

### L'app non si avvia

**Soluzione:** Prova questi passaggi:
1. Elimina la cartella `%APPDATA%\claude-forge\`
2. Reinstalla l'applicazione
3. Se il problema persiste, controlla i [GitHub Issues](https://github.com/CristianDArrigo/claude-forge/issues)
