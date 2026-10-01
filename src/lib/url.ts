/** Prefix a site path with Astro `base` (needed for GitHub project Pages). */
export function url(path: string = '/'): string {
  const base = import.meta.env.BASE_URL;

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

  return `${base}${path.replace(/^\//, '')}`;
}
