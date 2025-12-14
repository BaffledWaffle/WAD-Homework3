import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import AddPostView from '../views/AddPostView.vue'
import ContactsView from '../views/ContactsView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/signup', name: 'signup', component: SignupView },
  { path: '/add-post', name: 'add-post', component: AddPostView },
  { path: '/contacts', name: 'contacts', component: ContactsView }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
