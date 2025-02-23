import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Editor.vue'),
      name: 'editor'
    },
    {
      path: '/preview',
      component: () => import('@/views/Preview.vue'),
      name: 'preview'
    }
  ]
})

export default router 