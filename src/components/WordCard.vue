<script lang="ts" setup>
import { computed } from 'vue';

type Props = {
  word: string;
  position: number;
  isDraggable?: boolean;
  isCorrect?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  isDraggable: true,
  isCorrect: undefined,
});

const emit = defineEmits<{
  click: [word: string];
  dragStart: [e: DragEvent];
  dragEnd: [e: DragEvent];
}>();

const cardClasses = computed(() => ({
  'word-card': true,
  'word-card--correct': props.isCorrect === true,
  'word-card--incorrect': props.isCorrect === false,
}));

const handleClick = () => {
  emit('click', props.word);
};

const handleDragStart = (e: DragEvent) => {
  e.dataTransfer?.setDragImage(e.target as HTMLElement, 0, 0);
  emit('dragStart', e);
};

const handleDragEnd = (e: DragEvent) => {
  emit('dragEnd', e);
};
</script>

<template>
  <div
    :class="cardClasses"
    :draggable="isDraggable"
    @click="handleClick"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    {{ word }}
  </div>
</template>

<style lang="css" scoped>
.word-card {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: rgb(239, 239, 239);
  color: black;
}
.word-card--correct {
  background-color: darkolivegreen;
  color: white;
}
.word-card--incorrect {
  background-color: darksalmon;
  color: white;
}

.word-card--draggable:hover {
  cursor: grabbing;
}
</style>
