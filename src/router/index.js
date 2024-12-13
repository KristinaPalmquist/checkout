import { createWebHistory, createRouter } from 'vue-router';
import LoginForm from '../views/LoginForm.vue';
import WelcomeUser from '@/views/WelcomeUser.vue';
import CheckoutForm from '@/views/CheckoutForm.vue';
import HomeView from '@/views/HomeView.vue';

const routes = [

  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/login',
    component: LoginForm,
  },
  {
    path: '/welcome',
    component: WelcomeUser,
  },
  {
    path: '/checkout',
    component: CheckoutForm,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // routes: routes,
  // linkActiveClass: 'active'
});

export default router;
