<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <RouterView v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>
</template>

<style>
#app {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.route-enter-active,
.route-leave-active {
  transition: all 0.3s ease;
}

.greetings {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>