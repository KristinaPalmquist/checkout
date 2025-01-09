<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import ProductCard from '@/components/ProductCard.vue';

const emit = defineEmits(['productClicked']);
const store = useStore();
const router = useRouter();

const categories = ref([]);
const products = ref([]);

const fetchProducts = async () => {
  try {
    const module = await import('../assets/data/categories.json');
    module.default.forEach((element) => {
      element.name = element.name.replace(/ /g, '-').toLowerCase();
      categories.value.push(element.name);
    });
    const productPromises = categories.value.map((category) =>
      import(`../assets/data/${category}.json`)
    );
    const productModules = await Promise.all(productPromises);
    const allProducts = productModules.flatMap((module) => module.default);
    products.value = shuffleArray(allProducts);
  } catch (error) {
    console.error('Error loading products: ', error);
  }
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const filteredProducts = computed(() => {
  if (!store.getters.searchQuery) {
    return products.value;
  } else {
    const query = store.getters.searchQuery.toLowerCase();
    const searchResult = products.value.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.specifications &&
          product.specifications.color &&
          product.specifications.color.toLowerCase().includes(query)) ||
        (product.specifications &&
          product.specifications.material &&
          product.specifications.material.toLowerCase().includes(query)) ||
        (product.specifications &&
          product.specifications.size &&
          product.specifications.size.toLowerCase().includes(query))
    );
    return searchResult;
  }
});

const navigateToProduct = (name, category) => {
  let categoryName = category.replace(/ /g, '-').toLowerCase();
  let productName = name.replace(/ /g, '-').toLowerCase();
  emit('productClicked');
  router.push({
    name: 'ProductDetails',
    params: { categoryName, productName },
  });
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div id="products-view" class="component-container">
    <h1>Products</h1>
    <div class="product-list">
      <div
        v-for="product in filteredProducts"
        :key="product.category + product.id"
        class="product-item"
        @click="navigateToProduct(product.name, product.category)"
      >
        <ProductCard
          :product="product"
          :category-name="product.category.toLowerCase()"
        />
      </div>
      <div v-if="filteredProducts.length === 0" class="empty-search message">
        No products found for your search
      </div>
    </div>
  </div>
</template>

<style scoped>
#products-view {
  padding: 2rem;
}

.product-list {
  padding-top: 2rem;
  column-count: 4;
  column-gap: 15px;
}
.product-item {
  display: inline-block;
  width: 100%;
  padding-bottom: 15px;
}
.product-item img {
  display: block;
  width: 100%;
}

.product-item {
  transition: transform 0.3s ease;
}

.product-item:hover {
  transform: scale(1.05);
}

.product-card {
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

.product-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.product-card img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.product-info {
  padding: 1rem;
  text-align: center;
}

.product-info h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

.empty-search {
  margin-bottom: 2rem;
}

@media only screen and (min-width: 1200px) {
  .product-list {
    column-count: 5;
    column-gap: 15px;
  }
}

@media only screen and (max-width: 1000px) {
  .product-list {
    column-count: 3;
    column-gap: 15px;
  }
}

@media only screen and (max-width: 700px) {
  .product-list {
    column-count: 2;
    column-gap: 15px;
  }
}

@media only screen and (max-width: 500px) {
  .product-list {
    column-count: 1;
    column-gap: 15px;
  }
}
</style>
