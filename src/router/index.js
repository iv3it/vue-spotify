import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: () => import('../views/HomePage.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: '/playlists',
          name: 'playlists',
          component: () => import('../views/PlaylistsView.vue')
        },
        {
          path: '/playlist/:id',
          name: 'playlist',
          props: true,
          component: () => import('../views/PlaylistView.vue')
        },
        {
          path: '/album/:id',
          name: 'album',
          props: true,
          component: () => import('../views/AlbumView.vue')
        },
        {
          path: '/search',
          name: 'search',
          component: () => import('../views/SearchView.vue')
        },
        {
          path: '/favourite',
          name: 'favourite',
          component: () => import('../views/FavouriteView.vue')
        },        
      ]
    }
  ]
})

export default router
