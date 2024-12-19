<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import MainNavbar from '/src/components/header/MainNavbar.vue';
import LoginButton from '../LoginButton.vue';

const router = useRouter();
const route = { name: 'Home', path: '/' };
const store = useStore();

const companyName = ref('Retro Retreat');
const isScrolled = ref(false);
const header = ref(null);
const isOpen = ref(false);
const showLoginBtn = computed(() => !isAuthenticated.value && !isOpen.value);

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

const isAuthenticated = computed(
  () => store.getters['auth/IS_USER_AUTHENTICATED']
);
</script>

<template>
  <header id="main-header" :class="{ scrolled: isScrolled }" ref="header">
    <a :href="route.path" @click="(event) => handleRouting(event, route.path)">
      <h1 v-if="!isOpen">{{ companyName }}</h1></a
    >
    <div class="nav-btns">
      <LoginButton v-if="showLoginBtn" />
      <MainNavbar @update:isOpen="isOpen = $event" />
    </div>
  </header>
</template>

<style scoped>
#main-header {
  position: fixed;
  width: 100%;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#main-header.scrolled {
  background-color: var(--color-background-transparent);
  color: white;
}
#main-header a {
  text-decoration: none;
  color: var(--color-text);
}

#main-header a:hover {
  background-color: transparent;
}

#main-header .nav-btns {
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  gap: 1rem;
}
</style>
