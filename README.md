# Panda Project

Sito statico pubblicato con GitHub Pages. La homepage finale `index.html` viene generata direttamente dalla sorgente `src/home.html`: non usa iframe. La struttura separa contenuti e funzioni riutilizzabili: gli stili globali sono in `public/proposta-partner/style.css`, gli stili di pagina restano nelle rispettive cartelle e gli script condivisi sono in `public/proposta-partner/shared/`.

Il diario mantiene i contenuti in `journal/content.js` e il rendering in `journal/diario.js`: in futuro i dati potranno quindi arrivare da un CMS o da un'API senza riscrivere l'interfaccia.

Per generare la homepage e visualizzarla in locale, dalla radice del progetto esegui:

```powershell
npm run build
npm run dev
```

Poi apri l'indirizzo indicato dal server (normalmente `http://localhost:5173`).

Prima di pubblicare, verifica riferimenti e sintassi essenziali con:

```powershell
npm run check
```
