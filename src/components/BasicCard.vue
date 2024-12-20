<script setup>
import { defineProps, onMounted } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: null,
  },
});

const title = props.title;
const imageSrc = props.imageSrc;
const price = props.price;

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

onMounted(() => {
  console.log('BasicCard mounted');
  console.log(imageSrc);
});
</script>

<template>
  <div id="basic-card">
    <img :src="imageSrc" :alt="title" />
    <div class="card-content">
      <h2>{{ title }}</h2>
      <p v-if="price">{{ formatCurrency(price) }}</p>
    </div>
  </div>
</template>

<style scoped>
#basic-card {
  width: 100%;
  border-radius: 1rem;
  break-inside: avoid;
  text-align: center;
  transition: transform 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

#basic-card img {
  width: 100%;
  height: auto;
  border-radius: 1rem 1rem 0 0;
}

.card-content {
  padding: 1rem;
}
</style>
