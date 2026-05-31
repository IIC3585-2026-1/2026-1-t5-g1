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
import { useBooksStore } from '../../lib/booksStore'

const router = useRouter()
const store = useBooksStore()

const books = store.books
const counts = store.counts
const readingBooks = store.byStatus('reading')
const wishlistBooks = store.byStatus('wishlist')
const currentlyReading = computed(() => readingBooks.value[0])

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
