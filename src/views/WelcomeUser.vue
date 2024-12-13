<script setup>

import { ref } from 'vue';
import { useStore } from 'vuex';
import { GET_USERNAME } from '@/store/storeconstants';

const store = useStore();

// const userName = ref(store.state.auth.userName || 'User');
const userName = ref(store.getters[`auth/${GET_USERNAME}`] || 'User');

</script>

<template>
  <div>
    <h2>Welcome {{ userName }}</h2>
  </div>
</template>

<style scoped></style>
