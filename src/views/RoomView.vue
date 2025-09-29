<template>
  <DateSelector
    v-model="date"
    is-for-kir
    label="Дата"
  />
  <PickerField
    v-model="slotPickerValue"
    label="Кабинет"
    placeholder="Выберите кабинет"
    :columns="slotsColumns"
    @update:text="(t) => (slotFieldValue = t)"
  />
  <!-- <h1>КИР</h1> -->
  <vue-cal
    v-bind="config"
    editable-events
    :events="flteredEvents"
    :view-date="stringToDate(date)"
    @event-create="createEvent"
  />
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import DateSelector from '@/components/DateSelector.vue';
import PickerField from '@/components/PickerField.vue';
// import { useBookingsStore } from '../stores/bookings';
import { VueCal, addDatePrototypes, stringToDate, useLocale } from 'vue-cal';
import Ru from 'vue-cal/i18n/ru';
import 'vue-cal/style';

useLocale(Ru);
addDatePrototypes();

// const store = useBookingsStore();

const config = {
  hideWeekends: true,
  titleBar: false,
  views: ['day'],
  viewsBar: false,
  snapToInterval: 30,
  timeFrom: 9 * 60,
  timeTo: 18 * 60,
  timeStep: 30,
  locale: 'ru',
  // time: true,
  sm: true,
  // xs: true,
};

const events = [
  {
    // style: {
    //   top: '27.77777777777778%',
    //   height: '5.555555555555557%',
    // },
    startMinutes: 690,
    endMinutes: 720,
    start: new Date('2025-09-29T08:30:00.000Z'),
    end: new Date('2025-09-29T09:00:00.000Z'),
    title: 'New Event!123  🎉',
    room: '108',
    startFormatted: '2025-09-29',
    endFormatted: '2025-09-29',
    // _: {
    //   id: 1,
    //   multiday: false,
    //   startFormatted: '2025-09-29',
    //   endFormatted: '2025-09-29',
    //   startMinutes: 690,
    //   endMinutes: 720,
    //   startTimeFormatted24: '11:30',
    //   startTimeFormatted12: '11:30 AM',
    //   endTimeFormatted24: '12:00',
    //   endTimeFormatted12: '12:00 PM',
    //   duration: 30,
    //   deleting: false,
    //   deleted: false,
    //   cachedStart: 1759134600000,
    //   cachedEnd: 1759136400000,
    //   $el: {},
    // },
  },
  {
    // style: {
    //   top: '44.44444444444444%',
    //   height: '22.22222222222223%',
    // },
    startMinutes: 780,
    endMinutes: 900,
    start: new Date('2025-09-30T06:00:00.000Z'),
    end: new Date('2025-09-30T09:00:00.000Z'),
    title: 'New Event21! 🎉',
    room: '161',
    startFormatted: '2025-09-30',
    endFormatted: '2025-09-30',
    // _: {
    //   id: 2,
    //   multiday: false,
    //   startFormatted: '2025-09-30',
    //   endFormatted: '2025-09-30',
    //   startMinutes: 780,
    //   endMinutes: 900,
    //   startTimeFormatted24: '13:00',
    //   startTimeFormatted12: '1:00 PM',
    //   endTimeFormatted24: '15:00',
    //   endTimeFormatted12: '3:00 PM',
    //   duration: 120,
    //   deleting: false,
    //   deleted: false,
    //   cachedStart: 1759215600000,
    //   cachedEnd: 1759222800000,
    //   $el: {
    //     _endId: 1,
    //   },
    // },
  },
  {
    // style: {
    //   top: '44.44444444444444%',
    //   height: '22.22222222222223%',
    // },
    startMinutes: 960,
    endMinutes: 1080,
    start: new Date('2025-09-30T10:30:00.000Z'),
    end: new Date('2025-09-30T12:30:00.000Z'),
    title: 'New Event22! 🎉',
    room: '161',
    startFormatted: '2025-09-30',
    endFormatted: '2025-09-30',
    // _: {
    //   id: 3,
    //   multiday: false,
    //   startFormatted: '2025-09-30',
    //   endFormatted: '2025-09-30',
    //   startMinutes: 960,
    //   endMinutes: 1080,
    //   startTimeFormatted24: '16:00',
    //   startTimeFormatted12: '4:00 PM',
    //   endTimeFormatted24: '18:00',
    //   endTimeFormatted12: '6:00 PM',
    //   duration: 120,
    //   deleting: false,
    //   deleted: false,
    //   cachedStart: 1759215600000,
    //   cachedEnd: 1759222800000,
    //   $el: {
    //     _endId: 1,
    //   },
    // },
  },
  {
    // style: {
    //   top: '44.44444444444444%',
    //   height: '22.22222222222223%',
    // },
    startMinutes: 780,
    endMinutes: 900,
    start: new Date('2025-09-30T10:00:00.000Z'),
    end: new Date('2025-09-30T12:00:00.000Z'),
    title: 'New Event23! 🎉',
    room: '108',
    startFormatted: '2025-09-30',
    endFormatted: '2025-09-30',
    // _: {
    //   id: 4,
    //   multiday: false,
    //   startFormatted: '2025-09-30',
    //   endFormatted: '2025-09-30',
    //   startMinutes: 780,
    //   endMinutes: 900,
    //   startTimeFormatted24: '13:00',
    //   startTimeFormatted12: '1:00 PM',
    //   endTimeFormatted24: '15:00',
    //   endTimeFormatted12: '3:00 PM',
    //   duration: 120,
    //   deleting: false,
    //   deleted: false,
    //   cachedStart: 1759215600000,
    //   cachedEnd: 1759222800000,
    //   $el: {
    //     _endId: 1,
    //   },
    // },
  },
];

const slotsColumns = [
  { text: '108', value: '108' },
  { text: '161', value: '161' },
];
const slotFieldValue = ref('108');
const slotPickerValue = ref(['108']);

const date = ref(new Date(new Date()).format());

const flteredEvents = computed(() => {
  return events.filter((event) => {
    return event.startFormatted === date.value && event.room === slotFieldValue.value;
  });
});

watch(flteredEvents, () => {
  console.log(flteredEvents.value);
});

// const events = store.events;

const createEvent = ({ event, resolve }) => {
  resolve({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
    startFormatted: new Date(event.start).format(),
    endFormatted: new Date(event.end).format(),
    title: 'New Event! 🎉',
  });
  // .then(() => {
  //   // store.setEvents(events);
  //   console.log(events);
  // });
};
</script>
