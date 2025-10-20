document.addEventListener('DOMContentLoaded', () => {
  setupSmoothScroll();
  setupI18n();
  measureHeaderHeight();
});

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
        const offsetTop = Math.max(absoluteTop - headerOffset - 8, 0);
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
  const defaultLang = localStorage.getItem('lang') || 'en';
  const texts = getTranslations();
  const buttons = document.querySelectorAll('.lang-btn');
  buttons.forEach(btn => btn.addEventListener('click', () => {
    const lang = btn.getAttribute('data-lang');
    if (!lang) return;
    localStorage.setItem('lang', lang);
    applyLang(lang, texts);
    buttons.forEach(b => b.classList.toggle('active', b === btn));
  }));
  applyLang(defaultLang, texts);
  buttons.forEach(b => b.classList.toggle('active', b.getAttribute('data-lang') === defaultLang));
}

function applyLang(lang, texts) {
  const dict = texts[lang] || texts.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    const value = key.split('.').reduce((acc, k) => (acc ? acc[k] : undefined), dict);
    if (typeof value === 'string') {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.setAttribute('placeholder', value);
      } else {
        el.textContent = value;
      }
    }
  });
}

function getTranslations() {
  return {
    en: {
      brand: 'Calabria Tours',
      nav: { explore: 'Explore Calabria', why: 'Why Calabria', about: 'About Us', trips: 'Trips Information', book: 'Book / Reserve' },
      hero: { title: 'Explore Calabria', subtitle: 'From sea to mountains, culture and cuisine.' },
      why: { title: 'Why Calabria?', beach: 'Beaches', beach_desc: 'Crystal seas and hidden coves.', food: 'Food', food_desc: 'Spicy, authentic, unforgettable.', culture: 'Culture', culture_desc: 'Traditions carved by time.' },
      about: { title: 'About Us', text: 'Tours crafted by locals who love Calabria.', team: 'Meet our team' },
      trips: { title: 'Trips Information (Our Service)', transfer: 'Airport transfers', wine: 'Vineyard visits', driver: 'Private driver', culinary: 'Culinary workshops' },
      cta: { title: 'Book / Reserve now', book: 'Book / Reserve now', check: 'Check Itinerary' }
    },
    it: {
      brand: 'Calabria Tours',
      nav: { explore: 'Esplora la Calabria', why: 'Perché Calabria', about: 'Chi siamo', trips: 'Informazioni Viaggi', book: 'Prenota / Riserva' },
      hero: { title: 'Esplora la Calabria', subtitle: 'Dal mare alle montagne, cultura e cucina.' },
      why: { title: 'Perché Calabria?', beach: 'Spiagge', beach_desc: 'Mare cristallino e calette nascoste.', food: 'Cibo', food_desc: 'Piccante, autentico, indimenticabile.', culture: 'Cultura', culture_desc: 'Tradizioni scolpite dal tempo.' },
      about: { title: 'Chi siamo', text: 'Tour creati da locali che amano la Calabria.', team: 'Conosci il team' },
      trips: { title: 'Informazioni sui Viaggi (I nostri servizi)', transfer: 'Transfer da/per aeroporto', wine: 'Visite in cantina', driver: 'Autista privato', culinary: 'Laboratori di cucina' },
      cta: { title: 'Prenota / Riserva ora', book: 'Prenota / Riserva ora', check: 'Vedi Itinerario' }
    },
    de: {
      brand: 'Calabria Tours',
      nav: { explore: 'Kalabrien entdecken', why: 'Warum Kalabrien', about: 'Über uns', trips: 'Reiseinformationen', book: 'Buchen / Reservieren' },
      hero: { title: 'Kalabrien entdecken', subtitle: 'Vom Meer zu den Bergen, Kultur und Küche.' },
      why: { title: 'Warum Kalabrien?', beach: 'Strände', beach_desc: 'Kristallklares Meer und versteckte Buchten.', food: 'Essen', food_desc: 'Würzig, authentisch, unvergesslich.', culture: 'Kultur', culture_desc: 'Traditionen, vom Lauf der Zeit geformt.' },
      about: { title: 'Über uns', text: 'Touren von Einheimischen, die Kalabrien lieben.', team: 'Unser Team' },
      trips: { title: 'Reiseinformationen (Unser Service)', transfer: 'Flughafentransfers', wine: 'Weingutbesuche', driver: 'Privatfahrer', culinary: 'Kochworkshops' },
      cta: { title: 'Jetzt buchen / reservieren', book: 'Buchen / Reservieren', check: 'Reiseplan ansehen' }
    }
  };
}


