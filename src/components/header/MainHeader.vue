<script setup>
import { ref } from 'vue';
import MainNavbar from './MainNavbar.vue';
// import { useRouter } from 'vue-router';

// const router = useRouter();
const companyName = ref('The Company');

</script>

<template>
  <div id="main-header">
    <h1>{{ companyName }}</h1>
  <MainNavbar/>
  </div>
</template>

<style scoped></style>
