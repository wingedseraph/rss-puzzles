<script setup lang="ts">
import ArtworkReveal from '@/components/game/ArtworkReveal.vue';
import GameActions from '@/components/game/GameActions.vue';
import SentenceRow from '@/components/game/SentenceRow.vue';
import WordCardsArea from '@/components/game/WordCardsArea.vue';
import { useDragAndDrop } from '@/composables/useDragAndDrop';
import router, { VIEW_NAMES } from '@/router';
import { dataService } from '@/services';
import { useGameStore } from '@/stores/game.store';
import { onMounted, toRef, watch } from 'vue';
import { useRoute } from 'vue-router';

const gameStore = useGameStore();
const route = useRoute();

const { handleDragStart, handleDragOver, handleDrop } = useDragAndDrop(
  toRef(gameStore, 'resultWords'),
  gameStore.moveWordToResult,
  gameStore.moveWordToSource,
);

onMounted(() => {
  gameStore.loadLevelData();
});

// workaround for re-render game data
watch(
  () => [route.params.level, route.params.round],
  ([newLevel, newRound], [oldLevel, oldRound]) => {
    if (newLevel !== oldLevel || newRound !== oldRound) {
      gameStore.loadLevelData();
    }
  },
  { immediate: false },
);

const navigateToNextPageHandler = () => {
  if (gameStore.canContinueToNextPage) {
    router.push({
      name: VIEW_NAMES.GAME,
      params: { level: gameStore.currentLevel, round: gameStore.currentPage + 1 },
    });
  }
};

const navigateToStatistics = () => {
  router.push({ name: VIEW_NAMES.STATISTICS });
};
</script>

<template>
  <div class="container">
    <div v-if="gameStore.showArtwork && gameStore.currentArtwork">
      <ArtworkReveal
        :artwork="gameStore.currentArtwork"
        :can-continue-to-next-page="gameStore.canContinueToNextPage"
        @continue="navigateToNextPageHandler"
        @results="navigateToStatistics"
      />
    </div>

    <div v-else-if="!gameStore.loading && gameStore.levelData">
      <h1>{{ gameStore.levelData.name }} - Page {{ $route.params.round }}</h1>
      <div class="game-area">
        <div
          v-if="gameStore.currentArtwork"
          class="background-image"
          :style="{
            backgroundImage: `url(${dataService.fetchImageUrlSync(gameStore.currentArtwork.imageSrc)})`,
            opacity: gameStore.backgroundImageOpacity,
          }"
        ></div>
        <div class="sentences-list">
          <SentenceRow
            v-for="{ sentence, index } in gameStore.visibleSentences"
            :key="String(sentence)"
            :sentence-number="index + 1"
            :sentence-text="gameStore.getSentenceText(index)"
            :is-completed="gameStore.isSentenceCompleted(index)"
            :is-active="index === gameStore.currentSentenceIndex"
            :current-word="gameStore.currentWord"
            :result-words="gameStore.resultWords"
            :word-statuses="gameStore.wordStatuses"
            :is-checking="gameStore.isChecking"
            :card-width="gameStore.getCardWidth"
            @move-word-to-source="gameStore.moveWordToSource"
            @drag-start="(e, word) => handleDragStart(e, word, false)"
            @drag-over="(e) => handleDragOver(e)"
            @drop="(e) => handleDrop(e, 'result')"
          />
        </div>

        <div v-if="gameStore.currentWord" class="active-sentence-area">
          <WordCardsArea
            :words="gameStore.sourceWords"
            :card-width="gameStore.getCardWidth"
            @move-word-to-result="gameStore.moveWordToResult"
            @drag-start="(e, word) => handleDragStart(e, word, true)"
            @drag-over="(e) => handleDragOver(e)"
            @drop="(e) => handleDrop(e, 'source')"
          />
          <GameActions
            :is-correct="gameStore.isCorrect"
            :all-words-in-result="gameStore.allWordsInResult"
            :can-continue="true"
            @check="gameStore.checkSentence"
            @continue="gameStore.continueToNext"
            @auto-complete="gameStore.autoComplete"
            @reset="gameStore.initializeSentence"
          />
        </div>
      </div>
    </div>

    <div v-else-if="gameStore.loading">
      <p>Loading...</p>
    </div>
    <div v-else>
      <p>Error loading level data</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 1rem;
  max-width: 1200px;
  width: clamp(600px, 1000px, 1200px);
  margin: 0 auto;
}

.game-area {
  position: relative;
  min-height: 400px;
}

.background-image {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  z-index: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
