<script setup>
import BasicCard from './BasicCard.vue';

const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
});

const category = props.category;

const resolveImagePath = () => {
  const { name, imagename } = category;
  console.log('category: ', category);
  console.log('name: ', name);
  console.log('imagename: ', imagename);
  let path = `../src/assets/images/${name.toLowerCase()}/${imagename.toLowerCase()}.jpg`;
  console.log('path: ', path);

  return new URL(path, import.meta.url).href;
};
</script>

<template>
  <div id="category-card">
    <BasicCard :title="category.name" :imageSrc="resolveImagePath()" />
  </div>
</template>

<style scoped>
#category-card {
  width: 100%;
  border-radius: 1rem;
  break-inside: avoid;
  text-align: center;
  transition: transform 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

#category-card img {
  width: 100%;
  height: auto;
  border-radius: 1rem 1rem 0 0;
}

#category-card:hover {
  transform: scale(1.05);
}
</style>
