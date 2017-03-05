import Vue = require('vue')
import App from './app.vue'
import VueMaterial = require('vue-material')
import 'vue-material/dist/vue-material.css'


//register plugins
Vue.use(VueMaterial)

new Vue({
  el: '#app',
  components: { App },
  render: h => h('app')
})
