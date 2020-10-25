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
import ShowCard from '../ShowCard.vue'

const testAnchors = {
  card: 'show-card',
  name: 'show-card-name',
  image: 'show-card-image',
  linkToShowPageDetails: 'show-card-link',
  rating: 'show-card-rating'
}


const setUp = (props = {}) => {
  const wrapper = shallowMount(ShowCard, {
    stubs: ['b-card', 'b-card-text', 'b-icon', 'router-link'],
    propsData: props
  })
  return wrapper
}

const findByTestAtrr = (component: any, attr: any) => {
  const wrapper = component.findAll(`[data-test='${attr}']`)
  return wrapper
}

describe('ShowCard', () => {
  let wrapper: Wrapper<ShowCard>

  beforeAll(() => {
  })

  afterAll(() => {
    wrapper.destroy()
  })

  it('render all basic show`s attributes correctly', () => {
    wrapper = setUp({
      data: testData
    })
    const card = wrapper.find(`[data-test='${testAnchors.card}']`)
    const elementsByName = findByTestAtrr(wrapper, testAnchors.name)
    const image = wrapper.find(`[data-test='${testAnchors.image}']`)
    const link = wrapper.find(`[data-test='${testAnchors.linkToShowPageDetails}']`)
    const rating = wrapper.find(`[data-test='${testAnchors.rating}']`)
    expect(elementsByName.exists()).toBe(true)
    expect(elementsByName).toHaveLength(1)
    expect(elementsByName.at(0).text()).toContain(testData.name)
    expect(image.exists()).toBe(true)
    expect(card.exists()).toBe(true)
    expect(link.exists()).toBe(true)
    expect(rating.exists()).toBe(true)
    expect(link.html()).toBe(`<router-link-stub to="/shows/${testData.id}" data-test="show-card-link" class="stretched-link"></router-link-stub>`)
  })

  it('not render the rating when it doesnt exist', () => {
    const data = {
      ...testData,
      rating: {
        average: undefined
      }
    }

    wrapper = setUp({
      data
    })

    const rating = wrapper.find(`[data-test='${testAnchors.rating}']`)
    expect(rating.exists()).toBe(false)
  })
})
