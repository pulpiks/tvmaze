import { createLocalVue, shallowMount } from '@vue/test-utils'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import ShowDetailsContainer from '../ShowDetailsContainer.vue'
import store from '../../../store/store'
import testData from './testData'

const mockSuccessResponse = testData

jest.mock('../../../api/services', () => {
  const services = jest.requireActual('../../../api/services')
  return {
    ...services,
    servicesAPI: {
      ...services.servicesAPI,
      getShowById: jest.fn()
    }
  }
})

// eslint-disable-next-line import/first
import { servicesAPI } from '../../../api/services'

describe('ShowDetailsContainer', () => {
  let localVue: any
  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(BootstrapVue)
    localVue.use(BootstrapVueIcons)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders correctly', async (done) => {
    (servicesAPI.getShowById as unknown as jest.Mock).mockImplementation(() => Promise.resolve({
      data: mockSuccessResponse
    }))

    const $route = {
      params: {
        id: '1'
      }
    }

    const wrapper = await shallowMount(ShowDetailsContainer, {
      localVue,
      store,
      mocks: {
        $route
      }
    })

    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot()
      expect(wrapper.find('[data-test=\'show-page-details\']').exists()).toBe(true)
      done()
    })
  })
})
