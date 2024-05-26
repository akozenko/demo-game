<template>
  <div
    ref="root"
    class="inline-grid gap-4 comparus-game-field"
  >
    <span
      v-for="cell in field"
      :key="cell.uuid"
      data-type="cell"
      :data-uuid="cell.uuid"
      role="button"
      class="w-10 h-10 md:w-16 md:h-16 rounded-md focus:outline-2 focus:outline focus:outline-slate-500"
      :class="{
        'bg-blue-500': !cell.status,
        'bg-yellow-500 cursor-pointer': cell.status === 'active',
        'bg-red-500': cell.status === 'ai_score',
        'bg-green-500': cell.status === 'user_score',
      }"
      :tabindex="1"
      @click="handleCellClickEvent"
      @keypress.enter="handleEnterKeyboardPressEvent"
      @keypress.space="handleSpaceKeyboardPressEvent"
      @keydown.up="handleUpKeyboardPressEvent"
      @keydown.down="handleDowKeyboardPressEvent"
      @keydown.left="handleLeftKeyboardPressEvent"
      @keydown.right="handleRightKeyboardPressEvent"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

import type { FieldCell } from '../types';

import { useGameSettings } from '../libs';

const props = defineProps<{
  field: FieldCell[]
}>();

const emit = defineEmits<{
  (e: 'click', uuid: string): void;
}>();

const root = ref<HTMLElement | undefined>();
const { fieldSize } = useGameSettings();

const _getUuid = (ev: Event) => {
  const target = ev.target;
  if (!(target instanceof HTMLElement) || target.dataset.type !== 'cell') {
    return;
  }

  return target.dataset.uuid;
};

const _processClickEvent = (ev: Event) => {
  const uuid = _getUuid(ev);

  if (typeof uuid === 'string') {
    emit('click', uuid);
  }
};

const handleCellClickEvent = (ev: MouseEvent) => {
  _processClickEvent(ev);
};

const handleEnterKeyboardPressEvent = (ev: KeyboardEvent) => {
  _processClickEvent(ev);
};

const handleSpaceKeyboardPressEvent = (ev: KeyboardEvent) => {
  _processClickEvent(ev);
};

const _moveFocusOn = (uuid: string | undefined, delta: number) => {
  let idx = props.field.findIndex((c) => c.uuid === uuid);
  if (idx < 0) {
    return;
  }

  idx += delta;

  if (idx < 0 || idx > props.field.length) {
    return;
  }

  const moveToUuid = props.field[idx]?.uuid;
  if (typeof moveToUuid !== 'string') {
    return;
  }

  const cellEl = root.value?.querySelector(`[data-uuid="${moveToUuid}"]`);
  if (cellEl instanceof HTMLElement) {
    cellEl?.focus();
  }
};

const handleUpKeyboardPressEvent = (ev: KeyboardEvent) => {
  _moveFocusOn(_getUuid(ev), -10);
};

const handleDowKeyboardPressEvent = (ev: KeyboardEvent) => {
  _moveFocusOn(_getUuid(ev), 10);
};

const handleLeftKeyboardPressEvent = (ev: KeyboardEvent) => {
  _moveFocusOn(_getUuid(ev), -1);
};

const handleRightKeyboardPressEvent = (ev: KeyboardEvent) => {
  _moveFocusOn(_getUuid(ev), 1);
};
</script>
<style scoped>
.comparus-game-field {
  grid-template-columns: repeat(v-bind(fieldSize), minmax(0, 1fr));
}
</style>
