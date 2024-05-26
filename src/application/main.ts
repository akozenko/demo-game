import { createApp } from 'vue';

import './css/main.css';
import { i18n } from './i18n';
import App from './App.vue';

const app = createApp(App);
app.use(i18n);

app.mount('#app');
