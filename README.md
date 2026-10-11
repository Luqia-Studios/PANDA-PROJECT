# Panda Project

Sito statico pubblicato con GitHub Pages. La homepage finale `index.html` viene generata direttamente dalla sorgente `src/home.html`: non usa iframe. La struttura separa contenuti e funzioni riutilizzabili: i token, il reset e i contenitori sono in `shared/base.css`, le varianti dei pulsanti in `shared/components.css` e header, menu e selettore della lingua in `shared/header.css` (tutti sotto `public/proposta-partner/`). `public/proposta-partner/style.css` contiene home e About; gli altri stili di pagina restano nelle rispettive cartelle e gli script condivisi sono in `public/proposta-partner/shared/`.

La home presenta soltanto Panda Anna: slogan, modello 3D, nome, collegamento principale a Pandanna e presentazione secondaria. Il modello carica automaticamente; l’immagine locale resta visibile fino all’evento di caricamento riuscito e in caso di errore. La composizione occupa una schermata, con il 3D sotto lo slogan su mobile e tablet in verticale e accanto allo slogan su desktop. Non ci sono slide future o controlli del carosello. La pagina potrà crescere sotto la schermata iniziale quando verrà aggiunto un footer.

La scala tipografica è definita in `shared/base.css`: titoli di pagina 36–72px, titoli di sezione 28–48px, sottotitoli 22–30px, introduzioni 19–26px, testo 16–18px ed etichette 11px. Pandanna e About usano la variante di titolo grande 56–128px; lo slogan della home mantiene le proporzioni dedicate al 3D. Testi e introduzioni hanno misure di 62ch e 54ch, interlinee di 1.7 e 1.5, distanza tra paragrafi di 18px e tra sezioni di 40–80px. Ogni pagina ha un H1 nel suo main, con l’header globale all’esterno. Le composizioni restano specifiche delle pagine.

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

I controlli delle mappe si eseguono con `npm run test:maps`, senza contattare servizi remoti. Coprono avvio della mappa, errori e timeout dei dati, timestamp, area di posizione e sospensione delle richieste. Le posizioni oltre 30 minuti sono indicate come non aggiornate; ogni richiesta dati ha un limite di 10 secondi e il polling riparte 20 secondi dopo il completamento della precedente.

Gli HTML caricano prima `base.css` e `components.css`, poi gli stili di pagina e dell’header. I pulsanti di contenuto usano `button` con `button--primary` o `button--secondary`; `button--compact` mantiene le dimensioni dei collegamenti alle risorse e `button--text` identifica i collegamenti testuali. Le classi descrivono l’aspetto; il menu usa attributi `data-menu-*`, `data-site-menu` e `data-language-*` per i collegamenti JavaScript. Le pagine pubbliche generate vanno aggiornate con `npm run build`, non modificate direttamente.

Header, menu e selettore lingua hanno una sola struttura, nei template `src/shared/`. Le sorgenti HTML li includono tramite `<!-- site:header -->`, `<!-- site:menu -->` e `<!-- site:language -->`; `scripts/layout.mjs` li assembla durante la build, senza costruire l’interfaccia nel browser. Per l’anteprima usa le URL pubbliche (`/`, `/about/`, `/maps/`, `/projects/pandanna/`, `/projects/pandanna/gallery/`), dopo la build.

Il footer condiviso è in `src/shared/footer.html`, incluso con `<!-- site:footer -->` fuori da main su tutte le sette pagine. Riusa destinazioni e social del layout; gli stili sono in `shared/components.css`. Il contatto è il profilo Instagram già indicato nei social e nei dati strutturati: nel progetto non risultano email pubbliche o informative privacy/cookie. Non sono stati creati indirizzi o testi legali. Il footer segue il contenuto anche su home e galleria; la schermata iniziale della home conserva lo spazio del 3D e i dialog modali rendono il footer inerte quando aperti.

I testi modificabili sono solo in `public/proposta-partner/shared/translations.json`: `translations.js` è generato e non va modificato a mano. `i18n.js` applica testi, titoli, alt ed etichette ARIA e mantiene l’evento `panda-language-change`; `shared/language.js` gestisce la scelta e la preferenza `panda-project-language`; `shared/site.js` gestisce il menu accessibile. Il selettore non si apre automaticamente: la preferenza salvata ha precedenza, seguita dalla prima lingua supportata del browser e dall’italiano. Il dialog nativo aperto dall’header gestisce focus ed Escape. Se localStorage non è disponibile, la scelta funziona nella pagina senza essere salvata. `npm run test:layout` controlla chiavi duplicate, completezza delle quattro lingue, include e struttura condivisa su tutte le pagine.

Le destinazioni di navigazione e i ritorni espliciti sono definiti in `scripts/layout.mjs`. Il nome Panda Project porta sempre a `/`; Galleria e Mappe rimandano a Pandanna. La pagina corrente ha `aria-current="page"`. L’header mostra le destinazioni da 768 px, su due righe fino a 1099 px; sotto 768 px usa il dialog mobile con i social. Le pagine riservano lo spazio tramite `--header-clearance`.

Le verifiche prestazionali locali si preparano con `npm run perf:fixtures` e si aprono sul server di sviluppo in `/.tmp/performance/home.html`, `gallery.html` e `maps.html`. La sonda `scripts/performance-probe.js` espone JSON nel nodo nascosto `#performance-report`, senza alterare il layout; dopo tre secondi aggiunge `data-complete`. Registra Paint Timing, candidato LCP, layout shift senza input recente, durata complessiva dei long task e Resource Timing. Le prove sono di laboratorio, senza throttling: non sostituiscono dati degli utenti o un audit Lighthouse. Contare soltanto URL HTTP, escludendo la sonda; i dettagli delle risorse cross-origin e delle richieste negli iframe possono non essere disponibili.

La home importa model-viewer 3.1.1 dopo due opportunità di rendering, mantenendo il poster WebP statico fino all'evento load del modello. Il poster PNG originale resta come sorgente. Il modello ruota automaticamente quando inattivo, si ferma durante l’interazione e riprende dopo tre secondi. La rotazione si sospende fuori viewport, con pagina nascosta o dialog aperto. È possibile ruotarlo direttamente con mouse, touch o tastiera, senza pulsante aggiuntivo. Il focus da tastiera ha un indicatore discreto; il clic non disegna un riquadro intorno al viewer. MapLibre 4.7.1 e il polling della posizione si avviano quando la mappa live diventa visibile; il polling si sospende anche fuori viewport. Le miniature WebP e i srcset della galleria restano invariati, senza scaricare video per generare anteprime.

`npm run optimize:model` riduce senza perdita gli indici delle mesh da 32 a 16 bit quando i valori lo consentono. Lo script verifica ogni indice e preserva byte per byte gli altri buffer; non semplifica geometria o materiali e non aggiunge estensioni o dipendenze. È idempotente sul GLB già ottimizzato.

La politica SEO delle URL pubbliche è in `scripts/layout.mjs`: il build genera sitemap e robots delle pagine da questa configurazione, preservando noindex della galleria. Le copie sorgente interne sono noindex. `src/404.html` genera la pagina 404 condivisa nella radice; il server locale restituisce davvero HTTP 404. Eseguire `npm run test:seo` per metadati, link/risorse e risposta HTTP. Esclusioni e incongruenze temporali da confermare sono documentate in [docs/seo-review.md](docs/seo-review.md).

La sezione diario è stata rimossa: nessuna voce in navigazione o sitemap, nessuna pagina o risorsa pubblica del diario. Le vecchie URL restituiscono 404.
