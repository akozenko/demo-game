import plugin from 'tailwindcss/plugin';

const values = {
  'row': 'row',
  'row-reverse': 'row-reverse',

  'column': 'column',
  'column-reverse': 'column-reverse',

  'inline-row': 'inline-..row',
  'inline-row-reverse': 'inline-..row-reverse',

  'inline-column': 'inline-..column',
  'inline-column-reverse': 'inline-..column-reverse',
};

export default {
  values,

  plugin: plugin(({ matchComponents }) => {
    matchComponents({
      'layout': (value) => {
        const { prefix = '', direction, suffix = '' } = /^(?:(?<prefix>inline-)\.\.)?(?<direction>row|column)(?<suffix>-reverse)?$/.exec(value).groups;

        return {
          flexGrow: prefix === 'inline-' ? '0' : null,
          flexShrink: prefix === 'inline-' ? '0' : null,
          flexBasis: prefix === 'inline-' ? 'auto' : null,

          display: prefix + 'flex',

          flexDirection: direction + suffix,
          flexWrap: 'nowrap',

          alignContent: direction === 'row' ? 'center' : null,
          alignItems: direction === 'row' ? 'center' : null,

          minWidth: prefix === 'inline-' ? 'auto' : null,
          maxWidth: prefix === 'inline-' ? '100%' : null,
        };
      },
    }, { values });
  }),
};
