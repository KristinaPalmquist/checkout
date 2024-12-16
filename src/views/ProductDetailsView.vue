<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { categoryName, productName } = route.params;

const product = ref(null);

const fetchProduct = async () => {
  try {
    const module = await import(`../assets/data/${categoryName}.json`);
    const products = module.default;
    product.value = products.find(
      (p) => p.name.toLowerCase() === productName.toLowerCase()
    );
  } catch (error) {
    console.error('Error loading product:', error);
  }
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

const averageRating = computed(() => {
  if (!product.value || !product.value.reviews) return 0;
  const totalRating = product.value.reviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );
  return (totalRating / product.value.reviews.length).toFixed(1);
});

const renderStars = (rating) => {
  const fullStar = '★';
  const emptyStar = '☆';
  return fullStar.repeat(rating) + emptyStar.repeat(5 - rating);
};

onMounted(() => {
  fetchProduct();
});
</script>

<template>
  <div v-if="product" class="product-details">
    <img :src="product.image" :alt="product.name" class="product-image" />
    <div class="product-info">
      <h1>{{ product.name }}</h1>
      <p>{{ product.description }}</p>
      <p>{{ formatCurrency(product.price) }}</p>
      <div class="average-rating">
        <!-- <h2>Average Rating</h2> -->
        <p>
          {{ renderStars(Math.round(averageRating)) }} ({{ averageRating }})
        </p>
      </div>
      <div class="specifications">
        <!-- <h2>Specifications</h2> -->
        <ul>
          <li v-for="(value, key) in product.specifications" :key="key">
            <strong>{{ key }}:</strong> {{ value }}
          </li>
        </ul>
      </div>
      <details class="reviews">
        <summary>
          <h2>Reviews</h2>
        </summary>
        <ul>
          <li v-for="review in product.reviews" :key="review.id">
            <strong>{{ review.author }}:</strong> {{ review.comment }}
            <p>{{ renderStars(review.rating) }}</p>
          </li>
        </ul>
      </details>

      <button class="buy-now cta-btn">Buy Now</button>
    </div>
  </div>
</template>

<style scoped>
.product-details {
  width: 90vw;
  padding: 2rem;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
}
.product-info {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.product-image {
  width: 100%;
  /* width: 50%; */
  height: auto;
  margin-bottom: 2rem;
}

.product-info h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.product-info p {
  margin-bottom: 1rem;
}

.price {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.specifications,
.reviews {
  margin-bottom: 2rem;
}

.specifications h2,
.reviews h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.specifications ul,
.reviews ul {
  list-style-type: none;
  padding: 0;
}

.specifications li,
.reviews li {
  margin-bottom: 0.5rem;
}

.reviews summary {
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* display: flex;*/
  align-items: center;
  justify-content: center; 
}

.reviews summary::after {
  content: 'Read ▼';
  margin-left: 0.5rem;
  font-size: 1rem;
  transition: transform 0.3s ease;
  margin-left: 2rem;
  margin-bottom: 16px;
}

details[open] summary::after {
  content: 'Close ▲';
  transform: rotate(3600deg);
}
</style>
