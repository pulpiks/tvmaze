<template>
  <b-form ref="form" @submit="onSubmitSearch" @reset="onReset">
    <b-container
      fluid
      no-gutters
      :class="{
        searchContainer: true,
        'py-0': true,
        'px-0': true,
        'bg-white': true
      }"
    >
      <b-row class="d-flex w-100" no-gutters>
        <b-col :cols="isSubmitBtnVisible ? 10 : 12">
          <div class="search__wrap d-flex align-items-center border rounded p-1 bg-light">
            <b-icon icon="search" variant="dark" font-scale="1" class="d-flex mx-2"></b-icon>
            <b-form-input
              :value.sync="search"
              type="text"
              class="searchInput pl-2 pr-2 pb-0 pt-0"
              :placeholder="placeholder"
              data-test="search-input"
              @input="onChangeValue"
            ></b-form-input>
            <button type="button" class="search__btn-close ml-2"
              aria-label="Close" :disabled="isCloseBtnDisabled"
                @click="clearSearch" data-test="search-btn-close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </b-col>
        <b-col class="ml-1" v-if="isSubmitBtnVisible" data-test="search-btn-submit">
          <b-button
            v-if="isSubmitBtnVisible"
            :disabled="isSubmitBtnDisabled"
            variant="primary"
            class="w-100"
            type="submit"
            >Search</b-button
          >
        </b-col>
      </b-row>
    </b-container>
  </b-form>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

export type VForm = Vue & {
  validate: () => boolean
  resetValidation: () => boolean
  reset: () => void
 }

@Component({
  name: 'Search'
})

export default class extends Vue {
  @Prop({ required: false }) private fullWidth!: boolean

  @Prop({ required: false }) private className!: string

  @Prop({ required: false }) private placeholder!: string

  @Prop({ required: true }) private value!: string

  @Prop({ required: false }) private onChange!: (values?: any) => void;

  @Prop({ required: false }) private onSubmit!: (values?: any) => void;

  get search() {
    return this.value
  }

  get isSubmitBtnVisible() {
    return typeof this.$listeners.onSubmit === 'function'
  }

  get isSubmitBtnDisabled() {
    return this.isSubmitBtnVisible && !this.search
  }

  get isCloseBtnDisabled() {
    return !this.search
  }

  onSubmitSearch(evt: Event) {
    evt.preventDefault()
    if (this.$listeners.onSubmit) {
      this.$emit('onSubmit', this.search)
    }
  }

  onReset() {
    this.$emit('onReset', this.search)
  }

  onChangeValue(v: string) {
    if (this.$listeners.onChange) {
      this.$emit('onChange', v)
    }
  }

  clearSearch() {
    (this.$refs.form as VForm).reset()
  }
}
</script>
<style scoped>


.searchInputWrap {
  position: relative;
}
.searchInput {
  font-size: 20px;
  color: #222222;
  border: 0;
  height: 60px;
}

.searchInputWrap .searchIcon {
  left: 0;
}
.search__btn-close {
  right: 0;
  cursor: pointer;
}
</style>
