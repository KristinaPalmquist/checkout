<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const companyName = ref('The Company');
const routes = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const handleRouting = (event) => {
  event.preventDefault();
  const route = event.target.getAttribute('href');
  router.push(route);
};
</script>

<template>
  <div id="main-header">
    <h2>{{ companyName }}</h2>
    <nav>
      <a :href="route.path" v-for="(route, index) in routes" :key="index" @click="handleRouting">{{
        route.name
      }}</a>
    </nav>
  </div>
</template>

<style scoped></style>
