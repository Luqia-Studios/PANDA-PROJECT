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
      language: "Lingua", chooseLanguage: "Scegli la lingua", languageIntro: "Puoi modificarla in qualsiasi momento dalla barra in alto.", menu: "Menu", home: "Home", projects: "Progetti", explore: "Esplora", gallery: "Galleria", support: "Sostieni il progetto", maps: "Maps", projectTitle: "Low-budget<br>overland in<br><em>inappropriate<br>vehicles.</em>", showProject: "Show the Project", build: "Build in progress", soon: "Coming soon", pandaModel: "Modello 3D di Panda Anna", pandaFallback: "Il 3D non si è caricato. Ricarica la pagina oppure apri la preview nel browser.", vehicleSelection: "Selezione veicoli", controls: "Controlli selezione veicoli", chooseVehicle: "Scegli un veicolo",
      vehicle: "Panda Anna", pandannaKicker: "Panda Project / Veicolo 01", medium: "Il mezzo", journey: "Il viaggio", curiosities: "Curiosità", pandannaIntro: "La seconda Panda che compro e restauro. Questa volta, però, l’idea è spingerla ben oltre ogni limite! Partire quasi senza soldi, usarla come un normalissimo camper e, a tratti, come un mezzo adatto all’off-road estremo.", spoiler: "Spoiler: non lo è.", mediumOne: "Una Panda 4×4 del 1998, comprata quasi morta e restaurata in giardino da qualcuno che meccanico non è.", mediumTwo: "Alla base, l’idea che chiunque può fare qualsiasi cosa, se è abbastanza testardo o irresponsabile da provarci.", mediumThree: "Con circa 7.000€ tra acquisto, restauro ed equipaggiamento, Pandanna è tornata in vita! Una specie di Frankenstein su quattro ruote, abbastanza inquietante da risultare affascinante.", journeyOne: "Sono partito il 4 maggio con 900 euro in tasca.", journeyTwo: "Destinazione? Non definita.<br>Limite di tempo? Assolutamente no.<br>Buonsenso? Nemmeno.", journeyThree: "Per ora Pandanna ha attraversato:", countries: "Italia · Grecia · Turchia · Georgia · Russia · Kazakistan · Uzbekistan · Kirghizistan · Tagikistan", journeyFour: "Adesso sto provando a riportarla in Italia passando da Mosca ed entrando in Europa dalla Lettonia.", curiosityOne: "ha partecipato alla realizzazione di un documentario per la televisione svizzera;", curiosityTwo: "ha attraversato una delle valli più impervie ed estreme dell’Asia Centrale;", curiosityThree: "ha lavorato come mezzo di trasporto per Burberry Georgia.", myMaps: "Le mie mappe", liveLocation: "Posizione live", findPanda: "Ritrova la Panda", backHome: "← Home", photos: "Foto", backJournal: "← Journal", travelPhotos: "Foto dal viaggio"
    },
    en: {
      language: "Language", chooseLanguage: "Choose your language", languageIntro: "You can change it at any time from the top bar.", menu: "Menu", home: "Home", projects: "Projects", explore: "Explore", gallery: "Gallery", support: "Support the project", maps: "Maps", projectTitle: "Low-budget<br>overland in<br><em>inappropriate<br>vehicles.</em>", showProject: "Show the Project", build: "Build in progress", soon: "Coming soon", pandaModel: "3D model of Panda Anna", pandaFallback: "The 3D model did not load. Reload the page or open the preview in your browser.", vehicleSelection: "Vehicle selection", controls: "Vehicle selection controls", chooseVehicle: "Choose a vehicle",
      vehicle: "Panda Anna", pandannaKicker: "Panda Project / Vehicle 01", medium: "The vehicle", journey: "The journey", curiosities: "Curiosities", pandannaIntro: "The second Panda I bought and restored. This time, though, the idea was to push it well beyond every limit: leave with almost no money, use it as an ordinary camper and, at times, as a vehicle for extreme off-road driving.", spoiler: "Spoiler: it isn't.", mediumOne: "A 1998 Panda 4×4, bought almost dead and restored in a garden by someone who is not a mechanic.", mediumTwo: "At its core is the idea that anyone can do anything, if they are stubborn or irresponsible enough to try.", mediumThree: "With about €7,000 for purchase, restoration and equipment, Pandanna came back to life: a kind of four-wheeled Frankenstein, unsettling enough to be fascinating.", journeyOne: "I left on 4 May with €900 in my pocket.", journeyTwo: "Destination? Undefined.<br>Time limit? Absolutely none.<br>Common sense? None either.", journeyThree: "So far, Pandanna has crossed:", countries: "Italy · Greece · Turkey · Georgia · Russia · Kazakhstan · Uzbekistan · Kyrgyzstan · Tajikistan", journeyFour: "I am now trying to bring it back to Italy via Moscow, entering Europe through Latvia.", curiosityOne: "took part in the making of a documentary for Swiss television;", curiosityTwo: "crossed one of the most remote and extreme valleys in Central Asia;", curiosityThree: "worked as transport for Burberry Georgia.", myMaps: "My maps", liveLocation: "Live location", findPanda: "Find the Panda", backHome: "← Home", photos: "Photos", backJournal: "← Journal", travelPhotos: "Travel photos"
    },
    ru: {
      language: "Язык", chooseLanguage: "Выберите язык", languageIntro: "Его можно изменить в любой момент в верхней панели.", menu: "Меню", home: "Главная", projects: "Проекты", explore: "Исследовать", gallery: "Галерея", support: "Поддержать проект", maps: "Карты", projectTitle: "Бюджетный<br>оверлендинг на<br><em>неподходящих<br>автомобилях.</em>", showProject: "Открыть проект", build: "Проект в работе", soon: "Скоро", pandaModel: "3D-модель Panda Anna", pandaFallback: "3D-модель не загрузилась. Перезагрузите страницу или откройте сайт в браузере.", vehicleSelection: "Выбор автомобиля", controls: "Управление выбором автомобиля", chooseVehicle: "Выберите автомобиль",
      vehicle: "Panda Anna", pandannaKicker: "Panda Project / Автомобиль 01", medium: "Автомобиль", journey: "Путешествие", curiosities: "Интересные факты", pandannaIntro: "Это вторая Panda, которую я купил и восстановил. На этот раз идея была в том, чтобы зайти далеко за пределы разумного: отправиться почти без денег, использовать её как обычный кемпер, а иногда — как машину для экстремального бездорожья.", spoiler: "Спойлер: это не так.", mediumOne: "Panda 4×4 1998 года, купленная почти мёртвой и восстановленная в саду человеком, который вовсе не механик.", mediumTwo: "В основе — мысль о том, что любой может сделать что угодно, если достаточно упрям или безответственен, чтобы попробовать.", mediumThree: "Примерно за 7 000 евро — покупка, восстановление и снаряжение — Pandanna вернулась к жизни. Что-то вроде четырёхколёсного Франкенштейна: достаточно пугающая, чтобы быть обаятельной.", journeyOne: "Я отправился в путь 4 мая, имея в кармане 900 евро.", journeyTwo: "Пункт назначения? Не определён.<br>Ограничение по времени? Совершенно нет.<br>Здравый смысл? Тоже нет.", journeyThree: "Пока Pandanna проехала через:", countries: "Италия · Греция · Турция · Грузия · Россия · Казахстан · Узбекистан · Кыргызстан · Таджикистан", journeyFour: "Сейчас я пытаюсь вернуть её в Италию через Москву, въезжая в Европу со стороны Латвии.", curiosityOne: "участвовала в создании документального фильма для швейцарского телевидения;", curiosityTwo: "пересекла одну из самых труднодоступных и экстремальных долин Центральной Азии;", curiosityThree: "работала транспортом для Burberry Georgia.", myMaps: "Мои карты", liveLocation: "Текущая позиция", findPanda: "Найти Panda", backHome: "← Главная", photos: "Фото", backJournal: "← Журнал", travelPhotos: "Фото из путешествия"
    },
    de: {
      language: "Sprache", chooseLanguage: "Sprache wählen", languageIntro: "Du kannst sie jederzeit über die obere Leiste ändern.", menu: "Menü", home: "Home", projects: "Projekte", explore: "Entdecken", gallery: "Galerie", support: "Projekt unterstützen", maps: "Maps", projectTitle: "Low-budget<br>overland in<br><em>inappropriate<br>vehicles.</em>", showProject: "Show the Project", build: "Build in progress", soon: "Coming soon", pandaModel: "3D-Modell von Panda Anna", pandaFallback: "Das 3D-Modell wurde nicht geladen. Lade die Seite neu oder öffne die Vorschau im Browser.", vehicleSelection: "Fahrzeugauswahl", controls: "Steuerung der Fahrzeugauswahl", chooseVehicle: "Fahrzeug auswählen",
      vehicle: "Panda Anna", pandannaKicker: "Panda Project / Vehicle 01", medium: "Das Fahrzeug", journey: "Die Reise", curiosities: "Kuriositäten", pandannaIntro: "Die zweite Panda, die ich gekauft und restauriert habe. Diesmal war die Idee, sie weit über jede Grenze hinauszubringen: fast ohne Geld loszufahren, sie als ganz normalen Camper zu nutzen und zeitweise als Fahrzeug für extremes Offroad-Fahren.", spoiler: "Spoiler: Sie ist es nicht.", mediumOne: "Eine Panda 4×4 von 1998, fast tot gekauft und im Garten von jemandem restauriert, der kein Mechaniker ist.", mediumTwo: "Dahinter steckt die Idee, dass jeder alles schaffen kann, wenn man stur oder verantwortungslos genug ist, es zu versuchen.", mediumThree: "Mit rund 7.000 € für Kauf, Restaurierung und Ausrüstung ist Pandanna wieder zum Leben erwacht: eine Art Frankenstein auf vier Rädern, beunruhigend genug, um faszinierend zu sein.", journeyOne: "Am 4. Mai bin ich mit 900 € in der Tasche aufgebrochen.", journeyTwo: "Ziel? Nicht festgelegt.<br>Zeitlimit? Absolut keines.<br>Gesunder Menschenverstand? Auch nicht.", journeyThree: "Bisher ist Pandanna durch diese Länder gefahren:", countries: "Italien · Griechenland · Türkei · Georgien · Russland · Kasachstan · Usbekistan · Kirgisistan · Tadschikistan", journeyFour: "Jetzt versuche ich, sie über Moskau zurück nach Italien zu bringen und über Lettland nach Europa einzureisen.", curiosityOne: "wirkte an einer Dokumentation für das Schweizer Fernsehen mit;", curiosityTwo: "durchquerte eines der abgelegensten und extremsten Täler Zentralasiens;", curiosityThree: "arbeitete als Transportfahrzeug für Burberry Georgia.", myMaps: "Meine Karten", liveLocation: "Live-Standort", findPanda: "Panda finden", backHome: "← Home", photos: "Fotos", backJournal: "← Journal", travelPhotos: "Reisefotos"
    }
  };

  const css = `
    .language-toggle{display:inline-flex;align-items:center;gap:7px;height:38px;min-height:38px;padding:0;border:0;border-bottom:1px solid var(--line);background:transparent;color:var(--muted);font:600 11px Poppins,sans-serif;letter-spacing:.1em;line-height:1;text-transform:uppercase;cursor:pointer}.quick-nav .menu-button{height:38px;min-height:38px;padding-top:0;padding-bottom:0;line-height:1}.quick-nav>.language-toggle{margin-left:auto;margin-right:clamp(12px,1.6vw,24px)}.header-actions .language-toggle{margin-left:0}.language-toggle strong{color:var(--acid);font:500 13px "Space Grotesk",sans-serif}.language-toggle:hover{color:var(--acid)}
    .language-modal{position:fixed;z-index:100;inset:0;display:grid;place-items:center;padding:20px;background:rgba(36,35,34,.78);backdrop-filter:blur(5px)}.language-modal[hidden]{display:none}.language-modal__panel{position:relative;width:min(420px,100%);padding:clamp(25px,5vw,46px);border:1px solid var(--line);background:var(--paper);box-shadow:0 18px 48px rgba(0,0,0,.35)}.language-modal__close{position:absolute;top:14px;right:16px;border:0;background:transparent;color:var(--acid);font-size:26px;cursor:pointer}.language-modal h2{font-size:clamp(38px,8vw,62px)}.language-modal p{max-width:28ch;margin:18px 0 30px;color:var(--muted);font-size:13px;line-height:1.5}.language-options{display:grid;gap:9px}.language-option{display:flex;align-items:center;justify-content:space-between;min-height:54px;padding:12px 14px;border:1px solid var(--line);background:transparent;color:var(--ink);font:500 18px "Space Grotesk",sans-serif;letter-spacing:-.04em;cursor:pointer}.language-option:hover,.language-option.is-active{border-color:var(--acid);color:var(--acid)}.language-option span{color:var(--muted);font:600 10px Poppins,sans-serif;letter-spacing:.1em;text-transform:uppercase}@media(max-width:680px){.quick-nav>.language-toggle{margin-right:10px}.language-toggle,.quick-nav .menu-button{height:34px;min-height:34px}.language-toggle{font-size:10px}.language-modal__panel{padding:28px 22px}.language-modal p{margin-block:14px 22px}}
  `;

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
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "language-toggle";
    toggle.innerHTML = `${copy.it.language} <strong>IT</strong>`;
    const menu = header.querySelector(".menu-button");
    if (menu) menu.parentElement.insertBefore(toggle, menu); else header.append(toggle);
    const modal = document.createElement("div");
    modal.className = "language-modal";
    modal.hidden = true;
    modal.innerHTML = `<div class="language-modal__panel" role="dialog" aria-modal="true" aria-labelledby="language-title"><button class="language-modal__close" type="button" aria-label="Chiudi">×</button><h2 id="language-title" data-i18n="chooseLanguage">Scegli la lingua</h2><p data-i18n="languageIntro">Puoi modificarla in qualsiasi momento dalla barra in alto.</p><div class="language-options">${Object.entries(languages).map(([code, language]) => `<button class="language-option" type="button" data-language="${code}">${language.native}<span>${code.toUpperCase()}</span></button>`).join("")}</div></div>`;
    document.body.append(modal);
    const open = () => { modal.hidden = false; };
    const close = () => { modal.hidden = true; };
    toggle.addEventListener("click", open);
    modal.querySelector(".language-modal__close").addEventListener("click", close);
    modal.addEventListener("click", (event) => { if (event.target === modal) close(); });
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
