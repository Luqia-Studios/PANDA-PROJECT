# Verifica SEO — 11 ottobre 2026

Aggiornamento successivo alla verifica: su richiesta, la sezione diario è stata rimossa completamente (pagine, risorse, navigazione e sitemap). Le note storiche sul diario qui sotto non descrivono più il sito corrente. La home ruota automaticamente quando inattiva, si ferma durante l’interazione e riprende dopo tre secondi; non ha pulsante di rotazione e il clic non mostra un riquadro di focus. Panda Anna è rientrata in Italia per manutenzione: il testo e i cinque paesi aggiuntivi sono stati aggiornati su indicazione dell’utente.

La configurazione delle pagine in `scripts/layout.mjs` governa robots e sitemap. Restano indicizzabili home, About, Pandanna, Mappe e il diario con i tre racconti. Nessun URL artificiale per le lingue, nessun hreflang e nessuna data lastmod inventata. Il selettore aggiorna lang e titolo; i racconti originali del diario conservano `lang="it"`. Lo slogan inglese della home dichiara `lang="en"`.

Titoli iniziali allineati ai testi italiani esistenti, descrizioni e metadati Open Graph/Twitter coerenti per ciascuna pagina. La fotografia di condivisione esiste: JPEG 4320 × 2428, con descrizione della scena senza località inventate. JSON-LD analizzato come JSON: Organization, WebSite, WebPage, AboutPage e Blog conservano i fatti già presenti. La raccolta del diario usa og:type website, anziché presentarsi come un singolo articolo. Non sono state aggiunte date di pubblicazione, coordinate o nuove dichiarazioni.

## Esclusioni conservate

- Galleria: noindex, follow. La cronologia mostra che l'esclusione era già presente quando la pagina era una bozza “work in progress”; la motivazione attuale non è verificabile. Nessuna modifica all'indicizzabilità.
- Indice `/journal/`: noindex, follow; è una pagina di accesso al diario, che rimane pubblico e indicizzabile.
- Pagina di reindirizzamento `/public/proposta-partner/`: esclusione esistente conservata.
- Copie sorgente sotto `/public/proposta-partner/` e `/src/home.html`: noindex, follow; il build applica la politica delle pagine alle versioni complete con URL pulite. Le cartelle non sono bloccate in robots, perché contengono risorse necessarie al sito.
- 404: noindex, follow, senza canonical verso la home e senza inclusione nella sitemap.

## Frasi e date da confermare

Nessuna è stata riscritta o interpretata come un aggiornamento della storia.

- `journal/content.js`, primo racconto: “Data di pubblicazione: 19/5/2025” contrasta con la partenza “4 maggio 2026”. La data del campo meta non viene esposta né aggiunta ai dati strutturati.
- Pandanna, chiave `journeyFour`: “Adesso sto provando a riportarla in Italia passando da Mosca ed entrando in Europa dalla Lettonia.” Non è possibile verificarne l'attualità dal repository.
- Pandanna, `journeyThree`: “Per ora Pandanna ha attraversato:” presenta l'elenco come corrente, senza data di riferimento.
- Terzo racconto, meta 30/6/2026: “Devo aspettare fino al 7 luglio”, “Ora sono qui” e “Adesso la Panda è parcheggiata a Tbilisi”. Possono essere la voce storica del racconto, ma non devono essere assunte come situazione attuale.

## Verifica riproducibile

`npm run check`, `npm run test:seo`, test layout, lingua e mappe: controllano metadati, policy, sitemap, JSON-LD, link locali e frammenti, risorse di condivisione, 72 varianti WebP e 18 video, racconti presenti nell'HTML e vero stato HTTP 404 nel server locale. Nessuna risorsa mancante rilevata in questi riferimenti; i collegamenti esterni non sono certificati dal controllo locale.

Verifica browser a 390 × 844: pagina 404 leggibile senza overflow, apertura del racconto, tre articoli e 189 paragrafi, un solo header, cambio lingua russo con articoli italiani, traduzione della 404.

La 404 generata nella radice segue il meccanismo documentato di [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site). Il server locale restituisce 404 anche per risorse inesistenti, senza redirect. La risposta del server pubblico a URL inesistenti non è stata verificabile con lo strumento web disponibile: non si attribuisce quindi al sito online il comportamento locale. Nessuna pubblicazione effettuata.

La sitemap include soltanto le URL canoniche da indicizzare, come indicato nella [documentazione Google](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
