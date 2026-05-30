import { createMemoryHistory, createRouter } from 'vue-router'

import ExplorerView from './../views/explore/ExploreView.vue'
import LandingView from './../views/landing/LandingView.vue'
import LibraryView from './../views/library/LibraryView.vue'
import RouletteView from './../views/roulette/RouletteView.vue'

const routes = [
  { path: '/', component: LandingView },
  { path: '/explore', component: ExplorerView },
  { path: '/library', component: LibraryView },
  { path: '/roulette', component: RouletteView }
  
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})