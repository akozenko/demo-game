<template>
  <div
    class="fixed left-0 top-0 right-0 bottom-0 layout-column items-center justify-center"
    role="dialog"
  >
    <div class="absolute left-0 top-0 right-0 bottom-0 bg-slate-600 opacity-55" />
    <div
      class="rounded bg-slate-100 layout-column relative z-10"
      :class="{
        'w-96': size === 'sm',
        'w-[32rem]': size === 'md',
        'w-[48rem]': size === 'lg',
      }"
    >
      <div v-if="$slots.header">
        <h3 class="typography-headline-3 border-b border-b-slate-300 px-6 py-4">
          <slot name="header" />
        </h3>
      </div>

      <div class="p-6">
        <slot />
      </div>

      <div
        class="layout-row-reverse border-t border-t-slate-300 px-6 py-4"
        v-if="$slots.footer"
      >
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// TODO: add focus-trap
// TODO: add portal

withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    size: 'md',
  },
);
</script>
