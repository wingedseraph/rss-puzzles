import AuthView from '@/views/AuthView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { authMiddleware } from './middleware';

export const ROUTES = {
  INDEX: '/',
  AUTH: '/auth',
  START: '/start',
  GAME: '/game/:level/:round',
  STATISTICS: '/statistics',
  NOTFOUND: '/:pathMatch(.*)*',
} as const;

export const VIEW_NAMES = {
  GAME: 'game',
} as const;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES.INDEX,
      redirect: ROUTES.AUTH,
    },
    {
      path: ROUTES.AUTH,
      component: AuthView,
      meta: { requiresGuest: true },
    },
    {
      path: ROUTES.START,
      component: () => import('@/views/StartView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: ROUTES.GAME,
      name: VIEW_NAMES.GAME,
      component: () => import('@/views/GameView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: ROUTES.STATISTICS,
      component: () => import('@/views/StatisticsView.vue'),
      meta: { requiresAuth: true },
    },

    {
      path: ROUTES.NOTFOUND,
      component: NotFoundView,
    },
  ],
});

router.beforeEach(authMiddleware);

export default router;
