# Revisione finale — 11 ottobre 2026

Aggiornamento successivo alla verifica: su richiesta, la sezione diario è stata rimossa completamente (pagine, risorse, navigazione e sitemap). Le note storiche sul diario qui sotto non descrivono più il sito corrente. La home ruota automaticamente quando inattiva, si ferma durante l’interazione e riprende dopo tre secondi; non ha pulsante di rotazione e il clic non mostra un riquadro di focus. Panda Anna è rientrata in Italia per manutenzione: il testo e i cinque paesi aggiuntivi sono stati aggiornati su indicazione dell’utente.

Risultato preparato localmente, senza pubblicazione o modifiche ai servizi remoti. Le modifiche dei passaggi precedenti sono conservate.

## Correzione conclusiva

La simulazione di un MP4 inesistente lasciava la lightbox visivamente vuota con controlli non utilizzabili. Ora mostra un messaggio di errore nelle quattro lingue; libera il player e mantiene cambio contenuto, Escape e chiusura. Il messaggio scompare passando a un video disponibile. Modificati `gallery/gallery.js`, lo stile specifico di Pandanna e la fonte delle traduzioni; rigenerate le pagine e aggiornati i riferimenti cache degli asset interessati. Nessun redesign.

## Verifiche completate

- Percorso tramite collegamenti: home → About → Pandanna → galleria → mappe. Contatto Instagram raggiungibile dal footer, con destinazione reale già presente nel progetto; non esiste una pagina Contatti separata.
- Accesso diretto alle sette pagine pubbliche; un solo header e un H1 principale per pagina, nessuna apertura automatica dei dialog.
- 42 combinazioni pagina/viewport: tutte le sette pagine a 320, 375, 390, 768, 1024 e 1440 px, in inglese. Altre quattro prove su home/galleria a 844 × 390 e 320 × 240. Nessun overflow orizzontale; nelle viste basse modello e slide mantengono spazio e lo scorrimento resta disponibile.
- Tutte le pagine anche in italiano, russo e tedesco a 390 × 844. Cambio lingua, ricaricamento, passaggio fra pagine, lang e titolo corretti. I racconti originali conservano la lingua italiana.
- Tastiera: skip link verso main; Tab e Shift+Tab nei dialog; Escape e ritorno del focus; menu chiuso non raggiunto da Tab e assente nell'albero accessibile. Il selettore lingua conserva il focus e la preferenza.
- Galleria: 36 contenuti, anteprime senza player video; foto verticale e orizzontale contenute nella slide e nella lightbox. Riproduzione e pausa tramite controlli nativi, un solo player al cambio contenuto e nessun player dopo la chiusura. Errore MP4 simulato, messaggio visibile e recupero al cambio contenuto.
- Home: modello caricato automaticamente con poster nascosto dopo il successo. Poster e collegamenti presenti con modello mancante, WebGL indisponibile e componente non inizializzato; nessuna area principale vuota.
- Mappe: caricamento reale riuscito; ultimo aggiornamento ricevuto 9 ottobre 2026, mostrato come dati non aggiornati, senza sostituirlo con l'ora della verifica. Aggiornamenti sospesi fuori viewport. Errori simulati di libreria/WebGL e servizio dati con stati espliciti e collegamento esterno disponibile. Nessuna modifica ai dati remoti.
- Build e controlli statici (`npm run check`), sintassi del codice modificato e `git diff --check` superati. Tutti i **19 test** layout, lingua, mappe e SEO/HTTP superati dopo la correzione. I test delle mappe verificano anche timeout, timestamp, assenza di polling sovrapposto, sospensione e ripresa. I test SEO verificano link, risorse e risposta HTTP 404 locale.

## Questioni residue e limiti

- Motivazione attuale del noindex della galleria e incongruenze temporali da confermare: [rapporto SEO](seo-review.md). Le date e la storia non sono state riscritte.
- Model-viewer segnala materiali GLB con estensione legacy `KHR_materials_pbrSpecularGlossiness`. Il modello è visibile e funzionante; non sono stati convertiti i materiali o alterato il suo aspetto durante questa verifica.
- Non presenti sottotitoli/trascrizioni dei video né informative pubbliche privacy/cookie nel repository. Nessun contenuto inventato.
- Non verificati con dispositivi reali: lettori di schermo, touch fisico, ascolto audio e tutte le combinazioni browser/codec. Il controllo audio rimane quello nativo del browser. Il test UI non certifica nomi e comportamento di ogni controllo interno al player o alle mappe di terzi.
- Zoom nativo 200%/400% non disponibile nel browser automatizzato; le precedenti prove di reflow equivalente e la prova corrente a 320 × 240 non sono una misura di zoom nativo.
- Il collegamento al contatto è verificato nel sito e nel codice, ma autenticazione/apertura del profilo Instagram non certificata in questo browser; nessun messaggio inviato.
- 404 verificata con HTTP locale. Hosting pubblico dopo il rilascio, dati reali degli utenti, prestazioni su rete mobile e disponibilità futura dei servizi esterni non verificati. Non è stata eseguita una nuova misura prestazionale: valgono i risultati di laboratorio del passaggio 17.

## Come rivedere

Eseguire `npm run build` e `npm run dev`, quindi aprire le URL pulite. Controlli: `npm run check`, `npm run test:layout`, `npm run test:language`, `npm run test:maps`, `npm run test:seo`. Quest'ultimo avvia un server locale temporaneo per controllare lo stato HTTP.

Le simulazioni locali usate per gli errori sono sotto `.tmp/final-review/`, cartella ignorata da Git: non fanno parte delle pagine pubbliche. Screenshot e risultati JSON della verifica sono negli artefatti della conversazione.
