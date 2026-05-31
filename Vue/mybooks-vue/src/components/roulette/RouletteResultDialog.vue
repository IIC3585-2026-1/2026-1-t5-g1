<template>
  <Teleport to="body">
    <div v-if="book" class="backdrop" role="presentation" @click.self="$emit('close')">
      <section class="card" role="dialog" aria-modal="true" aria-labelledby="roulette-result-title">
        <button class="close" type="button" aria-label="Cerrar resultado" @click="$emit('close')">×</button>
        <BookCover :book="book" compact />
        <div class="copy">
          <p>Tu próxima lectura es...</p>
          <h2 id="roulette-result-title">{{ book.title }}</h2>
          <span>{{ firstAuthor }}</span>
          <div class="actions">
            <button type="button" @click="$emit('start-reading')">Empezar a leer</button>
            <button type="button" class="ghost" @click="$emit('close')">Volver al ritual</button>
          </div>
        </div>
      </section>
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import BookCover from './BookCover.vue'

const props = defineProps({ book: { type: Object, default: null } })
defineEmits(['close', 'start-reading'])
const firstAuthor = computed(() => props.book?.authors?.[0] || 'Autor desconocido')
</script>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(21, 17, 13, 0.72);
  backdrop-filter: blur(10px);
}
.card {
  position: relative;
  display: flex;
  width: min(720px, 100%);
  align-items: center;
  gap: 28px;
  padding: 28px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  background: radial-gradient(circle at 20% 0%, rgba(194, 160, 91, 0.2), transparent 35%), linear-gradient(135deg, #2b2620, #1f1a15);
  box-shadow: 0 32px 90px -30px rgba(0, 0, 0, 0.9);
  color: var(--paper);
}
.card::before {
  position: absolute;
  inset: -36px;
  z-index: -1;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(194, 160, 91, 0.28), transparent 66%);
  content: "";
}
.close {
  position: absolute;
  top: 14px;
  right: 16px;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(245, 239, 227, 0.78);
  cursor: pointer;
  font-size: 24px;
}
.copy { min-width: 0; }
.copy p { margin: 0 0 10px; color: var(--gold); font-size: 13px; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase; }
.copy h2 { margin: 0; color: var(--paper); font-family: Georgia, "Times New Roman", serif; font-size: clamp(34px, 6vw, 54px); font-weight: 500; line-height: 1; }
.copy span { display: block; margin-top: 10px; color: rgba(245, 239, 227, 0.7); font-size: 18px; }
.actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 26px; }
.actions button { padding: 13px 22px; border-radius: 999px; background: var(--gold); color: var(--ink); cursor: pointer; font-weight: 800; }
.actions .ghost { border: 1px solid rgba(255, 255, 255, 0.2); background: transparent; color: rgba(245, 239, 227, 0.82); }
@media (max-width: 640px) {
  .card { align-items: flex-start; flex-direction: column; }
}
</style>
