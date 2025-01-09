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
  { name: 'Products', path: '/products' },
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

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
  emit('update:isOpen', isOpen.value);
};

const updateWindowSize = () => {
  windowHeight.value = window.innerHeight;
  windowWidth.value = window.innerWidth;
};

// const updateWindowHeight = () => {
//   windowHeight.value = window.innerHeight;
// };

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
  } else if (windowWidth.value > 380) {
    return {
      fontSize: '2rem',
      padding: '0.5rem',
    };
  } else {
    return {
      fontSize: '1.5rem',
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

onMounted(() => {
  window.addEventListener('resize', updateWindowSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowSize);
});
</script>

<template>
  <div id="main-navbar">
    <Teleport to="body">
      <div v-if="isOpen" class="modal-overlay">
        <div class="fullscreen-menu">
          <nav>
            <ul>
              <li v-for="(route, index) in routes" :key="route.name">
                <a href="#" @click="handleRouting($event, route.path)">
                  <span
                    class="numbers navbar-numbers"
                    :style="navbarNumbersStyle"
                    >0{{ index + 1 }}.
                  </span>
                  <span :style="navbarItemStyle">{{ route.name }}</span>
                  <!-- {{ route.name }} -->
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Teleport>
    <button
      @click="toggleMenu"
      :class="['menu-button', { 'menu-button-open': isOpen }]"
    >
      <span :class="{ line: true, line1: true, open: isOpen }"></span>
      <span :class="{ line: true, line2: true, open: isOpen }"></span>
      <span :class="{ line: true, line3: true, open: isOpen }"></span>
    </button>
  </div>
</template>

<style scoped>
#main-navbar {
  position: relative;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
}

.menu-button {
  position: absolute;
  top: 0rem;
  right: 0rem;
  transform: translate(50%, -50%);
  z-index: 101;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  padding: 0;
  z-index: 1000;
}

.menu-button-open {
  transform: translate(3rem, 1rem);
}

.line {
  width: 2rem;
  height: 0.25rem;
  background: var(--accent-3-color);
  border-radius: 10px;
  transition: all 0.3s linear;
  /* position: relative;
  transform-origin: 1px; */
}

.line1 {
  transform: rotate(0);
}

.line2 {
  opacity: 1;
  transform: translateX(0);
}

.line3 {
  transform: rotate(0);
}

.line1.open {
  transform: rotate(405deg) translate(7px, 7px);
}

.line2.open {
  opacity: 0;
  /* transform: translateX(20px); */
}

.line3.open {
  transform: rotate(315deg) translate(7px, -7px);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--modal-overlay);
  display: flex;
  justify-content: center;
  align-items: center;
}

.fullscreen-menu {
  position: fixed;
  top: 1rem;
  left: 2rem;
  bottom: 2rem;
  right: 2rem;
  width: calc(100vw - 4rem);
  height: calc(100vh - 3rem);
  background-color: var(--accent-4-background-color);
  color: var(--text-color);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.fullscreen-menu nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  /* width: max-content; */
  /* width: calc(min-content + 20vw); */
  text-align: left;
}

.fullscreen-menu nav ul li {
  margin: 1rem 0;
}

nav ul li a {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  text-decoration: none;
  color: var(--text-color);
  font-size: 3rem;
}

nav ul li a .navbar-numbers {
  font-size: 2.5rem;
}

nav ul li a:hover {
  background-color: transparent;
  font-family: 'Monoton', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 5rem;
}

.fullscreen-menu nav ul li a {
  color: var(--text-color);
  text-decoration: none;
  font-size: 1.5rem;
  transition: color 0.3s ease;
}

.fullscreen-menu nav ul li a:hover {
  color: var(--color-primary);
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
