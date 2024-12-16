<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const xChild = ref(0);
const yChild = ref(0);
const xParent = ref(0);
const yParent = ref(0);
const isHovering = ref(false);

const cursorCircle = computed(() => {
  return `transform: translateX(${xParent.value}px) translateY(${yParent.value}px) translateZ(0);`;
});

const cursorPoint = computed(() => {
  return `transform: translateX(${xChild.value - 3}px) translateY(${
    yChild.value - 3
  }px) translateZ(0);`;
});

const moveCursor = (e) => {
  xChild.value = e.clientX;
  yChild.value = e.clientY;
  setTimeout(() => {
    xParent.value = e.clientX - 15;
    yParent.value = e.clientY - 15;
  }, 100);
};

const handleMouseMove = (e) => {
  moveCursor(e);
  const target = e.target;
  const parent = target.parentElement;
  if (
    target &&
    (target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.tagName === 'SUMMARY' ||
      (parent &&
        (parent.tagName === 'A' ||
          parent.tagName === 'BUTTON' ||
          parent.tagName === 'SUMMARY')))

    // target.classList.contains('hover-target')
  ) {
    isHovering.value = true;
  } else {
    isHovering.value = false;
  }
};

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
});
</script>

<template>
  <div id="custom-cursor">
    <div
      :style="cursorCircle"
      :class="{ 'cursor-circle': true, hovering: isHovering }"
    ></div>
    <div :style="cursorPoint" class="cursor-point"></div>
  </div>
</template>

<style scoped>
#custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}

.cursor-circle {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--accent-color);
  opacity: 0.5;
  pointer-events: none;
  /* transition: transform 0.1s ease; */
  transition: transform 0.1s ease, width 0.3s ease, height 0.3s ease;
}

.cursor-circle.hovering {
  width: 80px;
  height: 80px;
}

.cursor-point {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--dark-accent-color);
  opacity: 1;
  pointer-events: none;
}
</style>
