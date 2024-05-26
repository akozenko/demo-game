import { plugin as layout } from './tailwind/plugins/layout';
import { plugin as typography } from './tailwind/plugins/typography';
import { parseFontFamilyTokens, parseFontSizeTokens } from './tailwind/utils';

import {
  typeStyles as typographyTokens
} from './tailwind/design-tokens.json';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,vue}'],
  theme: {
    extend: {
      fontSize: {
        ...parseFontSizeTokens(typographyTokens),
        'inherit': ['inherit', { lineHeight: 'inherit' }],
      },
      fontFamily: {
        ...parseFontFamilyTokens(typographyTokens),
        'inherit': 'inherit',
      },
    },
  },
  plugins: [
    layout,
    typography,
  ],
};

