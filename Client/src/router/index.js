import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import UserInputView from '../views/UserInputView.vue'
import LeagueListView from '../views/LeagueListView.vue'
import LeagueDetailView from '../views/LeagueDetailView.vue'
import SquadDetailView from '../views/SquadDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/news',
      name: 'home',
      component: HomeView
    },
    {
      path: '/',
      redirect: '/news'
    },
    {
      path: '/profile',
      name: "profile",
      component: ProfileView
    },
    {
      path: '/register',
      name: 'register',
      component: UserInputView
    },
    {
      path: '/login',
      name: 'login',
      component: UserInputView
    },
    {
      path: '/league',
      name: 'league',
      component: LeagueListView
    },
    {
      path: '/league/:league',
      name: 'leagueDetail',
      component: LeagueDetailView
    },
    {
      path: '/league/:league/:team',
      name: 'squadDetail',
      component: SquadDetailView
    }
  ]
})

router.beforeEach((to, from, next) => {
  if ((to.name == 'login' || to.name == 'register') && localStorage.access_token) next({ name: 'home'})
  else next()
})

export default router