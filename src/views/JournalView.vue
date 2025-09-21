<template>
  <van-tabs
    v-model:active="activeTab"
    type="card"
    class="tab"
  >
    <van-tab
      title="Мои"
      name="mine"
      class="tab"
    >
      <h3>Мои</h3>
    </van-tab>
    <van-tab
      title="Отдела"
      name="department"
      class="tab"
    >
      <h3>Отдела</h3>
    </van-tab>
    <van-tab
      title="КИР"
      name="kir"
      class="tab"
    >
      <h3>КИР</h3>
    </van-tab>
  </van-tabs>

  <van-tabs
    v-model:active="active"
    animated
    color="var(--wpb-primary-color)"
    class="tab"
  >
    <van-tab
      v-for="tab in computedDateTabs"
      :key="tab.date"
    >
      <template #title>
        <div class="griddo">
          <span class="tab-day">{{ tab.day }}</span>
          <!-- content="tab.badge" -->
          <van-badge
            v-if="tab.badge > 0"
            class="tab-badge"
            dot
            position="bottom-right"
            color="var(--wpb-accent-color)"
          >
            <div class="child" />
          </van-badge>
          <span class="tab-date">{{ tab.date }}</span>
        </div>
      </template>
      <div>
        <BookingList
          :bookings="currentDayBookings"
          empty-description="No bookings yet"
          @remove="bookingsStore.removeBooking($event)"
        />
      </div>
    </van-tab>
  </van-tabs>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useBookingsStore } from '../stores/bookings';
import BookingList from '@/components/BookingList.vue';

const bookingsStore = useBookingsStore();

const activeTab = ref('mine');

const active = ref(0);

const NUM_DAYS_TO_SHOW = 11;
const weekdayFormatter = new Intl.DateTimeFormat('ru-RU', { weekday: 'short' });

const formatWeekday = (date) => {
  const raw = weekdayFormatter.format(date).replace(/\.$/, '');
  return raw.charAt(0).toUpperCase() + raw.slice(1);
};

const formatShortDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}.${month}`;
};

const generateDateRange = (count) => {
  const today = new Date();
  const result = [];
  for (let i = 0; i < count; i++) {
    const dt = new Date(today);
    dt.setDate(today.getDate() + i);
    result.push({ date: formatShortDate(dt), day: formatWeekday(dt) });
  }
  return result;
};

const baseDateTabs = computed(() => generateDateRange(NUM_DAYS_TO_SHOW));

const computedDateTabs = computed(() => {
  return baseDateTabs.value.map((tab) => {
    const withBookings = bookingsStore.bookings.filter((booking) =>
      booking.date.includes(tab.date),
    );
    return { date: tab.date, day: tab.day, badge: withBookings.length };
  });
});

const currentDayBookings = computed(() => {
  const current = computedDateTabs.value[active.value];
  if (!current) return [];
  return bookingsStore.bookings.filter((booking) => booking.date.includes(current.date));
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
    'a b'
    'c c';
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
