import './assets/main.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

const rootElement = document.createElement('div');
rootElement.setAttribute('id', 'app');
document.body.prepend(rootElement);

app.mount(rootElement);
