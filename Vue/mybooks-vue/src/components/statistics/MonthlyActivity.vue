<template>
  <section class="activity-card">
    <div class="activity-head">
      <div>
        <h2>Actividad mensual</h2>
        <p>Libros iniciados y terminados durante {{ year }}.</p>
      </div>
      <div class="legend" aria-label="Intensidad de actividad">
        <span>Baja</span>
        <i class="legend-zero"></i>
        <i class="legend-one"></i>
        <i class="legend-two"></i>
        <i class="legend-three"></i>
        <span>Alta</span>
      </div>
    </div>

    <div class="month-grid">
      <MonthActivityCell
        v-for="month in months"
        :key="month.number"
        :month="month"
        :read-count="readByMonth[month.number] || 0"
        :started-count="startedByMonth[month.number] || 0"
      />
    </div>
  </section>
</template>

<script setup>
import MonthActivityCell from './MonthActivityCell.vue'

defineProps({
  months: {
    type: Array,
    required: true,
  },
  readByMonth: {
    type: Object,
    required: true,
  },
  startedByMonth: {
    type: Object,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
})
</script>

<style scoped>
.activity-card {
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--paper-2);
}

.activity-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
}

h2 {
  margin: 0;
  color: var(--ink);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 24px;
  font-weight: 500;
}

p {
  margin: 6px 0 0;
  color: var(--ink-soft);
  font-size: 14px;
}

.legend {
  display: flex;
  align-items: center;
  gap: 7px;
  color: var(--ink-soft);
  font-size: 12px;
  font-weight: 700;
}

.legend i {
  display: block;
  width: 16px;
  height: 16px;
  border: 1px solid var(--line);
  border-radius: 4px;
}

.legend-zero { background: var(--paper-3); }
.legend-one { background: #d4b896; }
.legend-two { background: var(--coffee); }
.legend-three { background: var(--coffee-deep); }

.month-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(44px, 1fr));
  gap: 14px;
}

@media (max-width: 980px) {
  .month-grid {
    grid-template-columns: repeat(6, minmax(44px, 1fr));
  }
}

@media (max-width: 620px) {
  .activity-head {
    display: block;
  }

  .legend {
    margin-top: 16px;
  }

  .month-grid {
    grid-template-columns: repeat(3, minmax(44px, 1fr));
  }
}
</style>
