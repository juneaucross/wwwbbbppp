<template>
  <!-- <h1>КИР</h1> -->
  <vue-cal
    v-bind="config"
    editable-events
    @event-create="createEvent"
  />
</template>

<script setup>
import { VueCal } from 'vue-cal';
import 'vue-cal/style';

const config = {
  hideWeekends: true,
  titleBar: false,
  views: ['day'],
  viewsBar: false,
  snapToInterval: 30,
  timeFrom: 9 * 60,
  timeTo: 18 * 60,
  timeStep: 30,
  // time: true,
  // sm: true,
  // xs: true,
};

const createEvent = ({ event, resolve }) => {
  resolve({
    ...event,
    title: 'New Event! 🎉',
  });
};
</script>
