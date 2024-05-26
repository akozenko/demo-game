<template>
  <button
    class="layout-inline-row overflow-hidden rounded-md typography-button justify-center min-w-32 bg-blue-700 hover:bg-blue-500 px-4 py-2 text-white"
    :type="type"
    :disabled="disabled"
    v-on="{
      click: (e: MouseEvent) => $emit('click', e),
    }"
  >
    <slot />
  </button>
</template>
<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue';

withDefaults(
  defineProps<{
    disabled?: boolean;
    type?: ButtonHTMLAttributes['type'];
  }>(),
  {
    disabled: false,
    type: 'button',
  }
);

defineEmits<{
  (e: 'click', ev: MouseEvent): void;
}>();
</script>
