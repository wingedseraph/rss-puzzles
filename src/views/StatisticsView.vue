<script setup lang="ts">
import LayoutDefault from '@/components/LayoutDefault.vue';

</script>

<template>
  <LayoutDefault title="Statistics" :centered="true">
    <div class="statistics">
      <h1>Game Statistics</h1>
      <p>Your game progress and achievements will be displayed here.</p>
    </div>
  </LayoutDefault>
</template>

<style scoped>
.statistics {
  text-align: center;
}
</style>
