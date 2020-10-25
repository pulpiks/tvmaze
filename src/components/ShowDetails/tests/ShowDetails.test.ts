import VueRouter from 'vue-router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import {
  createLocalVue, shallowMount, VueClass, Wrapper
} from '@vue/test-utils'
import testData from './testData'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(BootstrapVue)
localVue.use(BootstrapVueIcons)

// eslint-disable-next-line import/order, import/first
// eslint-disable-next-line import/first
import ShowDetails from '../ShowDetails.vue'

const testAnchors = {
  details: 'show-details',
  name: 'show-details-name',
  image: 'show-details-image'
}


const setUp = (props = {}) => {
  const wrapper = shallowMount(ShowDetails, {
    stubs: ['b-container', 'b-row', 'b-col', 'b-badge', 'b-icon'],
    propsData: props
  })
  return wrapper
}

const findByTestAtrr = (component: any, attr: any) => {
  const wrapper = component.findAll(`[data-test='${attr}']`)
  return wrapper
}

describe('ShowDetails', () => {
  let wrapper: Wrapper<ShowDetails>

  beforeAll(() => {
    wrapper = setUp({
      show: testData
    })
  })

  afterAll(() => {
    wrapper.destroy()
  })

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('render main fields correctly', () => {
    const component = wrapper.find(`[data-test='${testAnchors.details}']`)
    const name = wrapper.find(`[data-test='${testAnchors.name}']`)
    const image = wrapper.find(`[data-test='${testAnchors.image}']`)
    expect(component.exists()).toBe(true)
    expect(name.text()).toEqual(testData.name)
    expect(image.exists()).toBe(true)
  })
})
