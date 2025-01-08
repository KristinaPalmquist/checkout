<script setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useDebounce } from '@vueuse/core';


const store = useStore();
const localSearchQuery = ref(store.getters.searchQuery);
const debouncedSearchQuery = useDebounce(localSearchQuery, 300);

watch(debouncedSearchQuery, (newQuery) => {
  store.dispatch('updateSearchQuery', newQuery);
});


watch(() => store.getters.searchQuery, (newQuery) => {
  localSearchQuery.value = newQuery;
});


</script>

<template>
  <div id="search-bar">
    <input
      class="input-field"
      type="text"
      v-model="localSearchQuery"
      placeholder="Search products..."
    />
  </div>
</template>

<style scoped>
#search-bar {
  background: transparent;
}

#search-bar .input-field {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: none;

  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
}

#search-bar .input-field:focus {
  background: var(--color-background);
  border: 1px solid var(--accent-3-color);
  outline: 1px solid var(--accent-3-color);
}
</style>
