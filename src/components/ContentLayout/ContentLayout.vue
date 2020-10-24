<template>
  <div class="pt-2 pb-2">
    <div v-if="!!breadcrumbs[route.name]">
      <b-breadcrumb :items="breadcrumbs[route.name]"></b-breadcrumb>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import breadcrumbs from '@/config/breadcrumbs'

@Component({
  name: 'Content',
  components: {
  }
})
export default class extends Vue {
  private breadcrumbs = breadcrumbs

  get route() {
    return this.$route
  }
}
</script>
