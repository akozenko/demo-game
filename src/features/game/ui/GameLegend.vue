<template>
  <div class="layout-row w-full gap-4">
    <div class="w-1/2 layout-inline-column items-center gap-2">
      <label
        id="userScores-label"
        class="text-slate-500 typography-caption-regular"
      >
        {{ $t('game.legend.user_scores') }}
      </label>
      <span
        aria-labelledby="userScores-label"
        class="typography-headline-2"
      >
        {{ userScores }}
      </span>
    </div>

    <div class="w-1/2 layout-inline-column items-center gap-2">
      <label
        id="aiScores-label"
        class="text-slate-500 typography-caption-regular"
      >
        {{ $t('game.legend.ai_scores') }}
      </label>
      <span
        aria-labelledby="aiScores-label"
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
