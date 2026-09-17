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
      language: "Lingua", chooseLanguage: "Scegli la lingua", languageIntro: "Puoi modificarla in qualsiasi momento dalla barra in alto.", menu: "Menu", home: "Home", backHome: "← Home", projects: "Progetti", explore: "Esplora", about: "About", aboutOne: "Panda Project è un laboratorio di progetti assurdi e un po’ sconclusionati.", aboutTwo: "Idee costruite senza grandi pianificazioni, competenze specifiche o investimenti importanti, si parte da ciò che si ha e si impara tutto il resto lungo il percorso.", aboutThree: "Nasce come forma di rivalsa verso una vita già scritta, nella quale ciò che si desidera viene continuamente rimandato in attesa del momento giusto.", aboutFour: "Il nome arriva dal primo progetto ad aver preso davvero vita: una Fiat Panda 4×4 del 1998, restaurata senza alcuna competenza meccanica, tra un impiego diurno e i turni serali dietro al bancone di un bar.", aboutFive: "Ma Panda Project non comincia e non finisce con una macchina o con un viaggio.", aboutSix: "La Panda è soltanto la prima idea, tra migliaia, ad aver resistito abbastanza a lungo da diventare qualcosa di reale.", aboutSeven: "Il filo conduttore è semplice. Prendere sul serio un’idea discutibile abbastanza a lungo da scoprire cosa può diventare.", aboutEight: "O quanti problemi può causare.", overlandTitle: "Perché viaggiare overland con veicoli inadatti?", overlandOne: "Perché un veicolo inadatto trasforma ogni viaggio in un progetto e una missione. Permette di lavorare sulla meccanica del veicolo, inventare soluzioni, imparare e schiantarsi contro la dura realtà dei propri limiti.", overlandTwo: "L’overland mette alla prova competenze molto diverse, dall’organizzazione alla capacità di risolvere problemi in corsa. Anche questo sito è nato dalla stessa voglia di sperimentare, progettato e sviluppato in autonomia durante il viaggio.", overlandThree: "Scegliere un veicolo adatto sarebbe sicuramente più semplice. Ma il budget a disposizione non lo permette e il tutto sarebbe anche molto meno interessante.", maps: "Maps", projectTitle: "Low-budget<br>overland in<br><em>inappropriate<br>vehicles.</em>", showProject: "Show the Project", build: "Build in progress", soon: "Coming soon", pandaModel: "Modello 3D di Panda Anna", pandaFallback: "Il 3D non si è caricato. Ricarica la pagina oppure apri la preview nel browser.", vehicleSelection: "Selezione veicoli", controls: "Controlli selezione veicoli", chooseVehicle: "Scegli un veicolo", swipeHint: "Scorri",
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

  const navigationCopy = {
    it: { gallery: "Galleria" },
    en: { gallery: "Gallery" },
    ru: { gallery: "Галерея" },
    de: { gallery: "Galerie" }
  };

  // Project names and established international names intentionally remain unchanged.
  Object.assign(copy.it, {
    about: "About", maps: "Mappe", projectTitle: "Overland<br>a basso costo con<br><em>veicoli<br>improbabili.</em>", showProject: "Scopri il progetto", build: "Progetto in corso", soon: "Prossimamente", back: "← Back", backHome: "← Home", gallery: "Galleria",
    aboutHeading: "Il progetto<br /><em>Panda.</em>", aboutBack: "Home", journal: "Diario", journalEntry: "Diario di bordo", galleryTitle: "Galleria", galleryHint: "Trascina per esplorare", loading: "Caricamento…", noData: "Dati non disponibili", liveNow: "ora", mapArea: "Mappa della posizione di Panda", mapsArea: "Mappe di Panda Project", journalArea: "Diario Panda Project", journalEntries: "Articoli del diario", socialChannels: "Canali Panda Project", galleryRail: "Fotografie del viaggio di Pandanna", galleryThumbnails: "Seleziona una fotografia", galleryDialog: "Visualizzazione a schermo intero", close: "Chiudi", closeMenu: "Chiudi menu", closeGallery: "Chiudi galleria", previousPhoto: "Fotografia precedente", nextPhoto: "Fotografia successiva", previousVehicle: "Veicolo precedente", nextVehicle: "Veicolo successivo", openPhoto: "Apri fotografia {current} di {total}", goToPhoto: "Vai alla fotografia {current}", photo: "Fotografia {current} di {total}", projectSections: "Sezioni del progetto", openProjectResources: "Apri le risorse di Panda Anna", instagram: "Apri Instagram di Panda Project", youtube: "Apri YouTube di Panda Project"
  });
  Object.assign(copy.en, {
    about: "About", maps: "Maps", projectTitle: "Low-budget<br>overland in<br><em>inappropriate<br>vehicles.</em>", showProject: "View project", build: "Project in progress", soon: "Coming soon", back: "← Back", backHome: "← Home", gallery: "Gallery",
    aboutHeading: "About<br /><em>the project.</em>", aboutBack: "Back to home", journal: "Journal", journalEntry: "Travel journal", galleryTitle: "Gallery", galleryHint: "Drag to explore", loading: "Loading…", noData: "No data available", liveNow: "now", mapArea: "Panda location map", mapsArea: "Panda Project maps", journalArea: "Panda Project journal", journalEntries: "Journal entries", socialChannels: "Panda Project channels", galleryRail: "Photos from Pandanna's journey", galleryThumbnails: "Select a photo", galleryDialog: "Full-screen viewer", close: "Close", closeMenu: "Close menu", closeGallery: "Close gallery", previousPhoto: "Previous photo", nextPhoto: "Next photo", previousVehicle: "Previous vehicle", nextVehicle: "Next vehicle", openPhoto: "Open photo {current} of {total}", goToPhoto: "Go to photo {current}", photo: "Photo {current} of {total}", projectSections: "Project sections", openProjectResources: "Open Panda Anna resources", instagram: "Open Panda Project Instagram", youtube: "Open Panda Project YouTube"
  });
  Object.assign(copy.ru, {
    about: "О проекте", maps: "Карты", projectTitle: "Бюджетный<br>оверлендинг на<br><em>неподходящих<br>автомобилях.</em>", showProject: "Открыть проект", build: "Проект в работе", soon: "Скоро", back: "← Назад", backHome: "← Главная", gallery: "Галерея",
    aboutHeading: "О<br /><em>проекте.</em>", aboutBack: "На главную", journal: "Дневник", journalEntry: "Дневник путешествия", galleryTitle: "Галерея", galleryHint: "Перетаскивайте, чтобы посмотреть", loading: "Загрузка…", noData: "Нет данных", liveNow: "сейчас", mapArea: "Карта местоположения Panda", mapsArea: "Карты Panda Project", journalArea: "Дневник Panda Project", journalEntries: "Записи дневника", socialChannels: "Каналы Panda Project", galleryRail: "Фотографии из путешествия Pandanna", galleryThumbnails: "Выберите фотографию", galleryDialog: "Полноэкранный просмотр", close: "Закрыть", closeMenu: "Закрыть меню", closeGallery: "Закрыть галерею", previousPhoto: "Предыдущее фото", nextPhoto: "Следующее фото", previousVehicle: "Предыдущий автомобиль", nextVehicle: "Следующий автомобиль", openPhoto: "Открыть фото {current} из {total}", goToPhoto: "Перейти к фото {current}", photo: "Фото {current} из {total}", projectSections: "Разделы проекта", openProjectResources: "Открыть материалы Panda Anna", instagram: "Открыть Instagram Panda Project", youtube: "Открыть YouTube Panda Project"
  });
  Object.assign(copy.de, {
    about: "Über das Projekt", maps: "Karten", projectTitle: "Günstiges<br>Overlanding mit<br><em>ungeeigneten<br>Fahrzeugen.</em>", showProject: "Projekt ansehen", build: "Projekt in Arbeit", soon: "Demnächst", back: "← Zurück", backHome: "← Startseite", gallery: "Galerie",
    aboutHeading: "Über<br /><em>das Projekt.</em>", aboutBack: "Zur Startseite", journal: "Tagebuch", journalEntry: "Reisetagebuch", galleryTitle: "Galerie", galleryHint: "Zum Erkunden ziehen", loading: "Wird geladen…", noData: "Keine Daten verfügbar", liveNow: "jetzt", mapArea: "Karte der Panda-Position", mapsArea: "Karten von Panda Project", journalArea: "Tagebuch von Panda Project", journalEntries: "Tagebucheinträge", socialChannels: "Kanäle von Panda Project", galleryRail: "Fotos von Pandannas Reise", galleryThumbnails: "Foto auswählen", galleryDialog: "Vollbildansicht", close: "Schließen", closeMenu: "Menü schließen", closeGallery: "Galerie schließen", previousPhoto: "Vorheriges Foto", nextPhoto: "Nächstes Foto", previousVehicle: "Vorheriges Fahrzeug", nextVehicle: "Nächstes Fahrzeug", openPhoto: "Foto {current} von {total} öffnen", goToPhoto: "Zu Foto {current} gehen", photo: "Foto {current} von {total}", projectSections: "Projektbereiche", openProjectResources: "Panda-Anna-Ressourcen öffnen", instagram: "Instagram von Panda Project öffnen", youtube: "YouTube von Panda Project öffnen"
  });
  Object.assign(copy.it, { vehicleOne: "Veicolo 1 di 4", buildVehicle: "Progetto in corso, veicolo 2 di 4", soonVehicleThree: "Prossimamente, veicolo 3 di 4", soonVehicleFour: "Prossimamente, veicolo 4 di 4", showPanda: "Mostra Panda Anna", showBuild: "Mostra progetto in corso", showSoon: "Mostra progetto in arrivo" });
  Object.assign(copy.en, { vehicleOne: "Vehicle 1 of 4", buildVehicle: "Project in progress, vehicle 2 of 4", soonVehicleThree: "Coming soon, vehicle 3 of 4", soonVehicleFour: "Coming soon, vehicle 4 of 4", showPanda: "Show Panda Anna", showBuild: "Show project in progress", showSoon: "Show upcoming project" });
  Object.assign(copy.ru, { vehicleOne: "Автомобиль 1 из 4", buildVehicle: "Проект в работе, автомобиль 2 из 4", soonVehicleThree: "Скоро, автомобиль 3 из 4", soonVehicleFour: "Скоро, автомобиль 4 из 4", showPanda: "Показать Panda Anna", showBuild: "Показать проект в работе", showSoon: "Показать будущий проект" });
  Object.assign(copy.de, { vehicleOne: "Fahrzeug 1 von 4", buildVehicle: "Projekt in Arbeit, Fahrzeug 2 von 4", soonVehicleThree: "Demnächst, Fahrzeug 3 von 4", soonVehicleFour: "Demnächst, Fahrzeug 4 von 4", showPanda: "Panda Anna anzeigen", showBuild: "Projekt in Arbeit anzeigen", showSoon: "Kommendes Projekt anzeigen" });

  const css = `
    .language-modal{position:fixed;z-index:100;inset:0;display:grid;place-items:center;padding:20px;background:rgba(36,35,34,.78);backdrop-filter:blur(5px);overflow-y:auto}.language-modal[hidden]{display:none}.language-modal__panel{position:relative;width:min(420px,100%);max-height:calc(100dvh - 40px);padding:clamp(25px,5vw,46px);border:1px solid var(--line);background:var(--paper);box-shadow:0 18px 48px rgba(0,0,0,.35);overflow-y:auto}.language-modal__close{position:absolute;top:14px;right:16px;border:0;background:transparent;color:var(--acid);font-size:26px;cursor:pointer}.language-modal h2{font-size:clamp(38px,8vw,62px)}.language-modal p{max-width:28ch;margin:18px 0 30px;color:var(--muted);font-size:13px;line-height:1.5}.language-options{display:grid;gap:9px}.language-option{display:flex;align-items:center;justify-content:space-between;min-height:54px;padding:12px 14px;border:1px solid var(--line);background:transparent;color:var(--ink);font:500 18px "Space Grotesk",sans-serif;letter-spacing:-.04em;cursor:pointer}.language-option:hover,.language-option.is-active{border-color:var(--acid);color:var(--acid)}.language-option span{color:var(--muted);font:600 10px Poppins,sans-serif;letter-spacing:.1em;text-transform:uppercase}@media(max-width:680px){.language-modal__panel{padding:28px 22px}.language-modal p{margin-block:14px 22px}}@media(max-height:600px){.language-modal{place-items:start center;padding:14px}.language-modal__panel{max-height:calc(100dvh - 28px);padding:18px 22px}.language-modal h2{font-size:clamp(32px,8vw,44px);line-height:.92}.language-modal p{margin:10px 0 14px}.language-options{gap:6px}.language-option{min-height:40px;padding:7px 12px;font-size:16px}}
  `;

  const socialLinksMarkup = `<a class="social-button social-button--instagram" href="https://www.instagram.com/lucaorlandi____/" target="_blank" rel="noreferrer" aria-label="Apri Instagram di Panda Project"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.25 2h9.5A5.25 5.25 0 0 1 22 7.25v9.5A5.25 5.25 0 0 1 16.75 22h-9.5A5.25 5.25 0 0 1 2 16.75v-9.5A5.25 5.25 0 0 1 7.25 2Zm0 2A3.25 3.25 0 0 0 4 7.25v9.5A3.25 3.25 0 0 0 7.25 20h9.5A3.25 3.25 0 0 0 20 16.75v-9.5A3.25 3.25 0 0 0 16.75 4h-9.5ZM12 6.85A5.15 5.15 0 1 1 6.85 12 5.16 5.16 0 0 1 12 6.85Zm0 2A3.15 3.15 0 1 0 15.15 12 5.16 5.16 0 0 1 12 8.85ZM17.36 5.3a1.23 1.23 0 1 1-1.23 1.23 1.23 1.23 0 0 1 1.23-1.23Z" /></svg></a><a class="social-button social-button--youtube" href="https://www.youtube.com/@PandaProject-Luca" target="_blank" rel="noreferrer" aria-label="Apri YouTube di Panda Project"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.58 7.19a2.99 2.99 0 0 0-2.1-2.12C17.63 4.57 12 4.57 12 4.57s-5.63 0-7.48.5a3 3 0 0 0-2.1 2.12A31.1 31.1 0 0 0 1.92 12a31.1 31.1 0 0 0 .5 4.81 3 3 0 0 0 2.1 2.12c1.85.5 7.48.5 7.48.5s5.63 0 7.48-.5a2.99 2.99 0 0 0 2.1-2.12 31.1 31.1 0 0 0 .5-4.81 31.1 31.1 0 0 0-.5-4.81ZM10.2 14.95V9.05L15.4 12l-5.2 2.95Z" /></svg></a>`;

  const apply = (language) => {
    const values = { ...copy.it, ...(copy[language] || {}), ...(navigationCopy[language] || navigationCopy.it) };
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
    document.querySelectorAll("[data-i18n-title]").forEach((element) => {
      const value = values[element.dataset.i18nTitle];
      if (value) element.title = value;
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
      const value = values[element.dataset.i18nAlt];
      if (value) element.alt = value;
    });
    window.PANDA_I18N = { language, values };
    document.dispatchEvent(new CustomEvent("panda-language-change", { detail: window.PANDA_I18N }));
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
    const isAbout = /\/about\/?$/.test(path);

    let socialLinks = header.querySelector(".social-links");
    if (!socialLinks) {
      header.querySelectorAll(":scope > .social-button").forEach((button) => button.remove());
      socialLinks = document.createElement("div");
      socialLinks.className = "social-links";
      header.append(socialLinks);
    }
    socialLinks.className = "social-links";
    socialLinks.dataset.i18nAria = "socialChannels";
    socialLinks.innerHTML = socialLinksMarkup;

    if (!isHome && !header.querySelector(".map-back")) {
      const back = document.createElement("a");
      back.className = "map-back";
      back.href = "/";
      back.dataset.i18n = "back";
      back.textContent = "← Indietro";
      header.append(back);
    }

    header.querySelectorAll(".map-back").forEach((back) => {
      back.dataset.i18n = "back";
      back.textContent = "← Indietro";
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
      const aboutLink = isAbout ? "" : `<a class="site-menu__about" href="/about/" data-i18n="about">Chi siamo</a>`;
      siteMenu.innerHTML = `<div class="site-menu__top"><span>Panda Project</span><button id="menu-close" type="button" data-i18n-aria="closeMenu">×</button></div><nav data-i18n-aria="projectSections"><a class="site-menu__home" href="/" data-i18n="home">Home</a>${aboutLink}<span class="site-menu__label" data-i18n="projects">Progetti</span><div class="site-menu__project-row"><a href="/projects/pandanna/">Panda Anna</a><button class="site-menu__project-toggle" type="button" aria-expanded="false" aria-controls="pandanna-explore-menu" data-i18n-aria="openProjectResources"><span aria-hidden="true">&gt;</span></button></div><div class="site-menu__explore-panel" id="pandanna-explore-menu" hidden><a class="site-menu__project-link" href="/maps/" data-i18n="maps">Mappe</a><a class="site-menu__project-link" href="/projects/pandanna/gallery/" data-i18n="gallery">Galleria</a></div></nav>`;
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
    modal.innerHTML = `<div class="language-modal__panel" role="dialog" aria-modal="true" aria-labelledby="language-title"><button class="language-modal__close" type="button" data-i18n-aria="close">×</button><h2 id="language-title" data-i18n="chooseLanguage">Scegli la lingua</h2><p data-i18n="languageIntro">Puoi modificarla in qualsiasi momento dalla barra in alto.</p><div class="language-options">${Object.entries(languages).map(([code, language]) => `<button class="language-option" type="button" data-language="${code}">${language.native}<span>${code.toUpperCase()}</span></button>`).join("")}</div></div>`;
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
