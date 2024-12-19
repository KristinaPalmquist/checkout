<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { categoryName } = route.params;

const products = ref([]);

const fetchProducts = async () => {
  try {
    const module = await import(`../assets/data/${categoryName}.json`);
    products.value = module.default;
  } catch (error) {
    console.error('Error loading products: ', error);
  }
};

// const fetchProducts = async () => {
//   console.log('categoryName', categoryName);
//   try {
//     const module = await import(`../assets/data/${categoryName}.json`);
//     products.value = module.default;
//   } catch (error) {
//     console.error('Error loading products: ', error);
//   }
//   console.log('products.value', products.value);
//   console.log('products.value[0].image', products.value[0].image);
// };

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

const navigateToProduct = (name) => {
  let productName = name.replace(/ /g, '-').toLowerCase();
  router.push({
    name: 'ProductDetails',
    params: { categoryName, productName },
  });
};

const resolveImagePath = (name) => {
  let productName = name.replace(/ /g, '-').toLowerCase();
  let path = `../assets/images/${categoryName}/${productName}.jpg`;
  console.log(path);
  return new URL(path, import.meta.url).href;
};

// const resolveImages = async () => {
//   await Promise.all(
//     products.value.map(async (product) => {
//       product.image = await resolveImagePath(product.name);
//     })
//   );
// };

onMounted(() => {
  fetchProducts();
  // resolveImages()
});
</script>

<template>
  <div id="category-products" class="component-container">
    <h1>Products in {{ categoryName }}</h1>
    <div class="product-list">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-item"
        @click="navigateToProduct(product.name)"
      >
        <img :src="resolveImagePath(product.name)" :alt="product.name" />
        <h2>{{ product.name }}</h2>
        <p>{{ formatCurrency(product.price) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-image {
  width: 100%;
  height: auto;
  margin-bottom: 2rem;
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
  /* width: 200px;
  transition: transform 0.3s ease; */
}

.product-item:hover {
  transform: scale(1.05);
}

.product-item img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.product-item h2 {
  margin-top: 0.5rem;
  font-size: 1.2rem;
}

.product-item p {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #888;
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
