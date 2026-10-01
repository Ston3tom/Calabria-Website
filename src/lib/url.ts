/** Prefix a site path with Astro `base` (needed for GitHub project Pages). */
export function url(path: string = '/'): string {
  const base = import.meta.env.BASE_URL; // always ends with /

  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:')
  ) {
    return path;
  }

  if (path.startsWith('/#')) {
    return `${base}${path.slice(1)}`;
  }

  if (path.startsWith('#')) {
    return path;
  }

  if (path === '/') {
    return base;
  }

  const clean = path.replace(/^\//, '');

  // Keep asset paths as-is (files with extensions)
  if (/\.[a-z0-9]+$/i.test(clean.split('?')[0] ?? clean)) {
    return `${base}${clean}`;
  }

  // Pages use trailing slashes (matches trailingSlash: 'always')
  return `${base}${clean.replace(/\/$/, '')}/`;
}
