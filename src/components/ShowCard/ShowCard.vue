<template>
  <!-- eslint-disable max-len -->
  <div class="show-card fluid" data-test="show-card">
    <b-card
      thumbnail
      :img-src="data.image.medium"
      :img-alt="data.name"
      img-top
      class="mb-2 d-flex show-card__container position-relative"
    >
      <div>
          <div>
            <b-card-text>
              <h4>{{data.name}}</h4>
            </b-card-text>
          </div>
      </div>

      <div v-if="data.rating.average" class="badge badge-secondary d-flex justify-content-end align-items-center position-absolute bg-light p-1 show-card__rating">
        <b-icon icon="star-fill" variant="warning" font-scale="2"></b-icon>
        <span class="mb-0 ml-2 text-dark font-weight-bold">{{data.rating.average}}</span>
      </div>
      <router-link :to="'/shows/' + data.id" class="stretched-link"></router-link>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { TShow } from '@/store/shows'

@Component({
  name: 'ShowCard',
  components: {
  }
})
export default class extends Vue {
  @Prop() private data!: TShow
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.show-card__container {
  height: 100%
}
.show-card__rating {
    top: 10px;
    right: 0
}

</style>
