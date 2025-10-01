<template>
  <van-tabs
    v-model:active="activeTab"
    type="card"
    class="tab"
  >
    <van-tab
      title="Себе"
      name="self"
      class="tab"
    >
      <PickerField
        v-model="slotPickerValue"
        label="Слот"
        placeholder="Выберите слот"
        :columns="slotsColumns"
        @update:text="(t) => (slotFieldValue = t)"
      />

      <DateSelector
        v-model="date"
        label="Дата"
      />

      <FavoritePlaces
        :places="['814/16', '814/15']"
        @select="selectPlace"
      />

      <RoomPickerTabs
        v-model="roomPickerValue"
        v-model:model-text="roomFieldValue"
        :fixed="fixed"
        :cabinets="cabinets"
        :open-space="openSpace"
      />

      <section class="butt">
        <van-button
          block
          color="var(--wpb-accent-color)"
          @click="book"
          >Забронировать место</van-button
        >
      </section>
    </van-tab>

    <van-tab
      title="Другому"
      name="other"
      class="tab"
    >
      <PickerField
        v-model="toWhomPickerValue"
        label="Кому"
        placeholder="Кому"
        :columns="toWhom"
        @update:text="(t) => (toWhomFieldValue = t)"
      />

      <PersonListPicker v-model="toWhomFieldListValue" />

      <PickerField
        v-model="slotPickerValue"
        label="Слот"
        placeholder="Выберите слот"
        :columns="slotsColumns"
        @update:text="(t) => (slotFieldValue = t)"
      />

      <DateSelector
        v-model="date"
        label="Дата"
      />

      <FavoritePlaces
        :places="['814/16', '814/15']"
        @select="selectPlace"
      />

      <RoomPickerTabs
        v-model="roomPickerValue"
        v-model:model-text="roomFieldValue"
        :fixed="fixed"
        :cabinets="cabinets"
        :open-space="openSpace"
      />

      <div class="container">
        <van-button
          block
          color="var(--wpb-accent-color)"
          @click="book"
          >Забронировать место</van-button
        >
      </div>
    </van-tab>
  </van-tabs>
</template>

<script setup>
import { ref } from 'vue';
import router from '../router';
import { useBookingsStore } from '../stores/bookings';
import PickerField from '@/components/PickerField.vue';
import DateSelector from '@/components/DateSelector.vue';
import FavoritePlaces from '@/components/FavoritePlaces.vue';
import RoomPickerTabs from '@/components/RoomPickerTabs.vue';
import PersonListPicker from '@/components/PersonListPicker.vue';

const bookingsStore = useBookingsStore();

const activeTab = ref(0);

const slotsColumns = [
  { text: 'Целый день', value: 'whole-day' },
  { text: '1 час', value: '1-hour' },
  { text: '2 часа', value: '2-hours' },
];
const slotFieldValue = ref('');
const slotPickerValue = ref([]);

const date = ref('');

const toWhomFieldListValue = ref('');

const toWhomPickerValue = ref([]);
const toWhomFieldValue = ref('');

const toWhom = [
  { text: 'Сотруднику', value: 'employee' },
  { text: 'Консультанту', value: 'consultant' },
];

const roomPickerValue = ref([]);
const roomFieldValue = ref('');

const fixed = ref([
  { text: 'Комната 1', value: 'room-1' },
  { text: 'Комната 2', value: 'room-2' },
  { text: 'Комната 3', value: 'room-3' },
  { text: 'Комната 4', value: 'room-4' },
  { text: 'Комната 5', value: 'room-5' },
]);

const cabinets = ref([
  { text: 'Кабинет 1', value: 'cabinet-1' },
  { text: 'Кабинет 2', value: 'cabinet-2' },
  { text: 'Кабинет 3', value: 'cabinet-3' },
  { text: 'Кабинет 4', value: 'cabinet-4' },
  { text: 'Кабинет 5', value: 'cabinet-5' },
]);

const openSpace = ref([
  { text: '813/246', value: '813/246' },
  { text: '813/245', value: '813/245' },
  { text: '813/244', value: '813/244' },
  { text: '813/243', value: '813/243' },
  { text: '813/242', value: '813/242' },
]);

const selectPlace = (place) => {
  roomFieldValue.value = place;
};

const book = () => {
  router.replace({ path: '/journal' });

  bookingsStore.addBooking({
    id: Math.random().toString(36).substr(2, 9),
    date: date.value,
    slot: slotFieldValue.value,
    toWhomFieldListValue: toWhomFieldListValue.value,
    toWhom: toWhomFieldValue.value,
    room: roomFieldValue.value,
  });

  console.log({
    date: date.value,
    slot: slotFieldValue.value,
    toWhomFieldListValue: toWhomFieldListValue.value,
    toWhom: toWhomFieldValue.value,
    room: roomFieldValue.value,
  });
};
</script>

<style scoped>
.container {
  padding: 10px;
}

h3 {
  margin: 40px 0 0;
  color: whitesmoke;
}

.butt {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100px;
  padding: 10px;
}

.tab {
  margin-top: 10px;
}
</style>
