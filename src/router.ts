import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage/MainPage.vue'
import ShowDetailsContainer from '@/components/ShowDetails/ShowDetailsContainer.vue'
import ErrorPage from '@/components/ErrorPage/ErrorPage.vue'
import ROUTES from '@/config/routes'

const { main, show, notFound } = ROUTES

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      ...main,
      component: MainPage
    },
    {
      ...show,
      component: ShowDetailsContainer
    },
    {
      path: '*',
      name: notFound.name,
      component: ErrorPage,
      props: {
        code: '404'
      }
    }
  ]
})
