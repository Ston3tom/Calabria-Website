# Calabria Essence

Website for **Calabria Essence** — small-group travel experiences in Calabria, Italy, hosted by Lorenzo & Kristýna.

Guests join a **6-day / 5-night** itinerary (May–July) with a private driver, full board, beaches, food, and local culture. Groups are capped at **10 people**. Pricing starts from **22.490 Kč** per person.

## What’s on the site

| Page | Purpose |
|------|---------|
| Home | Brand hero, experience themes, hosts intro, itinerary preview, booking form |
| About | Story of Lorenzo & Kristýna |
| Itinerary | Day-by-day plan, inclusions, prices, inquiry form |
| Beaches / Food / Culture | Theme pages for the trip pillars |
| Contact | Inquiry form (also on home & itinerary) via EmailJS |

Languages: **EN · IT · DE · CZ** (client-side switcher).

## Stack

- [Astro](https://astro.build) (static output)
- Tailwind CSS v4
- EmailJS for booking inquiries
- Deployed with **GitHub Pages** (`.github/workflows/deploy.yml`)

## Local development

```sh
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

```sh
npm run build    # → dist/
npm run preview  # preview production build
```

## Deploy (GitHub Pages)

1. Push to `main` or `master`
2. Repo **Settings → Pages → Source: GitHub Actions**
3. After the workflow succeeds, the site is at  
   `https://<user>.github.io/<repo>/`  
   (or `https://<user>.github.io/` if the repo is named `<user>.github.io`)

The workflow sets `SITE` and `BASE` automatically so project Pages URLs work.

## Project layout

```text
src/
  pages/          # routes
  components/     # Header, Footer, PageHero, ContactForm
  i18n/           # translations
  styles/         # design tokens + global CSS
public/
  images/         # WebP photos
  favicon.svg
```

## Contact

- Email: calabria.essence@gmail.com
- Instagram / Facebook / TikTok: linked in the site footer
