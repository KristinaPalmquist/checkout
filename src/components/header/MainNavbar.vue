<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const emit = defineEmits(['update:isOpen']);
const router = useRouter();
const isOpen = ref(false);
const windowHeight = ref(window.innerHeight);
const windowWidth = ref(window.innerWidth);

const routes = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Categories', path: '/categories' },
  // { name: 'Products', path: '/products' },
  { name: 'Cart', path: '/cart' },
  { name: 'Checkout', path: '/checkout' },
  { name: 'Login', path: '/login' },
];

const handleRouting = (event, path) => {
  event.preventDefault();
  router.push(path);
  isOpen.value = false;
  emit('update:isOpen', isOpen.value);
};

const toggleNavbar = () => {
  isOpen.value = !isOpen.value;
  emit('update:isOpen', isOpen.value);
};

const updateWindowHeight = () => {
  windowHeight.value = window.innerHeight;
};

const navbarItemStyle = computed(() => {
  if (windowWidth.value > 600) {
    const backgroundHeight = windowHeight.value - 30;
    const itemHeight = backgroundHeight / routes.length;
    // const fontSize = Math.min(itemHeight * 0.5, 50);
    const padding = Math.min(itemHeight * 0.05, 3);
    const fontSize = 90 / routes.length - padding * 2;
    return {
      fontSize: `${fontSize}vh`,
      padding: `${padding}px`,
    };
  } else {
    return {
      fontSize: '2rem',
      padding: '0.5rem',
    };
  }
});

const navbarNumbersStyle = computed(() => {
  if (windowWidth.value > 600) {
    const itemHeight = windowHeight.value / routes.length;
    // const fontSize = Math.min(itemHeight * 0.3, 32);
    const padding = Math.min(itemHeight * 0.05, 4);
    const fontSize = 90 / routes.length - padding * 2;
    return {
      fontSize: `${fontSize}vh`,
      padding: `${padding}px`,
    };
  } else {
    return {
      fontSize: '2rem',
      // padding: '0.7rem',
    };
  }
});

const navbarBackgroundStyle = computed(() => {
  // const itemHeight = windowHeight.value / routes.length;
  // const paddingMargin = 33;
  // const totalHeight = itemHeight * routes.length - paddingMargin;
  // return {
  //   height: `${totalHeight}px`,
  // };
  return {
    height: `93vh`,
  };
});

onMounted(() => {
  window.addEventListener('resize', updateWindowHeight);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowHeight);
});
</script>

<template>
  <div
    id="main-navbar"
    :class="{ 'navbar-background': isOpen }"
    :style="isOpen ? navbarBackgroundStyle : {}"
  >
    <button @click="toggleNavbar" class="hamburger">
      <span :class="{ line: true, line1: true, open: isOpen }"></span>
      <span :class="{ line: true, line2: true, open: isOpen }"></span>
      <span :class="{ line: true, line3: true, open: isOpen }"></span>
    </button>
    <nav v-if="isOpen" class="navbar">
      <a
        v-for="(route, index) in routes"
        :key="index"
        :href="route.path"
        @click="(event) => handleRouting(event, route.path)"
        :style="navbarItemStyle"
      >
        <span class="numbers navbar-numbers" :style="navbarNumbersStyle"
          >0{{ index + 1 }}.
        </span>

        {{ route.name }}</a
      >
    </nav>
  </div>
</template>

<style scoped>
#main-navbar {
  position: relative;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.navbar-background {
  position: absolute;
  top: 1rem;
  left: -5rem;
  width: calc(100vw - 7rem);
  background-color: var(--accent-4-background-color);
  border-radius: 1rem;
  height: calc(120px * 8);
}

.navbar-background .hamburger {
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  z-index: 101;
}

.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  padding: 0;
}

.hamburger:focus:not(:active) {
  box-shadow: none;
}

.line {
  width: 30px;
  height: 3px;
  background: var(--accent-3-color);
  transition: all 0.3s ease;
}

.line1.open {
  transform: rotate(405deg) translate(7px, 7px);
}

.line2.open {
  opacity: 0;
}

.line3.open {
  transform: rotate(315deg) translate(7px, -7px);
}

.navbar {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  padding-top: 2rem;
}

.navbar a {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 60%;
  padding: 0.5rem;
  margin-left: -20rem;
  text-decoration: none;
  color: black;
  font-size: 3rem;
  text-align: center;
}

.navbar-numbers {
  font-size: 2.5rem;
}

.navbar a:hover {
  background-color: transparent;
  font-family: 'Monoton', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 4rem;
}

@media only screen and (max-width: 1024px) {
  .navbar-background {
    left: -3rem;
  }
}

@media only screen and (max-width: 600px) {
  #main-navbar {
    padding: 0;
  }

  .navbar-background {
    width: 90vw;
    left: 1.5rem;
  }

  #main-navbar .navbar {
    height: 95%;
  }

  #main-navbar .navbar a,
  #main-navbar .navbar a span {
    margin: auto 0;
  }

  #main-navbar .navbar a {
    margin-left: -30%;
  }

  /* .navbar-numbers {
    font-size: 1.5rem;
  } */

  .navbar a:hover {
    font-size: 3rem;
  }
}
</style>
