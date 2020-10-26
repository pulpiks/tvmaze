import VueRouter from 'vue-router'
import { BootstrapVue, BootstrapVueIcons, BForm } from 'bootstrap-vue'
import {
  createLocalVue, shallowMount, VueClass, Wrapper, mount
} from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(BootstrapVue)
localVue.use(BootstrapVueIcons)

// eslint-disable-next-line import/order, import/first
// eslint-disable-next-line import/first
import Search from '../Search.vue'

const testAnchors = {
  inputText: 'search-input',
  btnClose: 'search-btn-close',
  btnSubmit: 'search-btn-submit'
}


const setUp = (props = {}) => {
  const wrapper = shallowMount(Search, {
    stubs: ['b-icon', 'b-form-input', 'b-col', 'b-form', 'b-button', 'b-container', 'b-row', 'b-img'],
    propsData: props
  })
  return wrapper
}


describe('Search component', () => {
  let wrapper: Wrapper<Search>

  beforeAll(() => {
    localVue.component('b-form', BForm)
  })

  afterAll(() => {
    wrapper.destroy()
  })

  const props = {
    placeholder: 'Search by name',
    value: 'text',
    onChange: jest.fn(),
    onReset: jest.fn()
  }

  it('render snapshot correctly', () => {
    wrapper = setUp(props)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('render all basic show`s attributes correctly', () => {
    wrapper = setUp(props)
    const textInput = wrapper.find(`[data-test='${testAnchors.inputText}']`)
    const btnClose = wrapper.find(`[data-test='${testAnchors.btnClose}']`)
    const btnSubmit = wrapper.find(`[data-test='${testAnchors.btnSubmit}']`)
    expect(textInput.exists()).toBe(true)
    expect(btnClose.exists()).toBe(true)
    expect(btnSubmit.exists()).toBe(false)
  })

  it('callback is invoked when value is changed', async () => {
    wrapper = mount(Search, {
      propsData: props,
      localVue,
      listeners: {
        onChange: props.onChange
      }
    })
    const inputEl = wrapper.find('input[type="text"]')
    inputEl.setValue('itworks')
    await inputEl.trigger('input')
    expect((inputEl.element as any).value).toContain('itworks')
    expect(props.onChange).toBeCalled()
  })
})
