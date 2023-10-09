import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/task-description',
  },
  {
    path: '/task-description',
    name: 'TaskDescription',
    component: () => import('../views/TaskDescriptionView.vue'),
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('../views/MapView.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
