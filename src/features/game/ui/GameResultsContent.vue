<template>
  <div class="layout-column gap-6">
    <template v-if="isAiWin">
      <img
        class="w-20 h-20 self-center"
        :src="Unlucky"
      >
      <p>
        {{ $t('game.finish.unlucky') }}
      </p>
    </template>
    <template v-if="isUserWin">
      <img
        class="w-20 h-20 self-center"
        :src="Success"
      >
      <p class="typography-body-1-regular">
        {{ $t('game.finish.success') }}
      </p>
    </template>
  </div>
</template>
<script setup lang="ts">
import Unlucky from 'assets/unlucky.png';
import Success from 'assets/success.png';

defineProps<{
  isAiWin: boolean;
  isUserWin: boolean;
}>();
</script>
