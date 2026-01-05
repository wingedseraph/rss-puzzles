<script setup lang="ts">
import ButtonDefault from '@/components/ButtonDefault.vue';
import { dataService } from '@/services';

type Props = {
  artwork: {
    imageSrc: string;
    title: string;
    artist: string;
    year: string;
  };
  canContinueToNextPage: boolean;
};

defineProps<Props>();

const emit = defineEmits<{
  continue: [];
  results: [];
}>();
</script>

<template>
  <Transition name="artwork" appear>
    <div class="artwork-container">
      <div class="artwork-reveal">
        <h2>Congratulations!</h2>
        <div
          class="artwork"
          :style="{
            backgroundImage: `url(${dataService.fetchImageUrlSync(artwork.imageSrc)})`,
          }"
        >
          <div class="artwork-overlay">
            <div class="artwork-info">
              <h3>{{ artwork.title }}</h3>
              <p class="artwork-artist">{{ artwork.artist }}</p>
              <p class="artwork-year">{{ artwork.year }}</p>
            </div>
          </div>
        </div>
        <div class="artwork-actions">
          <ButtonDefault v-if="canContinueToNextPage" @click="emit('continue')">
            Continue
          </ButtonDefault>
          <ButtonDefault @click="emit('results')"> Results </ButtonDefault>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="css" scoped>
.artwork-container {
  min-height: 400px;
  position: relative;
}

.artwork-reveal {
  text-align: center;
  padding: 2rem;
}

.artwork {
  width: 100%;
  max-width: clamp(300px, 40vw, 800px);
  height: 500px;
  margin: 2rem auto;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 12px;
  position: relative;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.artwork-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 2rem;
  color: white;
}

.artwork-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: bold;
}

.artwork-artist {
  margin: 0.25rem 0;
  font-size: 1.1rem;
  opacity: 0.9;
}

.artwork-year {
  margin: 0.25rem 0 0 0;
  font-size: 1rem;
  opacity: 0.8;
}

.artwork-actions {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.artwork-enter-active {
  transition: all 0.5s ease;
}

.artwork-leave-active {
  transition: all 0.3s ease;
}

.artwork-enter-from {
  opacity: 0;
}

.artwork-leave-to {
  opacity: 0;
}
</style>
