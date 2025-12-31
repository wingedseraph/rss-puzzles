<script setup lang="ts">
import Button from '@/components/Button.vue';
import router from '@/router';

function auth() {
  /*  some logic of authorization */

  router.push('/main');
}
</script>

<template>
  <div class="greetings">
    <h1>auth window</h1>
    <form>
      <label>login:</label>
      <input />
      <label>password:</label>
      <input />
      <Button @click="auth">enter</Button>
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

label {
  font-weight: 500;
  color: var(--color-heading);
  /* from where those vars??? */
}

input {
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
}

input:focus {
  outline: none;
  border-color: var(--vt-c-green);
}

button {
  padding: 0.5rem;
  border: none;
  transition: transform 0.5s;
}

button:hover {
  transform: scaleX(0.95);
}
</style>
