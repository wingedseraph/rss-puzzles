import { defineStore } from 'pinia';
import { ref } from 'vue';

const TOKEN_STORE_KEY = 'seraph-puzzle' as const;

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>();

  const setToken = (newToken: string) => {
    token.value = newToken;
    localStorage.setItem(TOKEN_STORE_KEY, newToken);
  };

  const getToken = () => localStorage.getItem(TOKEN_STORE_KEY);
  const deleteToken = () => localStorage.removeItem(TOKEN_STORE_KEY);

  return { setToken, getToken, deleteToken };
});
