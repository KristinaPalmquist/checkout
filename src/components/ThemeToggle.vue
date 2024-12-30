<script setup>
import { ref, onMounted } from 'vue';
import BasicButton from './BasicButton.vue';

const isDarkMode = ref(false);

// const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

// const systemSettingLight = window.matchMedia("(prefers-color-scheme: light)");

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.setAttribute(
    'data-theme',
    isDarkMode.value ? 'dark' : 'light'
  );
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');

  const button = document.querySelector('.theme-toggle');
  button.classList.add('wiggle');
  setTimeout(() => {
    button.classList.remove('wiggle');
  }, 500);
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else {
    // Check system preference
    const systemSettingDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    isDarkMode.value = systemSettingDark;
    document.documentElement.setAttribute(
      'data-theme',
      systemSettingDark ? 'dark' : 'light'
    );
  }
});
</script>

<template>
  <button
    @click="toggleTheme"
    class="theme-toggle"
    type="button"
    data-theme-toggle
    aria-label="Change to light or dark theme"
  >
    {{ isDarkMode ? '🌙' : '☀️' }}
    <!-- {{ isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode' }} -->
  </button>
</template>

<style scoped>
.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  margin: 0;
  padding: 0;
  color: var(--color-text);
  transition: color 0.3s ease;
}

.theme-toggle:hover {
  animation: wiggle 0.5s ease-in-out;
  /* transform: translateY(-0.1rem); */
  color: var(--color-primary);
}

@keyframes wiggle {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(10deg);
  }
  50% {
    transform: rotate(-10deg);
  }
  75% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.wiggle {
  animation: wiggle 1s ease-in-out;
}
</style>
