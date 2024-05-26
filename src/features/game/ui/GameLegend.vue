<template>
  <div class="layout-row w-full gap-4">
    <div class="w-1/2 layout-inline-column items-center gap-2">
      <label
        for="useScores"
        class="text-slate-500 typography-caption-regular"
      >
        {{ $t('game.legend.user_scores') }}
      </label>
      <span
        id="useScores"
        class="typography-headline-2"
      >
        {{ userScores }}
      </span>
    </div>

    <div class="w-1/2 layout-inline-column items-center gap-2">
      <label
        for="aiScores"
        class="text-slate-500 typography-caption-regular"
      >
        {{ $t('game.legend.ai_scores') }}
      </label>
      <span
        id="aiScores"
        class="typography-headline-2"
      >
        {{ aiScores }}
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  aiScores: number;
  userScores: number;
}>();
</script>
