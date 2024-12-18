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
}
</style>
