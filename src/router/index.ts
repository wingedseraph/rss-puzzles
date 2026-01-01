import AuthView from '@/views/AuthView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const LS_VALUE = 'seraph-puzzle';

function isAuth(): boolean {
  return Boolean(localStorage.getItem(LS_VALUE));
}

const router = createRouter({
  // todo: add main layout to have same styles in every page
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
    },
    {
      path: '/',
      name: 'main',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/MainView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue'),
    },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !isAuth()) {
    next({ path: '/auth', query: { redirect: to.fullPath } });
  } else if (to.name === 'auth' && isAuth()) {
    next({ name: 'main' });
  } else {
    next();
  }
});

export default router;
