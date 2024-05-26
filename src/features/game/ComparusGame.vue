<template>
  <div class="layout-column gap-4 p-8 min-w-full min-h-full items-center justify-center bg-slate-200">
    <SettingsForm
      v-if="phase === 'input_setting'"
      @start="handleStartNewGameEvent"
    />
    <div
      v-else
      class="layout-column items-center gap-8"
      aria-label="Game field"
    >
      <GameLegend
        :ai-scores="aiScores"
        :user-scores="userScores"
      />
      <div>
        <GameField
          :field="field"
          @click="processUserClick"
        />
      </div>
    </div>
  </div>
  <ComparusModal v-if="isEnded">
    <GameResultsContent
      :is-ai-win="isAiWin"
      :is-user-win="isUserWin"
    />
    <template #footer>
      <ComparusButton @click="handlePlayAgainClickEvent">
        {{ $t('game.play_again') }}
      </ComparusButton>
    </template>
  </ComparusModal>
</template>
<script setup lang="ts">
import { ref } from 'vue';

import { ComparusButton } from 'shared/ui/button';
import { ComparusModal } from 'shared/ui/modal';

import { GameField, GameResultsContent, GameLegend, SettingsForm } from './ui';
import { useGameField } from './libs';

type Phase = 'input_setting' | 'play_game' ;

const phase = ref<Phase>('input_setting');

const {
  aiScores, field, isAiWin, isEnded, isUserWin, userScores,
  processUserClick, startNewGame, $reset,
} = useGameField();

const handleStartNewGameEvent = () => {
  phase.value = 'play_game';
  startNewGame();
};

const handlePlayAgainClickEvent = () => {
  phase.value = 'input_setting';
  $reset();
};
</script>
