import { createI18n } from 'vue-i18n';

import ua from './ua.json';

export const i18n = createI18n({
  locale: 'ua',
  fallbackLocale: 'ua',
  messages: {
    ua,
  },
});
