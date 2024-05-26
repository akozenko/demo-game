export function parseFontSizeTokens(designTokens: Record<string, string>[]) {
  return designTokens
    .reduce((preset, { name, fontSize, lineHeight }) => ({
      ...preset,
      [name]: [fontSize, { lineHeight }],
    }), {} as Record<string, unknown>);
};

export function parseFontFamilyTokens(designTokens: Record<string, string>[]) {
  return designTokens.reduce((preset, { name, fontFamily }) => ({
    ...preset,
    [name]: fontFamily,
  }), {});
};
