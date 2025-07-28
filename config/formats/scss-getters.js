import StyleDictionary from 'style-dictionary';

StyleDictionary.registerFormat({
  name: 'scss/getters',
  format: ({ dictionary }) => {
    const tokens = dictionary.allTokens;
    const lightTokens = tokens.filter((token) =>
      token.filePath.includes('colors-light'),
    );
    const darkTokens = tokens.filter((token) =>
      token.filePath.includes('colors-dark'),
    );

    // Helper to normalize token names (optional)
    const normalizeName = (name) =>
      name
        .replace(/^Color(Light|Dark)?/, '')
        .replace(/[_.]/g, '-')
        .toLowerCase();

    // Group tokens into nested theme map
    const themeMap = {
      light: {},
      dark: {},
    };

    lightTokens.forEach((token) => {
      const name = normalizeName(token.name);
      themeMap.light[name] = `$${token.name}`;
    });

    darkTokens.forEach((token) => {
      const name = normalizeName(token.name);
      themeMap.dark[name] = `$${token.name}`;
    });

    let output = '// Auto-generated SCSS Theme Map and Mixin\n\n';

    // Generate $themes map
    output += '$themes: (\n';
    for (const [theme, entries] of Object.entries(themeMap)) {
      output += `  ${theme}: (\n`;
      for (const [key, value] of Object.entries(entries)) {
        output += `    ${key}: ${value},\n`;
      }
      output += '  ),\n';
    }
    output += ');\n\n';

    // themed() mixin
    output += `@mixin themed() {\n`;
    output += `  @each $theme, $map in $themes {\n`;
    output += `    .theme--#{$theme} & {\n`;
    output += `      $theme-map: () !global;\n\n`;
    output += `      @each $key, $value in $map {\n`;
    output += `        $theme-map: map.merge($theme-map, ($key: $value)) !global;\n`;
    output += `      }\n\n`;
    output += `      @content;\n`;
    output += `      $theme-map: null !global;\n`;
    output += `    }\n`;
    output += `  }\n`;
    output += `}\n\n`;

    // t() function
    output += `@function t($key) {\n`;
    output += `  @return map.get($theme-map, $key);\n`;
    output += `}\n\n`;

    // usage comment
    output += '// Usage:\n';
    output += '// .button {\n';
    output += '//   @include themed() {\n';
    output += '//     background-color: t("bg");\n';
    output += '//     color: t("text");\n';
    output += '//   }\n';
    output += '// }\n';

    return output;
  },
});
