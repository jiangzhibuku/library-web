import { createRouter, createWebHistory } from 'vue-router'
import BookList from '../views/BookList.vue'
import BorrowList from '../views/BorrowList.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/books' },
    { path: '/books', component: BookList },
    { path: '/borrows', component: BorrowList }
  ]
})