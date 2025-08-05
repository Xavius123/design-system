import StyleDictionary from 'style-dictionary';

StyleDictionary.registerFormat({
  name: 'typescript/colors',
  format: ({ dictionary }) => {
    const generateCleanName = (token) => {
      const pathParts = token.path;
      
      // Extract the category and variant from the path
      const category = pathParts[1]; // Background, Surface, Text, Border, Accent
      const variant = pathParts[2]; // Primary, Secondary, Tertiary, etc.
      
      // Convert to camelCase
      const categoryCamel = category.charAt(0).toLowerCase() + category.slice(1);
      const variantCamel = variant.charAt(0).toLowerCase() + variant.slice(1);
      
      return `color${categoryCamel}${variantCamel}`;
    };

    const toExportBlock = (exportName, filterFn) => {
      const tokens = dictionary.allTokens
        .filter(filterFn)
        .map((token) => {
          const name = generateCleanName(token);
          return `  ${name}: "${token.$value}",`;
        });

      if (tokens.length === 0) return '';

      return `export const ${exportName} = {\n${tokens.join('\n')}\n};`;
    };

    const generateTypeDefinition = (exportName, filterFn) => {
      const tokens = dictionary.allTokens
        .filter(filterFn)
        .map((token) => {
          const name = generateCleanName(token);
          return `  ${name}: string;`;
        });

      if (tokens.length === 0) return '';

      return `export type ${exportName}Type = {\n${tokens.join('\n')}\n};`;
    };

    const typeDefinitions = [
      generateTypeDefinition('ColorsLight', (t) => 
        t.$type === 'color' && t.filePath.includes('colors-light')
      ),
      generateTypeDefinition('ColorsDark', (t) => 
        t.$type === 'color' && t.filePath.includes('colors-dark')
      ),
    ].filter(Boolean);

    const exports = [
      toExportBlock('ColorsLight', (t) => 
        t.$type === 'color' && t.filePath.includes('colors-light')
      ),
      toExportBlock('ColorsDark', (t) => 
        t.$type === 'color' && t.filePath.includes('colors-dark')
      ),
    ].filter(Boolean);

    return `${typeDefinitions.join('\n\n')}\n\n${exports.join('\n\n')}\n`;
  },
}); 