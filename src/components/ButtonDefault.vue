<script setup lang="ts">
import { computed } from 'vue';

type Props = {
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit';
  disabled?: boolean;
  loading?: boolean;
  label?: string;
};

// todo: rewrite to destruct
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  type: 'button',
  disabled: false,
  loading: false,
  label: 'submit',
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};

const buttonState = computed(() => ({
  variant: props.variant,
  disabled: props.disabled,
  loading: props.loading,
}));

const displayLabel = computed(() => {
  if (props.loading) {
    return `${props.label} waiting`;
  }
  return props.label;
});
</script>
<template>
  <button :type="props.type" :disabled="props.disabled || props.loading" @click="handleClick">
    <slot :buttonState="buttonState" :label="displayLabel">
      {{ displayLabel }}
    </slot>
    <span v-if="props.loading" class="spinner"> ◡</span>
  </button>
</template>

<style scoped>
button {
  min-width: 232px;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  color: black;
  transition: transform 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

button:hover:not(:disabled) {
  transform: scaleX(0.98);
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