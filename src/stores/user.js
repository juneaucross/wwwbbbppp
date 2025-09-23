import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);

  function updateUser(userInfo) {
    user.value = userInfo;
  }

  return { user, updateUser };
});
