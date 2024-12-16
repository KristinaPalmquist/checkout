<script setup>
import CustomCursor from './components/cursor/CustomCursor.vue';
import MainHeader from './components/header/MainHeader.vue';
</script>

<template>
  <div id="app">
  <CustomCursor />
  <header>
    <MainHeader />
  </header>
  <main>
    <router-view></router-view>
  </main></div>
</template>

<style scoped>


</style>
