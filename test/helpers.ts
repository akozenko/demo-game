import { render, screen, waitFor, within } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { nextTick } from 'vue';
import type { RenderOptions } from '@testing-library/vue';

import '@testing-library/jest-dom';

import { i18n } from '../src/application/i18n';

export {
  screen,
  userEvent,

  nextTick,
  waitFor,
  within,
};

export function renderComponent<C>(
  TestComponent: C,
  options?: RenderOptions<C>,
) {
  return render(TestComponent, {
    ...options,
    global: {
      ...options?.global,
      plugins: [
        i18n,
        ...(options?.global?.plugins || []),
      ],
    },
  });
}
