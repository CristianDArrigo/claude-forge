---
layout: home
title: Claude Forge - GUI Desktop per Claude Code
titleTemplate: false

hero:
  name: Claude Forge
  text: Compagno di Sviluppo AI
  tagline: Una potente GUI desktop per Claude Code CLI. Gestisci progetti, esegui task con AI e monitora il tuo flusso di lavoro.
  image:
    src: /logo.svg
    alt: Claude Forge
  actions:
    - theme: brand
      text: Download
      link: /it/download
    - theme: alt
      text: Documentazione
      link: /it/guide/

features:
  - icon:
      src: /icons/projects.svg
    title: Gestione Multi-Progetto
    details: Organizza e passa tra progetti multipli con cronologie di chat e configurazioni separate.
  - icon:
      src: /icons/agents.svg
    title: Agenti AI Personalizzati
    details: Crea e configura agenti specializzati con ruoli specifici, permessi e prompt di sistema.
  - icon:
      src: /icons/history.svg
    title: Cronologia Prompt
    details: Naviga tra i prompt precedenti con le scorciatoie da tastiera. Non perdere mai i tuoi comandi.
  - icon:
      src: /icons/files.svg
    title: Esplora File
    details: Sfoglia i file del progetto direttamente nella sidebar con un'interfaccia ad albero intuitiva.
  - icon:
      src: /icons/git.svg
    title: Integrazione Git
    details: Visualizza lo stato, stage file, commit modifiche e push/pull - tutto senza uscire dall'app.
  - icon:
      src: /icons/settings.svg
    title: Impostazioni Personalizzabili
    details: Configura tema, notifiche, percorso CLI di Claude e altre preferenze per il tuo workflow.
---

<script setup>
import Hero from '../.vitepress/theme/components/Hero.vue'
import Features from '../.vitepress/theme/components/Features.vue'
import DownloadSection from '../.vitepress/theme/components/DownloadSection.vue'
</script>

<Hero />

<Features />

<DownloadSection />

<style>
.VPHome .VPHero,
.VPHome .VPFeatures {
  display: none;
}
</style>
