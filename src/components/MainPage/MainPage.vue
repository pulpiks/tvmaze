<template>
  <div class="main-page" data-test="main-page">
      <shows-filters></shows-filters>
      <shows-list-container></shows-list-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ShowsListContainer from '@/components/ShowsListEffector/ShowsListContainer.vue'
import ShowsFilters from '@/components/ShowsList/ShowsFilters.vue'

@Component({
  name: 'MainPage',
  components: {
    ShowsListContainer,
    ShowsFilters
  }
})
export default class MainPage extends Vue {
}
</script>
