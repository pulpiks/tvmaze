<template>
   <b-form-group :label="title" :class="classNameFormGroup">
     <b-form-checkbox-group buttons :id="id" v-model="isAllSelected" :name="name">
      <b-form-checkbox
        buttons
        :class="classNameCheckbox"
        @change="toggleAll"
      >All
      </b-form-checkbox>
     </b-form-checkbox-group>
    <b-form-checkbox-group buttons :id="id" v-model="value" :name="name" class="d-flex flex-wrap">
      <b-form-checkbox
        v-for="option in options"
        :key="option.value"
        :class="{
          [classNameCheckbox]: true,
          'flex-grow-0': true,
          'rounded': true
        }"
        :value="option.value"
        >{{ option.text }}
      </b-form-checkbox
      >
    </b-form-checkbox-group>
  </b-form-group>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Watch
} from 'vue-property-decorator'

@Component({
  name: 'CheckboxGroupTags',

  components: {
  }
})
export default class CheckboxGroupTags extends Vue {
  @Prop() private title!: string;

  @Prop() private options!: {
      text: string,
      value: string
  }[]

  @Prop() private name!: string

  @Prop() private id!: string

  @Prop({ required: false }) private classNameCheckbox!: string | object

  @Prop({ required: false }) private classNameFormGroup!: string | object

  @Prop() private selected!: string[]

  @Prop() private allSelected!: boolean

  private value = this.selected

  private isAllSelected = this.allSelected

  toggleAll(checked: boolean) {
    this.value = []
  }

  @Watch('selected')
  private onSelected(values: string[]) {
    this.value = values
  }

  @Watch('value')
  private onChangeValue(values: string[], oldValues: string[]) {
    this.isAllSelected = !values.length
    this.$emit('onChange', values)
  }
}
</script>

<style scoped lang="scss">
</style>
