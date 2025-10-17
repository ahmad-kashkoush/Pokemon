import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/PokemonExplorerView.vue'),
    },
    {
      path: '/pokemons/:id',
      name: 'pokemon-details',
      component: () => import('@/views/pokemon-details/PokemonDetailsWrapper.vue'),
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('@/views/FavoriteView.vue'),
    },
    {
      path: '/team',
      name: 'team',
      component: () => import('@/views/TeamView.vue'),
    },
    {
      path: '/:catchAll(.*)',
      name: 'catch-all',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

export default router
