<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isOpen = ref(false);

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
  //   const route = event.target.getAttribute('href');
  router.push(path);
  isOpen.value = false;
};

const toggleNavbar = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div id="main-navbar" :class="{ 'navbar-background': isOpen }">
    <button @click="toggleNavbar" class="hamburger">
      <!-- <span v-if="!isOpen">☰</span>
      <span v-else>✖</span> -->
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
      >
        <span class="numbers navbar-numbers">0{{ index + 1 }}. </span>

        {{ route.name }}</a
      >
    </nav>
  </div>
</template>

<style scoped>
#main-navbar {
  position: relative;
  padding: 1rem;
}

.navbar-background {
  background-color: white;
  height: calc(120px * 8);
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
  z-index: 10;
}

.line {
  width: 30px;
  height: 3px;
  background: var(--accent-color);
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
  top: 3rem;
  left: 0;
  /* background-color: white; */
  width: 100%;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
}

.navbar a {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 60%;

  padding: 1rem 1rem 1rem 10%;
  text-decoration: none;
  color: black;
  /* border-bottom: 1px solid #ddd; */
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
</style>
