<script setup>
import BasicCardSmall from './BasicCardSmall.vue';

const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
});

const resolveImagePath = (name) => {
  let categoryName = name.replace(/ /g, '-').toLowerCase();
  let path = `../assets/images/${categoryName}/${props.category.imagename}.jpg`;
  return new URL(path, import.meta.url).href;
};
</script>

<template>
  <div id="category-card-small">
    <BasicCardSmall
      :title="category.name"
      :imageSrc="resolveImagePath(category.name)"
    />
  </div>
</template>

<style scoped>

 #category-card-small {
  width: 100%;
  border-radius: 1rem;
  break-inside: avoid;
  text-align: center;
  transition: transform 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/*
#category-card-small img {
  width: 100%;
  height: auto;
  border-radius: 1rem 1rem 0 0;
} */

#category-card-small:hover {
  transform: scale(1.05);
}
</style>
