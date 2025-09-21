<template>
  <div>
    <van-field
      :model-value="selectedText"
      is-link
      readonly
      :label="label"
      :placeholder="placeholder"
      @click="show = true"
    />
    <van-popup
      v-model:show="show"
      destroy-on-close
      round
      position="bottom"
    >
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="Finished"
        @load="onLoad"
      >
        <van-cell
          v-for="item in list"
          :key="item"
          :title="item"
          @click="choose(item)"
        />
      </van-list>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  label: { type: String, default: 'ФИО' },
  placeholder: { type: String, default: 'ФИО' },
  modelValue: { type: String, default: '' },
  initialList: { type: Array, default: () => ['andrey', 'sergey', 'petr'] },
});

const emit = defineEmits(['update:modelValue']);

const show = ref(false);
const selectedText = ref(props.modelValue);
const list = ref([...props.initialList]);
const loading = ref(false);
const finished = ref(false);

const names = ['andrey', 'sergey', 'petr', 'grisha', 'alex', 'victor', 'dmitry'];

watch(
  () => props.modelValue,
  (val) => {
    selectedText.value = val;
  },
);

const onLoad = () => {
  loading.value = true;
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      list.value.push(names[Math.floor(Math.random() * names.length)] + (list.value.length + 1));
    }
    loading.value = false;
    if (list.value.length >= 40) {
      finished.value = true;
    }
  }, 500);
};

const choose = (item) => {
  selectedText.value = item;
  emit('update:modelValue', item);
  show.value = false;
};
</script>
