import { useStorage } from '@vueuse/core';
import { computed } from 'vue';
import type { Ref, ComputedRef } from 'vue';

const STORAGE_KEY_PREFIX = 'comparus.game';
const DEFAULT_FIELD_SIZE = import.meta.env.COMPARUS_DEFAULT_FIELD_SIZE;
const DEFAULT_ROUND_TIME_MS = import.meta.env.COMPARUS_DEFAULT_ROUND_TIME_MS;
const DEFAULT_SCORES_FOR_WIN = import.meta.env.COMPARUS_DEFAULT_SCORES_FOR_WIN;

export function useGameSettings() {
  const fieldSizeStr = useStorage(`${STORAGE_KEY_PREFIX}.field-size`, DEFAULT_FIELD_SIZE);
  const roundTimeMsStr = useStorage(`${STORAGE_KEY_PREFIX}.round-time`, DEFAULT_ROUND_TIME_MS);
  const scoresForWinStr = useStorage(`${STORAGE_KEY_PREFIX}.scores-for-win`, DEFAULT_SCORES_FOR_WIN);

  return {
    fieldSize: createNumberModel(fieldSizeStr),
    fieldSizeStr,
    roundTimeMs: createNumberModel(roundTimeMsStr),
    roundTimeMsStr,
    scoresForWin: createNumberModel(scoresForWinStr),
    scoresForWinStr,
  };
}

function createNumberModel(str: Ref<string>): ComputedRef<number | null> {
  return computed(() => {
    if (/^\d+$/igm.test(str.value)) {
      return +str.value;
    }
    return null;
  });
}
