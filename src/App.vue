<script setup>
import CustomCursor from './components/cursor/CustomCursor.vue';
import MainHeader from './components/header/MainHeader.vue';
</script>

<template>
  <!-- <div> -->
  <CustomCursor />
  <MainHeader />
  <main>
    <router-view></router-view>
  </main>
  <!-- </div> -->
</template>

<style scoped>
main {
  padding-top: 70px;
  min-height: 100vh;
  background-color: #f9f9f9;
  transition: background-color 0.3s;
}
</style>
