<template>
  <div class="layout-column gap-4 w-full max-w-80">
    <ComparusInput
      :label="$t('game.settings.round_time')"
      v-model="roundTimeMsStr"
      :error="roundTimeMsErrors"
    />
    <ComparusInput
      :label="$t('game.settings.scores_for_win')"
      v-model="scoresForWinStr"
      :error="scoresForWinErrors"
    />
    <ComparusInput
      :label="$t('game.settings.field_size')"
      v-model="fieldSizeStr"
      :error="fieldSizeErrors"
    />
    <ComparusButton
      class="self-center"
      @click="handleStartClickEvent"
    >
      {{ $t('game.settings.start') }}
    </ComparusButton>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minValue, maxValue, numeric } from '@vuelidate/validators';

import { ComparusButton } from 'shared/ui/button';
import { ComparusInput } from 'shared/ui/input';

import { useGameSettings } from '../libs';

const emit = defineEmits<{
  (e: 'start'): void;
}>();

const { fieldSizeStr, roundTimeMsStr, scoresForWinStr } = useGameSettings();

const maxScoresForWin = computed(() => {
  if (/^\d+$/igm.test(fieldSizeStr.value)) {
      const fs = +fieldSizeStr.value;
      const gs = fs * fs;
      return Math.min(12, gs / 2);
    }
  return 12;
});

const VALIDATION_RULES = {
  fieldSizeStr: { required, numeric, minValue: minValue(4), maxValue: maxValue(12) },
  roundTimeMsStr: { required, numeric, minValue: minValue(300), maxValue: maxValue(3000) },
  scoresForWinStr: { required, numeric, minValue: minValue(4), maxValue: maxValue(maxScoresForWin) },
} as const;

const createErrorMessageModel = <K extends keyof typeof VALIDATION_RULES>(name: K) => {
  return computed(() => v$.value[name].$errors.map((o) => o.$message).join(', ') || void 0);
};

const v$ = useVuelidate(VALIDATION_RULES, {
  fieldSizeStr,
  roundTimeMsStr,
  scoresForWinStr,
});

const fieldSizeErrors = createErrorMessageModel('fieldSizeStr');
const roundTimeMsErrors = createErrorMessageModel('roundTimeMsStr');
const scoresForWinErrors = createErrorMessageModel('scoresForWinStr');

const handleStartClickEvent = () => {
  v$.value.$touch();
  if (v$.value.$error) {
    return;
  }
  emit('start');
};
</script>