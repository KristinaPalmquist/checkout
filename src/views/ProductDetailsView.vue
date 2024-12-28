<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import BasicButton from '../components/BasicButton.vue';

const route = useRoute();
const router = useRouter();
const store = useStore();
const { categoryName, productName } = route.params;

const product = ref(null);
const message = ref('');
const showMessage = ref(false);

const fetchProduct = async () => {
  try {
    const module = await import(`../assets/data/${categoryName}.json`);
    const products = module.default;
    product.value = products.find(
      (p) => p.name.toLowerCase() === productName.toLowerCase()
    );
    console.log(product.value);
  } catch (error) {
    console.error('Error loading product:', error);
  }
};

const resolveImagePath = (product) => {
  let name = product.name.replace(/ /g, '-').toLowerCase();
  let category = product.category.toLowerCase();
  let path = `../assets/images/${category}/${name}.jpg`;
  return new URL(path, import.meta.url).href;
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

const addToCart = () => {
  store.dispatch('addToCart', product.value);
  store.dispatch('saveCart');

  // const items = store.getters.cartProducts;
  message.value = 'Product added to cart!';
  showMessage.value = true;
};

const goToCart = () => {
  router.push('/cart');
};

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
  <div v-if="product" id="product-details" class="component-container">
    <div class="product-details">
      <div class="product-image">
        <img :src="resolveImagePath(product)" :alt="product.name" />
      </div>
      <div class="product-info">
        <div class="name">
        <h1>{{ product.name }}</h1></div>
        <div class="description">
        <p>{{ product.description }}</p></div>
        <div class="price">
        <p>{{ formatCurrency(product.price) }}</p></div>
        <div class="average-rating">
          <p>
            {{ renderStars(Math.round(averageRating)) }} ({{ averageRating }})
          </p>
        </div>
        <div class="specifications">
          <ul>
            <li v-for="(value, key) in product.specifications" :key="key">
              <strong>{{ key }}:</strong> {{ value }}
            </li>
          </ul>
        </div>
        <details class="reviews">
          <summary>
            <h3>Reviews</h3>
          </summary>
          <ul>
            <li v-for="review in product.reviews" :key="review.id">
              <strong>{{ review.author }}:</strong> {{ review.comment }}
              <p>{{ renderStars(review.rating) }}</p>
            </li>
          </ul>
        </details>
        <div class="message-div">
          <p class="message" v-show="showMessage">{{ message }}</p>
        </div>
        <div class="btn-div">
          <BasicButton :btnText="'Go to Cart'" :btnFunction="goToCart" />
          <BasicButton
            :btnText="'Add to Cart'"
            :btnFunction="addToCart"
            :btnClass="'cta-btn'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-details {
  width: 90vw;
  margin: 0 auto;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
}
.product-info {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
}
.product-image {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  /* margin-bottom: 2rem; */
}
.product-image img {
  /* width: 100%; */
  height: auto;
  max-width: 100%;
  max-height: 100%;
  /* max-width: 300px;
  max-height: 300px; */
  border-radius: 2rem;
  margin: auto;
  border: 16px solid transparent;
  outline: 3px solid hotpink;
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
  margin-bottom: 1rem;
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
  margin-bottom: 0.5rem;
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
}

details[open] summary::after {
  content: 'Close ▲';
  transform: rotate(3600deg);
}

@media only screen and (max-width: 768px) {
  .product-details {
    grid-template-columns: 1fr;
    grid-template-areas: "";
  }

  .product-image {
    margin-top: 2rem;
  }

  .product-info {
    display: grid;

    grid-template-areas: "name"
                         "price"
                         "msg"
                         "btn"
                         "spec"
                         "avg"
                         "desc"
                         "rev";

  }

  .name {
    grid-area: name;
  }

  .description {
    grid-area: desc;
  }

  .price {
    grid-area: price;
    margin: 0
  }

  .price p {
    margin: 0;
  }

  .average-rating {
    grid-area: avg;
  }

  .specifications {
    grid-area: spec;
  }

  .reviews {
    grid-area: rev;
  }

  .message-div {
    grid-area: msg;
  }

  .btn-div {
    grid-area: btn;
    margin-bottom: 2rem;
    gap: 2rem;
  }
}
</style>
