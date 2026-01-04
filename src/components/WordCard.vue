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
  isCorrect: false,
});

const emit = defineEmits<{
  click: [word: string];
  dragStart: [e: DragEvent];
  dragEnd: [e: DragEvent];
}>();

const cardClasses = computed(() => ({
  'word-card': true,
  'word-card--correct': props.isCorrect,
  'word-card--draggable': props.isDraggable,
}));

const handleClick = () => {
  emit('click', props.word);
};
</script>

<template>
  <div
    :class="cardClasses"
    :draggable="isDraggable"
    @click="handleClick"
    @dragstart="emit('dragStart', $event)"
    @dragend="emit('dragEnd', $event)"
  >
    {{ word }}
  </div>
</template>

<style lang="css" scoped>
.word-card {
  border: grey;
}
.word-card--correct {
  border: green;
}
.word-card--draggable {
  border: orange;
}
</style>
