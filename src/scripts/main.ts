import emailjs from '@emailjs/browser';
import { translations, type Lang } from '../i18n/translations';
import { EMAILJS } from '../data/site';

const LANGS: Lang[] = ['en', 'it', 'de', 'cz'];

function getLang(): Lang {
  const saved = localStorage.getItem('lang');
  return LANGS.includes(saved as Lang) ? (saved as Lang) : 'en';
}

function resolvePath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

function applyLang(lang: Lang) {
  const dict = translations[lang] || translations.en;
  document.documentElement.lang = lang === 'cz' ? 'cs' : lang;

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    const value = resolvePath(dict, key);
    if (typeof value === 'string') el.textContent = value;
  });

  document.querySelectorAll<HTMLElement>('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (!key) return;
    const value = resolvePath(dict, key);
    if (typeof value === 'string') el.setAttribute('placeholder', value);
  });

  document.querySelectorAll<HTMLOptGroupElement>('optgroup[data-i18n-label]').forEach((el) => {
    const key = el.getAttribute('data-i18n-label');
    if (!key) return;
    const value = resolvePath(dict, key);
    if (typeof value === 'string') el.label = value;
  });

  document.querySelectorAll<HTMLButtonElement>('.lang-btn').forEach((btn) => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle('bg-chili', active);
    btn.classList.toggle('text-white', active);
    btn.setAttribute('aria-pressed', String(active));
  });
}

function setupI18n() {
  const lang = getLang();
  applyLang(lang);

  document.querySelectorAll<HTMLButtonElement>('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = btn.dataset.lang as Lang;
      if (!LANGS.includes(next)) return;
      localStorage.setItem('lang', next);
      applyLang(next);
    });
  });
}

function setupHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;

  const update = () => {
    const menuOpen = document.querySelector('[data-menu-toggle]')?.getAttribute('aria-expanded') === 'true';
    const shouldSolid =
      window.scrollY > 24 || header.dataset.solid === 'true' || menuOpen;
    header.classList.toggle('is-solid', shouldSolid);
  };

  if (header.hasAttribute('data-solid-default')) {
    header.dataset.solid = 'true';
    header.classList.add('is-solid');
  }

  update();
  window.addEventListener('scroll', update, { passive: true });

  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const mobile = document.querySelector<HTMLElement>('[data-mobile-nav]');
  if (!toggle || !mobile) return;

  const iconOpen = toggle.querySelector<HTMLElement>('[data-icon-open]');
  const iconClose = toggle.querySelector<HTMLElement>('[data-icon-close]');

  const setOpen = (open: boolean) => {
    mobile.classList.toggle('hidden', !open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    iconOpen?.classList.toggle('hidden', open);
    iconClose?.classList.toggle('hidden', !open);
    update();
  };

  toggle.addEventListener('click', () => {
    setOpen(mobile.classList.contains('hidden'));
  });

  mobile.querySelectorAll('[data-mobile-link]').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
}

function setupReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const reveal = (el: Element) => {
    el.classList.add('is-visible');
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -4% 0px' },
  );

  items.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      reveal(el);
      return;
    }
    io.observe(el);
  });
}

function setupSmoothAnchors() {
  const baseUrl = import.meta.env.BASE_URL || '/';
  const basePath = baseUrl.replace(/\/$/, '');

  document.querySelectorAll<HTMLAnchorElement>('a[href*="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:')) return;

      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;

      const hash = href.slice(hashIndex);
      if (!hash || hash === '#') return;

      const pathPart = href.slice(0, hashIndex);
      const normalizedPath = pathPart.replace(/\/$/, '');
      const currentPath = window.location.pathname.replace(/\/$/, '');
      const homePath = basePath || '';

      const targetsHome =
        !pathPart ||
        normalizedPath === homePath ||
        href.startsWith('#') ||
        href.startsWith('/#') ||
        href.startsWith(`${baseUrl}#`);

      const onHome = currentPath === homePath || currentPath === '' || currentPath.endsWith('/index.html');

      if (!href.startsWith('#') && targetsHome && !onHome) return;
      if (!targetsHome && normalizedPath && normalizedPath !== currentPath) return;

      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      const header = document.querySelector<HTMLElement>('[data-header]');
      const offset = (header?.offsetHeight ?? 72) + 12;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      history.replaceState(null, '', hash);
    });
  });
}

function showBanner(form: HTMLFormElement, type: 'success' | 'error') {
  form.parentElement?.querySelector('.success-banner, .error-banner')?.remove();
  const div = document.createElement('div');
  div.className = type === 'success' ? 'success-banner' : 'error-banner';
  div.setAttribute('role', 'status');
  div.innerHTML =
    type === 'success'
      ? `<strong>Thank you for your inquiry!</strong><p>We'll get back to you within 24 hours.</p>`
      : `<strong>Sorry, there was an error sending your message.</strong><p>Please try again or email us directly.</p>`;
  form.parentElement?.insertBefore(div, form);
  div.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => div.remove(), 6000);
}

function setupContactForm() {
  const form = document.querySelector<HTMLFormElement>('#contactForm');
  if (!form) return;

  emailjs.init(EMAILJS.publicKey);

  const tripPeriod = form.querySelector<HTMLSelectElement>('#tripPeriod');
  const tripStart = form.querySelector<HTMLInputElement>('#tripDateStart');
  const tripEnd = form.querySelector<HTMLInputElement>('#tripDateEnd');
  const travellers = form.querySelector<HTMLSelectElement>('#travellers');
  const message = form.querySelector<HTMLTextAreaElement>('#message');
  const phone = form.querySelector<HTMLInputElement>('#phone');

  tripPeriod?.addEventListener('change', () => {
    const [start = '', end = ''] = (tripPeriod.value || '').split('_');
    if (tripStart) tripStart.value = start;
    if (tripEnd) tripEnd.value = end;
  });

  const updateMessageRequired = () => {
    if (!message || !travellers) return;
    if (travellers.value === 'explain') message.setAttribute('required', 'required');
    else message.removeAttribute('required');
  };

  const updatePhoneRequired = () => {
    if (!phone) return;
    const method = form.querySelector<HTMLInputElement>('input[name="contactMethod"]:checked')?.value;
    if (method === 'both') phone.setAttribute('required', 'required');
    else phone.removeAttribute('required');
  };

  travellers?.addEventListener('change', updateMessageRequired);
  form.querySelectorAll('input[name="contactMethod"]').forEach((el) => {
    el.addEventListener('change', () => {
      updatePhoneRequired();
      updateMessageRequired();
    });
  });

  const clearError = (field: HTMLElement) => {
    field.classList.remove('error');
    field.parentElement?.querySelector('.error-message')?.remove();
  };

  const showError = (field: HTMLElement, text: string) => {
    field.classList.add('error');
    field.parentElement?.querySelector('.error-message')?.remove();
    const msg = document.createElement('div');
    msg.className = 'error-message';
    msg.textContent = text;
    field.parentElement?.appendChild(msg);
  };

  const validateField = (field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
    clearError(field);
    const value = field.value.trim();
    if (field.hasAttribute('required') && !value) {
      showError(field, 'This field is required');
      return false;
    }
    if (field.type === 'email' && value) {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!ok) {
        showError(field, 'Please enter a valid email address');
        return false;
      }
    }
    if (field.type === 'tel' && value) {
      const digits = value.replace(/[^\d+]/g, '');
      if (digits.length < 7 || digits.length > 16) {
        showError(field, 'Please enter a valid phone number');
        return false;
      }
    }
    return true;
  };

  form.querySelectorAll('input, select, textarea').forEach((field) => {
    field.addEventListener('input', () => clearError(field as HTMLElement));
    field.addEventListener('blur', () => validateField(field as HTMLInputElement));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea').forEach((field) => {
      if (field.hasAttribute('required') || (field.type === 'tel' && field.value.trim()) || (field.type === 'email' && field.value.trim())) {
        if (!validateField(field)) valid = false;
      }
    });

    if (!valid) {
      form.querySelector('.error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const original = submit?.textContent || 'Send Inquiry';
    if (submit) {
      submit.disabled = true;
      submit.textContent = 'Sending...';
      submit.style.opacity = '0.7';
    }

    const data = new FormData(form);
    const lang = getLang();
    const templateId = EMAILJS.templates[lang] || EMAILJS.templates.en;

    try {
      await emailjs.send(EMAILJS.serviceId, templateId, {
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        phone: data.get('phone') || 'Not provided',
        travellers: data.get('travellers'),
        tripDateStart: data.get('tripDateStart') || 'Not specified',
        tripDateEnd: data.get('tripDateEnd') || 'Not specified',
        contactMethod: data.get('contactMethod'),
        discountCode: data.get('discountCode') || 'None',
        message: data.get('message') || 'No additional message',
      });
      showBanner(form, 'success');
      form.reset();
      updateMessageRequired();
      updatePhoneRequired();
    } catch (err) {
      console.error(err);
      showBanner(form, 'error');
    } finally {
      if (submit) {
        submit.disabled = false;
        submit.textContent = original;
        submit.style.opacity = '1';
      }
    }
  });
}

function boot() {
  setupI18n();
  setupHeader();
  setupReveal();
  setupSmoothAnchors();
  setupContactForm();
}

boot();
