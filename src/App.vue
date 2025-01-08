<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import CustomCursor from './components/cursor/CustomCursor.vue';
import MainHeader from './components/header/MainHeader.vue';
import MainFooter from './components/MainFooter.vue';

const router = useRouter();
const store = useStore();
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

watchEffect(() => {
  if (store.getters.searchQuery !== '') {
    router.push({
      name: 'Products',
      query: { search: store.getters.searchQuery },
    });
  }
  if (mainElement.value) {
    mainElement.value.style.paddingTop = `${headerHeight.value}px`;
  }
});
</script>

<template>
  <CustomCursor v-if="!isMobile" />
  <MainHeader
    @header-height="updateMainPadding"
    @update:searchQuery="store.dispatch('updateSearchQuery', $event)"
  />
  <main>
    <router-view
      :search-query="store.getters.searchQuery"
      @productClicked="store.dispatch('resetSearchQuery')"
    ></router-view>
  </main>
  <MainFooter />
</template>

<style scoped>
main {
  min-height: 50vh;
  /* flex: 1; */
}
</style>
