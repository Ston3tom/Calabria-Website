document.addEventListener('DOMContentLoaded', () => {
  setupSmoothScroll();
  setupI18n();
  measureHeaderHeight();
  setupContactForm();
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
}

function getTranslations() {
  return {
    en: {
      brand: 'Calabria Essence',
      nav: { why: 'Why Calabria', about: 'About Us', trips: 'Trips Information', book: 'Book / Reserve' },
      hero: { title: 'Explore Calabria', subtitle: 'Experience Calabria through local\'s eyes' },
      why: { title: 'Why Calabria?', beach: 'Beaches', beach_desc: 'Immerse yourself in Calabria\'s stunning coastline, where untouched beaches meet crystal-clear waters.', food: 'Food', food_desc: 'Prepare your appetite — Calabria\'s deliciousness is a full-time job!', culture: 'Culture', culture_desc: 'Explore centuries of rich heritage, from ancient ruins to vibrant local traditions.' },
      about: { 
        title: 'About Us', 
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
        email: 'Email Address',
        emailPlaceholder: 'your.email@example.com',
        phone: 'Phone Number',
        phonePlaceholder: '+1234567890 or (123) 456-7890',
        preferredContact: 'Preferred Contact Method',
        emailOnly: 'Email me',
        both: 'Both call and email',
        message: 'Additional Message',
        messagePlaceholder: 'Tell us about your travel preferences, special requests, or any questions you have...',
        submit: 'Send Inquiry'
      },
      contactInfo: {
        title: 'Contact Us',
        instagram: 'Instagram',
        email: 'Email',
        facebook: 'Facebook',
        tiktok: 'TikTok'
      }
    },
    it: {
      brand: 'Calabria Essence',
      nav: { why: 'Perché Calabria', about: 'Chi siamo', trips: 'Informazioni Viaggi', book: 'Prenota / Riserva' },
      hero: { title: 'Esplora la Calabria', subtitle: 'Vivi la Calabria attraverso gli occhi dei locali' },
      why: { title: 'Perché Calabria?', beach: 'Spiagge', beach_desc: 'Immergiti nella splendida costa calabrese, dove spiagge incontaminate incontrano acque cristalline.', food: 'Cibo', food_desc: 'Prepara il tuo appetito — la delizia della Calabria è un lavoro a tempo pieno!', culture: 'Cultura', culture_desc: 'Esplora secoli di ricco patrimonio, dalle antiche rovine alle vivaci tradizioni locali.' },
      about: { 
        title: 'Chi siamo', 
        intro: 'Ciao & Ahoj! Siamo Lorenzo e Kristýna — una coppia italo-ceca che si è incontrata, si è innamorata e ha trascorso gli ultimi tre anni esplorando il mondo insieme.',
        lorenzo: 'Lorenzo è il cuore pulsante della Calabria nel nostro progetto — nato e cresciuto a Cosenza, con un\'infanzia piena di estati al mare, ricette di famiglia e storie locali.',
        kristyna: 'Kristýna viene dalla vibrante Praga e porta con sé la curiosità, la creatività e l\'istinto del viaggiatore che ci spinge sempre a guardare oltre il "solito" e a scoprire l\'anima vera di ogni luogo che visitiamo.',
        travels: 'Durante i nostri viaggi, qualcosa continuava ad accadere: ovunque andassimo, Lorenzo finiva sempre per confrontare tutto con la sua casa. Non perché altri posti non fossero belli — ma perché si è reso conto di quanto sia speciale la Calabria. Le tradizioni, i sapori, il calore delle persone, la bellezza naturale… e il modo in cui i locali vivono la loro terra ogni singolo giorno.',
        idea: 'È allora che è nata l\'idea. Volevamo creare il tipo di esperienza di viaggio che cerchiamo sempre noi stessi — una che ti permetta di vedere una destinazione attraverso gli occhi della sua gente. Ristoranti autentici consigliati dai locali. Spiagge che raggiungi chiedendo al nonno di qualcuno. Storie, ricette e piccole scoperte che non compaiono in nessuna brochure.',
        decision: 'Così abbiamo deciso di portare la Calabria al mondo nello stesso modo in cui Lorenzo l\'ha vissuta crescendo: attraverso gli occhi dei locali.',
        today: 'Oggi, stiamo trasformando quella visione in realtà — invitandoti a unirti a noi in un viaggio costruito su incontri genuini, pasti locali, angoli nascosti e il vero spirito del Sud Italia.',
        dream: 'Questo è il nostro sogno che diventa realtà, e saremmo davvero grati se tu ne facessi parte.',
        welcome: 'Benvenuti — esploriamo insieme la Calabria, attraverso gli occhi dei locali.',
        photoQuote: 'Attraverso gli occhi dei locali'
      },
      trips: { 
        title: 'Servizi del Viaggio', 
        itinerary: 'Itinerario di 6 giorni progettato da locali (5 notti)',
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
        email: 'Indirizzo Email',
        emailPlaceholder: 'tua.email@esempio.com',
        phone: 'Numero di Telefono',
        phonePlaceholder: '+1234567890 o (123) 456-7890',
        preferredContact: 'Metodo di Contatto Preferito',
        emailOnly: 'Inviami una email',
        both: 'Sia chiamata che email',
        message: 'Messaggio Aggiuntivo',
        messagePlaceholder: 'Raccontaci le tue preferenze di viaggio, richieste speciali o qualsiasi domanda tu abbia...',
        submit: 'Invia Richiesta'
      },
      contactInfo: {
        title: 'Contattaci',
        instagram: 'Instagram',
        email: 'Email',
        facebook: 'Facebook',
        tiktok: 'TikTok'
      }
    },
    de: {
      brand: 'Calabria Essence',
      nav: { why: 'Warum Kalabrien', about: 'Über uns', trips: 'Reiseinformationen', book: 'Buchen / Reservieren' },
      hero: { title: 'Kalabrien entdecken', subtitle: 'Erleben Sie Kalabrien durch die Augen der Einheimischen' },
      why: { title: 'Warum Kalabrien?', beach: 'Strände', beach_desc: 'Tauchen Sie ein in Kalabriens atemberaubende Küste, wo unberührte Strände auf kristallklares Wasser treffen.', food: 'Essen', food_desc: 'Bereiten Sie Ihren Appetit vor — Kalabriens Köstlichkeiten sind ein Vollzeitjob!', culture: 'Kultur', culture_desc: 'Erkunden Sie jahrhundertealtes reiches Erbe, von antiken Ruinen bis zu lebendigen lokalen Traditionen.' },
      about: { 
        title: 'Über uns', 
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
        email: 'E-Mail-Adresse',
        emailPlaceholder: 'ihre.email@beispiel.com',
        phone: 'Telefonnummer',
        phonePlaceholder: '+1234567890 oder (123) 456-7890',
        preferredContact: 'Bevorzugte Kontaktmethode',
        emailOnly: 'E-Mail senden',
        both: 'Sowohl Anruf als auch E-Mail',
        message: 'Zusätzliche Nachricht',
        messagePlaceholder: 'Erzählen Sie uns von Ihren Reisevorlieben, besonderen Wünschen oder Fragen...',
        submit: 'Anfrage senden'
      },
      contactInfo: {
        title: 'Kontaktieren Sie uns',
        instagram: 'Instagram',
        email: 'E-Mail',
        facebook: 'Facebook',
        tiktok: 'TikTok'
      }
    },
    cz: {
      brand: 'Calabria Essence',
      nav: { why: 'Proč Kalábrie', about: 'O nás', trips: 'Informace o výletech', book: 'Rezervovat' },
      hero: { title: 'Objevte Kalábrii', subtitle: 'Poznejte Kalábrii očima místních' },
      why: { title: 'Proč Kalábrie?', beach: 'Pláže', beach_desc: 'Ponořte se do úchvatného pobřeží Kalábrie, kde nedotčené pláže splývají s křišťálově čistou vodou.', food: 'Jídlo', food_desc: 'Připravte si chuť k jídlu — lahodnost Kalábrie je práce na plný úvazek!', culture: 'Kultura', culture_desc: 'Objevte staletí bohatého dědictví, od starověkých ruin po živé místní tradice.' },
      about: { 
        title: 'O nás', 
        intro: 'Ciao & Ahoj! Jsme Lorenzo a Kristýna — italsko-český pár, který se potkal, zamiloval se a strávil poslední tři roky objevováním světa společně.',
        lorenzo: 'Lorenzo je srdcem Kalábrie v našem projektu — narodil se a vyrostl v Cosenze, s dětstvím plným letních pobytů u moře, rodinných receptů a místních příběhů.',
        kristyna: 'Kristýna pochází z živé Prahy a přináší zvědavost, kreativitu a cestovatelský instinkt, který nás vždy nutí dívat se za "obvyklé" a objevovat skutečnou duši každého místa, které navštívíme.',
        travels: 'Během našich cest se stále něco dělo: ať jsme šli kamkoli, Lorenzo vždy všechno srovnával se svým domovem. Ne proto, že by jiná místa nebyla krásná — ale proto, že si uvědomil, jak zvláštní Kalábrie skutečně je. Tradice, chutě, teplo lidí, přírodní krása… a způsob, jakým místní prožívají svou zemi každý den.',
        idea: 'Tehdy se zrodil nápad. Chtěli jsme vytvořit takový typ cestovatelské zkušenosti, jaký vždy hledáme sami — takový, který vám umožní vidět destinaci očima jejích lidí. Autentické restaurace doporučené místními. Pláže, na které se dostanete, když se zeptáte něčího nonna. Příběhy, recepty a malé objevy, které se neobjevují v žádné brožuře.',
        decision: 'Tak jsme se rozhodli přinést Kalábrii světu stejným způsobem, jakým ji Lorenzo zažíval, když vyrůstal: očima místních.',
        today: 'Dnes tuto vizi proměňujeme ve skutečnost — zveme vás, abyste se k nám připojili na cestě postavené na opravdových setkáních, místních jídlech, skrytých koutech a pravém duchu jižní Itálie.',
        dream: 'Toto je náš sen, který se stává skutečností, a byli bychom opravdu vděční, kdybyste byli jeho součástí.',
        welcome: 'Benvenuti — objevme společně Kalábrii očima místních.',
        photoQuote: 'Očima místních'
      },
      trips: { 
        title: 'Služby výletu', 
        itinerary: '6denní itinerář navržený místními (5 nocí)',
        driver: 'Soukromý řidič během všech fází itineráře',
        pension: 'Polopenze',
        beaches: 'Každý den jiná pláž',
        activitiesTitle: 'Aktivity v popředí:',
        wine: 'Degustace vína',
        boat: 'Den na lodi',
        pasta: 'PastaClass',
        snorkeling: 'Šnorchlování',
        nature: 'Výlety do přírody',
        villages: 'Prohlídka historických vesnic',
        workshop: 'Workshop',
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
        email: 'E-mailová adresa',
        emailPlaceholder: 'váš.email@příklad.cz',
        phone: 'Telefonní číslo',
        phonePlaceholder: '+1234567890 nebo (123) 456-7890',
        preferredContact: 'Preferovaný způsob kontaktu',
        emailOnly: 'Pošlete mi e-mail',
        both: 'Jak zavolat, tak e-mail',
        message: 'Dodatečná zpráva',
        messagePlaceholder: 'Řekněte nám o svých cestovních preferencích, speciálních požadavcích nebo jakýchkoli otázkách...',
        submit: 'Odeslat dotaz'
      },
      contactInfo: {
        title: 'Kontaktujte nás',
        instagram: 'Instagram',
        email: 'E-mail',
        facebook: 'Facebook',
        tiktok: 'TikTok'
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
    contactMethod: formData.get('contactMethod'),
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
