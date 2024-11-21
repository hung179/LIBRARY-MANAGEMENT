import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUser as farUser } from '@fortawesome/free-regular-svg-icons';
import store from './store';

store.dispatch('auth/initializeAuth')
library.add(fas);
library.add(faUser, farUser);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router).use(store).mount('#app');
