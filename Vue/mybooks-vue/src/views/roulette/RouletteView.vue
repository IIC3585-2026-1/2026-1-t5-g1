<template>
  <RouletteShell>
    <RouletteHeader />

    <div v-if="wishlistBooks.length">
      <RouletteModeSwitch v-model="mode" />
      <p v-if="mode === 'manual'" class="manual-help">
        Toca las portadas que quieras incluir · {{ pool.length }} seleccionados
      </p>

      <RouletteBookGrid
        :books="wishlistBooks"
        :manual="mode === 'manual'"
        :picked="picked"
        :disabled="spinning"
        @toggle="toggleBook"
      />

      <RouletteSpinPanel
        :count="pool.length"
        :spinning="spinning"
        @spin="spin"
      />

      <RouletteResultDialog
        :book="selectedBook"
        @close="selectedBook = null"
        @start-reading="startReading"
      />
    </div>

    <RouletteEmptyState v-else />
  </RouletteShell>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import RouletteBookGrid from '../../components/roulette/RouletteBookGrid.vue'
import RouletteEmptyState from '../../components/roulette/RouletteEmptyState.vue'
import RouletteHeader from '../../components/roulette/RouletteHeader.vue'
import RouletteModeSwitch from '../../components/roulette/RouletteModeSwitch.vue'
import RouletteResultDialog from '../../components/roulette/RouletteResultDialog.vue'
import RouletteShell from '../../components/roulette/RouletteShell.vue'
import RouletteSpinPanel from '../../components/roulette/RouletteSpinPanel.vue'
import { getByStatus, saveBook } from '../../storage/userStorage'
import { normalizeStoredBooks } from '../../storage/bookMapper'

const wishlistBooks = computed(() => normalizeStoredBooks(getByStatus('wantToRead')))
const mode = ref('all')
const picked = ref(new Set())
const selectedBook = ref(null)
const spinning = ref(false)

const pool = computed(() =>
  mode.value === 'all' ? wishlistBooks.value : wishlistBooks.value.filter((book) => picked.value.has(book.id))
)

watch(
  () => wishlistBooks.value.map((book) => book.id).join('|'),
  () => { picked.value = new Set(wishlistBooks.value.map((book) => book.id)) },
  { immediate: true }
)

function toggleBook(id) {
  if (mode.value !== 'manual' || spinning.value) return
  const next = new Set(picked.value)
  next.has(id) ? next.delete(id) : next.add(id)
  picked.value = next
}

function spin() {
  if (!pool.value.length) return
  spinning.value = true
  selectedBook.value = null
  window.setTimeout(() => {
    selectedBook.value = pool.value[Math.floor(Math.random() * pool.value.length)]
    spinning.value = false
  }, 850)
}

function startReading() {
  if (!selectedBook.value) return
  saveBook(selectedBook.value, 'reading')
  selectedBook.value = null
}
</script>

<style scoped>
.manual-help {
  margin: -10px 0 22px;
  color: rgba(245, 239, 227, 0.62);
  font-size: 13px;
  font-weight: 700;
  text-align: center;
}
</style>
