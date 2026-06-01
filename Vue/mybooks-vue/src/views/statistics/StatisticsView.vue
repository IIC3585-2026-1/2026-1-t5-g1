<template>
  <section class="statistics-shell">
    <header class="statistics-header">
      <p class="title">ESTADISTICAS</p>
      <h1>Tu a&ntilde;o en libros</h1>
      <p>Resumen de tu actividad lectora en {{ currentYear }}.</p>
    </header>

    <div class="tiles-grid">
      <StatisticsTile
        v-for="tile in tiles"
        :key="tile.label"
        :label="tile.label"
        :count="tile.count"
        :icon="tile.icon"
      />
    </div>

    <MonthlyActivity
      :months="months"
      :read-by-month="booksReadByMonth"
      :started-by-month="booksStartedByMonth"
      :year="currentYear"
    />

    <p v-if="!registeredActivity" class="empty-note">
      Marca libros como Leyendo o Leido para comenzar a llenar la actividad mensual.
    </p>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import MonthlyActivity from '../../components/statistics/MonthlyActivity.vue'
import StatisticsTile from '../../components/statistics/StatisticsTile.vue'
import { books as storedBooks } from '../../storage/userStorage'
import { normalizeStoredBooks } from '../../storage/bookMapper'

const currentYear = new Date().getFullYear()

const months = [
  { number: 1, name: 'enero', label: 'E' },
  { number: 2, name: 'febrero', label: 'F' },
  { number: 3, name: 'marzo', label: 'M' },
  { number: 4, name: 'abril', label: 'A' },
  { number: 5, name: 'mayo', label: 'M' },
  { number: 6, name: 'junio', label: 'J' },
  { number: 7, name: 'julio', label: 'J' },
  { number: 8, name: 'agosto', label: 'A' },
  { number: 9, name: 'septiembre', label: 'S' },
  { number: 10, name: 'octubre', label: 'O' },
  { number: 11, name: 'noviembre', label: 'N' },
  { number: 12, name: 'diciembre', label: 'D' },
]

const libraryBooks = computed(() => normalizeStoredBooks(Object.values(storedBooks.value)))
const readBooks = computed(() => libraryBooks.value.filter((book) => book.status === 'read'))
const startedBooks = computed(() =>
  libraryBooks.value.filter((book) => ['reading', 'read'].includes(book.status))
)

function countByMonth(bookList, dateKey) {
  return bookList.reduce((acc, book) => {
    const date = book[dateKey]
    if (!date) return acc

    const [year, month] = date.split('-')
    if (Number(year) !== currentYear) return acc

    const monthNumber = Number(month)
    acc[monthNumber] = (acc[monthNumber] || 0) + 1
    return acc
  }, {})
}

const booksReadByMonth = computed(() => countByMonth(readBooks.value, 'endDate'))
const booksStartedByMonth = computed(() => countByMonth(startedBooks.value, 'startDate'))

const readThisYear = computed(() =>
  Object.values(booksReadByMonth.value).reduce((sum, count) => sum + count, 0)
)

const startedThisYear = computed(() =>
  Object.values(booksStartedByMonth.value).reduce((sum, count) => sum + count, 0)
)

const readByMonthAverage = computed(() => {
  if (!readThisYear.value) return 0
  return Math.round((readThisYear.value / 12) * 10) / 10
})

const registeredActivity = computed(() => readThisYear.value > 0 || startedThisYear.value > 0)

const tiles = computed(() => [
  { label: 'Libros leidos', icon: 'check', count: readThisYear.value },
  { label: 'Libros por mes', icon: 'clock', count: readByMonthAverage.value },
  { label: 'Libros iniciados', icon: 'book', count: startedThisYear.value },
])
</script>

<style scoped>
.statistics-shell {
  max-width: 1200px;
  margin: 0 auto;
}

.statistics-header {
  margin-bottom: 34px;
}

.title {
  margin: 0;
  color: var(--coffee);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

h1 {
  margin: 12px 0 0;
  color: var(--ink);
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(38px, 5vw, 56px);
  font-weight: 500;
}

.statistics-header p:last-child {
  margin: 10px 0 0;
  color: var(--ink-soft);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 18px;
  font-style: italic;
}

.tiles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 14px;
  margin-bottom: 34px;
}

.empty-note {
  margin: 18px 0 0;
  color: var(--ink-soft);
  font-size: 14px;
}
</style>
