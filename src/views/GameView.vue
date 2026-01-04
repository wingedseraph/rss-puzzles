<script setup lang="ts">
import ButtonDefault from '@/components/ButtonDefault.vue';
import { type Level, dataService } from '@/services';
import { onMounted, ref } from 'vue';

const levelData = ref<Level>();
const loading = ref(true);

onMounted(async () => {
  try {
    levelData.value = await dataService.fetchLevelData(1);
  } catch (error) {
    console.error('Error fetching level data:', error);
  } finally {
    loading.value = false;
  }
});

const playWordAudio = async (audioPath: string) => {
  try {
    await dataService.playAudio(audioPath);
  } catch (error) {
    console.error('Error playing audio:', error);
  }
};
</script>

<template>
  <div class="greetings">
    <div>
      <h1>{{ levelData?.name }}</h1>
      <div v-for="round in levelData?.rounds" :key="round.id">
        <h2>Round {{ round.id }}</h2>
        <div v-for="word in round.words" :key="word.id">
          <p>{{ word }}</p>
          <img class="word-image" :src="dataService.fetchImageUrlSync(word.image)" />
          <div class="buttons">
            <ButtonDefault @click="playWordAudio(word.audio)">Play Audio</ButtonDefault>
            <ButtonDefault @click="dataService.stopAudio()">Stop Audio</ButtonDefault>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.word-image {
  max-width: 400px;
  border-radius: 4px;
}

.buttons {
  display: flex;
  flex-direction: row;
  gap: 5px;
}
</style>
