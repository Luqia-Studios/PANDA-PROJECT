(() => {
  const storeKey = "panda-project-language";
  const languages = {
    it: { label: "Italiano", native: "Italiano" },
    en: { label: "English", native: "English" },
    ru: { label: "Русский", native: "Русский" },
    de: { label: "Deutsch", native: "Deutsch" }
  };
  const copy = {
    it: {
      language: "Lingua", chooseLanguage: "Scegli la lingua", languageIntro: "Puoi modificarla in qualsiasi momento dalla barra in alto.", menu: "Menu", home: "Home", projects: "Progetti", explore: "Esplora", about: "About", aboutOne: "Panda Project è un laboratorio di progetti assurdi e un po’ sconclusionati.", aboutTwo: "Idee costruite senza grandi pianificazioni, competenze specifiche o investimenti importanti, si parte da ciò che si ha e si impara tutto il resto lungo il percorso.", aboutThree: "Nasce come forma di rivalsa verso una vita già scritta, nella quale ciò che si desidera viene continuamente rimandato in attesa del momento giusto.", aboutFour: "Il nome arriva dal primo progetto ad aver preso davvero vita: una Fiat Panda 4×4 del 1998, restaurata senza alcuna competenza meccanica, tra un impiego diurno e i turni serali dietro al bancone di un bar.", aboutFive: "Ma Panda Project non comincia e non finisce con una macchina o con un viaggio.", aboutSix: "La Panda è soltanto la prima idea, tra migliaia, ad aver resistito abbastanza a lungo da diventare qualcosa di reale.", aboutSeven: "Il filo conduttore è semplice. Prendere sul serio un’idea discutibile abbastanza a lungo da scoprire cosa può diventare.", aboutEight: "O quanti problemi può causare.", overlandTitle: "Perché viaggiare overland con veicoli inadatti?", overlandOne: "Perché un veicolo inadatto trasforma ogni viaggio in un progetto e una missione. Permette di lavorare sulla meccanica del veicolo, inventare soluzioni, imparare e schiantarsi contro la dura realtà dei propri limiti.", overlandTwo: "L’overland mette alla prova competenze molto diverse, dall’organizzazione alla capacità di risolvere problemi in corsa. Anche questo sito è nato dalla stessa voglia di sperimentare, progettato e sviluppato in autonomia durante il viaggio.", overlandThree: "Scegliere un veicolo adatto sarebbe sicuramente più semplice. Ma il budget a disposizione non lo permette e il tutto sarebbe anche molto meno interessante.", maps: "Maps", projectTitle: "Low-budget<br>overland in<br><em>inappropriate<br>vehicles.</em>", showProject: "Show the Project", build: "Build in progress", soon: "Coming soon", pandaModel: "Modello 3D di Panda Anna", pandaFallback: "Il 3D non si è caricato. Ricarica la pagina oppure apri la preview nel browser.", vehicleSelection: "Selezione veicoli", controls: "Controlli selezione veicoli", chooseVehicle: "Scegli un veicolo", swipeHint: "Scorri",
      vehicle: "Panda Anna", pandannaKicker: "Panda Project / Veicolo 01", medium: "Il mezzo", journey: "Il viaggio", curiosities: "Curiosità", pandannaIntro: "La seconda Panda che compro e restauro. Questa volta, però, l’idea è spingerla ben oltre ogni limite! Partire quasi senza soldi, usarla come un normalissimo camper e, a tratti, come un mezzo adatto all’off-road estremo.", spoiler: "Spoiler: non lo è.", mediumOne: "Una Panda 4×4 del 1998, comprata quasi morta e restaurata in giardino da qualcuno che meccanico non è.", mediumTwo: "Alla base, l’idea che chiunque può fare qualsiasi cosa, se è abbastanza testardo o irresponsabile da provarci.", mediumThree: "Con circa 7.000€ tra acquisto, restauro ed equipaggiamento, Pandanna è tornata in vita! Una specie di Frankenstein su quattro ruote, abbastanza inquietante da risultare affascinante.", journeyOne: "Sono partito il 4 maggio con 900 euro in tasca.", journeyTwo: "Destinazione? Non definita.<br>Limite di tempo? Assolutamente no.<br>Buonsenso? Nemmeno.", journeyThree: "Per ora Pandanna ha attraversato:", countries: "Italia · Grecia · Turchia · Georgia · Russia · Kazakistan · Uzbekistan · Kirghizistan · Tagikistan", journeyFour: "Adesso sto provando a riportarla in Italia passando da Mosca ed entrando in Europa dalla Lettonia.", curiosityOne: "ha partecipato alla realizzazione di un documentario per la televisione svizzera;", curiosityTwo: "ha attraversato una delle valli più impervie ed estreme dell’Asia Centrale;", curiosityThree: "ha lavorato come mezzo di trasporto per Burberry Georgia.", myMaps: "Le mie mappe", liveLocation: "Posizione live", findPanda: "Ritrova la Panda", back: "← Back", photos: "Foto", backJournal: "← Journal", travelPhotos: "Foto dal viaggio"
    },
    en: {
      language: "Language", chooseLanguage: "Choose your language", languageIntro: "You can change it at any time from the top bar.", menu: "Menu", home: "Home", projects: "Projects", explore: "Explore", about: "About", aboutOne: "Panda Project is a workshop for absurd, slightly ramshackle projects.", aboutTwo: "Ideas built without extensive planning, specific expertise or major investment: you start with what you have and learn everything else along the way.", aboutThree: "It was born as a way to push back against a pre-written life, one in which what you want is constantly postponed while waiting for the right moment.", aboutFour: "The name comes from the first project that truly came to life: a 1998 Fiat Panda 4×4, restored with no mechanical experience at all, between a day job and evening shifts behind a bar counter.", aboutFive: "But Panda Project neither begins nor ends with a car or a journey.", aboutSix: "The Panda is only the first idea, among thousands, to have lasted long enough to become something real.", aboutSeven: "The common thread is simple: take a questionable idea seriously for long enough to discover what it can become.", aboutEight: "Or how many problems it can cause.", overlandTitle: "Why travel overland in unsuitable vehicles?", overlandOne: "Because an unsuitable vehicle turns every trip into a project and a mission. It lets you work on the vehicle’s mechanics, invent solutions, learn, and crash into the hard reality of your own limits.", overlandTwo: "Overlanding tests very different skills, from organization to the ability to solve problems on the move. This website, too, was born from the same desire to experiment, designed and developed independently during the journey.", overlandThree: "Choosing a suitable vehicle would certainly be easier. But the available budget does not allow it, and everything would be far less interesting.", maps: "Maps", projectTitle: "Low-budget<br>overland in<br><em>inappropriate<br>vehicles.</em>", showProject: "Show the Project", build: "Build in progress", soon: "Coming soon", pandaModel: "3D model of Panda Anna", pandaFallback: "The 3D model did not load. Reload the page or open the preview in your browser.", vehicleSelection: "Vehicle selection", controls: "Vehicle selection controls", chooseVehicle: "Choose a vehicle", swipeHint: "Swipe",
      vehicle: "Panda Anna", pandannaKicker: "Panda Project / Vehicle 01", medium: "The vehicle", journey: "The journey", curiosities: "Curiosities", pandannaIntro: "The second Panda I bought and restored. This time, though, the idea was to push it well beyond every limit: leave with almost no money, use it as an ordinary camper and, at times, as a vehicle for extreme off-road driving.", spoiler: "Spoiler: it isn't.", mediumOne: "A 1998 Panda 4×4, bought almost dead and restored in a garden by someone who is not a mechanic.", mediumTwo: "At its core is the idea that anyone can do anything, if they are stubborn or irresponsible enough to try.", mediumThree: "With about €7,000 for purchase, restoration and equipment, Pandanna came back to life: a kind of four-wheeled Frankenstein, unsettling enough to be fascinating.", journeyOne: "I left on 4 May with €900 in my pocket.", journeyTwo: "Destination? Undefined.<br>Time limit? Absolutely none.<br>Common sense? None either.", journeyThree: "So far, Pandanna has crossed:", countries: "Italy · Greece · Turkey · Georgia · Russia · Kazakhstan · Uzbekistan · Kyrgyzstan · Tajikistan", journeyFour: "I am now trying to bring it back to Italy via Moscow, entering Europe through Latvia.", curiosityOne: "took part in the making of a documentary for Swiss television;", curiosityTwo: "crossed one of the most remote and extreme valleys in Central Asia;", curiosityThree: "worked as transport for Burberry Georgia.", myMaps: "My maps", liveLocation: "Live location", findPanda: "Find the Panda", backHome: "← Home", photos: "Photos", backJournal: "← Journal", travelPhotos: "Travel photos"
    },
    ru: {
      language: "Язык", chooseLanguage: "Выберите язык", languageIntro: "Его можно изменить в любой момент в верхней панели.", menu: "Меню", home: "Главная", projects: "Проекты", explore: "Исследовать", about: "About", aboutOne: "Panda Project — это лаборатория абсурдных и немного сумбурных проектов.", aboutTwo: "Идеи создаются без тщательного планирования, специальных навыков или крупных вложений: начинаешь с того, что есть, а всему остальному учишься по пути.", aboutThree: "Он появился как способ противостоять жизни, уже расписанной заранее, где желаемое постоянно откладывается в ожидании подходящего момента.", aboutFour: "Название пришло от первого проекта, который действительно воплотился в жизнь: Fiat Panda 4×4 1998 года, восстановленной без каких-либо механических навыков, между дневной работой и вечерними сменами за барной стойкой.", aboutFive: "Но Panda Project не начинается и не заканчивается машиной или путешествием.", aboutSix: "Panda — лишь первая из тысяч идей, продержавшаяся достаточно долго, чтобы стать чем-то реальным.", aboutSeven: "Общая идея проста: относиться к сомнительной задумке серьёзно достаточно долго, чтобы узнать, чем она может стать.", aboutEight: "Или сколько проблем она может вызвать.", overlandTitle: "Почему стоит путешествовать оверлендом на неподходящих автомобилях?", overlandOne: "Потому что неподходящий автомобиль превращает каждую поездку в проект и миссию. Он позволяет работать с механикой автомобиля, придумывать решения, учиться и сталкиваться с суровой реальностью собственных ограничений.", overlandTwo: "Оверлендинг проверяет самые разные навыки — от организации до умения решать проблемы на ходу. Этот сайт тоже родился из того же желания экспериментировать: он был самостоятельно спроектирован и разработан во время путешествия.", overlandThree: "Выбрать подходящий автомобиль, безусловно, было бы проще. Но доступный бюджет этого не позволяет, да и всё было бы гораздо менее интересно.", maps: "Карты", projectTitle: "Бюджетный<br>оверлендинг на<br><em>неподходящих<br>автомобилях.</em>", showProject: "Открыть проект", build: "Проект в работе", soon: "Скоро", pandaModel: "3D-модель Panda Anna", pandaFallback: "3D-модель не загрузилась. Перезагрузите страницу или откройте сайт в браузере.", vehicleSelection: "Выбор автомобиля", controls: "Управление выбором автомобиля", chooseVehicle: "Выберите автомобиль", swipeHint: "Листайте",
      vehicle: "Panda Anna", pandannaKicker: "Panda Project / Автомобиль 01", medium: "Автомобиль", journey: "Путешествие", curiosities: "Интересные факты", pandannaIntro: "Это вторая Panda, которую я купил и восстановил. На этот раз идея была в том, чтобы зайти далеко за пределы разумного: отправиться почти без денег, использовать её как обычный кемпер, а иногда — как машину для экстремального бездорожья.", spoiler: "Спойлер: это не так.", mediumOne: "Panda 4×4 1998 года, купленная почти мёртвой и восстановленная в саду человеком, который вовсе не механик.", mediumTwo: "В основе — мысль о том, что любой может сделать что угодно, если достаточно упрям или безответственен, чтобы попробовать.", mediumThree: "Примерно за 7 000 евро — покупка, восстановление и снаряжение — Pandanna вернулась к жизни. Что-то вроде четырёхколёсного Франкенштейна: достаточно пугающая, чтобы быть обаятельной.", journeyOne: "Я отправился в путь 4 мая, имея в кармане 900 евро.", journeyTwo: "Пункт назначения? Не определён.<br>Ограничение по времени? Совершенно нет.<br>Здравый смысл? Тоже нет.", journeyThree: "Пока Pandanna проехала через:", countries: "Италия · Греция · Турция · Грузия · Россия · Казахстан · Узбекистан · Кыргызстан · Таджикистан", journeyFour: "Сейчас я пытаюсь вернуть её в Италию через Москву, въезжая в Европу со стороны Латвии.", curiosityOne: "участвовала в создании документального фильма для швейцарского телевидения;", curiosityTwo: "пересекла одну из самых труднодоступных и экстремальных долин Центральной Азии;", curiosityThree: "работала транспортом для Burberry Georgia.", myMaps: "Мои карты", liveLocation: "Текущая позиция", findPanda: "Найти Panda", backHome: "← Главная", photos: "Фото", backJournal: "← Журнал", travelPhotos: "Фото из путешествия"
    },
    de: {
      language: "Sprache", chooseLanguage: "Sprache wählen", languageIntro: "Du kannst sie jederzeit über die obere Leiste ändern.", menu: "Menü", home: "Home", projects: "Projekte", explore: "Entdecken", about: "About", aboutOne: "Panda Project ist ein Labor für absurde und etwas chaotische Projekte.", aboutTwo: "Ideen entstehen ohne große Planung, spezielle Kenntnisse oder bedeutende Investitionen: Man beginnt mit dem, was man hat, und lernt alles Weitere unterwegs.", aboutThree: "Es entstand als Gegenentwurf zu einem bereits vorgeschriebenen Leben, in dem Wünsche immer wieder auf den richtigen Moment verschoben werden.", aboutFour: "Der Name stammt vom ersten Projekt, das wirklich Wirklichkeit wurde: einem Fiat Panda 4×4 von 1998, der ohne jegliche Mechanikkenntnisse restauriert wurde – zwischen einem Tagesjob und Abendschichten hinter der Theke einer Bar.", aboutFive: "Doch Panda Project beginnt und endet nicht mit einem Auto oder einer Reise.", aboutSix: "Der Panda ist nur die erste von Tausenden Ideen, die lange genug durchgehalten hat, um etwas Reales zu werden.", aboutSeven: "Der rote Faden ist einfach: Eine fragwürdige Idee lange genug ernst nehmen, um herauszufinden, was aus ihr werden kann.", aboutEight: "Oder wie viele Probleme sie verursachen kann.", overlandTitle: "Warum mit ungeeigneten Fahrzeugen overlanden?", overlandOne: "Weil ein ungeeignetes Fahrzeug jede Reise in ein Projekt und eine Mission verwandelt. Es ermöglicht, an der Mechanik zu arbeiten, Lösungen zu erfinden, zu lernen und auf die harte Realität der eigenen Grenzen zu prallen.", overlandTwo: "Overlanding stellt sehr unterschiedliche Fähigkeiten auf die Probe — von der Organisation bis zur Fähigkeit, Probleme unterwegs zu lösen. Auch diese Website entstand aus demselben Wunsch zu experimentieren und wurde während der Reise eigenständig konzipiert und entwickelt.", overlandThree: "Ein geeignetes Fahrzeug zu wählen wäre sicherlich einfacher. Doch das verfügbare Budget lässt es nicht zu, und alles wäre auch viel weniger interessant.", maps: "Maps", projectTitle: "Low-budget<br>overland in<br><em>inappropriate<br>vehicles.</em>", showProject: "Show the Project", build: "Build in progress", soon: "Coming soon", pandaModel: "3D-Modell von Panda Anna", pandaFallback: "Das 3D-Modell wurde nicht geladen. Lade die Seite neu oder öffne die Vorschau im Browser.", vehicleSelection: "Fahrzeugauswahl", controls: "Steuerung der Fahrzeugauswahl", chooseVehicle: "Fahrzeug auswählen", swipeHint: "Wischen",
      vehicle: "Panda Anna", pandannaKicker: "Panda Project / Vehicle 01", medium: "Das Fahrzeug", journey: "Die Reise", curiosities: "Kuriositäten", pandannaIntro: "Die zweite Panda, die ich gekauft und restauriert habe. Diesmal war die Idee, sie weit über jede Grenze hinauszubringen: fast ohne Geld loszufahren, sie als ganz normalen Camper zu nutzen und zeitweise als Fahrzeug für extremes Offroad-Fahren.", spoiler: "Spoiler: Sie ist es nicht.", mediumOne: "Eine Panda 4×4 von 1998, fast tot gekauft und im Garten von jemandem restauriert, der kein Mechaniker ist.", mediumTwo: "Dahinter steckt die Idee, dass jeder alles schaffen kann, wenn man stur oder verantwortungslos genug ist, es zu versuchen.", mediumThree: "Mit rund 7.000 € für Kauf, Restaurierung und Ausrüstung ist Pandanna wieder zum Leben erwacht: eine Art Frankenstein auf vier Rädern, beunruhigend genug, um faszinierend zu sein.", journeyOne: "Am 4. Mai bin ich mit 900 € in der Tasche aufgebrochen.", journeyTwo: "Ziel? Nicht festgelegt.<br>Zeitlimit? Absolut keines.<br>Gesunder Menschenverstand? Auch nicht.", journeyThree: "Bisher ist Pandanna durch diese Länder gefahren:", countries: "Italien · Griechenland · Türkei · Georgien · Russland · Kasachstan · Usbekistan · Kirgisistan · Tadschikistan", journeyFour: "Jetzt versuche ich, sie über Moskau zurück nach Italien zu bringen und über Lettland nach Europa einzureisen.", curiosityOne: "wirkte an einer Dokumentation für das Schweizer Fernsehen mit;", curiosityTwo: "durchquerte eines der abgelegensten und extremsten Täler Zentralasiens;", curiosityThree: "arbeitete als Transportfahrzeug für Burberry Georgia.", myMaps: "Meine Karten", liveLocation: "Live-Standort", findPanda: "Panda finden", backHome: "← Home", photos: "Fotos", backJournal: "← Journal", travelPhotos: "Reisefotos"
    }
  };

  const css = `
    .language-modal{position:fixed;z-index:100;inset:0;display:grid;place-items:center;padding:20px;background:rgba(36,35,34,.78);backdrop-filter:blur(5px)}.language-modal[hidden]{display:none}.language-modal__panel{position:relative;width:min(420px,100%);padding:clamp(25px,5vw,46px);border:1px solid var(--line);background:var(--paper);box-shadow:0 18px 48px rgba(0,0,0,.35)}.language-modal__close{position:absolute;top:14px;right:16px;border:0;background:transparent;color:var(--acid);font-size:26px;cursor:pointer}.language-modal h2{font-size:clamp(38px,8vw,62px)}.language-modal p{max-width:28ch;margin:18px 0 30px;color:var(--muted);font-size:13px;line-height:1.5}.language-options{display:grid;gap:9px}.language-option{display:flex;align-items:center;justify-content:space-between;min-height:54px;padding:12px 14px;border:1px solid var(--line);background:transparent;color:var(--ink);font:500 18px "Space Grotesk",sans-serif;letter-spacing:-.04em;cursor:pointer}.language-option:hover,.language-option.is-active{border-color:var(--acid);color:var(--acid)}.language-option span{color:var(--muted);font:600 10px Poppins,sans-serif;letter-spacing:.1em;text-transform:uppercase}@media(max-width:680px){.language-modal__panel{padding:28px 22px}.language-modal p{margin-block:14px 22px}}
  `;

  const socialLinksMarkup = `<a class="social-button social-button--instagram" href="https://www.instagram.com/lucaorlandi____/" target="_blank" rel="noreferrer" aria-label="Apri Instagram di Panda Project"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.25 2h9.5A5.25 5.25 0 0 1 22 7.25v9.5A5.25 5.25 0 0 1 16.75 22h-9.5A5.25 5.25 0 0 1 2 16.75v-9.5A5.25 5.25 0 0 1 7.25 2Zm0 2A3.25 3.25 0 0 0 4 7.25v9.5A3.25 3.25 0 0 0 7.25 20h9.5A3.25 3.25 0 0 0 20 16.75v-9.5A3.25 3.25 0 0 0 16.75 4h-9.5ZM12 6.85A5.15 5.15 0 1 1 6.85 12 5.16 5.16 0 0 1 12 6.85Zm0 2A3.15 3.15 0 1 0 15.15 12 5.16 5.16 0 0 1 12 8.85ZM17.36 5.3a1.23 1.23 0 1 1-1.23 1.23 1.23 1.23 0 0 1 1.23-1.23Z" /></svg></a><a class="social-button social-button--youtube" href="https://www.youtube.com/@PandaProject-Luca" target="_blank" rel="noreferrer" aria-label="Apri YouTube di Panda Project"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.58 7.19a2.99 2.99 0 0 0-2.1-2.12C17.63 4.57 12 4.57 12 4.57s-5.63 0-7.48.5a3 3 0 0 0-2.1 2.12A31.1 31.1 0 0 0 1.92 12a31.1 31.1 0 0 0 .5 4.81 3 3 0 0 0 2.1 2.12c1.85.5 7.48.5 7.48.5s5.63 0 7.48-.5a2.99 2.99 0 0 0 2.1-2.12 31.1 31.1 0 0 0 .5-4.81 31.1 31.1 0 0 0-.5-4.81ZM10.2 14.95V9.05L15.4 12l-5.2 2.95Z" /></svg></a>`;

  const apply = (language) => {
    const values = copy[language] || copy.it;
    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = values[element.dataset.i18n];
      if (!value) return;
      if (element.dataset.i18nHtml !== undefined) element.innerHTML = value;
      else {
        const firstText = [...element.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
        if (firstText) firstText.nodeValue = `${value} `;
        else element.textContent = value;
      }
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      const value = values[element.dataset.i18nAria];
      if (value) element.setAttribute("aria-label", value);
    });
    const toggle = document.querySelector(".language-toggle");
    if (toggle) {
      toggle.firstChild.nodeValue = `${values.language} `;
      toggle.querySelector("strong").textContent = language.toUpperCase();
    }
    document.querySelectorAll(".language-option").forEach((button) => button.classList.toggle("is-active", button.dataset.language === language));
  };

  const createUi = () => {
    document.head.append(Object.assign(document.createElement("style"), { textContent: css }));
    const header = document.querySelector(".quick-nav");
    if (!header) return;
    const isHome = document.body.classList.contains("home-page");
    const path = window.location.pathname;
    const projectPath = path.split("/proposta-partner/")[1] || "";
    const segments = projectPath.split("/").filter(Boolean);
    const folders = path.endsWith("/") ? segments : segments.slice(0, -1);
    const root = folders.map(() => "../").join("") || "./";

    let socialLinks = header.querySelector(".social-links");
    if (!socialLinks) {
      header.querySelectorAll(":scope > .social-button").forEach((button) => button.remove());
      socialLinks = document.createElement("div");
      socialLinks.className = "social-links";
      header.append(socialLinks);
    }
    socialLinks.className = "social-links";
    socialLinks.setAttribute("aria-label", "Canali Panda Project");
    socialLinks.innerHTML = socialLinksMarkup;

    if (!isHome && !header.querySelector(".map-back")) {
      const back = document.createElement("a");
      back.className = "map-back";
      back.href = `${root}index.html`;
      back.dataset.i18n = "back";
      back.textContent = "← Back";
      header.append(back);
    }

    header.querySelectorAll(".map-back").forEach((back) => {
      back.dataset.i18n = "back";
      back.textContent = "← Back";
      back.addEventListener("click", (event) => {
        if (window.history.length > 1) {
          event.preventDefault();
          window.history.back();
        }
      });
    });

    let menu = header.querySelector(".menu-button");
    let actions = header.querySelector(".header-actions");
    if (!actions) {
      actions = document.createElement("div");
      actions.className = "header-actions";
    }
    if (!menu) {
      menu = document.createElement("button");
      menu.type = "button";
      menu.className = "menu-button";
      menu.id = "menu-button";
      menu.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-controls", "site-menu");
      menu.dataset.i18n = "menu";
      menu.innerHTML = `Menu <span aria-hidden="true">+</span>`;
    }
    actions.append(menu);
    header.append(actions);

    if (!document.querySelector("#site-menu")) {
      const siteMenu = document.createElement("aside");
      siteMenu.className = "site-menu";
      siteMenu.id = "site-menu";
      siteMenu.setAttribute("aria-hidden", "true");
      siteMenu.innerHTML = `<div class="site-menu__top"><span>Panda Project</span><button id="menu-close" type="button" aria-label="Chiudi menu">×</button></div><nav aria-label="Sezioni del progetto"><a href="${root}index.html" data-i18n="home">Home</a><span class="site-menu__label" data-i18n="projects">Progetti</span><a href="${root}projects/pandanna/index.html">Pandanna</a><span class="site-menu__label" data-i18n="explore">Esplora</span><a href="${root}maps/index.html" data-i18n="maps">Maps</a><a href="${root}about/" data-i18n="about">About</a></nav>`;
      document.body.append(siteMenu);
    }

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "language-toggle";
    toggle.innerHTML = `${copy.it.language} <strong>IT</strong>`;
    menu.parentElement.insertBefore(toggle, menu);
    const modal = document.createElement("div");
    modal.className = "language-modal";
    modal.hidden = true;
    modal.innerHTML = `<div class="language-modal__panel" role="dialog" aria-modal="true" aria-labelledby="language-title"><button class="language-modal__close" type="button" aria-label="Chiudi">×</button><h2 id="language-title" data-i18n="chooseLanguage">Scegli la lingua</h2><p data-i18n="languageIntro">Puoi modificarla in qualsiasi momento dalla barra in alto.</p><div class="language-options">${Object.entries(languages).map(([code, language]) => `<button class="language-option" type="button" data-language="${code}">${language.native}<span>${code.toUpperCase()}</span></button>`).join("")}</div></div>`;
    document.body.append(modal);
    const open = () => {
      modal.hidden = false;
      modal.querySelector(".language-modal__close").focus();
    };
    const close = () => {
      modal.hidden = true;
      toggle.focus();
    };
    toggle.addEventListener("click", open);
    modal.querySelector(".language-modal__close").addEventListener("click", close);
    modal.addEventListener("click", (event) => { if (event.target === modal) close(); });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !modal.hidden) close(); });
    modal.querySelectorAll(".language-option").forEach((button) => button.addEventListener("click", () => {
      const language = button.dataset.language;
      localStorage.setItem(storeKey, language);
      apply(language);
      close();
    }));
    const saved = localStorage.getItem(storeKey);
    apply(saved || "it");
    if (!saved) open();
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", createUi);
  else createUi();
})();
