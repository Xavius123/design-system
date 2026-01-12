/**
 * Custom Style Dictionary format for scoped CSS variables
 * Outputs CSS variables scoped to a class selector instead of :root
 */

module.exports = {
  name: 'css/scoped',
  formatter: function({ dictionary, options, file }) {
    const selector = options.selector || '.redhorn-theme';
    const theme = options.theme || 'light';
    
    return `/**
 * Do not edit directly, this file was auto-generated.
 */

${selector}[data-theme="${theme}"] {
${dictionary.allTokens.map(token => `  ${token.name}: ${token.value};`).join('\n')}
}
`;
  }
};

