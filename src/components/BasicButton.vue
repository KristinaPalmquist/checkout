<script setup>
import { onBeforeMount, ref } from 'vue';

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

onBeforeMount(() => {
  if (!btnClass.value) {
    btnColor.value = '#fff';
    btnTextColor.value = '#000';
  }
  console.log('BasicButton component before mounted');
});
</script>

<template>
  <div id="login-button">
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

<style scoped></style>
