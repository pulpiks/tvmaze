<template>
  <div>
    <b-container
      fluid
      no-gutters
      class="bg-white text-center mt-5"
      data-test="not-found"
    >
      <b-row align-h="center">
          <h5>{{ $t(`error.general.message`) }}</h5>
      </b-row>
      <b-row align-h="center">
          <h5>{{ $t(`errorPage.${code}.title`) }}</h5>
      </b-row>
      <b-row class="pt-3" no-gutters align-h="center">
        <router-link to="/" data-test="back-home">
          <b-button>{{ $t(`errorPage.${code}.button`) }}</b-button>
        </router-link>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'ErrorPage'
})
export default class ErrorPage extends Vue {
   @Prop() private code!: string;
}

</script>

<style scoped></style>
