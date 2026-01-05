<script setup lang="ts">
import ButtonDefault from '@/components/ButtonDefault.vue';

type Props = {
  isCorrect: boolean;
  allWordsInResult: boolean;
  canContinue: boolean;
};

defineProps<Props>();

const emit = defineEmits<{
  check: [];
  continue: [];
  autoComplete: [];
  reset: [];
}>();
</script>

<template>
  <div class="actions">
    <ButtonDefault v-if="!isCorrect && allWordsInResult" key="check" @click="emit('check')">
      Check
    </ButtonDefault>
    <ButtonDefault v-if="isCorrect" key="continue" @click="emit('continue')">
      Continue
    </ButtonDefault>
    <ButtonDefault
      v-if="!isCorrect && !allWordsInResult"
      key="auto-complete"
      @click="emit('autoComplete')"
    >
      Hint
    </ButtonDefault>
    <ButtonDefault key="reset" @click="emit('reset')">Reset</ButtonDefault>
  </div>
</template>

<style lang="css" scoped>
.actions {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
