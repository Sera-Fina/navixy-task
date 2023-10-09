import Vue from 'vue';
import VueRouter from 'vue-router';
import TaskDescriptionView from '@/views/TaskDescriptionView.vue';
import MapView from '@/views/MapView.vue';

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
    component: TaskDescriptionView,
  },
  {
    path: '/map',
    name: 'Map',
    component: MapView,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
