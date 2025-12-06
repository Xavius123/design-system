# @toyota/design-tokens

Shared design tokens for Toyota Design System. Used by both web (`@toyota/react-ui`) and React Native (`@toyota/react-native-ui`) packages.

## Structure

```
tokens/
├── *.json              # Token source files
├── dist/
│   ├── css/           # CSS variables (for web)
│   │   ├── light.css
│   │   └── dark.css
│   └── js/            # JavaScript modules (for React Native)
│       ├── light.js
│       └── dark.js
└── package.json
```

## Usage

### In Web Components (React UI)

```css
/* Import CSS variables */
@import '@toyota/design-tokens/css/light';
@import '@toyota/design-tokens/css/dark';
```

```javascript
// Or import via package exports
import '@toyota/react-ui/tokens/light';
```

### In React Native Components

```javascript
import * as LightTokens from '@toyota/design-tokens/js/light';
import * as DarkTokens from '@toyota/design-tokens/js/dark';

// Use tokens
const color = LightTokens.ColorLightAccentPrimary;
const spacing = LightTokens.TokenLightSpacingMd;
```

## Building Tokens

Tokens are built using Style Dictionary:

```bash
npm run build:token
```

This generates both CSS and JavaScript outputs from the source JSON files.

## Source Files

- `colors.json` - Brand colors (Toyota Red, Gray scale, etc.)
- `colors-light.json` - Light theme color aliases
- `colors-dark.json` - Dark theme color aliases
- `typography.json` - Font families, sizes, weights, line heights
- `spaces.json` - Spacing scale
- `shadows.json` - Shadow definitions
- `border-radius.json` - Border radius values
- `theme-light.json` - Light theme semantic tokens
- `theme-dark.json` - Dark theme semantic tokens

## License

ISC

