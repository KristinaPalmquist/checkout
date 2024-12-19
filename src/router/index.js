import { createWebHistory, createRouter } from 'vue-router';
import LoginForm from '../views/LoginForm.vue';
import WelcomeUser from '@/views/WelcomeUser.vue';
import CheckoutForm from '@/views/CheckoutForm.vue';
import HomeView from '@/views/HomeView.vue';
import AboutUs from '@/views/AboutUs.vue';
import ContactUs from '@/views/ContactUs.vue';
import MainCategories from '@/views/CategoriesView.vue';
import CategoryProductsView from '@/views/CategoryProductsView.vue';
import ProductDetailsView from '@/views/ProductDetailsView.vue';
import ShowCart from '@/views/ShowCart.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    component: AboutUs,
  },
  {
    path: '/cart',
    component: ShowCart,
  },
  { path: '/categories', component: MainCategories },
  {
    path: '/categories/:categoryName',
    name: 'CategoryProducts',
    component: CategoryProductsView,
    props: (route) => ({
      categoryName: route.params.categoryName,
      image: route.query.image,
    }),
  },
  {
    path: '/categories/:categoryName/:productName',
    name: 'ProductDetails',
    component: ProductDetailsView,

    props: true,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutForm,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactUs,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginForm,
  },
  // {path: 'products',
  //   component: ProductsView,
  // },
  {
    path: '/welcome',
    name: 'Welcome',
    component: WelcomeUser,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // routes: routes,
  // linkActiveClass: 'active'
});

export default router;
