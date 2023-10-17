<template>
  <div class="date-picker">

    <div class="header">

      <button @click="prevMonth">Previous</button>
      <span>{{ currentMonth }}</span>
      <button @click="nextMonth">Next</button>
    </div>

    <div class="calendar">

      <div class="weekdays">
        <div v-for="day in daysOfWeek" :key="day">{{ day }}</div>
      </div>

      <div class="days">
        <div v-for="day in calendarDays" :key="day.date" :class="{ selected: isSelected(day), today: isToday(day) }"
          @click="selectDate(day)">
          {{ day.day }}
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      currentDate: new Date(),
    };
  },
  computed: {
    currentMonth() {

    },
    daysOfWeek() {

    },
    calendarDays() {

    },
  },
  methods: {
    prevMonth() {

    },
    nextMonth() {

    },
    selectDate(day) {

    },
    isSelected(day) {

    },
    isToday(day) {

    },
  },
};
</script>
  
<style scoped></style>

