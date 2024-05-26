import plugin from 'tailwindcss/plugin';

const values = {
  'display-large': 'display-large',
  'display-medium': 'display-medium',
  'display-small': 'display-small',

  'headline-1': 'headline-1',
  'headline-2': 'headline-2',
  'headline-3': 'headline-3',
  'headline-4': 'headline-4',

  'body-1-regular': 'body-1-regular',
  'body-1-semibold': 'body-1-semibold',
  'body-1-bold': 'body-1-bold',

  'body-2-regular': 'body-2-regular',
  'body-2-semibold': 'body-2-semibold',
  'body-2-bold': 'body-2-bold',

  'caption-regular': 'caption-regular',
  'caption-semibold': 'caption-semibold',
  'caption-bold': 'caption-bold',

  'button': 'button',

  'inherit': 'inherit',
};

export default {
  values,

  plugin: plugin(({ matchComponents, theme }) => {
    matchComponents({
      'typography': (value) => {
        const fontSizeConfig = theme('fontSize');

        const [fontSizeDesktop, optionsDesktop] = fontSizeConfig[value] ?? [];
        const [fontSizeMobile, optionsMobile] = fontSizeConfig[`mobile-${value}`] ?? [];

        return {
          fontFamily: theme(`fontFamily.mobile-${value}`) ?? theme(`fontFamily.${value}`),
          fontWeight: theme(`fontWeight.mobile-${value}`) ?? theme(`fontWeight.${value}`),
          fontSize: fontSizeMobile ?? fontSizeDesktop,
          lineHeight: optionsMobile?.lineHeight ?? optionsDesktop?.lineHeight,

          '[force-screen~="md"] &': {
            fontFamily: theme(`fontFamily.${value}`),
            fontWeight: theme(`fontWeight.${value}`),
            fontSize: fontSizeDesktop,
            lineHeight: optionsDesktop?.lineHeight,
          },

          '&[force-screen~="md"]': {
            fontFamily: theme(`fontFamily.${value}`),
            fontWeight: theme(`fontWeight.${value}`),
            fontSize: fontSizeDesktop,
            lineHeight: optionsDesktop?.lineHeight,
          },
        };
      },
    }, { values });
  }),
};
