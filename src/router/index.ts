import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/pokemons/:id',
      name: 'pokemon-details',
      component: () => import('../views/PokemonDetailsView.vue'),
    },
  ],
})

export default router
