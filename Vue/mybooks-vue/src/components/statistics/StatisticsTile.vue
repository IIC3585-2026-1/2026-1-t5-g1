<template>
  <article class="stat-tile">
    <div class="tile-head">
      <span class="tile-icon" aria-hidden="true">
        <svg v-if="icon === 'check'" viewBox="0 0 24 24">
          <path d="m5 12 4 4 10-10" />
        </svg>
        <svg v-else-if="icon === 'clock'" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
        <svg v-else viewBox="0 0 24 24">
          <path d="M4 5.5c2.6 0 5 .7 8 2.5 3-1.8 5.4-2.5 8-2.5v12c-2.6 0-5 .7-8 2.5-3-1.8-5.4-2.5-8-2.5z" />
          <path d="M12 8v12" />
        </svg>
      </span>
    </div>
    <strong>{{ count }}</strong>
    <span>{{ label }}</span>
  </article>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  count: {
    type: [Number, String],
    required: true,
  },
  icon: {
    type: String,
    default: 'book',
  },
})
</script>

<style scoped>
.stat-tile {
  min-height: 140px;
  padding: 18px 20px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--paper-2);
  color: var(--ink);
  text-align: left;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.stat-tile:hover {
  border-color: var(--line-2);
  box-shadow: 0 18px 36px -28px rgba(60, 44, 28, 0.65);
  transform: translateY(-3px);
}

.tile-head {
  display: flex;
  justify-content: space-between;
}

.tile-icon {
  display: grid;
  width: 26px;
  height: 26px;
  color: var(--gold-deep);
  place-items: center;
}

.tile-icon svg {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}

strong {
  display: block;
  margin-top: 14px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 42px;
  font-weight: 500;
  line-height: 1;
}

.stat-tile > span:last-child {
  display: block;
  margin-top: 6px;
  color: var(--ink-soft);
  font-size: 14px;
}
</style>
