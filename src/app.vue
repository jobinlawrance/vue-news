<template>
<div id="app">
  <SourceSelection v-on:sourceChanged="sourceChanged"></SourceSelection>
</div>
</template>

<script>
import { Vue, Component, Data } from 'av-ts'
import SourceSelection from './components/sourceselection.vue'

@Component({
  components: {SourceSelection} 
})
class App extends Vue {

  sourceId:string;

  @Data
  data(){
    return {
      sourceId:''
    }
  }
  
  // This function is called when SourceSelection component emits event named sourceChanged.
  sourceChanged(sourceId:string) {

    console.log(sourceId)
    this.sourceId = sourceId
  
  }
}

export default App
</script>

<style>
#app {
  font-family: 'Roboto';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 2% 2% 2% 2%;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
