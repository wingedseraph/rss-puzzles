<script setup lang="ts">
import Button from '@/components/ButtonDefault.vue';
import InputDefault from '@/components/InputDefault.vue';
import LayoutDefault from '@/components/LayoutDefault.vue';
import { VIEW_NAMES } from '@/router';
import { useAuthStore } from '@/stores/auth.store';
import { validateName, validateSurname } from '@/utils/validation';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const form = ref({ name: '', surname: '' });
const nameErrors = ref<string[]>([]);
const surnameErrors = ref<string[]>([]);
const nameTouched = ref(false);
const surnameTouched = ref(false);

const isFormValid = computed(() => {
  const nameValidation = validateName(form.value.name);
  const surnameValidation = validateSurname(form.value.surname);
  return nameValidation.length === 0 && surnameValidation.length === 0;
});

const formErrors = computed(() => {
  const errors = [];
  if (nameTouched.value) {
    errors.push(...nameErrors.value);
  }
  if (surnameTouched.value) {
    errors.push(...surnameErrors.value);
  }
  return errors;
});

const validateNameOnInput = (newName: string) => {
  nameTouched.value = true;
  nameErrors.value = validateName(newName);
};

const validateSurnameOnInput = (newSurname: string) => {
  surnameTouched.value = true;
  surnameErrors.value = validateSurname(newSurname);
};

async function onSubmit() {
  nameErrors.value = validateName(form.value.name);
  surnameErrors.value = validateSurname(form.value.surname);

  if (formErrors.value.length === 0) {
    authStore.setToken(form.value.name);
    router.push({ name: VIEW_NAMES.START });
  }
}
</script>

<template>
  <LayoutDefault title="Authentication">
    <div class="auth-form">
      <form @submit.prevent="onSubmit">
        <div class="field">
          <InputDefault v-model="form.name" placeholder="Name" @input="validateNameOnInput(form.name)" />
          <Transition>
            <div v-if="nameErrors.length" class="error-messages">
              <span v-for="(error, index) in nameErrors" :key="`name-error-${index}`" class="error">
                {{ error }}
              </span>
            </div>
          </Transition>
        </div>

        <div class="field">
          <InputDefault v-model="form.surname" placeholder="Surname" @input="validateSurnameOnInput(form.surname)" />
          <Transition>
            <div v-if="surnameErrors.length" class="error-messages">
              <span
                v-for="(error, index) in surnameErrors"
                :key="`surname-error-${index}`"
                class="error"
              >
                {{ error }}
              </span>
            </div>
          </Transition>
        </div>

        <Button type="submit" :disabled="!isFormValid">Login</Button>
      </form>
    </div>
  </LayoutDefault>
</template>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
  margin: 0 auto;
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
