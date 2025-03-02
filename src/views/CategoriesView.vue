<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import CategoryCard from '@/components/CategoryCard.vue';

const router = useRouter();

const categories = ref([]);

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

onMounted(() => {
  fetchCategories();
});
</script>

<template>
  <div id="categories-view" class="component-container">
    <h1>Shop by Category</h1>
    <div class="category-list">
      <div
        v-for="category in categories"
        :key="category.id"
        class="category-item"
        @click="navigateToCategory(category.name)"
      >
        <CategoryCard :category="category" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-list {
  padding-top: 2rem;
  column-count: 4;
  column-gap: 15px;
}
.category-item {
  display: inline-block;
  width: 100%;
  padding-bottom: 15px;
}
.category-item img {
  display: block;
  width: 100%;
}

.category-item {
  transition: transform 0.3s ease;
}

.category-item:hover {
  transform: scale(1.05);
}

.category-card {
  background-color: #c4c4c4;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-row: span 30;
}

.category-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.category-card img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.category-info {
  padding: 1rem;
  text-align: center;
}

.category-info h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

@media only screen and (min-width: 1200px) {
  .category-list {
    column-count: 5;
    column-gap: 15px;
  }
}

@media only screen and (max-width: 1000px) {
  .category-list {
    column-count: 3;
    column-gap: 15px;
  }
}

@media only screen and (max-width: 700px) {
  .category-list {
    column-count: 2;
    column-gap: 15px;
  }
}

@media only screen and (max-width: 500px) {
  .category-list {
    column-count: 1;
    column-gap: 15px;
  }
}
</style>
