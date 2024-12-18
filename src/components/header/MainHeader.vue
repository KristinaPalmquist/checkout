<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import MainNavbar from '/src/components/header/MainNavbar.vue';

import { useRouter } from 'vue-router';

const router = useRouter();
const route = { name: 'Home', path: '/' };

const companyName = ref('Retro Retreat');
const isScrolled = ref(false);
const header = ref(null);
const isOpen = ref(false);

const handleScroll = () => {
  if (window.scrollY > 50) {
    isScrolled.value = true;
  } else {
    isScrolled.value = false;
  }
};

const handleRouting = (event, path) => {
  event.preventDefault();
  router.push(path);
  isOpen.value = false;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header id="main-header" :class="{ scrolled: isScrolled }" ref="header">
    <a :href="route.path" @click="(event) => handleRouting(event, route.path)">
      <h1 v-if="!isOpen">{{ companyName }}</h1></a
    >
    <MainNavbar @update:isOpen="isOpen = $event" />
  </header>
</template>

<style scoped>
#main-header {
  position: fixed;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

#main-header a {
  color: var(--color-text);
}

#main-header a:hover {
  background-color: transparent;
}

#main-header.scrolled {
  background-color: var(--color-background-transparent);
  /* background-color: rgba(0, 0, 0, 0.8); */
  color: white;
}
</style>
