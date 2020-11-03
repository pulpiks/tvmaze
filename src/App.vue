<template>
  <!-- eslint-disable max-len -->
  <div id="app">
    <header class="container container-fluid text-center d-flex align-items-center justify-content-center bg-dark pt-2 pb-2">
      <img src="https://static.tvmaze.com/images/tvm-header-logo.png" alt="">
      <h3 class="text-xl text-light ml-1">Technical assignment</h3>
    </header>
    <main class="container">
      <content-layout>
        <router-view />
      </content-layout>
    </main>
    <footer class="container container-fluid text-left bg-dark pt-2 pb-2">
      <p class="text-light">Created by Kseniia Lvova</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ContentLayout from '@/components/ContentLayout/ContentLayout.vue'

@Component({
  name: 'App',
  components: {
    ContentLayout
  }
})
export default class Home extends Vue {
}
</script>
