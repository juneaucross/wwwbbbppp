import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useStateStore = defineStore('state', () => {
  const state = ref('date');
  const prevState = ref('');

  const changeState = (newState) => {
    prevState.value = state.value;
    state.value = newState;
  };

  const resetState = () => {
    state.value = 'date';
    prevState.value = '';
  };

  return { state, prevState, changeState, resetState };
});
