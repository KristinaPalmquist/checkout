<script setup>
import { computed, ref, onMounted, onUnmounted, onUpdated, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import MainNavbar from '/src/components/header/MainNavbar.vue';
import LoginButton from '../LoginButton.vue';
import ThemeToggle from '../ThemeToggle.vue';
import SearchBar from '../SearchBar.vue';

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
      header.value.style.transform = `translateY(-${
        titleRef.value.offsetHeight + 32
      }px)`;
    }
  } else {
    isScrolled.value = false;
    header.value.style.transform = 'translateY(0)';
  }
};

const checkIfMobile = () => {
  isMobile.value = window.innerWidth <= 600;
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
    emits('headerHeight', document.getElementById('main-header').offsetHeight);
  }
};

const resetSearchQuery = () => {
  store.dispatch('resetSearchQuery');
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', checkIfMobile);
  checkIfMobile();
  updateHeaderHeight();
});

onUpdated(() => {
  updateHeaderHeight();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', checkIfMobile);
});

watch(headerHeight, (newHeight) => {
  emits('headerHeight', newHeight);
});
</script>

<template>
  <header id="main-header" :class="{ scrolled: isScrolled, open: isOpen }" ref="header">
    <div class="header-content">
      <a
        :href="route.path"
        @click="
          (event) => {
            handleRouting(event, route.path);
            resetSearchQuery();
          }
        "
        ref="titleRef"
        class="header-title"
      >
        <h1 v-if="!isOpen" class="company-name">{{ companyName }}</h1></a
      >
      <div class="nav-btns">
        <div class="search">
          <SearchBar v-if="!isOpen" />
        </div>
        <div class="theme">
          <ThemeToggle v-if="!isOpen" />
        </div>
        <div class="login">
          <LoginButton v-if="showLoginBtn" />
        </div>
        <MainNavbar @update:isOpen="isOpen = $event" class="nav" />
      </div>
    </div>
  </header>
</template>

<style scoped>
#main-header {
  position: fixed;
  width: 100vw;
  color: var(--color-text);
  padding: 0 2rem;
  z-index: 10;
  transition: transform 1s ease-in-out;
}

#main-header.scrolled {
  background-color: var(--color-background-transparent);
}

#main-header.open {
     background: transparent;
     backdrop-filter: none;
     box-shadow: none;
     border: none;
   }

.header-content {
  width: clamp(300px, 80vw, 1200px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem auto;
}
a {
  text-decoration: none;
  color: var(--color-text);
}

.header-title {
  transition: transform 0.5s ease-in-out;
  color: var(--color-text);
}

/* a:hover {
  background-color: transparent;
} */

.nav-btns {
  display: flex;
  align-items: center;
}

.nav-btns > * {
  margin-left: 1rem;
}

@media only screen and (max-width: 980px) {
  #main-header {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    border: none;
  }
  #main-header.scrolled {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    border: none;
  }
  /* #main-header.open {
     background: transparent;
     backdrop-filter: none;
     box-shadow: none;
     border: none;
   } */
  .header-content {
    margin: 1rem auto;
  }
  .company-name {
    font-size: 2.5rem;
    /* color: rgb(51, 235, 57);
    text-shadow: 0px 0px 12px rgba(0, 0, 0, 0.9); */
    text-shadow: 0px 0px 16px rgb(51, 235, 57);
    /* text-shadow: 0px 0px 12px rgba(51, 235, 57, 0.9); */
  }
  .login {
    display: none;
  }
}

@media only screen and (max-width: 980px) {
  .company-name {
    font-size: 1.8rem;
  }
}

@media only screen and (max-width: 600px) {
  #main-header {
    height: auto;
    padding: 1rem;
    margin-bottom: 0.5rem;
  }

  .header-content {
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .company-name {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .nav-btns {
    width: 100%;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .nav-btns > * {
    margin-left: 0;
    margin-bottom: 0.5rem;
  }
  .nav-btns .search {
    margin: 0;
  }

  .nav-btns .theme {
    display: none;
  }

  .nav-btns .login {
    display: none;
  }
}

@media only screen and (max-width: 420px) {
  .company-name {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }
}
</style>
