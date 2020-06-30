import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import Login from '@/components/Login.vue';
import Dashboard from '@/components/Dashboard.vue';
import Movies from '@/components/Movies.vue';
import guest from '@/router/middleware/guest';
import auth from '@/router/middleware/auth';
import isSubscribed from '@/router/middleware/isSubscribed';
import middlewarePipeline from './middlewarePipeline';

import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    beforeEnter(to, from, next) {
      // to: 이동할 url에 해당하는 라우팅 객체
      // eslint-disable-next-line arrow-parens
      if (to.matched.some(routeInfo => routeInfo.meta.authRequired)) {
        // 이동할 페이지에 인증정보가 필요하면 경고 창을 띄우고 페이지 전환은 하지 않음
        // alert('Login Please');
      } else {
        console.log(`routing success: '${to.path}'`);
        next(); // 페이지전환
      }
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      middleware: [guest],
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      middleware: [auth],
    },
    children: [
      {
        path: '/dashboard/movies',
        name: 'dashboard.movies',
        component: Movies,
        meta: {
          middleware: [auth, isSubscribed],
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const { middleware } = to.meta;

  const context = {
    to,
    from,
    next,
    store,
  };
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;
