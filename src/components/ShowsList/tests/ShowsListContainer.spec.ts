import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import store from '@/store/store'
import { shows } from './testData'


const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(BootstrapVue)
localVue.use(BootstrapVueIcons)
localVue.use(Vuex)

/*
const mockApiService = responsePayload =>
  jest.mock('../../../api/services', () => ({
    servicesAPI: {
      getAll: () =>
        Promise.resolve({
          data: responsePayload
        })
    }
  }))
  */

jest.mock('../../../utils/errorHandler', () => ({
  ...jest.requireActual('../../../utils/errorHandler'),
  generalErrorHandler: () => () => jest.fn()
}))

jest.mock('../../../api/services', () => {
  const services = jest.requireActual('../../../api/services')
  return {
    ...services,
    servicesAPI: {
      ...services.servicesAPI,
      getShows: jest.fn()
    }
  }
})

// eslint-disable-next-line import/order, import/first
import { servicesAPI } from '@/api/services'
// eslint-disable-next-line import/first
import ShowsListContainer from '../ShowsListContainer.vue'

describe('service-list', () => {
  beforeAll(() => {})
  afterAll(() => {})

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders the list if data contains at least one show', async (done) => {
    (servicesAPI.getShows as jest.Mock).mockImplementation(() => Promise.resolve({
      data: shows
    }))

    const wrapper = await shallowMount(ShowsListContainer, {
      localVue,
      store
    })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('[data-test="show-list-item"]').length).toBe(1)
      done()
    })
  })

  it('renders text "Not found" if there is no shows in the list', async (done) => {
    (servicesAPI.getShows as jest.Mock).mockImplementation(() => Promise.resolve({
      data: []
    }))

    const wrapper = await shallowMount(ShowsListContainer, {
      localVue,
      store
    })

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('[data-test="shows-list-empty"]').exists()).toBe(
        true
      )
      done()
    })
  })
})
