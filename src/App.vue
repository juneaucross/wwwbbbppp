<script setup>
import AppTabBar from '@/components/AppTabBar.vue';
import AppHeader from '@/components/AppHeader.vue';
import AppActionBar from '@/components/AppActionBar.vue';

import { ref } from 'vue';

const columns = [
  { text: 'Целый день', value: 'whole-day' },
  { text: '1 час', value: '1-hour' },
  { text: '2 часа', value: '2-hours' },
];

const fieldValue = ref('');
const pickerValue = ref([]);
const showPicker = ref(false);

const onConfirm = ({ selectedValues, selectedOptions }) => {
  showPicker.value = false;
  pickerValue.value = selectedValues;
  fieldValue.value = selectedOptions[0].text;
};

const date = ref('');
const show = ref(false);

const formatDate = (date) => {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};
const onCalendarConfirm = (value) => {
  show.value = false;
  date.value = formatDate(value);
};
</script>

<template>
  <AppHeader />
  <AppActionBar />

  <van-field v-model="fieldValue" is-link readonly label="Слот" placeholder="Выберите слот"
    @click="showPicker = true" />
  <van-popup v-model:show="showPicker" destroy-on-close round position="bottom">
    <van-picker :model-value="pickerValue" title="Слот" :columns="columns" @cancel="showPicker = false"
      @confirm="onConfirm" />
  </van-popup>

  <van-cell title="Дата" :value="date" @click="show = true" />
  <van-calendar v-model:show="show" @confirm="onCalendarConfirm" />

  <section class="favorite-places">
    <h4>Ваши избранные места</h4>

    <van-button block disabled plain type="primary">814/16</van-button>
    <van-button block disabled plain type="primary">814/15</van-button>
  </section>

  <section class="butt">
    <van-button block type="primary">Забронировать место</van-button>
  </section>

  <footer>
    <AppTabBar />
  </footer>
</template>

<style scoped>
.favorite-places {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
}

h3 {
  margin: 40px 0 0;
}

.butt {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 250px;
  padding: 10px;
}
</style>
