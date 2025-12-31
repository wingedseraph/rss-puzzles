import { createRouter, createWebHistory } from 'vue-router';
import AuthView from '../views/AuthView.vue';

const LS_VALUE = 'sepaph-puzzle';

function isAuth() {
  return Boolean(localStorage.getItem(LS_VALUE) || false);
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AuthView,
    },
    {
      path: '/main',
      name: 'main',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MainView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

router.beforeEach((to, from) => {
  console.log(to, from);


/*
  make MainView - private,
   if isAuth === false, re-direct to '/'
   if isAuth === true, re-direct to MainView from '/'
*/



    /* false - restrict route */
});

export default router;
