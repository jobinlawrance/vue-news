<template>
  <div id="app">
    <SourceSelection v-on:sourceChanged="sourceChanged"></SourceSelection>
    <NewsComponent v-bind:source="sourceId"></NewsComponent>
  </div>
</template>

<script>
  import { Vue, Component, Data } from 'av-ts'
  import SourceSelection from './components/sourceselection.vue'
  import NewsComponent from './components/newscomponent.vue'

  @Component({
    components: { SourceSelection, NewsComponent }
  })
  class App extends Vue {

    sourceId: string;

    @Data
    data() {
      return {
        sourceId: ''
      }
    }

    // This function is called when SourceSelection component emits event named sourceChanged.
    sourceChanged(sourceId: string) {

      console.log(sourceId)
      this.sourceId = sourceId

    }
  }

  export default App

</script>

<style lang="sass">
  @import "./app.scss";
</style>