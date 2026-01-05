<script setup lang="ts">
import ButtonDefault from '@/components/ButtonDefault.vue';
import WordCard from '@/components/WordCard.vue';
import { dataService, type Word } from '@/services';

type Props = {
  sentenceNumber: number;
  sentenceText: string;
  isCompleted: boolean;
  isActive: boolean;
  currentWord?: Word;
  resultWords: string[];
  wordStatuses: { [key: string]: boolean };
  isChecking: boolean;
  cardWidth: (word: string) => string;
};

defineProps<Props>();

const emit = defineEmits<{
  moveWordToSource: [word: string];
  dragStart: [e: DragEvent, word: string];
  dragOver: [e: DragEvent];
  drop: [e: DragEvent];
}>();

const handleDragOver = (e: DragEvent) => {
  emit('dragOver', e);
};

const handleDrop = (e: DragEvent) => {
  emit('drop', e);
};
const playAudio = async (audioPath: string) => {
  try {
    await dataService.audioService.playAudio(audioPath);
  } catch {}
};
</script>

<template>
  <div
    class="sentence-row"
    :class="{
      'sentence-row--active': isActive,
      'sentence-row--completed': isCompleted,
    }"
  >
    <span class="sentence-number">{{ sentenceNumber }}</span>
    <div class="sentence-content">
      <template v-if="isCompleted">
        <span class="sentence-text">{{ sentenceText }}</span>
      </template>
      <template v-else-if="isActive">
        <div class="sentence-construction">
          <span class="sentence-meaning">{{ currentWord?.textMeaning || currentWord?.word }}</span>
          <div class="sentence-audio">
            <ButtonDefault @click="playAudio(currentWord?.audio as string)">
              Play audio</ButtonDefault
            >
            <ButtonDefault @click="dataService.audioService.stopAudio()"> Stop audio</ButtonDefault>
          </div>
          <Transition name="fade" mode="out-in">
            <TransitionGroup
              v-if="resultWords.length > 0"
              key="result-words"
              name="word-card"
              tag="div"
              class="result-words"
              @dragover="handleDragOver"
              @drop="handleDrop"
            >
              <WordCard
                v-for="(word, wordIdx) in resultWords"
                :key="`${word}-${wordIdx}`"
                :word="word"
                :position="wordIdx"
                :is-draggable="true"
                :is-correct="isChecking ? (wordStatuses[word] ?? false) : undefined"
                :style="{ width: cardWidth(word) }"
                @click="emit('moveWordToSource', word)"
                @drag-start="emit('dragStart', $event, word)"
              />
            </TransitionGroup>
            <div
              v-else
              key="placeholder"
              class="result-placeholder"
              @dragover="handleDragOver"
              @drop="handleDrop"
            >
              <span class="placeholder-text">Drop words here</span>
            </div>
          </Transition>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="css" scoped>
.sentence-row {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  padding: 0.75rem;
  border-radius: 4px;
  min-height: 50px;
}

.sentence-row--completed {
  opacity: 0.8;
}

.sentence-number {
  font-weight: bold;
  margin-right: 1rem;
  min-width: 30px;
  color: #666;
}

.sentence-content {
  flex: 1;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.sentence-text {
  font-size: 1rem;
}

.sentence-audio {
  display: flex;
  flex-direction: row;
  gap: 5px;
}
.sentence-audio button {
  max-width: 100px;
  min-width: 100px;
}

.sentence-construction {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.sentence-meaning {
  font-style: italic;
  margin-bottom: 0.5rem;
}

.result-words {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  align-items: center;
  min-height: 40px;
  padding: 0.5rem;
  border-radius: 4px;
  border: 2px dashed #ccc;
}

.result-placeholder {
  min-height: 40px;
  padding: 0.5rem;
  border-radius: 4px;
  border: 2px dashed #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.word-card-enter-active,
.word-card-leave-active {
  transition: all 0.3s ease;
}

.word-card-enter-from {
  opacity: 0;
}

.word-card-leave-to {
  opacity: 0;
}

.word-card-move {
  transition: transform 0.3s ease;
}
</style>
