<script setup>
import BasicCard from './BasicCard.vue';

const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
});

const resolveImagePath = (name) => {
  let categoryName = name.replace(/ /g, '-').toLowerCase();
  let path = `/src/assets/images/${categoryName}/${props.category.imagename}.jpg`;
  return new URL(path, import.meta.url).href;
};

// const category = props.category;

// const resolveImagePath = () => {
//   const { name, imagename } = category;
//   console.log('category: ', category);
//   console.log('name: ', name);
//   console.log('imagename: ', imagename);
//   let path = `@/assets/images/${name.toLowerCase()}/${imagename.toLowerCase()}.jpg`;
//   console.log('path: ', path);

//   return new URL(path, import.meta.url).href;
// };

// http://localhost:5173/src/src/assets/images/dresses/banana.jpg
// http://localhost:5173/src/components/@/assets/images/bags/leather.jpg

// https://retroretreat.netlify.app/assets/..src/assets/images/headwear/z.jpg
// https://retroretreat.netlify.app/src/assets/images/bags/leather.jpg
</script>

<template>
  <div id="category-card">
    <BasicCard
      :title="category.name"
      :imageSrc="resolveImagePath(category.name)"
    />
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
