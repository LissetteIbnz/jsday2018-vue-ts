import Vue from 'vue';
import App from './App.vue';

import { ConsolePlugin } from './plugins';

import './assets/styles/w3.css';

Vue.config.productionTip = false;

Vue.use(ConsolePlugin);

new Vue({
  render: h => h(App),
}).$mount('#app');
