<template>
  <van-tabs v-model:active="activeTab" type="card" class="tab">
    <van-tab title="Мои" name="mine" class="tab">
      <h3>Мои</h3>
    </van-tab>
    <van-tab title="Отдела" name="department" class="tab">
      <h3>Отдела</h3>
    </van-tab>
    <van-tab title="КИР" name="kir" class="tab">
      <h3>КИР</h3>
    </van-tab>
  </van-tabs>

  <van-tabs v-model:active="active" animated>
    <van-tab v-for="tab in computedDateTabs">
      <template #title>
        <div class="griddo">
          <span class=tab-day>{{ tab.day }}</span>
          <!-- content="tab.badge" -->
          <van-badge class="tab-badge" v-if="tab.badge > 0" dot position="bottom-right">
            <div class="child" />
          </van-badge>
          <span class="tab-date">{{ tab.date }}</span>
        </div>
      </template>
      <div>
        <van-empty v-if="!currentDayBookings.length" description="No bookings yet" />
        <div v-else>
          <van-card v-for="booking in currentDayBookings" :key="booking.id" :title="booking.date"
            :desc="`На ${booking.slot.toLowerCase()} ${booking.fieldListValue ? 'для ' + booking.fieldListValue : ''}`"
            thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg">
            <template #tags>
              <van-tag plain type="primary">{{ booking.room }}</van-tag>
              <!-- <van-tag plain type="primary">Tag</van-tag> -->
            </template>
            <template #footer>
              <van-button size="small" icon="delete-o" @click="bookingsStore.removeBooking(booking.id)" />
              <!-- <van-button size="mini">Button</van-button> -->
            </template>
          </van-card>
        </div>
      </div>
    </van-tab>
  </van-tabs>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useBookingsStore } from '../stores/bookings';

const bookingsStore = useBookingsStore();

const activeTab = ref('mine');

const active = ref(0);
const dateTabs = { '11.09': 'Чт', '12.09': 'Пт', '13.09': 'Сб', '14.09': 'Вс', '15.09': 'Пн', '16.09': 'Вт', '17.09': 'Ср', '18.09': 'Чт', '19.09': 'Пт' };

const computedDateTabs = computed(() => {
  return Object.entries(dateTabs).map(tab => {
    const withBookings = bookingsStore.bookings.filter(booking => booking.date.includes(tab[0]));
    return { date: tab[0], day: tab[1], badge: withBookings.length };
  });
});

const currentDayBookings = computed(() => {
  return bookingsStore.bookings.filter(booking => booking.date.includes(Object.keys(dateTabs)[active.value]));
});
</script>

<style scoped>
.tab {
  margin-top: 10px;
}

.griddo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "a b"
    "c c";
}

.tab-day {
  grid-area: a;
}

.tab-badge {
  grid-area: b;
  bottom: unset !important;
  top: -10px !important;
  right: 0px !important;
}

.tab-date {
  grid-area: c;
}
</style>
