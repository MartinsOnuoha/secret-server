import Vue from 'vue';
import VueRouter from 'vue-router';
import ViewSecret from '../views/ViewSecret.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'ViewSecret',
    component: ViewSecret,
  },
  {
    path: '/create',
    name: 'Create Secret',
    component: () => import('../views/CreateSecret.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
