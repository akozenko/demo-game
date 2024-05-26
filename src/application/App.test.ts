import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { nextTick } from 'vue';

import { renderComponent, screen, userEvent, waitFor, within } from 'test/helpers';

import App from './App.vue';

describe('Game', () => {
  beforeEach(async () => {
    await renderComponent(App);
  });

  test('should render settings form on start', async () => {
    expect(screen.queryByLabelText(/game settings/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/game field/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  describe('Settings Form', () => {
    afterEach(async () => {
      await userEvent.clear(screen.getByLabelText(/час раунду/i));
      await userEvent.type(screen.getByLabelText(/час раунду/i), import.meta.env.COMPARUS_DEFAULT_ROUND_TIME_MS);

      await userEvent.clear(screen.getByLabelText(/балів для перемоги/i));
      await userEvent.type(screen.getByLabelText(/балів для перемоги/i), import.meta.env.COMPARUS_DEFAULT_SCORES_FOR_WIN);

      await userEvent.clear(screen.getByLabelText(/розмір поля/i));
      await userEvent.type(screen.getByLabelText(/розмір поля/i), import.meta.env.COMPARUS_DEFAULT_FIELD_SIZE);
    });

    describe.each([
      { field: 'Round Time', label: /час раунду/i, min: 300, max: 3000, defaultValue: import.meta.env.COMPARUS_DEFAULT_ROUND_TIME_MS },
      { field: 'Scores for win', label: /балів для перемоги/i, min: 4, max: 12, defaultValue: import.meta.env.COMPARUS_DEFAULT_SCORES_FOR_WIN },
      { field: 'Field size', label: /розмір поля/i, min: 4, max: 12, defaultValue: import.meta.env.COMPARUS_DEFAULT_FIELD_SIZE },
    ])('$field', ({ label, defaultValue, max, min }) => {
      test('should be rendered with correct default value', () => {
        expect(screen.queryByLabelText(label)).toBeInTheDocument();
        expect(screen.getByLabelText(label)).toHaveValue(defaultValue);
      });

      test('should be mandatory', async () => {
        expect(screen.getByLabelText(label)).toBeValid();
        await userEvent.clear(screen.getByLabelText(label));
        await userEvent.click(screen.getByRole('button', { name: /почати/i }));

        expect(screen.getByLabelText(label)).toBeInvalid();
        expect(screen.getByLabelText(label)).toHaveAccessibleErrorMessage(/value is required/i);
      });

      test(`should not be less than ${min}`, async () => {
        expect(screen.getByLabelText(label)).toBeValid();
        await userEvent.clear(screen.getByLabelText(label));
        await userEvent.type(screen.getByLabelText(label), `${min - 1}`);
        await userEvent.click(screen.getByRole('button', { name: /почати/i }));

        expect(screen.getByLabelText(label)).toBeInvalid();
        const mr = new RegExp(`the minimum value allowed is ${min}`, 'i');
        expect(screen.getByLabelText(label)).toHaveAccessibleErrorMessage(mr);
      });

      test(`should not be more than ${max}`, async () => {
        expect(screen.getByLabelText(label)).toBeValid();
        await userEvent.clear(screen.getByLabelText(label));
        await userEvent.type(screen.getByLabelText(label), `${max + 1}`);
        await userEvent.click(screen.getByRole('button', { name: /почати/i }));

        expect(screen.getByLabelText(label)).toBeInvalid();
        const mr = new RegExp(`the maximum value allowed is ${max}`, 'i');
        expect(screen.getByLabelText(label)).toHaveAccessibleErrorMessage(mr);
      });
    });

    describe('Specific validations', () => {
      test('should not allow to type "Scores for win" more that allowed by "Field size"', async () => {
        await userEvent.clear(screen.getByLabelText(/розмір поля/i));
        await userEvent.type(screen.getByLabelText(/розмір поля/i), '4');

        await userEvent.click(screen.getByRole('button', { name: /почати/i }));

        expect(screen.getByLabelText(/балів для перемоги/i)).toBeInvalid();
        const mr = new RegExp('the maximum value allowed is 8', 'i');
        expect(screen.getByLabelText(/балів для перемоги/i)).toHaveAccessibleErrorMessage(mr);
       });
    });
  });
  describe('Game Field', () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    beforeEach(async () => {
      vi.useFakeTimers({ shouldAdvanceTime: true });

      await userEvent.clear(screen.getByLabelText(/розмір поля/i));
      await userEvent.type(screen.getByLabelText(/розмір поля/i), '4');

      await userEvent.clear(screen.getByLabelText(/балів для перемоги/i));
      await userEvent.type(screen.getByLabelText(/балів для перемоги/i), '4');

      await userEvent.clear(screen.getByLabelText(/час раунду/i));
      await userEvent.type(screen.getByLabelText(/час раунду/i), '300');

      await userEvent.click(screen.getByRole('button', { name: /почати/i }));
    });

    test('should render game field', () => {
      expect(screen.queryByLabelText(/game settings/i)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/game field/i)).toBeInTheDocument();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      expect(screen.queryByLabelText(/рахунок гравця/i)).toBeInTheDocument();
      expect(screen.queryByLabelText(/рахунок комп'ютера/i)).toBeInTheDocument();

      expect(screen.getByLabelText(/рахунок гравця/i)).toHaveTextContent('0');
      expect(screen.getByLabelText(/рахунок комп'ютера/i)).toHaveTextContent('0');
    });

    test('should score hit for user', async () => {
      expect(screen.getByLabelText(/рахунок гравця/i)).toHaveTextContent('0');
      expect(screen.getByLabelText(/рахунок комп'ютера/i)).toHaveTextContent('0');

      await userEvent.click(screen.getByLabelText(/hit on me/i));

      expect(screen.getByLabelText(/рахунок гравця/i)).toHaveTextContent('1');
      expect(screen.getByLabelText(/рахунок комп'ютера/i)).toHaveTextContent('0');

      expect(screen.getAllByLabelText(/score for user/i)).toHaveLength(1);
    });

    test('should score hit for AI', async () => {
      expect(screen.getByLabelText(/рахунок гравця/i)).toHaveTextContent('0');
      expect(screen.getByLabelText(/рахунок комп'ютера/i)).toHaveTextContent('0');

      vi.runOnlyPendingTimers();
      await nextTick();

      expect(screen.getByLabelText(/рахунок гравця/i)).toHaveTextContent('0');
      expect(screen.getByLabelText(/рахунок комп'ютера/i)).toHaveTextContent('1');
      expect(screen.getAllByLabelText(/score for ai/i)).toHaveLength(1);
    });
  });

  describe('Game Results', () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    beforeEach(async () => {
      vi.useFakeTimers({ shouldAdvanceTime: true });

      await userEvent.clear(screen.getByLabelText(/розмір поля/i));
      await userEvent.type(screen.getByLabelText(/розмір поля/i), '4');

      await userEvent.clear(screen.getByLabelText(/балів для перемоги/i));
      await userEvent.type(screen.getByLabelText(/балів для перемоги/i), '4');

      await userEvent.clear(screen.getByLabelText(/час раунду/i));
      await userEvent.type(screen.getByLabelText(/час раунду/i), '300');

      await userEvent.click(screen.getByRole('button', { name: /почати/i }));
    });

    test('should show modal if AI wins', async () => {
      expect(screen.getByLabelText(/рахунок гравця/i)).toHaveTextContent('0');
      expect(screen.getByLabelText(/рахунок комп'ютера/i)).toHaveTextContent('0');

      vi.advanceTimersByTime(4 * 300);
      await nextTick();

      expect(screen.getByLabelText(/рахунок гравця/i)).toHaveTextContent('0');
      expect(screen.getByLabelText(/рахунок комп'ютера/i)).toHaveTextContent('4');
      expect(screen.getAllByLabelText(/score for ai/i)).toHaveLength(4);

      expect(screen.queryByRole('dialog')).toBeInTheDocument();
      const modal = within(screen.getByRole('dialog'));

      expect(modal.queryByText(/нажаль, ви програли! спробуєте ще?/i)).toBeInTheDocument();

      expect(modal.queryByRole('button', { name: /зіграти ще/i })).toBeInTheDocument();
    });

    test('should show modal if user wins', async () => {
      expect(screen.getByLabelText(/рахунок гравця/i)).toHaveTextContent('0');
      expect(screen.getByLabelText(/рахунок комп'ютера/i)).toHaveTextContent('0');

      await userEvent.click(screen.getByLabelText(/hit on me/i));
      await userEvent.click(screen.getByLabelText(/hit on me/i));
      await userEvent.click(screen.getByLabelText(/hit on me/i));
      await userEvent.click(screen.getByLabelText(/hit on me/i));

      expect(screen.getByLabelText(/рахунок гравця/i)).toHaveTextContent('4');
      expect(screen.getByLabelText(/рахунок комп'ютера/i)).toHaveTextContent('0');

      expect(screen.getAllByLabelText(/score for user/i)).toHaveLength(4);

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).toBeInTheDocument();
      });

      const modal = within(screen.getByRole('dialog'));

      expect(modal.queryByText(/ви виграли! зіграєте ще?/i)).toBeInTheDocument();

      expect(modal.queryByRole('button', { name: /зіграти ще/i })).toBeInTheDocument();
    });

    test('should have ability to start new game', async () => {
      expect(screen.getByLabelText(/рахунок гравця/i)).toHaveTextContent('0');
      expect(screen.getByLabelText(/рахунок комп'ютера/i)).toHaveTextContent('0');

      vi.advanceTimersByTime(4 * 300);
      await nextTick();

      expect(screen.queryByRole('dialog')).toBeInTheDocument();
      const modal = within(screen.getByRole('dialog'));

      expect(modal.queryByRole('button', { name: /зіграти ще/i })).toBeInTheDocument();
      await userEvent.click(modal.getByRole('button', { name: /зіграти ще/i }));
      expect(screen.queryByLabelText(/game settings/i)).toBeInTheDocument();
      expect(screen.queryByLabelText(/game field/i)).not.toBeInTheDocument();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

  });
});
