<template>
  <div class="month-cell">
    <span class="month-label">{{ month.label }}</span>
    <div class="tooltip-wrap">
      <span
        class="activity-square"
        :style="{ background: intensityColor }"
        tabindex="0"
        :aria-label="tooltip"
      ></span>
      <span class="tooltip" role="tooltip">{{ tooltip }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  month: {
    type: Object,
    required: true,
  },
  readCount: {
    type: Number,
    default: 0,
  },
  startedCount: {
    type: Number,
    default: 0,
  },
})

const total = computed(() => props.readCount + props.startedCount)

const intensityColor = computed(() => {
  if (total.value === 0) return 'var(--paper-3)'
  if (total.value === 1) return '#d4b896'
  if (total.value === 2) return 'var(--coffee)'
  return 'var(--coffee-deep)'
})

const tooltip = computed(() => (
  `${props.month.name}: ${props.readCount} terminado(s), ${props.startedCount} iniciado(s)`
))
</script>

<style scoped>
.month-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.month-label {
  color: var(--ink-soft);
  font-size: 13.5px;
  font-weight: 700;
}

.tooltip-wrap {
  position: relative;
  display: inline-flex;
}

.activity-square {
  display: block;
  width: 36px;
  height: 36px;
  border: 1px solid var(--line);
  border-radius: 7px;
  cursor: help;
}

.tooltip {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  z-index: 5;
  width: max-content;
  max-width: 220px;
  padding: 9px 11px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--ink);
  color: var(--paper-2);
  font-size: 12px;
  line-height: 1.35;
  opacity: 0;
  pointer-events: none;
  transform: translateX(-50%) translateY(4px);
  transition: opacity 0.16s ease, transform 0.16s ease;
  white-space: normal;
}

.tooltip-wrap:hover .tooltip,
.activity-square:focus + .tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
</style>
