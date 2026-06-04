import { SERVICE_PAGES } from '../seoData';

const APP_ROUTES = new Set(['login', 'dashboard', 'admin']);
const CONTENT_ROUTES = new Set(Object.keys(SERVICE_PAGES));

export function currentRoute() {
  const hashRoute = window.location.hash.replace('#', '').split('?')[0].toLowerCase();

  if (hashRoute) {
    return hashRoute;
  }

  const pathRoute = window.location.pathname
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .pop()
    .toLowerCase();

  return APP_ROUTES.has(pathRoute) || CONTENT_ROUTES.has(pathRoute) ? pathRoute : 'home';
}

export function navigateToRoute(route) {
  const nextPath = route === 'home' ? '/' : `/${route}`;
  window.history.pushState({}, '', nextPath);
  window.dispatchEvent(new PopStateEvent('popstate'));
}
