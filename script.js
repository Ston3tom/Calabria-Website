document.addEventListener('DOMContentLoaded', () => {
  setupSmoothScroll();
  setupI18n();
  measureHeaderHeight();
  setupHeroAnimation();
  setupWhyCalabriaAnimation();
  setupContactForm();
  setupDatePicker();
  initializeEmailJS();
  setupMobileOptimizations();
});

// EmailJS Configuration
const EMAILJS_CONFIG = {
  serviceId: 'service_z8u9hhd', // Replace with your EmailJS service ID
  templates: {
    en: 'template_n7cym2v', // English template ID
    it: 'template_n7cym2v', // Italian template ID 
    de: 'template_n7cym2v', // German template ID 
    cz: 'template_99y2afg'  // Czech template ID
  },
  publicKey: 'D8Gv9KKB3FaW3b9P5' // Replace with your EmailJS public key
};

// Get current language from localStorage or default to 'en'
function getCurrentLanguage() {
  return localStorage.getItem('lang') || 'en';
}

function initializeEmailJS() {
  // Initialize EmailJS with your public key
  emailjs.init(EMAILJS_CONFIG.publicKey);
}

function setupSmoothScroll() {
  const getOffset = () => getHeaderHeight();
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = getOffset();
        const rect = target.getBoundingClientRect();
        const absoluteTop = window.pageYOffset + rect.top;
        // Extra offset for contact section to ensure form is visible
        const extraOffset = href === '#contact' ? 30 : 8;
        const offsetTop = Math.max(absoluteTop - headerOffset - extraOffset, 0);
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        history.replaceState(null, '', href);
      }
    });
  });
}

let cachedHeaderHeight = 72;
function getHeaderHeight() { return cachedHeaderHeight; }
function measureHeaderHeight() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const set = () => {
    cachedHeaderHeight = Math.round(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--header-h', cachedHeaderHeight + 'px');
  };
  set();
  window.addEventListener('resize', set);
}

function setupI18n() {
  const defaultLang = 'en'; // Default to English if no language is saved
  const texts = getTranslations();
  const buttons = document.querySelectorAll('.lang-btn');
  
  // Load saved language from localStorage or use default
  const savedLang = localStorage.getItem('lang') || defaultLang;
  
  buttons.forEach(btn => btn.addEventListener('click', () => {
    const lang = btn.getAttribute('data-lang');
    if (!lang) return;
    localStorage.setItem('lang', lang);
    applyLang(lang, texts);
    buttons.forEach(b => b.classList.toggle('active', b === btn));
  }));
  
  // Apply saved language on page load
  applyLang(savedLang, texts);
  buttons.forEach(b => b.classList.toggle('active', b.getAttribute('data-lang') === savedLang));
}

function applyLang(lang, texts) {
  const dict = texts[lang] || texts.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    const value = key.split('.').reduce((acc, k) => (acc ? acc[k] : undefined), dict);
    if (typeof value === 'string') {
      // Only set text content, not placeholders for input fields
        el.textContent = value;
      }
  });
  
  // Handle placeholder attributes separately (only for textarea)
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (!key) return;
    const value = key.split('.').reduce((acc, k) => (acc ? acc[k] : undefined), dict);
    if (typeof value === 'string') {
      el.setAttribute('placeholder', value);
    }
  });
  
  // Handle optgroup labels
  document.querySelectorAll('optgroup[data-i18n-label]').forEach(el => {
    const key = el.getAttribute('data-i18n-label');
    if (!key) return;
    const value = key.split('.').reduce((acc, k) => (acc ? acc[k] : undefined), dict);
    if (typeof value === 'string') {
      el.setAttribute('label', value);
    }
  });
}

function getTranslations() {
  return {
    en: {
      brand: 'Calabria Essence',
      nav: { why: 'Why Calabria', about: 'About Us', beaches: 'Beaches', food: 'Food', culture: 'Culture', trips: 'Trips Information', itineraries: 'Itineraries', book: 'Book / Reserve' },
      hero: { title: 'Explore Calabria', subtitle: 'Experience Calabria through local\'s eyes' },
      why: { title: 'Why Calabria?', beach: 'Beaches', beach_desc: 'Immerse yourself in Calabria\'s stunning coastline, where untouched beaches meet crystal-clear waters.', food: 'Food', food_desc: 'Prepare your appetite — Calabria\'s deliciousness is a full-time job!', culture: 'Culture', culture_desc: 'Explore centuries of rich heritage, from ancient ruins to vibrant local traditions.' },
      about: { 
        title: 'About Us',
        previewTitle: 'Meet Lorenzo & Kristýna',
        previewText: 'An Italian–Czech couple bringing you authentic Calabria experiences through local\'s eyes.',
        clickToRead: 'Click to read our full story →',
        intro: 'Ciao & Ahoj! We\'re Lorenzo and Kristýna — an Italian–Czech couple who met, fell in love, and spent the last three years exploring the world together.',
        lorenzo: 'Lorenzo is the heartbeat of Calabria in our project — born and raised in Cosenza, with a childhood full of seaside summers, family recipes, and local stories.',
        kristyna: 'Kristýna comes from vibrant Prague and brings the curiosity, creativity, and traveler\'s instinct that always pushes us to look beyond the "usual" and discover the real soul of every place we visit.',
        travels: 'On our travels, something kept happening: no matter where we went, Lorenzo always ended up comparing everything to his home. Not because other places weren\'t beautiful — but because he realized how special Calabria truly is. The traditions, the flavours, the warmth of the people, the natural beauty… and the way locals experience their land every single day.',
        idea: 'That\'s when the idea was born. We wanted to create the kind of travel experience we always search for ourselves — one that lets you see a destination through the eyes of its people. Authentic restaurants recommended by locals. Beaches you reach by asking someone\'s nonno. Stories, recipes, and little discoveries that don\'t appear in any brochure.',
        decision: 'So we decided to bring Calabria to the world the same way Lorenzo grew up experiencing it: through the local\'s eyes.',
        today: 'Today, we\'re turning that vision into reality — inviting you to join us on a journey built on genuine encounters, local meals, hidden corners, and the true spirit of Southern Italy.',
        dream: 'This is our dream becoming real, and we\'d be genuinely grateful to have you be a part of it.',
        welcome: 'Benvenuti — let\'s explore Calabria together, through the eyes of the locals.',
        photoQuote: 'Through the eyes of the locals'
      },
      trips: { 
        title: 'Trip Services',
        exploreTitle: 'Itineraries',
        exploreIntro: 'Discover our 6-day Calabria experience, itinerary, activities, and pricing.',
        viewItineraries: 'View itineraries',
        itinerary: '6-day itinerary designed by locals (5night)',
        driver: 'Private driver during all stages of the itinerary',
        pension: 'Half pension',
        beaches: 'Different beach every day',
        activitiesTitle: 'Activities highlights:',
        wine: 'Vine tasting',
        boat: 'Boat day',
        pasta: 'PastaClass',
        snorkeling: 'Snorkeling',
        nature: 'Nature excursions',
        villages: 'Tour of historic villages',
        workshop: 'Workshop',
        hotels: 'Stays in Top hotels',
        photos: 'Photos',
        group: 'Small group (10 people max)'
      },
      contact: {
        title: 'Send Inquiry',
        firstName: 'First Name',
        lastName: 'Last Name',
        firstNamePlaceholder: 'Enter your first name',
        lastNamePlaceholder: 'Enter your last name',
        travellers: 'How many travellers?',
        oneTraveller: '1 traveller',
        twoTravellers: '2 travellers',
        threeTravellers: '3 travellers',
        fourTravellers: '4 travellers',
        fivePlusTravellers: '5+ travellers',
        explainInMessage: 'Will explain in additional message',
        tripPeriod: 'Select Trip Period',
        selectPeriod: '-- Select a trip period --',
        mayJune: 'May - June',
        june: 'June',
        july: 'July',
        period1: 'May 29 - June 3, 2025',
        period2: 'June 5-10, 2025',
        period3: 'June 12-17, 2025',
        period4: 'June 19-24, 2025',
        period5: 'June 26 - July 1, 2025',
        period6: 'July 3-8, 2025',
        period7: 'July 10-15, 2025',
        period8: 'July 17-22, 2025',
        period9: 'July 24-29, 2025',
        dateHint: 'Choose from available trip periods',
        email: 'Email Address',
        emailPlaceholder: 'your.email@example.com',
        phone: 'Phone Number',
        phonePlaceholder: '+1234567890 or (123) 456-7890',
        preferredContact: 'Preferred Contact Method',
        emailOnly: 'Email me',
        both: 'Both call and email',
        message: 'Additional Message',
        messagePlaceholder: 'Tell us about your travel preferences, special requests, or any questions you have...',
        discountCode: 'Discount Code',
        discountCodePlaceholder: 'Enter discount code',
        discountHint: 'Enter your discount code if you have one',
        submit: 'Send Inquiry'
      },
      beaches: {
        title: 'Calabria\'s Stunning Beaches',
        intro: 'Immerse yourself in Calabria\'s stunning coastline, where untouched beaches meet crystal-clear waters.',
        description: 'Calabria boasts some of Italy\'s most beautiful and pristine beaches. From the turquoise waters of Tropea to the hidden coves along the Ionian coast, each beach offers a unique experience. Discover secluded spots known only to locals, where you can truly unwind and connect with nature.',
        experience: 'During our trips, we\'ll take you to a different beach every day, each carefully selected for its beauty, accessibility, and authentic local character. Experience the Mediterranean at its finest.'
      },
      food: {
        title: 'Calabria\'s Culinary Delights',
        intro: 'Prepare your appetite — Calabria\'s deliciousness is a full-time job!',
        description: 'Calabrian cuisine is a celebration of fresh, local ingredients and time-honored traditions. From the famous \'nduja spicy spreadable sausage to fresh seafood caught daily, every meal tells a story. Experience authentic family recipes passed down through generations, prepared with love and the finest local ingredients.',
        experience: 'Join us for a PastaClass where you\'ll learn to make traditional pasta from scratch, visit local markets, and dine at restaurants recommended by locals. Taste the true essence of Calabria through its food.'
      },
      culture: {
        title: 'Calabria\'s Rich Heritage',
        intro: 'Explore centuries of rich heritage, from ancient ruins to vibrant local traditions.',
        description: 'Calabria is a land steeped in history, where ancient Greek colonies, Byzantine influences, and Norman architecture tell the story of civilizations that have called this region home. From the archaeological sites of Locri and Sybaris to the medieval villages perched on hilltops, every corner reveals layers of history.',
        experience: 'Experience living traditions through local festivals, artisan workshops, and encounters with the warm-hearted people of Calabria. Discover the stories, music, and crafts that have been preserved and passed down through generations.'
      },
      contactInfo: {
        title: 'Contact Us',
        instagram: 'Instagram',
        email: 'Email',
        facebook: 'Facebook',
        tiktok: 'TikTok'
      },
      itineraries: {
        pageTitle: 'Itineraries',
        heroTitle: 'Here is our itinerary',
        secretIngredient: 'Just the basics. As in every grandmother\'s recipe, there is always some secret ingredient that you can only discover by trying it.',
        afterTapping: 'Tap to explore',
        day1Title: 'Day 1',
        day1Desc: 'Pick up at Lamezia Terme · Evening walk in Pizzo with Tartufo',
        day2Title: 'Day 2',
        day2Desc: 'Morning in Reggio Calabria · Evening in Scilla',
        day3Title: 'Day 3',
        day3Desc: 'Day on the Costa Ionica · Historic museum · Wine tasting',
        day4Title: 'Day 4',
        day4Desc: 'From the diamond City to the secret arch · Pasta Class',
        day5Title: 'Day 5',
        day5Desc: 'Boat day in the "Costa degli Dei" · Snorkeling in Capo Vaticano · Afternoon in Tropea',
        day6Title: 'Day 6',
        day6Desc: 'Transport back to Lamezia Terme · End of the Experience',
        tripServicesTitle: 'Trip Services',
        svcItinerary: '6-day itinerary designed by locals (5 night)',
        svcDriver: 'Private driver during all stages of the itinerary',
        svcPension: 'Full pension',
        svcBeaches: 'Different beach every day',
        svcGroup: 'Small group (10 people max)',
        activitiesTitle: 'Activities highlights:',
        svcWine: 'Vine tasting',
        svcBoat: 'Boat day',
        svcPasta: 'PastaClass',
        svcSnorkeling: 'Snorkeling',
        svcNature: 'Nature excursions',
        svcVillages: 'Tour of historic villages',
        svcHotels: 'Stays in Top hotels',
        svcPhotos: 'Photos',
        priceDoubleLabel: 'Double and Family',
        priceDouble: '22.490 Kč per person',
        priceSingleLabel: 'Single traveler',
        priceSingle: '24.990 Kč'
      }
    },
    it: {
      brand: 'Calabria Essence',
      nav: { why: 'Perché Calabria', about: 'Chi siamo', beaches: 'Spiagge', food: 'Cibo', culture: 'Cultura', trips: 'Informazioni Viaggi', itineraries: 'Itinerari', book: 'Prenota / Riserva' },
      hero: { title: 'Esplora la Calabria', subtitle: 'Vivi la Calabria attraverso gli occhi dei local' },
      why: { title: 'Perché Calabria?', beach: 'Spiagge', beach_desc: 'Immergiti nella splendida costa calabrese, dove spiagge incontaminate incontrano acque cristalline.', food: 'Cibo', food_desc: 'Prepara il tuo appetito — le delizie della Calabria sono un lavoro a tempo pieno!', culture: 'Cultura', culture_desc: 'Esplora secoli di ricco patrimonio, dalle antiche rovine alle vivaci tradizioni locali.' },
      about: { 
        title: 'Chi siamo',
        previewTitle: 'Incontra Lorenzo & Kristýna',
        previewText: 'Una coppia italo-ceca che ti porta esperienze autentiche della Calabria attraverso gli occhi dei locali.',
        clickToRead: 'Clicca per leggere la nostra storia completa →',
        intro: 'Ciao & Ahoj! Siamo Lorenzo e Kristýna — una coppia italo-ceca che si è incontrata, si è innamorata e ha trascorso gli ultimi tre anni esplorando il mondo insieme.',
        lorenzo: 'Lorenzo è il cuore pulsante della Calabria nel nostro progetto — nato e cresciuto a Cosenza, con un\'infanzia piena di estati al mare, ricette di famiglia e storie locali.',
        kristyna: 'Kristýna viene dalla vibrante Praga e porta con sé la curiosità, la creatività e l\'istinto del viaggiatore che ci spinge sempre a guardare oltre il "solito" e a scoprire l\'anima vera di ogni luogo che visitiamo.',
        travels: 'Durante i nostri viaggi, qualcosa continuava ad accadere: ovunque andassimo, Lorenzo finiva sempre per confrontare tutto con la sua casa. Non perché altri posti non fossero belli — ma perché si è reso conto di quanto sia speciale la Calabria. Le tradizioni, i sapori, il calore delle persone, la bellezza naturale… e il modo in cui i local vivono la loro terra ogni singolo giorno.',
        idea: 'È allora che è nata l\'idea. Volevamo creare il tipo di esperienza di viaggio che cerchiamo sempre noi stessi — una che ti permetta di vedere una destinazione attraverso gli occhi della sua gente. Ristoranti autentici consigliati dalle persone del posto. Spiagge che raggiungi chiedendo al nonno di qualcuno. Storie, ricette e piccole scoperte che non compaiono in nessuna brochure.',
        decision: 'Così abbiamo deciso di portare la Calabria al mondo nello stesso modo in cui Lorenzo l\'ha vissuta crescendo: attraverso gli occhi dei local.',
        today: 'Oggi, stiamo trasformando quella visione in realtà — invitandoti a unirti a noi in un viaggio costruito su incontri genuini, pasti locali, angoli nascosti e il vero spirito del Sud Italia.',
        dream: 'Questo è il nostro sogno che diventa realtà, e saremmo davvero grati se tu ne facessi parte.',
        welcome: 'Benvenuti — esploriamo insieme la Calabria, attraverso gli occhi dei local.',
        photoQuote: 'Attraverso gli occhi dei local'
      },
      trips: { 
        title: 'Servizi del Viaggio',
        exploreTitle: 'Itinerari',
        exploreIntro: 'Scopri la nostra esperienza di 6 giorni in Calabria, itinerario, attività e prezzi.',
        viewItineraries: 'Vedi itinerari',
        itinerary: 'Itinerario di 6 giorni progettato da local (5 notti)',
        driver: 'Autista privato durante tutte le fasi dell\'itinerario',
        pension: 'Mezza pensione',
        beaches: 'Spiaggia diversa ogni giorno',
        activitiesTitle: 'Attività in evidenza:',
        wine: 'Degustazione di vino',
        boat: 'Giornata in barca',
        pasta: 'PastaClass',
        snorkeling: 'Snorkeling',
        nature: 'Escursioni nella natura',
        villages: 'Tour dei villaggi storici',
        workshop: 'Laboratorio',
        hotels: 'Soggiorni in hotel di lusso',
        photos: 'Foto',
        group: 'Piccolo gruppo (massimo 10 persone)'
      },
      contact: {
        title: 'Invia Richiesta',
        firstName: 'Nome',
        lastName: 'Cognome',
        firstNamePlaceholder: 'Inserisci il tuo nome',
        lastNamePlaceholder: 'Inserisci il tuo cognome',
        travellers: 'Quanti viaggiatori?',
        oneTraveller: '1 viaggiatore',
        twoTravellers: '2 viaggiatori',
        threeTravellers: '3 viaggiatori',
        fourTravellers: '4 viaggiatori',
        fivePlusTravellers: '5+ viaggiatori',
        explainInMessage: 'Spiegherò nel messaggio aggiuntivo',
        tripPeriod: 'Seleziona Periodo di Viaggio',
        selectPeriod: '-- Seleziona un periodo di viaggio --',
        mayJune: 'Maggio - Giugno',
        june: 'Giugno',
        july: 'Luglio',
        period1: '29 Maggio - 3 Giugno 2025',
        period2: '5-10 Giugno 2025',
        period3: '12-17 Giugno 2025',
        period4: '19-24 Giugno 2025',
        period5: '26 Giugno - 1 Luglio 2025',
        period6: '3-8 Luglio 2025',
        period7: '10-15 Luglio 2025',
        period8: '17-22 Luglio 2025',
        period9: '24-29 Luglio 2025',
        dateHint: 'Scegli tra i periodi di viaggio disponibili',
        email: 'Indirizzo Email',
        emailPlaceholder: 'tua.email@esempio.com',
        phone: 'Numero di Telefono',
        phonePlaceholder: '+1234567890 o (123) 456-7890',
        preferredContact: 'Metodo di Contatto Preferito',
        emailOnly: 'Inviami una email',
        both: 'Sia chiamata che email',
        message: 'Messaggio Aggiuntivo',
        messagePlaceholder: 'Raccontaci le tue preferenze di viaggio, richieste speciali o qualsiasi domanda tu abbia...',
        discountCode: 'Codice Sconto',
        discountCodePlaceholder: 'Inserisci codice sconto',
        discountHint: 'Inserisci il tuo codice sconto se ne hai uno',
        submit: 'Invia Richiesta'
      },
      beaches: {
        title: 'Le Spiagge Stupende della Calabria',
        intro: 'Immergiti nella splendida costa calabrese, dove spiagge incontaminate incontrano acque cristalline.',
        description: 'La Calabria vanta alcune delle spiagge più belle e incontaminate d\'Italia. Dalle acque turchesi di Tropea alle calette nascoste lungo la costa ionica, ogni spiaggia offre un\'esperienza unica. Scopri angoli appartati conosciuti solo ai locali, dove puoi davvero rilassarti e connetterti con la natura.',
        experience: 'Durante i nostri viaggi, ti porteremo ogni giorno su una spiaggia diversa, ciascuna selezionata con cura per la sua bellezza, accessibilità e carattere locale autentico. Vivi il Mediterraneo al suo meglio.'
      },
      food: {
        title: 'Le Delizie Culinarie della Calabria',
        intro: 'Prepara il tuo appetito — le delizie della Calabria sono un lavoro a tempo pieno!',
        description: 'La cucina calabrese è una celebrazione di ingredienti freschi e locali e tradizioni secolari. Dalla famosa \'nduja, salsiccia piccante spalmabile, ai frutti di mare freschi pescati quotidianamente, ogni pasto racconta una storia. Vivi ricette autentiche di famiglia tramandate di generazione in generazione, preparate con amore e i migliori ingredienti locali.',
        experience: 'Unisciti a noi per una PastaClass dove imparerai a fare la pasta tradizionale da zero, visiterai i mercati locali e cenerai in ristoranti consigliati dai locali. Assapora la vera essenza della Calabria attraverso il suo cibo.'
      },
      culture: {
        title: 'Il Ricco Patrimonio della Calabria',
        intro: 'Esplora secoli di ricco patrimonio, dalle antiche rovine alle vivaci tradizioni locali.',
        description: 'La Calabria è una terra ricca di storia, dove le colonie greche antiche, le influenze bizantine e l\'architettura normanna raccontano la storia delle civiltà che hanno chiamato questa regione casa. Dai siti archeologici di Locri e Sybaris ai villaggi medievali arroccati sulle colline, ogni angolo rivela strati di storia.',
        experience: 'Vivi tradizioni viventi attraverso festival locali, laboratori artigianali e incontri con le persone dal cuore caldo della Calabria. Scopri le storie, la musica e l\'artigianato che sono stati preservati e tramandati di generazione in generazione.'
      },
      contactInfo: {
        title: 'Contattaci',
        instagram: 'Instagram',
        email: 'Email',
        facebook: 'Facebook',
        tiktok: 'TikTok'
      },
      itineraries: {
        pageTitle: 'Itinerari',
        heroTitle: 'Ecco il nostro itinerario',
        secretIngredient: 'Solo le basi. Come in ogni ricetta della nonna, c\'è sempre un ingrediente segreto che puoi scoprire solo provandolo.',
        afterTapping: 'Tocca per esplorare',
        day1Title: 'Giorno 1',
        day1Desc: 'Pick up a Lamezia Terme · Passeggiata serale a Pizzo con Tartufo',
        day2Title: 'Giorno 2',
        day2Desc: 'Mattina a Reggio Calabria · Sera a Scilla',
        day3Title: 'Giorno 3',
        day3Desc: 'Giornata sulla Costa Ionica · Museo storico · Degustazione vini',
        day4Title: 'Giorno 4',
        day4Desc: 'Dalla Città del diamante all\'arco segreto · Pasta Class',
        day5Title: 'Giorno 5',
        day5Desc: 'Giornata in barca nella "Costa degli Dei" · Snorkeling a Capo Vaticano · Pomeriggio a Tropea',
        day6Title: 'Giorno 6',
        day6Desc: 'Trasferimento a Lamezia Terme · Fine dell\'esperienza',
        tripServicesTitle: 'Servizi del viaggio',
        svcItinerary: 'Itinerario di 6 giorni progettato da local (5 notti)',
        svcDriver: 'Autista privato durante tutte le tappe',
        svcPension: 'Pensione completa',
        svcBeaches: 'Spiaggia diversa ogni giorno',
        svcGroup: 'Piccolo gruppo (max 10 persone)',
        activitiesTitle: 'Attività in evidenza:',
        svcWine: 'Degustazione vino',
        svcBoat: 'Giornata in barca',
        svcPasta: 'PastaClass',
        svcSnorkeling: 'Snorkeling',
        svcNature: 'Escursioni nella natura',
        svcVillages: 'Tour dei villaggi storici',
        svcHotels: 'Soggiorni in hotel di lusso',
        svcPhotos: 'Foto',
        priceDoubleLabel: 'Doppia e Famiglia',
        priceDouble: '22.490 Kč a persona',
        priceSingleLabel: 'Viaggiatore singolo',
        priceSingle: '24.990 Kč'
      }
    },
    de: {
      brand: 'Calabria Essence',
      nav: { why: 'Warum Kalabrien', about: 'Über uns', beaches: 'Strände', food: 'Essen', culture: 'Kultur', trips: 'Reiseinformationen', itineraries: 'Reiserouten', book: 'Buchen / Reservieren' },
      hero: { title: 'Kalabrien entdecken', subtitle: 'Erleben Sie Kalabrien durch die Augen der Einheimischen' },
      why: { title: 'Warum Kalabrien?', beach: 'Strände', beach_desc: 'Tauchen Sie ein in Kalabriens atemberaubende Küste, wo unberührte Strände auf kristallklares Wasser treffen.', food: 'Essen', food_desc: 'Bereiten Sie Ihren Appetit vor — Kalabriens Köstlichkeiten sind ein Vollzeitjob!', culture: 'Kultur', culture_desc: 'Erkunden Sie jahrhundertealtes reiches Erbe, von antiken Ruinen bis zu lebendigen lokalen Traditionen.' },
      about: { 
        title: 'Über uns',
        previewTitle: 'Lernen Sie Lorenzo & Kristýna kennen',
        previewText: 'Ein italienisch-tschechisches Paar, das Ihnen authentische Kalabrien-Erlebnisse durch die Augen der Einheimischen bietet.',
        clickToRead: 'Klicken Sie, um unsere vollständige Geschichte zu lesen →',
        intro: 'Ciao & Ahoj! Wir sind Lorenzo und Kristýna — ein italienisch-tschechisches Paar, das sich traf, sich verliebte und die letzten drei Jahre damit verbrachte, die Welt gemeinsam zu erkunden.',
        lorenzo: 'Lorenzo ist der Herzschlag Kalabriens in unserem Projekt — geboren und aufgewachsen in Cosenza, mit einer Kindheit voller Sommer am Meer, Familienrezepten und lokalen Geschichten.',
        kristyna: 'Kristýna kommt aus dem lebendigen Prag und bringt die Neugier, Kreativität und den Instinkt des Reisenden mit, der uns immer dazu drängt, über das "Übliche" hinauszuschauen und die wahre Seele jedes Ortes zu entdecken, den wir besuchen.',
        travels: 'Auf unseren Reisen passierte immer wieder etwas: Egal wohin wir gingen, Lorenzo verglich immer alles mit seiner Heimat. Nicht weil andere Orte nicht schön waren — sondern weil er erkannte, wie besonders Kalabrien wirklich ist. Die Traditionen, die Aromen, die Wärme der Menschen, die natürliche Schönheit… und die Art, wie Einheimische ihr Land jeden einzelnen Tag erleben.',
        idea: 'Da wurde die Idee geboren. Wir wollten die Art von Reiseerfahrung schaffen, die wir selbst immer suchen — eine, die es Ihnen ermöglicht, ein Reiseziel durch die Augen seiner Menschen zu sehen. Authentische Restaurants, die von Einheimischen empfohlen werden. Strände, die Sie erreichen, indem Sie jemandes Nonno fragen. Geschichten, Rezepte und kleine Entdeckungen, die in keiner Broschüre erscheinen.',
        decision: 'Also beschlossen wir, Kalabrien der Welt auf die gleiche Weise zu bringen, wie Lorenzo es aufgewachsen ist: durch die Augen der Einheimischen.',
        today: 'Heute verwandeln wir diese Vision in Realität — laden Sie ein, uns auf einer Reise zu begleiten, die auf echten Begegnungen, lokalen Mahlzeiten, versteckten Ecken und dem wahren Geist Süditaliens aufbaut.',
        dream: 'Das ist unser Traum, der Wirklichkeit wird, und wir wären wirklich dankbar, wenn Sie ein Teil davon wären.',
        welcome: 'Benvenuti — erkunden wir Kalabrien gemeinsam, durch die Augen der Einheimischen.',
        photoQuote: 'Durch die Augen der Einheimischen'
      },
      trips: { 
        title: 'Reiseservices',
        exploreTitle: 'Reiserouten',
        exploreIntro: 'Entdecken Sie unser 6-tägiges Kalabrien-Erlebnis, Route, Aktivitäten und Preise.',
        viewItineraries: 'Reiserouten ansehen',
        itinerary: '6-tägige Route, entworfen von Einheimischen (5 Nächte)',
        driver: 'Privatfahrer während aller Etappen der Route',
        pension: 'Halbpension',
        beaches: 'Jeden Tag ein anderer Strand',
        activitiesTitle: 'Aktivitäten-Highlights:',
        wine: 'Weinverkostung',
        boat: 'Bootstag',
        pasta: 'PastaClass',
        snorkeling: 'Schnorcheln',
        nature: 'Naturwanderungen',
        villages: 'Tour durch historische Dörfer',
        workshop: 'Workshop',
        hotels: 'Aufenthalte in Top-Hotels',
        photos: 'Fotos',
        group: 'Kleine Gruppe (max. 10 Personen)'
      },
      contact: {
        title: 'Anfrage senden',
        firstName: 'Vorname',
        lastName: 'Nachname',
        firstNamePlaceholder: 'Geben Sie Ihren Vornamen ein',
        lastNamePlaceholder: 'Geben Sie Ihren Nachnamen ein',
        travellers: 'Wie viele Reisende?',
        oneTraveller: '1 Reisender',
        twoTravellers: '2 Reisende',
        threeTravellers: '3 Reisende',
        fourTravellers: '4 Reisende',
        fivePlusTravellers: '5+ Reisende',
        explainInMessage: 'Werde in der zusätzlichen Nachricht erklären',
        tripPeriod: 'Reisezeitraum auswählen',
        selectPeriod: '-- Wählen Sie einen Reisezeitraum --',
        mayJune: 'Mai - Juni',
        june: 'Juni',
        july: 'Juli',
        period1: '29. Mai - 3. Juni 2025',
        period2: '5.-10. Juni 2025',
        period3: '12.-17. Juni 2025',
        period4: '19.-24. Juni 2025',
        period5: '26. Juni - 1. Juli 2025',
        period6: '3.-8. Juli 2025',
        period7: '10.-15. Juli 2025',
        period8: '17.-22. Juli 2025',
        period9: '24.-29. Juli 2025',
        dateHint: 'Wählen Sie aus den verfügbaren Reiseperioden',
        email: 'E-Mail-Adresse',
        emailPlaceholder: 'ihre.email@beispiel.com',
        phone: 'Telefonnummer',
        phonePlaceholder: '+1234567890 oder (123) 456-7890',
        preferredContact: 'Bevorzugte Kontaktmethode',
        emailOnly: 'E-Mail senden',
        both: 'Sowohl Anruf als auch E-Mail',
        message: 'Zusätzliche Nachricht',
        messagePlaceholder: 'Erzählen Sie uns von Ihren Reisevorlieben, besonderen Wünschen oder Fragen...',
        discountCode: 'Rabattcode',
        discountCodePlaceholder: 'Rabattcode eingeben',
        discountHint: 'Geben Sie Ihren Rabattcode ein, falls Sie einen haben',
        submit: 'Anfrage senden'
      },
      beaches: {
        title: 'Kalabriens Atemberaubende Strände',
        intro: 'Tauchen Sie ein in Kalabriens atemberaubende Küste, wo unberührte Strände auf kristallklares Wasser treffen.',
        description: 'Kalabrien beherbergt einige der schönsten und unberührtesten Strände Italiens. Von den türkisfarbenen Gewässern von Tropea bis zu den versteckten Buchten entlang der ionischen Küste bietet jeder Strand ein einzigartiges Erlebnis. Entdecken Sie abgelegene Orte, die nur Einheimischen bekannt sind, wo Sie sich wirklich entspannen und mit der Natur verbinden können.',
        experience: 'Während unserer Reisen bringen wir Sie jeden Tag an einen anderen Strand, jeder sorgfältig ausgewählt für seine Schönheit, Zugänglichkeit und authentischen lokalen Charakter. Erleben Sie das Mittelmeer von seiner besten Seite.'
      },
      food: {
        title: 'Kalabriens Kulinarische Köstlichkeiten',
        intro: 'Bereiten Sie Ihren Appetit vor — Kalabriens Köstlichkeiten sind ein Vollzeitjob!',
        description: 'Die kalabrische Küche ist eine Feier frischer, lokaler Zutaten und jahrhundertealter Traditionen. Von der berühmten \'nduja, einer würzigen streichfähigen Wurst, bis zu täglich gefangenen frischen Meeresfrüchten erzählt jede Mahlzeit eine Geschichte. Erleben Sie authentische Familienrezepte, die von Generation zu Generation weitergegeben wurden, zubereitet mit Liebe und den feinsten lokalen Zutaten.',
        experience: 'Nehmen Sie an einer PastaClass teil, bei der Sie lernen, traditionelle Pasta von Grund auf zuzubereiten, besuchen Sie lokale Märkte und speisen Sie in von Einheimischen empfohlenen Restaurants. Schmecken Sie die wahre Essenz Kalabriens durch sein Essen.'
      },
      culture: {
        title: 'Kalabriens Reiches Erbe',
        intro: 'Erkunden Sie jahrhundertealtes reiches Erbe, von antiken Ruinen bis zu lebendigen lokalen Traditionen.',
        description: 'Kalabrien ist ein Land voller Geschichte, in dem antike griechische Kolonien, byzantinische Einflüsse und normannische Architektur die Geschichte der Zivilisationen erzählen, die diese Region ihr Zuhause nannten. Von den archäologischen Stätten von Locri und Sybaris bis zu den mittelalterlichen Dörfern, die auf Hügelkuppen thronen, offenbart jede Ecke Schichten der Geschichte.',
        experience: 'Erleben Sie lebendige Traditionen durch lokale Feste, Handwerksworkshops und Begegnungen mit den warmherzigen Menschen Kalabriens. Entdecken Sie die Geschichten, Musik und Handwerkskunst, die bewahrt und von Generation zu Generation weitergegeben wurden.'
      },
      contactInfo: {
        title: 'Kontaktieren Sie uns',
        instagram: 'Instagram',
        email: 'E-Mail',
        facebook: 'Facebook',
        tiktok: 'TikTok'
      },
      itineraries: {
        pageTitle: 'Reiserouten',
        heroTitle: 'Hier ist unsere Reiseroute',
        secretIngredient: 'Nur das Wesentliche. Wie in jedem Omas Rezept gibt es immer eine geheime Zutat, die man erst beim Ausprobieren entdeckt.',
        afterTapping: 'Tippen zum Erkunden',
        day1Title: 'Tag 1',
        day1Desc: 'Abholung in Lamezia Terme · Abendspaziergang in Pizzo mit Tartufo',
        day2Title: 'Tag 2',
        day2Desc: 'Vormittag in Reggio Calabria · Abend in Scilla',
        day3Title: 'Tag 3',
        day3Desc: 'Tag an der Costa Ionica · Historisches Museum · Weinverkostung',
        day4Title: 'Tag 4',
        day4Desc: 'Von der Diamantstadt zum geheimen Bogen · Pasta Class',
        day5Title: 'Tag 5',
        day5Desc: 'Bootstag an der „Costa degli Dei“ · Schnorcheln in Capo Vaticano · Nachmittag in Tropea',
        day6Title: 'Tag 6',
        day6Desc: 'Transfer zurück nach Lamezia Terme · Ende des Erlebnisses',
        tripServicesTitle: 'Reiseservices',
        svcItinerary: '6-tägige Route von Einheimischen (5 Nächte)',
        svcDriver: 'Privatfahrer während der gesamten Route',
        svcPension: 'Vollpension',
        svcBeaches: 'Jeden Tag ein anderer Strand',
        svcGroup: 'Kleine Gruppe (max. 10 Personen)',
        activitiesTitle: 'Aktivitäten-Highlights:',
        svcWine: 'Weinverkostung',
        svcBoat: 'Bootstag',
        svcPasta: 'PastaClass',
        svcSnorkeling: 'Schnorcheln',
        svcNature: 'Naturwanderungen',
        svcVillages: 'Tour durch historische Dörfer',
        svcHotels: 'Aufenthalte in Top-Hotels',
        svcPhotos: 'Fotos',
        priceDoubleLabel: 'Doppelzimmer & Familie',
        priceDouble: '22.490 Kč pro Person',
        priceSingleLabel: 'Einzelreisender',
        priceSingle: '24.990 Kč'
      }
    },
    cz: {
      brand: 'Calabria Essence',
      nav: { why: 'Proč Kalábrie', about: 'O nás', beaches: 'Pláže', food: 'Jídlo', culture: 'Kultura', trips: 'Informace o výletech', itineraries: 'Itineráře', book: 'Rezervovat' },
      hero: { title: 'Objevte Kalábrii', subtitle: 'Poznejte Kalábrii očima místních' },
      why: { title: 'Proč Kalábrie?', beach: 'Pláže', beach_desc: 'Ponořte se do úchvatného pobřeží Kalábrie, kde nedotčené pláže splývají s křišťálově čistou vodou.', food: 'Jídlo', food_desc: 'Připravte si chuťové buňky — lahodnost Kalábrie je práce na plný úvazek!', culture: 'Kultura', culture_desc: 'Objevte staletí bohatého historie, od starověkých ruin po živé místní tradice.' },
      about: { 
        title: 'O nás',
        previewTitle: 'Poznejte Lorenza & Kristýnu',
        previewText: 'Italsko-český pár, který vám přináší autentické zážitky z Kalábrie očima místních.',
        clickToRead: 'Klikněte pro přečtení našeho celého příběhu →',
        intro: 'Ciao & Ahoj! Jsme Lorenzo a Kristýna — italsko-český pár, který se potkal, zamiloval se a strávil poslední tři roky objevováním světa společně.',
        lorenzo: 'Lorenzo je srdcem Kalábrie v našem projektu — narodil se a vyrostl v Cosenze, s dětstvím plným letních pobytů u moře, rodinných receptů a místních příběhů.',
        kristyna: 'Kristýna pochází z Prahy a přináší zvědavost, kreativitu a cestovatelský instinkt, který nás vždy nutí dívat se za "obvyklé" a objevovat skutečnou duši každého místa, které navštívíme.',
        travels: 'Během našich cest se opakoval pokaždé stejný scěnář: ať jsme byli kdekoliv, Lorenzo vše srovnával se svým domovem. Ne proto, že by jiná místa nebyla krásná — ale proto, že si uvědomil, jak jedinečná Kalábrie skutečně je. Tradice, chutě, milí lidí, přírodní krásy… a způsob, jakým místní prožívají svou zemi každý den.',
        idea: 'Tehdy se zrodil nápad. Chtěli jsme vytvořit takový typ cestovatelské zkušenosti, jaký vždy hledáme sami — takový, který vám umožní vidět destinaci očima jejích lidí. Autentické restaurace doporučené místními. Pláže, na které se dostanete, když se zeptáte něčího nonna. Příběhy, recepty a malé objevy, které se neobjevují v žádné brožuře.',
        decision: 'Tak jsme se rozhodli přinést Kalábrii světu stejným způsobem, jakým ji Lorenzo zažíval, když vyrůstal: očima místních.',
        today: 'Dnes tuto vizi proměňujeme ve skutečnost — zveme vás, abyste se k nám připojili na cestě postavené na opravdových setkáních, místních jídlech, skrytých koutech a pravém duchu jižní Itálie.',
        dream: 'Toto je náš sen, který se stává skutečností, a byli bychom opravdu vděční, kdybyste byli jeho součástí.',
        welcome: 'Benvenuti — objevme společně Kalábrii očima místních.',
        photoQuote: 'Očima místních'
      },
      trips: { 
        title: 'Služby výletu',
        exploreTitle: 'Itineráře',
        exploreIntro: 'Objevte náš 6denní zážitek z Kalábrie, itinerář, aktivity a ceny.',
        viewItineraries: 'Zobrazit itineráře',
        itinerary: '6 denní itinerář navržený místními (5 nocí)',
        driver: 'Soukromý řidič po celou doby pobytu',
        pension: 'Polopenze',
        beaches: 'Každý den jiná pláž',
        activitiesTitle: 'Hlavní aktivity:',
        wine: 'Degustace vína',
        boat: 'Den na lodi',
        pasta: 'Kurz vaření těstšovin (pasta class)',
        snorkeling: 'Šnorchlování',
        nature: 'Výlety do přírody',
        villages: 'Prohlídka historických měst',
        workshop: 'Workshopy',
        hotels: 'Pobyt v top hotelech',
        photos: 'Fotky',
        group: 'Malá skupina (max. 10 osob)'
      },
      contact: {
        title: 'Odeslat dotaz',
        firstName: 'Jméno',
        lastName: 'Příjmení',
        firstNamePlaceholder: 'Zadejte své jméno',
        lastNamePlaceholder: 'Zadejte své příjmení',
        travellers: 'Kolik cestujících?',
        oneTraveller: '1 cestující',
        twoTravellers: '2 cestující',
        threeTravellers: '3 cestující',
        fourTravellers: '4 cestující',
        fivePlusTravellers: '5+ cestujících',
        explainInMessage: 'Vysvětlím v dodatečné zprávě',
        tripPeriod: 'Vyberte Období Cesty',
        selectPeriod: '-- Vyberte období cesty --',
        mayJune: 'Květen - Červen',
        june: 'Červen',
        july: 'Červenec',
        period1: '29. května - 3. června 2025',
        period2: '5.-10. června 2025',
        period3: '12.-17. června 2025',
        period4: '19.-24. června 2025',
        period5: '26. června - 1. července 2025',
        period6: '3.-8. července 2025',
        period7: '10.-15. července 2025',
        period8: '17.-22. července 2025',
        period9: '24.-29. července 2025',
        dateHint: 'Vyberte z dostupných období cest',
        email: 'E-mailová adresa',
        emailPlaceholder: 'váš.email@příklad.cz',
        phone: 'Telefonní číslo',
        phonePlaceholder: '+1234567890 nebo (123) 456-7890',
        preferredContact: 'Preferovaný způsob kontaktu',
        emailOnly: 'Pošlete mi e-mail',
        both: 'Jak zavolat, tak e-mail',
        message: 'Dodatečná zpráva',
        messagePlaceholder: 'Řekněte nám o svých cestovních preferencích, speciálních požadavcích nebo jakýchkoli otázkách...',
        discountCode: 'Slevový kód',
        discountCodePlaceholder: 'Zadejte slevový kód',
        discountHint: 'Zadejte svůj slevový kód, pokud ho máte',
        submit: 'Odeslat dotaz'
      },
      beaches: {
        title: 'Úchvatné pláže Kalábrie',
        intro: 'Ponořte se do úchvatného pobřeží Kalábrie, kde nedotčené pláže splývají s křišťálově čistou vodou.',
        description: 'Kalábrie se může pochlubit některými z nejkrásnějších a nejnedotčenějších pláží v Itálii. Od tyrkysových vod Tropea až po skryté zátoky podél jónského pobřeží, každá pláž nabízí jedinečný zážitek. Objevte odlehlá místa známá pouze místním, kde se můžete opravdu uvolnit a spojit s přírodou.',
        experience: 'Během našich výletů vás každý den vezmeme na jinou pláž, každou pečlivě vybranou pro svou krásu, dostupnost a autentický místní charakter. Zažijte Středomoří v jeho nejlepší podobě.'
      },
      food: {
        title: 'Kulinářské pochoutky Kalábrie',
        intro: 'Připravte si chuťové buňky — lahodnost Kalábrie je práce na plný úvazek!',
        description: 'Kalábrijská kuchyně je oslavou čerstvých, místních surovin a časem prověřených tradic. Od slavné \'nduja, pikantní pomazánkové klobásy, až po čerstvé mořské plody chycené denně, každé jídlo vypráví příběh. Zažijte autentické rodinné recepty předávané z generace na generaci, připravené s láskou a nejlepšími místními surovinami.',
        experience: 'Připojte se k nám na PastaClass, kde se naučíte vyrábět tradiční těstoviny od základů, navštívíte místní trhy a budete jíst v restauracích doporučených místními. Ochutnejte skutečnou esenci Kalábrie prostřednictvím jejího jídla.'
      },
      culture: {
        title: 'Bohaté dědictví Kalábrie',
        intro: 'Objevte staletí bohatého dědictví, od starověkých ruin po živé místní tradice.',
        description: 'Kalábrie je země plná historie, kde starověké řecké kolonie, byzantské vlivy a normanská architektura vyprávějí příběh civilizací, které tuto oblast nazývaly domovem. Od archeologických lokalit Locri a Sybaris až po středověké vesnice tyčící se na vrcholcích kopců, každý kout odhaluje vrstvy historie.',
        experience: 'Zažijte živé tradice prostřednictvím místních festivalů, řemeslných workshopů a setkání s srdečnými lidmi Kalábrie. Objevte příběhy, hudbu a řemesla, které byly zachovány a předávány z generace na generaci.'
      },
      contactInfo: {
        title: 'Kontaktujte nás',
        instagram: 'Instagram',
        email: 'E-mail',
        facebook: 'Facebook',
        tiktok: 'TikTok'
      },
      itineraries: {
        pageTitle: 'Itineráře',
        heroTitle: 'Zde je náš itinerář',
        secretIngredient: 'Jen to základní. Jako v každém receptu od babičky vždy existuje nějaká tajná přísada, kterou můžete objevit jen tím, že to vyzkoušíte.',
        afterTapping: 'Klepněte a objevte',
        day1Title: 'Den 1',
        day1Desc: 'Vyzvednutí v Lamezia Terme · Večerní procházka v Pizzo s Tartufo',
        day2Title: 'Den 2',
        day2Desc: 'Dopoledne v Reggio Calabria · Večer ve Scilla',
        day3Title: 'Den 3',
        day3Desc: 'Den na Costa Ionica · Historické muzeum · Degustace vína',
        day4Title: 'Den 4',
        day4Desc: 'Od diamantového města k tajnému oblouku · Pasta Class',
        day5Title: 'Den 5',
        day5Desc: 'Den na lodi na „Costa degli Dei“ · Šnorchlování v Capo Vaticano · Odpoledne v Tropea',
        day6Title: 'Den 6',
        day6Desc: 'Transfer zpět do Lamezia Terme · Konec zážitku',
        tripServicesTitle: 'Služby výletu',
        svcItinerary: '6denní itinerář od místních (5 nocí)',
        svcDriver: 'Soukromý řidič po celou dobu pobytu',
        svcPension: 'Plná penze',
        svcBeaches: 'Každý den jiná pláž',
        svcGroup: 'Malá skupina (max. 10 osob)',
        activitiesTitle: 'Hlavní aktivity:',
        svcWine: 'Degustace vína',
        svcBoat: 'Den na lodi',
        svcPasta: 'PastaClass',
        svcSnorkeling: 'Šnorchlování',
        svcNature: 'Výlety do přírody',
        svcVillages: 'Prohlídka historických měst',
        svcHotels: 'Pobyt v top hotelech',
        svcPhotos: 'Fotky',
        priceDoubleLabel: 'Dvoulůžko a rodina',
        priceDouble: '22.490 Kč na osobu',
        priceSingleLabel: 'Solo cestující',
        priceSingle: '24.990 Kč'
      }
    }
  };
}

function setupContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  // Add real-time validation
  const inputs = form.querySelectorAll('input[required], select[required]');
  inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearFieldError);
  });
  
  // Handle travellers dropdown change
  const travellersSelect = form.querySelector('#travellers');
  const messageField = form.querySelector('#message');
  
  if (travellersSelect && messageField) {
    travellersSelect.addEventListener('change', function() {
      updateMessageFieldRequirement();
    });
  }
  
  // Handle contact method radio buttons change
  const contactMethodRadios = form.querySelectorAll('input[name="contactMethod"]');
  const phoneField = form.querySelector('#phone');
  
  if (contactMethodRadios.length > 0) {
    contactMethodRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        updateMessageFieldRequirement();
        updatePhoneFieldRequirement();
      });
    });
  }
  
  // Function to update message field requirement based on travellers
  function updateMessageFieldRequirement() {
    const travellersValue = travellersSelect ? travellersSelect.value : '';
    
    if (travellersValue === 'explain') {
      // Make message field required
      messageField.setAttribute('required', 'required');
      messageField.classList.add('required-field');
    } else {
      // Remove required attribute
      messageField.removeAttribute('required');
      messageField.classList.remove('required-field');
      // Clear any error styling
      messageField.classList.remove('error');
      const errorMsg = messageField.parentNode.querySelector('.error-message');
      if (errorMsg) {
        errorMsg.remove();
      }
    }
  }
  
  // Function to update phone field requirement based on contact method
  function updatePhoneFieldRequirement() {
    const contactMethodValue = form.querySelector('input[name="contactMethod"]:checked')?.value || '';
    
    if (contactMethodValue === 'both' && phoneField) {
      // Make phone field required
      phoneField.setAttribute('required', 'required');
      phoneField.classList.add('required-field');
      // Add validation listeners if not already added
      phoneField.addEventListener('blur', validateField);
      phoneField.addEventListener('input', clearFieldError);
    } else if (phoneField) {
      // Remove required attribute
      phoneField.removeAttribute('required');
      phoneField.classList.remove('required-field');
      // Clear any error styling
      phoneField.classList.remove('error');
      const errorMsg = phoneField.parentNode.querySelector('.error-message');
      if (errorMsg) {
        errorMsg.remove();
      }
    }
  }
  
  // Initialize phone field requirement on page load if a contact method is already selected
  const initialContactMethod = form.querySelector('input[name="contactMethod"]:checked');
  if (initialContactMethod) {
    updatePhoneFieldRequirement();
  }
  
  // Form submission
  form.addEventListener('submit', handleFormSubmit);
}

function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  
  // Remove existing error styling
  field.classList.remove('error');
  
  // Check if field is required and empty
  if (field.hasAttribute('required') && !value) {
    showFieldError(field, 'This field is required');
    return false;
  }
  
  // Email validation - more comprehensive
  if (field.type === 'email' && value) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(value)) {
      showFieldError(field, 'Please enter a valid email address (e.g., user@example.com)');
      return false;
    }
    
    // Additional checks for common email issues
    if (value.includes('..') || value.startsWith('.') || value.endsWith('.')) {
      showFieldError(field, 'Email cannot start/end with dots or have consecutive dots');
      return false;
    }
  }
  
  // Phone validation - more strict
  if (field.type === 'tel' && value) {
    // Remove all non-digit characters except + for length check
    const cleanPhone = value.replace(/[^\d+]/g, '');
    
    // Check if it starts with + and has valid international format
    if (cleanPhone.startsWith('+')) {
      if (cleanPhone.length < 8 || cleanPhone.length > 15) {
        showFieldError(field, 'International phone number must be 8-15 digits (e.g., +1234567890)');
        return false;
      }
    } else {
      // Check if it's a valid local number
      if (cleanPhone.length < 7 || cleanPhone.length > 15) {
        showFieldError(field, 'Phone number must be 7-15 digits');
        return false;
      }
    }
    
    // Check for valid phone characters only
    const phoneRegex = /^[\+]?[0-9\s\-\(\)\.]{7,}$/;
    if (!phoneRegex.test(value)) {
      showFieldError(field, 'Phone number can only contain numbers, +, spaces, hyphens, parentheses, and dots');
      return false;
    }
  }
  
  return true;
}

function showFieldError(field, message) {
  field.classList.add('error');
  
  // Remove existing error message
  const existingError = field.parentNode.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  // Add new error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  field.parentNode.appendChild(errorDiv);
}

function clearFieldError(e) {
  const field = e.target;
  field.classList.remove('error');
  const errorMessage = field.parentNode.querySelector('.error-message');
  if (errorMessage) {
    errorMessage.remove();
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  
  // Validate all required fields
  let isValid = true;
  const requiredFields = form.querySelectorAll('input[required], select[required]');
  
  requiredFields.forEach(field => {
    if (!validateField({ target: field })) {
      isValid = false;
    }
  });
  
  if (!isValid) {
    // Scroll to first error
    const firstError = form.querySelector('.error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstError.focus();
    }
    return;
  }
  
  // Show loading state
  showLoadingState();
  
  // Get current language and select appropriate template
  const currentLang = getCurrentLanguage();
  const templateId = EMAILJS_CONFIG.templates[currentLang] || EMAILJS_CONFIG.templates.en;
  
  // Prepare email data
  const emailData = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phone: formData.get('phone') || 'Not provided',
    travellers: formData.get('travellers'),
    tripDateStart: formData.get('tripDateStart') || 'Not specified',
    tripDateEnd: formData.get('tripDateEnd') || 'Not specified',
    contactMethod: formData.get('contactMethod'),
    discountCode: formData.get('discountCode') || 'None',
    message: formData.get('message') || 'No additional message'
  };
  
  // Send email using EmailJS with language-specific template
  emailjs.send(
    EMAILJS_CONFIG.serviceId,
    templateId,
    emailData
  )
  .then(function(response) {
    console.log('Email sent successfully!', response.status, response.text);
    showSuccessMessage();
    form.reset();
  })
  .catch(function(error) {
    console.error('Failed to send email:', error);
    showErrorMessage();
  });
}

function showLoadingState() {
  const submitBtn = document.querySelector('#contactForm button[type="submit"]');
  const originalText = submitBtn.textContent;
  
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  submitBtn.style.opacity = '0.7';
  
  // Store original text for restoration
  submitBtn.dataset.originalText = originalText;
}

function hideLoadingState() {
  const submitBtn = document.querySelector('#contactForm button[type="submit"]');
  
  submitBtn.disabled = false;
  submitBtn.textContent = submitBtn.dataset.originalText || 'Send Inquiry';
  submitBtn.style.opacity = '1';
}

function showSuccessMessage() {
  hideLoadingState();
  
  const form = document.getElementById('contactForm');
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.innerHTML = `
    <div class="success-content">
      <h3>Thank you for your inquiry!</h3>
      <p>We'll get back to you within 24 hours.</p>
    </div>
  `;
  
  form.parentNode.insertBefore(successDiv, form);
  
  // Remove success message after 5 seconds
  setTimeout(() => {
    successDiv.remove();
  }, 5000);
  
  // Scroll to success message
  successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showErrorMessage() {
  hideLoadingState();
  
  const form = document.getElementById('contactForm');
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message-global';
  errorDiv.innerHTML = `
    <div class="error-content">
      <h3>Sorry, there was an error sending your message.</h3>
      <p>Please try again or contact us directly.</p>
    </div>
  `;
  
  form.parentNode.insertBefore(errorDiv, form);
  
  // Remove error message after 5 seconds
  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
  
  // Scroll to error message
  errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Why Calabria section sequential card animation
function setupWhyCalabriaAnimation() {
  const whySection = document.getElementById('why');
  if (!whySection) return;
  
  // Check if animation has been shown in this session
  const hasSeenAnimation = sessionStorage.getItem('whyAnimationShown');
  if (hasSeenAnimation) return;
  
  const cards = whySection.querySelectorAll('.card');
  if (cards.length !== 3) return;
  
  let animationStarted = false;
  
  // Wait for hero animation to complete (hero animation takes ~2 seconds)
  // Add extra delay to let users see the hero text first
  const heroAnimationDelay = 2500; // 2.5 seconds after page load
  
  // Use Intersection Observer to trigger when section is visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animationStarted) {
        animationStarted = true;
        
        // Wait for hero animation to complete before starting
        setTimeout(() => {
          // Start the animation sequence
          whySection.classList.add('animating');
          
          // Sequence: show all, then focus on each card one by one
          setTimeout(() => {
            // Focus on first card (Beach)
            cards[0].classList.add('focus');
            cards[1].classList.remove('focus');
            cards[2].classList.remove('focus');
          }, 1000);
          
          setTimeout(() => {
            // Focus on second card (Food)
            cards[0].classList.remove('focus');
            cards[1].classList.add('focus');
            cards[2].classList.remove('focus');
          }, 3000);
          
          setTimeout(() => {
            // Focus on third card (Culture)
            cards[0].classList.remove('focus');
            cards[1].classList.remove('focus');
            cards[2].classList.add('focus');
          }, 5000);
          
          setTimeout(() => {
            // Return all to normal
            cards.forEach(card => card.classList.remove('focus'));
            whySection.classList.remove('animating');
            sessionStorage.setItem('whyAnimationShown', 'true');
          }, 7000);
        }, heroAnimationDelay);
        
        // Stop observing after animation starts
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3, // Trigger when 30% of section is visible
    rootMargin: '0px'
  });
  
  observer.observe(whySection);
}

// Hero text animation on first page load
function setupHeroAnimation() {
  const heroContent = document.querySelector('.hero-content');
  if (!heroContent) return;
  
  // Check if this is the first visit (using sessionStorage so it resets on new session)
  const hasSeenAnimation = sessionStorage.getItem('heroAnimationShown');
  
  if (!hasSeenAnimation) {
    // Add animation class
    heroContent.classList.add('animate-on-load');
    
    // Mark as shown in this session
    sessionStorage.setItem('heroAnimationShown', 'true');
    
    // Remove animation class after animation completes to prevent re-triggering
    setTimeout(() => {
      heroContent.classList.remove('animate-on-load');
      // Make sure text is visible after animation
      const h2 = heroContent.querySelector('h2');
      const p = heroContent.querySelector('p');
      if (h2) h2.style.opacity = '1';
      if (p) p.style.opacity = '1';
    }, 2000);
  }
}

function setupDatePicker() {
  const tripPeriodSelect = document.getElementById('tripPeriod');
  const dateStartInput = document.getElementById('tripDateStart');
  const dateEndInput = document.getElementById('tripDateEnd');
  
  if (!tripPeriodSelect || !dateStartInput || !dateEndInput) return;
  
  // When user selects a trip period, set the hidden date fields
  tripPeriodSelect.addEventListener('change', function() {
    const selectedValue = this.value;
    
    if (selectedValue) {
      const [startDate, endDate] = selectedValue.split('_');
      dateStartInput.value = startDate;
      dateEndInput.value = endDate;
      clearFieldError({ target: this });
    } else {
      dateStartInput.value = '';
      dateEndInput.value = '';
    }
  });
  
  // Validate on form submission
  const form = tripPeriodSelect.closest('form');
  if (form) {
    form.addEventListener('submit', function(e) {
      if (!tripPeriodSelect.value) {
        e.preventDefault();
        showFieldError(tripPeriodSelect, 'Please select a trip period');
        tripPeriodSelect.focus();
        return false;
      }
    });
  }
}

function setupMobileOptimizations() {
  // Prevent zoom on form inputs (iOS Safari)
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      // Ensure font-size is at least 16px to prevent zoom
      if (parseInt(window.getComputedStyle(input).fontSize) < 16) {
        input.style.fontSize = '16px';
      }
    });
  });
  
  // Optimize touch interactions
  const buttons = document.querySelectorAll('.button, .lang-btn');
  buttons.forEach(button => {
    button.addEventListener('touchstart', (e) => {
      // Add visual feedback for touch
      button.style.transform = 'scale(0.98)';
    });
    
    button.addEventListener('touchend', (e) => {
      // Remove visual feedback
      setTimeout(() => {
        button.style.transform = '';
      }, 100);
    });
  });
  
  // Optimize language switcher for mobile
  const langSwitch = document.querySelector('.lang-switch');
  if (langSwitch) {
    // Make language buttons easier to tap on mobile
    const langButtons = langSwitch.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
      btn.style.minWidth = '44px'; // Minimum touch target size
      btn.style.minHeight = '44px';
    });
  }
  
  // Handle orientation changes
  window.addEventListener('orientationchange', () => {
    // Recalculate header height after orientation change
    setTimeout(() => {
      measureHeaderHeight();
    }, 100);
  });
  
  // Prevent horizontal scroll on mobile
  document.body.style.overflowX = 'hidden';
  
  // Add viewport meta tag if not present (backup)
  if (!document.querySelector('meta[name="viewport"]')) {
    const viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
    document.head.appendChild(viewport);
  }
}
