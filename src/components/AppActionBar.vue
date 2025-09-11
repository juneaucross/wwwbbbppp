<template>
  <!-- v-if="stateStore.state === 'date'" -->
  <van-tabs v-model:active="activeTab" type="card" class="tab">
    <van-tab title="Себе" name="self" class="tab">
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
        <van-button block plain type="primary" @click="roomFieldValue = '814/16'">814/16</van-button>
        <van-button block plain type="primary" @click="roomFieldValue = '814/15'">814/15</van-button>
      </section>

      <div>
        <van-tabs v-model:active="activeRoomTab" type="card" class="tab" @click-tab="onClickTab">
          <van-tab title="Фиксированные" name="fixed" class="tab">
            <van-field v-model="roomFieldValue" is-link readonly label="Номер" placeholder="Номер комнаты"
              @click="showRoomPicker = true" />
            <van-popup v-model:show="showRoomPicker" destroy-on-close round position="bottom">
              <van-picker :model-value="roomPickerValue" title="Номер" :columns="fixed" @cancel="showRoomPicker = false"
                @confirm="onRoomConfirm" />
            </van-popup>
          </van-tab>
          <van-tab title="Кабинеты" name="cabinets" class="tab">
            <van-field v-model="roomFieldValue" is-link readonly label="Номер" placeholder="Номер кабинета"
              @click="showRoomPicker = true" />
            <van-popup v-model:show="showRoomPicker" destroy-on-close round position="bottom">
              <van-picker :model-value="roomPickerValue" title="Номер" :columns="cabinets"
                @cancel="showRoomPicker = false" @confirm="onRoomConfirm" />
            </van-popup>
          </van-tab>
          <van-tab title="Опен-спейс" name="open-space" class="tab">
            <van-field v-model="roomFieldValue" is-link readonly label="Номер" placeholder="Номер места"
              @click="showRoomPicker = true" />
            <van-popup v-model:show="showRoomPicker" destroy-on-close round position="bottom">
              <van-picker :model-value="roomPickerValue" title="Номер" :columns="openSpace"
                @cancel="showRoomPicker = false" @confirm="onRoomConfirm" />
            </van-popup>
          </van-tab>
        </van-tabs>
      </div>

      <section class="butt">
        <van-button block type="primary" @click="book">Забронировать место</van-button>
      </section>
    </van-tab>
    <van-tab title="Другому" name="other" class="tab">
      <van-field v-model="toWhomFieldValue" is-link readonly label="Кому" placeholder="Кому"
        @click="showToWhomPicker = true" />
      <van-popup v-model:show="showToWhomPicker" destroy-on-close round position="bottom">
        <van-picker :model-value="toWhomPickerValue" title="Кому" :columns="toWhom" @cancel="showToWhomPicker = false"
          @confirm="onToWhomConfirm" />
      </van-popup>

      <van-field v-model="fieldListValue" is-link readonly label="ФИО" placeholder="ФИО"
        @click="showListPicker = true" />
      <van-popup v-model:show="showListPicker" destroy-on-close round position="bottom">
        <!-- <van-list :model-value="pickerValue" title="Слот" :columns="columns" @cancel="showPicker = false"
          @confirm="onConfirm" /> -->
        <van-list v-model:show="showListPicker" v-model:loading="loading" :finished="finished" finished-text="Finished"
          @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item" @click="choosePerson(item)" />
        </van-list>
      </van-popup>

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
        <van-button block plain type="primary" @click="roomFieldValue = '814/16'">814/16</van-button>
        <van-button block plain type="primary" @click="roomFieldValue = '814/15'">814/15</van-button>
      </section>

      <div>
        <van-tabs v-model:active="activeRoomTab" type="card" class="tab" @click-tab="onClickTab">
          <van-tab title="Фиксированные" name="fixed" class="tab">
            <van-field v-model="roomFieldValue" is-link readonly label="Номер" placeholder="Номер комнаты"
              @click="showRoomPicker = true" />
            <van-popup v-model:show="showRoomPicker" destroy-on-close round position="bottom">
              <van-picker :model-value="roomPickerValue" title="Номер" :columns="fixed" @cancel="showRoomPicker = false"
                @confirm="onRoomConfirm" />
            </van-popup>
          </van-tab>
          <van-tab title="Кабинеты" name="cabinets" class="tab">
            <van-field v-model="roomFieldValue" is-link readonly label="Номер" placeholder="Номер кабинета"
              @click="showRoomPicker = true" />
            <van-popup v-model:show="showRoomPicker" destroy-on-close round position="bottom">
              <van-picker :model-value="roomPickerValue" title="Номер" :columns="cabinets"
                @cancel="showRoomPicker = false" @confirm="onRoomConfirm" />
            </van-popup>
          </van-tab>
          <van-tab title="Опен-спейс" name="open-space" class="tab">
            <van-field v-model="roomFieldValue" is-link readonly label="Номер" placeholder="Номер места"
              @click="showRoomPicker = true" />
            <van-popup v-model:show="showRoomPicker" destroy-on-close round position="bottom">
              <van-picker :model-value="roomPickerValue" title="Номер" :columns="openSpace"
                @cancel="showRoomPicker = false" @confirm="onRoomConfirm" />
            </van-popup>
          </van-tab>
        </van-tabs>
      </div>

      <div class="container">
        <van-button block type="primary" @click="book">Забронировать место</van-button>
      </div>
    </van-tab>
  </van-tabs>
  <!-- <div v-else-if="stateStore.state === 'room'">
    <van-tabs v-model:active="activeRoomTab" type="card" class="tab" @click-tab="onClickTab">
      <van-tab title="Фиксированные" name="fixed" class="tab">
        <van-field v-model="roomFieldValue" is-link readonly label="Номер" placeholder="Номер"
          @click="showRoomPicker = true" />
        <van-popup v-model:show="showRoomPicker" destroy-on-close round position="bottom">
          <van-picker :model-value="roomPickerValue" title="Кому" :columns="fixed" @cancel="showRoomPicker = false"
            @confirm="onRoomConfirm" />
        </van-popup>
      </van-tab>
      <van-tab title="Кабинеты" name="cabinets" class="tab">
        <van-field v-model="roomFieldValue" is-link readonly label="Номер" placeholder="Номер"
          @click="showRoomPicker = true" />
        <van-popup v-model:show="showRoomPicker" destroy-on-close round position="bottom">
          <van-picker :model-value="roomPickerValue" title="Номер" :columns="cabinets" @cancel="showRoomPicker = false"
            @confirm="onRoomConfirm" />
        </van-popup>
      </van-tab>
      <van-tab title="Опен-спейс" name="open-space" class="tab">
        <van-field v-model="roomFieldValue" is-link readonly label="Номер" placeholder="Номер"
          @click="showRoomPicker = true" />
        <van-popup v-model:show="showRoomPicker" destroy-on-close round position="bottom">
          <van-picker :model-value="roomPickerValue" title="Номер" :columns="openSpace" @cancel="showRoomPicker = false"
            @confirm="onRoomConfirm" />
        </van-popup>


      </van-tab>
    </van-tabs>

    <div class="container">
      <van-button block type="primary">Забронировать</van-button>
    </div>
  </div> -->
</template>

<script setup>
import { ref, useId } from 'vue';
import router from '../router';
import { useStateStore } from '../stores/state';
import { useBookingsStore } from '../stores/bookings';

const stateStore = useStateStore();
const bookingsStore = useBookingsStore();

const activeTab = ref(0);

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
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

const onCalendarConfirm = (value) => {
  show.value = false;
  date.value = formatDate(value);
};

const list = ref(['andrey', 'sergey', 'petr']);
const fieldListValue = ref('');
const showListPicker = ref(false);
const loading = ref(false);
const finished = ref(false);

const names = ['andrey', 'sergey', 'petr', 'grisha', 'alex', 'victor', 'dmitry'];

const onLoad = () => {
  console.log('load');
  // loading.value = false;
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      list.value.push(names[Math.floor(Math.random() * names.length)] + list.value.length + 1);
    }
    loading.value = false;

    if (list.value.length >= 40) {
      finished.value = true;
    }
  }, 1000);
};

const choosePerson = (item) => {
  fieldListValue.value = item;
  showListPicker.value = false;
};

const toWhomPickerValue = ref([]);
const toWhomFieldValue = ref('');
const showToWhomPicker = ref(false);

const toWhom = [
  { text: 'Сотруднику', value: 'employee' },
  { text: 'Консультанту', value: 'consultant' },
];

const onToWhomConfirm = ({ selectedValues, selectedOptions }) => {
  showToWhomPicker.value = false;
  toWhomPickerValue.value = selectedValues;
  toWhomFieldValue.value = selectedOptions[0].text;
};

const activeRoomTab = ref(0);

const roomPickerValue = ref([]);
const roomFieldValue = ref('');
const showRoomPicker = ref(false);

const onRoomConfirm = ({ selectedValues, selectedOptions }) => {
  showRoomPicker.value = false;
  roomPickerValue.value = selectedValues;
  roomFieldValue.value = selectedOptions[0].text;
};

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

const onClickTab = () => {
  roomFieldValue.value = '';
};

const book = () => {
  router.replace({ path: '/journal' });

  bookingsStore.addBooking({
    id: Math.random().toString(36).substr(2, 9),
    date: date.value,
    slot: fieldValue.value,
    fieldListValue: fieldListValue.value,
    toWhom: toWhomFieldValue.value,
    room: roomFieldValue.value,
  });

  console.log({
    id: useId(),
    date: date.value,
    slot: fieldValue.value,
    fieldListValue: fieldListValue.value,
    toWhom: toWhomFieldValue.value,
    room: roomFieldValue.value,
  });
};
</script>

<style scoped>
.container {
  padding: 10px;
}

.favorite-places {
  display: flex;
  flex-direction: column;
  gap: 10px;
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
