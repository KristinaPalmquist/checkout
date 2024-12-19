<script setup>
import { ref } from 'vue';

// import { onBeforeMount, ref } from 'vue';

const props = defineProps([
  'btnType',
  'btnText',
  'btnClass',
  'btnColor',
  'btnTextColor',
  'btnFunction',
]);

const btnType = ref(props.btnType || 'button');
const btnText = ref(props.btnText || 'Click');
const btnClass = ref(props.btnClass || '');
const btnColor = ref(props.btnColor || '');
const btnTextColor = ref(props.btnTextColor || '');
const btnFunction =
  props.btnFunction || (() => console.log('No function provided'));

// onBeforeMount(() => {
//   if (!btnClass.value) {
//     btnColor.value = '#fff';
//     btnTextColor.value = '#000';
//   }
// });
</script>

<template>
  <div id="basic-button">
    <button
      :class="btnClass"
      :type="btnType"
      :style="{ 'background-color': btnColor, color: btnTextColor }"
      @click.prevent="btnFunction"
    >
      {{ btnText }}
    </button>
  </div>
</template>

<style scoped>
button {
  appearance: none;
  background-color: var(--button-1-color);

  background-image: linear-gradient(
    1deg,
    var(--button-2-color),
    var(--button-1-color) 99%
  );

  background-size: calc(100% + 20px) calc(100% + 20px);
  border-radius: 24px;

  border: 0.5px solid var(--vt-c-divider-light-2);
  /* border: 0.5px solid rgba(72, 77, 73, 0.15); */
  box-sizing: border-box;
  color: #24292e;
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  padding: 0.5rem 1.2rem;
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1),
    background-position 0.2s;
  user-select: none;
  -webkit-user-select: none;
  text-align: center;
  text-decoration: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  word-wrap: break-word;
  z-index: 1;
}

button:hover {
  background-position: -20px -20px;
}

button:disabled {
  background-color: var(--button-1-color);
  border-color: rgba(27, 31, 35, 0.15);
  color: #959da5;
  cursor: default;
}

button:active {
  background-color: #edeff2;
  transition: none 0s;
}

button:focus {
  outline: 1px transparent;
}

button:-webkit-details-marker {
  display: none;
}

button.cta-btn {
  background-color: var(--accent3-color);
  background-image: linear-gradient(
    1deg,
    var(--accent-5-color),
    var(--accent-6-color) 99%
  );
}

button.small-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  /* height: 32px;
  width: 32px; */
  padding: 5px 7px;
  border-radius: 50%;
}

button.small-text {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  padding: 5px 12px;
}
</style>
