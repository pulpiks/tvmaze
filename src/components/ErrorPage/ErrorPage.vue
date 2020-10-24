<template>
  <div>
    <b-container
      fluid
      no-gutters
      class="bg-white text-center mt-5"
      data-test="not-found"
    >
      <b-row>
        <b-col>
          <h5>Error {{ code }}</h5>
        </b-col>
      </b-row>
      <b-row class="pt-3" no-gutters>
        <b-col>
          <p>
            <router-link to="/" data-test="back-home">
              <b-button>Back main page</b-button>
            </router-link>
          </p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'ErrorPage',
  components: {
  },
  computed: {
    title() {
      return ''
    }
  }
})
export default class ErrorPage extends Vue {
   @Prop() private code!: number;
}

</script>

<style scoped></style>
