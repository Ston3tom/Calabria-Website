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
    cs: 'template_99y2afg'  // Czech template ID
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
      brand: 'Calabria Tours',
      nav: { why: 'Why Calabria', about: 'About Us', trips: 'Trips Information', book: 'Book / Reserve' },
      hero: { title: 'Explore Calabria', subtitle: 'From sea to mountains, culture and cuisine.' },
      why: { title: 'Why Calabria?', beach: 'Beaches', beach_desc: 'Crystal seas and hidden coves.', food: 'Food', food_desc: 'Spicy, authentic, unforgettable.', culture: 'Culture', culture_desc: 'Traditions carved by time.' },
      about: { title: 'About Us', text: 'Tours crafted by locals who love Calabria.', team: 'Meet our team' },
      trips: { title: 'Trips Information (Our Service)', transfer: 'Airport transfers', wine: 'Vineyard visits', driver: 'Private driver', culinary: 'Culinary workshops' },
      cta: { book: 'Book Now' },
      contact: {
        title: 'Contact Us',
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
        different: 'Different method',
        message: 'Additional Message',
        messagePlaceholder: 'Tell us about your travel preferences, special requests, or any questions you have...',
        submit: 'Send Inquiry'
      }
    },
    it: {
      brand: 'Calabria Tours',
      nav: { why: 'Perché Calabria', about: 'Chi siamo', trips: 'Informazioni Viaggi', book: 'Prenota / Riserva' },
      hero: { title: 'Esplora la Calabria', subtitle: 'Dal mare alle montagne, cultura e cucina.' },
      why: { title: 'Perché Calabria?', beach: 'Spiagge', beach_desc: 'Mare cristallino e calette nascoste.', food: 'Cibo', food_desc: 'Piccante, autentico, indimenticabile.', culture: 'Cultura', culture_desc: 'Tradizioni scolpite dal tempo.' },
      about: { title: 'Chi siamo', text: 'Tour creati da locali che amano la Calabria.', team: 'Conosci il team' },
      trips: { title: 'Informazioni sui Viaggi (I nostri servizi)', transfer: 'Transfer da/per aeroporto', wine: 'Visite in cantina', driver: 'Autista privato', culinary: 'Laboratori di cucina' },
      cta: { book: 'Prenota Ora' },
      contact: {
        title: 'Contattaci',
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
        different: 'Metodo diverso',
        message: 'Messaggio Aggiuntivo',
        messagePlaceholder: 'Raccontaci le tue preferenze di viaggio, richieste speciali o qualsiasi domanda tu abbia...',
        submit: 'Invia Richiesta'
      }
    },
    de: {
      brand: 'Calabria Tours',
      nav: { why: 'Warum Kalabrien', about: 'Über uns', trips: 'Reiseinformationen', book: 'Buchen / Reservieren' },
      hero: { title: 'Kalabrien entdecken', subtitle: 'Vom Meer zu den Bergen, Kultur und Küche.' },
      why: { title: 'Warum Kalabrien?', beach: 'Strände', beach_desc: 'Kristallklares Meer und versteckte Buchten.', food: 'Essen', food_desc: 'Würzig, authentisch, unvergesslich.', culture: 'Kultur', culture_desc: 'Traditionen, vom Lauf der Zeit geformt.' },
      about: { title: 'Über uns', text: 'Touren von Einheimischen, die Kalabrien lieben.', team: 'Unser Team' },
      trips: { title: 'Reiseinformationen (Unser Service)', transfer: 'Flughafentransfers', wine: 'Weingutbesuche', driver: 'Privatfahrer', culinary: 'Kochworkshops' },
      cta: { book: 'Jetzt Buchen' },
      contact: {
        title: 'Kontaktieren Sie uns',
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
        different: 'Andere Methode',
        message: 'Zusätzliche Nachricht',
        messagePlaceholder: 'Erzählen Sie uns von Ihren Reisevorlieben, besonderen Wünschen oder Fragen...',
        submit: 'Anfrage senden'
      }
    },
    cs: {
      brand: 'Calabria Tours',
      nav: { why: 'Proč Kalábrie', about: 'O nás', trips: 'Informace o výletech', book: 'Rezervovat' },
      hero: { title: 'Objevte Kalábrii', subtitle: 'Od moře k horám, kultura a kuchyně.' },
      why: { title: 'Proč Kalábrie?', beach: 'Pláže', beach_desc: 'Křišťálové moře a skryté zátoky.', food: 'Jídlo', food_desc: 'Pikantní, autentické, nezapomenutelné.', culture: 'Kultura', culture_desc: 'Tradice vyryté časem.' },
      about: { title: 'O nás', text: 'Výlety vytvořené místními, kteří milují Kalábrii.', team: 'Poznejte náš tým' },
      trips: { title: 'Informace o výletech (Naše služby)', transfer: 'Transfery z/na letiště', wine: 'Návštěvy vinařství', driver: 'Soukromý řidič', culinary: 'Kulinářské workshopy' },
      cta: { book: 'Rezervovat Nyní' },
      contact: {
        title: 'Kontaktujte nás',
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
        emailPlaceholder: 'vas.email@priklad.cz',
        phone: 'Telefonní číslo',
        phonePlaceholder: '+1234567890 nebo (123) 456-7890',
        preferredContact: 'Preferovaný způsob kontaktu',
        emailOnly: 'Pošlete mi e-mail',
        both: 'Jak zavolat, tak e-mail',
        different: 'Jiný způsob',
        message: 'Dodatečná zpráva',
        messagePlaceholder: 'Řekněte nám o svých cestovních preferencích, speciálních požadavcích nebo jakýchkoli otázkách...',
        submit: 'Odeslat dotaz'
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
  if (contactMethodRadios.length > 0 && messageField) {
    contactMethodRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        updateMessageFieldRequirement();
      });
    });
  }
  
  // Function to update message field requirement based on travellers and contact method
  function updateMessageFieldRequirement() {
    const travellersValue = travellersSelect ? travellersSelect.value : '';
    const contactMethodValue = form.querySelector('input[name="contactMethod"]:checked')?.value || '';
    
    if (travellersValue === 'explain' || contactMethodValue === 'different') {
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
  
  // Debug: Log the language and template being used
  console.log('Current language:', currentLang);
  console.log('Template ID:', templateId);
  console.log('Available templates:', EMAILJS_CONFIG.templates);
  
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
