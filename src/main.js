/* eslint-disable no-new */
import Vue from 'vue';
import vSelect from 'vue-select';
import 'animate.css';
import VueResource from 'vue-resource';
import App from './App.vue';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/css/bootstrap-grid.css';

Vue.component('v-select', vSelect);
Vue.use(VueResource);

new Vue({
  el: '#app',
  render: h => h(App),
});
