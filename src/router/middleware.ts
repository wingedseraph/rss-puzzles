import { useAuthStore } from '@/stores/auth.store';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { ROUTES } from '.';

export function authMiddleware(
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const authStore = useAuthStore();
  const token = authStore.getToken;
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
