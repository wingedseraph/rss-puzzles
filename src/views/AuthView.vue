<script setup lang="ts">
import Button from '@/components/ButtonDefault.vue';
import InputDefault from '@/components/InputDefault.vue';
import router, { ROUTES } from '@/router';
import { useAuthStore } from '@/stores/auth.store';
import { validateName, validateSurname, type ValidationError } from '@/utils/validation';
import { computed, ref, watch } from 'vue';

const authStore = useAuthStore()
const form = ref<{ name?: string, surname?: string }>({})
const nameErrors = ref<ValidationError>([]);
const surnameErrors = ref<ValidationError>([]);

const formErrors = computed(() => {
  return [...nameErrors.value, ...surnameErrors.value];
});


watch(() => form.value.name, (newName) => {
  nameErrors.value = validateName(newName);
});

watch(() => form.value.surname, (newSurname) => {
  surnameErrors.value = validateSurname(newSurname);
});

async function onSubmit() {
  nameErrors.value = validateName(form.value.name);
  surnameErrors.value = validateSurname(form.value.surname);

  if (formErrors.value.length === 0) {
    authStore.setToken(form.value.name as string)

    router.push(ROUTES.START)
  }
}
</script>

<template>
  <div class="greetings">
    <h1>auth window</h1>

    <form @submit.prevent="onSubmit">
      <div class="field">
        <InputDefault v-model="form.name" placeholder="name" />

        <Transition>
          <div v-if="nameErrors.length" class="error-messages">
            <span v-for="(error, index) in nameErrors" :key="`name-error-${index}`" class="error">
              {{ error }}
            </span>
          </div>
        </Transition>
      </div>

      <div class="field">
        <InputDefault v-model="form.surname" placeholder="surname" />

        <Transition>
          <div v-if="surnameErrors.length" class="error-messages">
            <span v-for="(error, index) in surnameErrors" :key="`surname-error-${index}`" class="error">
              {{ error }}
            </span>
          </div>
        </Transition>

      </div>

      <Button type="submit" :disabled="formErrors.length > 0">login</Button>
    </form>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
  margin: 2rem auto;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.error-messages {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.8rem;
}
</style>