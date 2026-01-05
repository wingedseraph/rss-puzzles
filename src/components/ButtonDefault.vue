<script setup lang="ts">
import { computed } from 'vue';

type Props = {
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit';
  disabled?: boolean;
  loading?: boolean;
  label?: string;
};

const {
  variant = 'primary',
  type = 'button',
  disabled = false,
  loading = false,
  label = 'submit'
} = defineProps<Props>();

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const handleClick = (event: MouseEvent) => {
  if (!disabled && !loading) {
    emit('click', event);
  }
};

const buttonState = computed(() => ({
  variant,
  disabled,
  loading,
}));

const displayLabel = computed(() => {
  if (loading) {
    return `${label} waiting`;
  }
  return label;
});
</script>
<template>
  <button :type="type" :disabled="disabled || loading" @click="handleClick">
    <slot :buttonState="buttonState" :label="displayLabel">
      {{ displayLabel }}
    </slot>
    <span v-if="loading" class="spinner"> ◡</span>
  </button>
</template>

<style scoped>
button {
  min-width: 232px;
  padding: 0.5rem;
  border: 1px solid transparent;
  border-radius: 4px;
  color: black;
  transition: all 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

button:hover:not(:disabled) {
  background-color: white;
  box-shadow:
    rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset,
    rgba(0, 0, 0, 0.9) 0px 0px 0px 1px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.spinner {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
