<template>
  <div class="layout-inline-column gap-1">
    <label
      v-if="label"
      :for="uuid"
      class="text-slate-500 typography-caption-regular"
    >
      {{ label }}
    </label>
    <input
      v-model="text"
      :id="uuid"
      class=" border-2"
      :class="{
        'border-green-950': !error,
        'border-red-900': error,
      }"
      :type="type"
      :aria-invalid="Boolean(error)"
      :aria-errormessage="`${uuid}-error-message`"

      @keydown="$emit('keydown', $event)"
      @keyup="$emit('keyup', $event)"
    >
    <span
      v-if="typeof error === 'string'"
      :id="`${uuid}-error-message`"
      class="text-red-800 typography-caption-regular"
    >{{ error }}</span>
  </div>
</template>
<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { nanoid } from 'nanoid';
import type { InputTypeHTMLAttribute } from 'vue';

const props = withDefaults(
  defineProps<{
    error?: boolean | string;
    label?: string;
    modelValue?: string;
    type?: InputTypeHTMLAttribute;
  }>(),
  {
    error: false,
    label: void 0,
    modelValue: '',
    type: 'text',
  },
);

const emit = defineEmits<{
  (e: 'keydown', ev: KeyboardEvent): void;
  (e: 'keyup', ev: KeyboardEvent): void;
  (e: 'update:modelValue', value: string): void;
}>();

const text = useVModel(props, 'modelValue', emit);
const uuid = nanoid();
</script>