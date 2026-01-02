import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const TOKEN_STORE_KEY = 'seraph-puzzle' as const;

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>();

  const setToken = (newToken: string) => {
    token.value = newToken;
    localStorage.setItem(TOKEN_STORE_KEY, newToken);
  };

  const getToken = computed(() => token.value);

  return { setToken, getToken };
});
