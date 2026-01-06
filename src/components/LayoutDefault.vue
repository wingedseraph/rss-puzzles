<script setup lang="ts">
defineProps({
  title: { type: String, default: '' },
  centered: { type: Boolean, default: true },
});
</script>

<template>
  <div class="layout">
    <header v-if="title" class="header">
      <h1>{{ title }}</h1>
    </header>
    <main class="main">
      <slot />
    </main>
    <footer class="footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
}

.header {
  padding: 1rem;
  text-align: center;
}

.main {
  width: 100%;
  max-width: 1200px;
  padding: 0 1rem;
}

.footer {
  padding: 1rem;
  text-align: center;
}
</style>
