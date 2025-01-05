<script setup>
import { computed, ref, onMounted, onUnmounted, onUpdated, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import MainNavbar from '/src/components/header/MainNavbar.vue';
import LoginButton from '../LoginButton.vue';
import ThemeToggle from '../ThemeToggle.vue';

const router = useRouter();
const route = { name: 'Home', path: '/' };
const store = useStore();

const companyName = ref('Retro Retreat');
const isScrolled = ref(false);
const header = ref(null);
const isOpen = ref(false);
const headerHeight = ref(0);
const titleRef = ref(null);
const isMobile = ref(false);

const showLoginBtn = computed(() => !isAuthenticated.value && !isOpen.value);

const emits = defineEmits(['headerHeight']);

const handleScroll = () => {
  if (window.scrollY > 50) {
    isScrolled.value = true;
    if (isMobile.value) {
      header.value.style.transform = `translateY(-${titleRef.value.offsetHeight}px)`;
    }
  } else {
    isScrolled.value = false;
    header.value.style.transform = 'translateY(0)';
  }
};

const handleRouting = (event, path) => {
  event.preventDefault();
  router.push(path);
  isOpen.value = false;
};

const isAuthenticated = computed(
  () => store.getters['auth/IS_USER_AUTHENTICATED']
);

const updateHeaderHeight = () => {
  if (!isOpen.value) {
    headerHeight.value = document.getElementById('main-header').offsetHeight;
    emits('headerHeight', headerHeight.value);
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);

  updateHeaderHeight();
});

onUpdated(() => {
  updateHeaderHeight();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

watch(headerHeight, (newHeight) => {
  emits('headerHeight', newHeight);
});
</script>

<template>
  <header id="main-header" :class="{ scrolled: isScrolled }" ref="header">
    <div class="header-content">
      <a
        :href="route.path"
        @click="(event) => handleRouting(event, route.path)"
        ref="titleRef"
        class="header-title"
      >
        <h1 v-if="!isOpen">{{ companyName }}</h1></a
      >
      <div class="nav-btns">
        <ThemeToggle v-if="!isOpen" />
        <LoginButton v-if="showLoginBtn" />
        <MainNavbar @update:isOpen="isOpen = $event" />
      </div>
    </div>
  </header>
</template>

<style scoped>
#main-header {
  position: fixed;
  width: 100%;
  padding: 0 2rem;
  z-index: 10;
  transition: transform 1s ease-in-out;
}

#main-header.scrolled {
  background-color: var(--color-background-transparent);
  color: white;
}

#main-header .header-content {
  width: clamp(300px, 80%, 1200px);

  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem auto;
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
  grid-template-columns: auto auto auto auto;
  align-items: center;
  gap: 1rem;
}

@media only screen and (max-width: 600px) {
  #main-header {
    margin-bottom: 0.5rem;
  }

  #main-header .header-content {
    width: 100%;
    flex-direction: column;
  }

  #main-header h1 {
    font-size: 2.7rem;
    margin-bottom: 0;
  }

  /* #main-header .nav-btns {
    gap: 3rem;
  } */
}
</style>
