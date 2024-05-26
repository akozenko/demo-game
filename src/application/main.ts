import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';

import './css/main.css';
import App from './App.vue';
import ua from './i18n/ua.json';

const i18n = createI18n({
  locale: 'ua',
  fallbackLocale: 'ua',
  messages: {
    ua,
  },
  // something vue-i18n options here ...
});

const app = createApp(App);
app.use(i18n);

app.mount('#app');
