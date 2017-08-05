import Vue from 'vue'
import App from './App.vue'
import 'animate.css';
import VueResource from 'vue-resource';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/css/bootstrap-grid.css';
import vSelect from 'vue-select'

Vue.component('v-select', vSelect);
Vue.use(VueResource);



new Vue({
    el: '#app',
    render: h => h(App)
});
