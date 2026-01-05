<script setup lang="ts">
import WordCard from '@/components/WordCard.vue';

type Props = {
  words: string[];
  cardWidth: (word: string) => string;
};

defineProps<Props>();

const emit = defineEmits<{
  moveWordToResult: [word: string];
  dragStart: [e: DragEvent, word: string];
  dragOver: [e: DragEvent];
  drop: [e: DragEvent];
}>();

const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
  emit('dragOver', e);
};

const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  emit('drop', e);
};
</script>

<template>
  <div class="word-cards-area" @dragover="handleDragOver" @drop="handleDrop">
    <div class="cards-container">
      <WordCard
        v-for="(word, index) in words"
        :key="`${word}-${index}`"
        :word="word"
        :position="index"
        :is-draggable="true"
        :style="{ width: cardWidth(word) }"
        @click="emit('moveWordToResult', word)"
        @drag-start="emit('dragStart', $event, word)"
      />
    </div>
  </div>
</template>

<style lang="css" scoped>
.word-cards-area {
  margin-bottom: 1rem;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  min-height: 60px;
  align-items: center;
  padding: 1rem;
  border-radius: 4px;
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
