<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import CategoryCardSmall from '@/components/CategoryCardSmall.vue';

const router = useRouter();

const categories = ref([]);
const scrollContainer = ref(null);

const fetchCategories = async () => {
  try {
    const module = await import('../assets/data/categories.json');
    categories.value = module.default;
  } catch (error) {
    console.error('Error loading categories: ', error);
  }
};

const navigateToCategory = (name) => {
  let categoryName = name.replace(/ /g, '-').toLowerCase();
  router.push({
    name: 'CategoryProducts',
    params: { categoryName },
  });
};

const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -200, behavior: 'smooth' });
    handleScroll();
  }
};

const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: 200, behavior: 'smooth' });
    handleScroll();
  }
};

const handleScroll = () => {
  const container = scrollContainer.value;
  if (container) {
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    if (container.scrollLeft <= 0) {
      container.scrollLeft = maxScrollLeft / 2 - container.clientWidth;
    } else if (container.scrollLeft >= maxScrollLeft) {
      container.scrollLeft = maxScrollLeft / 2 - container.clientWidth;
    }
  }
};

onMounted(() => {
  fetchCategories();
  const container = scrollContainer.value;
  if (container) {
    container.scrollLeft = container.scrollWidth / 2 - container.clientWidth;
    container.addEventListener('scroll', handleScroll);
  }
});

watch(categories, () => {
  const container = scrollContainer.value;
  if (container) {
    container.scrollLeft = container.scrollWidth / 2 - container.clientWidth;
  }
});
</script>

<template>
  <div class="categories-small">
    <button class="scroll-button left" @click="scrollLeft">‹</button>
    <div class="categories-row" ref="scrollContainer">
      <div class="categories-container">
        <CategoryCardSmall
          v-for="category in [...categories, ...categories]"
          :key="category.name + Math.random()"
          :category="category"
          @click="navigateToCategory(category.name)"
        />
      </div>
    </div>
    <button class="scroll-button right" @click="scrollRight">›</button>
    <div class="fade-left"></div>
    <div class="fade-right"></div>
  </div>
</template>

<style scoped>
.categories-small {
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 1rem 0;
}
.categories-row {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  white-space: nowrap;
  flex: 1;
}

.categories-container {
  display: flex;
  flex-wrap: nowrap;
}

.categories-container > * {
  flex: 0 0 auto;
  margin-right: 1rem;
  max-width: 200px;
}

.scroll-button {
  background-color: transparent;
  /* background-color: rgba(0, 0, 0, 0.6); */
  color: var(--color-text);
  border: none;
  padding: 0.5rem 1rem;
  font-size: 7rem;
  font-weight: 200;
  /* cursor: pointer; */
  z-index: 1;
}

.scroll-button.left {
  position: absolute;
  left: 0;
  z-index: 2;
}

.scroll-button.right {
  position: absolute;
  right: 0;
  z-index: 2;
}

.fade-left,
.fade-right {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 20%;
  pointer-events: none;
  z-index: 1;
}

.fade-left {
  left: 0;
  background: linear-gradient(
    to right,
    var(--gradient-start),
    var(--gradient-end)
  );
}

.fade-right {
  right: 0;
  background: linear-gradient(
    to left,
    var(--gradient-start),
    var(--gradient-end)
  );
}
</style>
