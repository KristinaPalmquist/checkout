<script setup>
import { ref, onMounted, watch } from 'vue';
import CustomCursor from './components/cursor/CustomCursor.vue';
import MainHeader from './components/header/MainHeader.vue';

const mainElement = ref(null);
const headerHeight = ref(0);
const isMobile = ref(false);

const updateMainPadding = (height) => {
  headerHeight.value = height;
  if (mainElement.value) {
    mainElement.value.style.paddingTop = `${headerHeight.value}px`;
  }
};

onMounted(() => {
  mainElement.value = document.querySelector('main');
  if (mainElement.value) {
    mainElement.value.style.paddingTop = `${headerHeight.value}px`;
  }
  isMobile.value = window.matchMedia('(max-width: 768px)').matches;
});

watch(headerHeight, (newHeight) => {
  if (mainElement.value) {
    mainElement.value.style.paddingTop = `${newHeight}px`;
  }
});
</script>

<template>
  <CustomCursor v-if="!isMobile" />
  <MainHeader @header-height="updateMainPadding" />
  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped>
/* main {
  padding-top: 70px;
  min-height: 100vh;
} */
</style>
