
import { computed, ref, watch } from 'vue';
import { nanoid } from 'nanoid';

import { shuffle } from 'shared/libs/shuffle';

import { useGameSettings } from './use-game-settings';
import type { FieldCell } from '../types';

export function useGameField() {
  const { fieldSize, roundTimeMs, scoresForWin } = useGameSettings();
  const field = ref<FieldCell[]>([]);
  const queue = ref<string[]>([]);
  const queueIdx = ref(0);
  let timerId: NodeJS.Timer | number | undefined;

  const activeCell = computed(() => {
    if (isEnded.value) {
      return void 0;
    }
    const uuid = queue.value[queueIdx.value];
    return field.value.find((c) => c.uuid === uuid);
  });
  const aiScores = computed(() => field.value.filter((c) => c.status === 'ai_score').length);
  const userScores = computed(() => field.value.filter((c) => c.status === 'user_score').length);
  const isAiWin = computed(() => aiScores.value >= scoresForWin.value!);
  const isUserWin = computed(() => userScores.value >= scoresForWin.value!);
  const isEnded = computed(() => isAiWin.value || isUserWin.value);

  const _markRoundFor = (status: 'ai_score' | 'user_score') => {
    if (activeCell.value) {
      activeCell.value.status = status;
    }
    _runNextRound();
  };

  const processAiRound = () => {
    if (isEnded.value) {
      return;
    }
    _markRoundFor('ai_score');
  };

  const _runRound = () => {
    if (typeof timerId === 'number') {
      clearTimeout(timerId);
    }
    if (isEnded.value) {
      return;
    }
    timerId = setTimeout(processAiRound, roundTimeMs.value!);
  };

  const _runNextRound = () => {
    queueIdx.value += 1;
    _runRound();
  };

  const processUserClick = (uuid: string) => {
    if (isEnded.value || activeCell.value?.uuid !== uuid) {
      return;
    }
    _markRoundFor('user_score');
  };

  const $reset = () => {
    field.value = _generateField(fieldSize.value! * fieldSize.value!);
    queue.value = _generateQueue(field.value);
    queueIdx.value = 0;
  };

  const startNewGame = () => {
    $reset();
    _runRound();
  };

  const handleIsEndedChangedEvent = (isEnded: boolean) => {
    if (isEnded && typeof timerId === 'number') {
      clearTimeout(timerId);
    }
  };

  const handleActiveCellChangedEvent = (cell: FieldCell | undefined) => {
    if (cell) {
      cell.status = 'active';
    }
  };

  watch(isEnded, handleIsEndedChangedEvent);
  watch(activeCell, handleActiveCellChangedEvent);

  return {
    aiScores,
    field,
    isAiWin,
    isEnded,
    isUserWin,
    userScores,

    processUserClick,
    startNewGame,
    $reset,
  };
}

function _generateField(gridSize: number): FieldCell[] {
  return new Array(gridSize).fill(void 0).map(() => ({
    status: void 0,
    uuid: nanoid(),
  }));
}

function _generateQueue(field: FieldCell[]) {
  return shuffle(field, 3).map((o) => o.uuid);
}
