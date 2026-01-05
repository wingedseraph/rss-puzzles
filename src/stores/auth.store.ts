import { Storage } from '@/utils/storage.util';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const TOKEN_STORE_KEY = 'seraph-puzzle' as const;

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>();

  const setToken = (newToken: string) => {
    token.value = newToken;
    Storage.set(TOKEN_STORE_KEY, newToken);
  };

  const getToken = () => Storage.get(TOKEN_STORE_KEY);
  const deleteToken = () => Storage.remove(TOKEN_STORE_KEY);

  return { setToken, getToken, deleteToken };
});
