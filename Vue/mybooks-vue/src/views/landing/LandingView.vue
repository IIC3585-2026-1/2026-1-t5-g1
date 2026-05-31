<template>
  <section class="landing-shell">
    <LandingHero :total-books="books.length" />
    <LandingStats :counts="counts" @open-library="goTo('/library')" />

    <ContinueReadingCard v-if="currentlyReading" :book="currentlyReading" />

    <WishlistPreview
      :books="wishlistBooks"
      @explore="goTo('/explore')"
      @open-library="goTo('/library')"
    />
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import ContinueReadingCard from '../../components/landing/ContinueReadingCard.vue'
import LandingHero from '../../components/landing/LandingHero.vue'
import LandingStats from '../../components/landing/LandingStats.vue'
import WishlistPreview from '../../components/landing/WishlistPreview.vue'
import { books as storedBooks, getByStatus } from '../../storage/userStorage'
import { normalizeStoredBooks } from '../../storage/bookMapper'

const router = useRouter()

const books = computed(() => normalizeStoredBooks(Object.values(storedBooks.value)))
const readingBooks = computed(() => normalizeStoredBooks(getByStatus('reading')))
const wishlistBooks = computed(() => normalizeStoredBooks(getByStatus('wantToRead')))
const currentlyReading = computed(() => readingBooks.value[0])
const counts = computed(() => ({
  reading: getByStatus('reading').length,
  read: getByStatus('read').length,
  wishlist: getByStatus('wantToRead').length,
  recommended: getByStatus('recommended').length,
}))

function goTo(path) {
  router.push(path)
}
</script>

<style scoped>
.landing-shell {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
