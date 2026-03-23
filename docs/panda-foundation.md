# Panda Project Foundation

## 1. Nuova Sitemap

La nuova architettura sposta il sito da vetrina emozionale a hub editoriale + tecnico + community.

- `/` Home Hub
- `/project` Il Progetto
- `/panda` La Panda
- `/route` Route / Live Map
- `/journal` Journal
- `/resources` Resources
- `/support` Support / Community
- `/partners` Partner / Sponsor
- `/contact` Contatti

### Logica di navigazione mobile

- Bottom navigation: `Home`, `Panda`, `Route`, `Journal`, `Menu`
- Dentro `Menu`: `Il Progetto`, `Resources`, `Support`, `Partner`, `Contatti`

### Gerarchia

1. Home chiarisce identità, fase e accessi principali.
2. La Panda diventa il perno simbolico e tecnico.
3. Route resta forte ma non monopolizza la struttura.
4. Journal e Resources rendono il sito utile anche prima della partenza.
5. Support chiude il cerchio trasformando chi visita in chi segue davvero.

## 2. Wireframe Mobile Home

```text
[BOTTOM SAFE TOP BAR]
Panda Project
expedition media + build log

[HERO IMAGE FULL WIDTH]
EYEBROW: PANDA PROJECT
TITLE: Una Panda 4x4, una preparazione reale, un viaggio che parte prima della strada.
TEXT: Il sito segue officina, rotta, errori, prove e persone attorno al progetto.
[CTA 1: Scopri il progetto]
[CTA 2: Vedi la Panda]

[STATUS CARD]
fase attuale
prossima tappa
ultimo aggiornamento

[SECTION INTRO]
Hub
Tre ingressi per capire il progetto subito.

[CARD] Il Progetto
[CARD] La Panda
[CARD] Route / Live Map

[SECTION INTRO]
Ultimi aggiornamenti
Preparazione, build, pensieri e note di rotta.

[UPDATE CARD]
[UPDATE CARD]
[UPDATE CARD]

[SECTION INTRO]
Risorse
Checklist, setup minimo, ricambi, budget reale.

[RESOURCE CARD]
[RESOURCE CARD]

[CTA BLOCK]
Supporta / entra nella community
newsletter, supporto futuro, partner
[CTA]

[BOTTOM NAV FIXED]
Home | Panda | Route | Journal | Menu
```

### Priorità Home

- 5 secondi: cos'è Panda Project
- 10 secondi: a che punto è
- 15 secondi: dove andare dopo

## 3. Wireframe Delle Altre Pagine

### Il Progetto

```text
[PAGE HEADER IMAGE]
manifesto
perché esiste Panda Project

[TEXT BLOCK]
perché questo viaggio

[TEXT BLOCK]
cosa racconta Panda Project

[VERTICAL TIMELINE]
idea
acquisto Panda
restauro / preparazione
partenza
viaggio

[CTA]
vai a Journal / Route
```

### La Panda

```text
[HERO AUTO]
Pandanna
stato attuale

[TECH SPECS GRID]

[BUILD LOG]
lavori fatti
lavori in corso
lavori mancanti

[SETUP DA VIAGGIO]

[FILOSOFIA DEL MEZZO / RICAMBI]
```

### Route / Live Map

```text
[PAGE HEADER]
stato viaggio
direzione prevista

[MAP FRAME]

[STATUS ROW]
posizione
fase
prossimo checkpoint

[TAPPE]

[NOTE GEOGRAFICHE / PENSIERI]

[CTA]
segui / interagisci
```

### Journal

```text
[PAGE HEADER]

[CATEGORY FILTER VISUAL]
Preparazione
Build
Thoughts
Route
Travel Notes

[VERTICAL UPDATE LIST]
```

### Resources

```text
[PAGE HEADER]

[RESOURCE LIST]
checklist
setup minimo
ricambi
attrezzatura
budget
strumenti
lezioni imparate
```

### Support / Community

```text
[PAGE HEADER]

[WHY SUPPORT]

[SUPPORT CARD]
newsletter

[SUPPORT CARD]
supporter area futura

[SECONDARY BLOCK]
partner / sponsor

[FINAL CTA]
```

## 4. Componenti Riutilizzabili

- `MobileHero`: hero editoriale principale con immagine, copy e CTA.
- `StatusCard`: stato progetto, fase viaggio o indicatori sintetici.
- `SectionIntro`: apertura coerente delle sezioni.
- `FeatureCard`: accessi rapidi ai pilastri del progetto.
- `UpdateCard`: card editoriali per Journal e Home.
- `RoutePreview`: preview sintetica di mappa, fase e tappe.
- `VehicleSpecCard`: specifiche rapide della Panda.
- `BuildLogList`: elenco lavori fatti/in corso/da fare.
- `ResourceCard`: risorse pratiche con bullets.
- `SupportCard`: moduli community / supporto / partnership.
- `FooterNavMobile`: bottom nav persistente mobile-first.
- `PageHeader`: header interno con immagine, titolo e lead.
- `TimelineVertical`: timeline manifesto / stato progetto.
- `CTASection`: chiusura forte e modulare.
- `MenuSheet`: pannello mobile per navigazione secondaria.

## 5. Base Design System

### DNA preservato

- fondo scuro e materico dal sito attuale
- testo chiaro ad alto contrasto
- accento menta preso dalla palette esistente
- tipografia `Space Grotesk` + `Poppins`
- immagini reali del progetto, non stock
- atmosfera scarna, meccanica, sincera

### Token iniziali

- background: `#302f2f`
- surface: `#3a3938`
- text: `#e3e3e3`
- text-muted: `#bfbdb8`
- accent: `#7de0ce`
- accent-soft: `rgba(125, 224, 206, 0.16)`
- border: `rgba(227, 227, 227, 0.14)`
- radius-card: `24px`
- radius-button: `999px`
- shadow: `0 24px 80px rgba(0, 0, 0, 0.32)`

### Regole

- sezioni grandi con respiro verticale
- hero sempre leggibile e mai piena di elementi
- massimo due CTA per sezione critica
- cards scure, dense, con contrasto netto
- immagini full-bleed o quasi full-bleed
- testo breve e incisivo

## 6. Struttura Iniziale Del Codice

```text
src/
  components/
    CTASection.tsx
    BuildLogList.tsx
    FeatureCard.tsx
    FooterNavMobile.tsx
    MenuSheet.tsx
    MobileHero.tsx
    PageHeader.tsx
    ResourceCard.tsx
    RoutePreview.tsx
    SectionIntro.tsx
    StatusCard.tsx
    SupportCard.tsx
    TimelineVertical.tsx
    UpdateCard.tsx
    VehicleSpecCard.tsx
  data/
    siteContent.ts
  pages/
    ContactPage.tsx
    HomePage.tsx
    JournalPage.tsx
    PandaPage.tsx
    PartnersPage.tsx
    ProjectPage.tsx
    ResourcesPage.tsx
    RoutePage.tsx
    SupportPage.tsx
  styles/
    app.css
    tokens.css
  types/
    content.ts
  App.tsx
  main.tsx
```
