<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import BasicButton from '@/components/BasicButton.vue';

const router = useRouter();
const store = useStore();

const cartProducts = computed(() => store.getters.cartProducts);
const totalPrice = computed(() => store.getters.totalPrice);

const resolveImagePath = (product) => {
  if (!product || !product.image) return '';
  try {
    const { name, category } = product;
    const path = `../assets/images/${category.toLowerCase()}/${name.toLowerCase()}.jpg`;
    return new URL(path, import.meta.url).href;
  } catch (e) {
    console.error(`Image not found for product: ${product.name}`);
    return '';
  }
};

// https://retroretreat.netlify.app/assets/images/footwear/star.jpg

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

const increaseQuantity = (index, quantity) => {
  store.dispatch('updateQuantity', { index, quantity: quantity + 1 });
  store.dispatch('saveCart');
};

const decreaseQuantity = (index, quantity) => {
  if (quantity > 1) {
    store.dispatch('updateQuantity', { index, quantity: quantity - 1 });
    store.dispatch('saveCart');
  }
};

const removeFromCart = (index) => {
  store.dispatch('removeFromCart', index);
  store.dispatch('saveCart');
};

const goToCategories = () => {
  router.push('/categories');
};

const goToCheckout = () => {
  store.dispatch('saveCart');
  router.push('/checkout');
};

onMounted(() => {
  store.dispatch('loadCart');
});
</script>

<template>
  <div id="show-cart" class="component-container">
    <h1>Your Cart</h1>
    <ul>
      <li
        v-for="(product, index) in cartProducts"
        :key="index"
        class="cart-item"
      >
        <img
          :src="resolveImagePath(product)"
          :alt="product.name"
          class="product-image"
        />
        <p class="product-name">
          <strong>{{ product.name }}</strong>
        </p>
        <p class="product-price">{{ formatCurrency(product.price) }}</p>
        <div class="quantity-controls">
          <BasicButton
            :btnText="'-'"
            :btnClass="'small-icon'"
            :btnFunction="() => decreaseQuantity(index, product.quantity)"
          />
          <p class="product-quantity">{{ product.quantity }}</p>
          <BasicButton
            :btnText="'+'"
            :btnClass="'small-icon'"
            :btnFunction="() => increaseQuantity(index, product.quantity)"
          />
        </div>
        <p class="product-total">
          {{ formatCurrency(product.price * product.quantity) }}
        </p>

        <BasicButton
          :btnText="'Remove'"
          :btnFunction="() => removeFromCart(index)"
          :btnClass="'small-text'"
        />
      </li>
    </ul>

    <div class="total">
      <h2>Total: {{ formatCurrency(totalPrice) }}</h2>
    </div>

    <div class="btn-div">
      <BasicButton
        :btnText="'Continue Shopping'"
        :btnFunction="goToCategories"
      />
      <BasicButton
        :btnText="'Proceed to Checkout'"
        :btnFunction="goToCheckout"
        :btnClass="'cta-btn'"
      />
    </div>
  </div>
</template>

<style scoped>
/* #show-cart {
  width: 90vw;
  padding: 2rem;
  text-align: center;
  display: grid;
  gap: 1rem;
} */

#show-cart ul {
  list-style-type: none;
  padding: 0;
}

#show-cart .cart-item {
  display: grid;
  grid-template-columns: 100px 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
  padding: 2rem 1rem;
  border-bottom: 1px solid #ccc;
}

#show-cart .total {
  width: max-content;
  position: relative;
  left: 75%;
  transform: translateX(-50%);
  padding-top: 2rem;
  z-index: -10;
}

#show-cart .total h2 {
  display: inline;
  /* text-align: right; */
  /* margin-top: 1rem;
  margin-right: 15vw; */
}

#show-cart .product-image {
  width: 100px;
  height: auto;
  /* margin-right: 1rem; */
}

.product-name {
  font-size: 1.2rem;
}

.product-name,
.product-price,
.product-quantity,
.product-total {
  text-align: center;
}

.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.quantity-controls p {
  margin: 0 0.5rem;
}
</style>
