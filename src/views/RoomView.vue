<template>
  <DateSelector
    v-model="date"
    for-kir
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
    @event-delete="onEventDelete"
  />
</template>

<script setup>
import { ref, computed } from 'vue';
import DateSelector from '@/components/DateSelector.vue';
import PickerField from '@/components/PickerField.vue';
import { VueCal, addDatePrototypes, stringToDate, useLocale } from 'vue-cal'; //https://antoniandre.github.io/vue-cal/
import Ru from 'vue-cal/i18n/ru';
import 'vue-cal/style';

useLocale(Ru);
addDatePrototypes();

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

const events = ref([]);

const slotsColumns = [
  { text: '108', value: '108' },
  { text: '161', value: '161' },
];
const slotFieldValue = ref('108');
const slotPickerValue = ref(['108']);

const date = ref(new Date(new Date()).format());

const flteredEvents = computed(() => {
  return events.value.filter((event) => {
    return event.startFormatted === date.value && event.room === slotFieldValue.value;
  });
});

const createEvent = ({ event, resolve }) => {
  const start = new Date(event.start);
  let end = new Date(event.end);

  const MIN_MS = 30 * 60 * 1000;
  const MAX_MS = 3 * 60 * 60 * 1000;
  const durationMs = end.getTime() - start.getTime();
  if (durationMs < MIN_MS) {
    end = new Date(start.getTime() + MIN_MS);
  } else if (durationMs > MAX_MS) {
    end = new Date(start.getTime() + MAX_MS);
  }
  const room = slotFieldValue.value;
  const day = start.format();

  const existingSameRoomSameDay = events.value.filter((e) => {
    const eStart = new Date(e.start);
    return (e.room || room) === room && (e.startFormatted || eStart.format()) === day;
  });

  const computedOverlaps = existingSameRoomSameDay.filter((e) => {
    const eStart = new Date(e.start);
    const eEnd = new Date(e.end);
    return start < eEnd && end > eStart;
  });

  if (computedOverlaps.length) {
    console.warn('[vue-cal] Overlapping event blocked', {
      newEvent: { start, end, room, day },
      overlaps: computedOverlaps,
    });
    resolve(false);
    return;
  }

  const newEvent = {
    ...event,
    id: event.id || Math.random().toString(36).slice(2),
    start,
    end,
    startFormatted: day,
    endFormatted: end.format(),
    room,
    title: event.title || 'New Event! 🎉',
    draggable: false,
    resizable: false,
  };

  events.value.push(newEvent);

  resolve(false);
};

const onEventDelete = (payload) => {
  const deletedEvent = payload && payload.event ? payload.event : payload;
  if (!deletedEvent) return;

  if (deletedEvent.id) {
    events.value = events.value.filter((e) => e.id !== deletedEvent.id);
    return;
  }

  const isSameEvent = (a, b) => {
    const aStart = new Date(a.start).getTime();
    const bStart = new Date(b.start).getTime();
    const aEnd = new Date(a.end).getTime();
    const bEnd = new Date(b.end).getTime();
    return (
      aStart === bStart &&
      aEnd === bEnd &&
      (a.room || '') === (b.room || '') &&
      (a.title || '') === (b.title || '')
    );
  };

  const index = events.value.findIndex((e) => isSameEvent(e, deletedEvent));
  if (index !== -1) {
    events.value.splice(index, 1);
  }
};
</script>
