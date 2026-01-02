import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { ROUTES } from '.';

const LS_TOKEN = 'seraph-puzzle' as const;

export function authMiddleware(
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const token = localStorage.getItem(LS_TOKEN);
  const isAuth = !!token;

  if (to.meta.requiresGuest && isAuth) {
    return next({ path: ROUTES.START });
  }

  if (to.meta.requiresAuth && !isAuth) {
    return next({
      path: ROUTES.AUTH,
      query: { redirect: to.fullPath },
    });
  }

  next();
}
