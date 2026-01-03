<script setup lang="ts">
import ButtonDefault from '@/components/ButtonDefault.vue';
import router, { VIEW_NAMES } from '@/router';
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore()

function logout() {
  authStore.deleteToken()
  // workaround for router.push('auth') doesn't change url
  location.reload()
}

function routeToGame() {
  router.push({ name: VIEW_NAMES.GAME, params: { level: 1, round: 1 } });
}
</script>

<template>
  <div class="greetings">
    <h1>start window</h1>
    <ButtonDefault @click="routeToGame">enter the game</ButtonDefault>
    <ButtonDefault @click="logout">logout</ButtonDefault>
  </div>
</template>