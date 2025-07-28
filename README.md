# Design System

A comprehensive design system that generates CSS variables for dark/light themes and SCSS variables with getter functions for easy access.

## Features

- 🎨 **Theme Support**: Light and dark theme color tokens
- 🎯 **CSS Variables**: Auto-generated CSS custom properties for themes
- 🔧 **SCSS Functions**: Convenient getter functions for theme colors
- 📦 **Modular Output**: Separate files for different use cases
- 🚀 **Easy Integration**: Simple import and usage

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Build tokens**:
   ```bash
   npm run build:tokens
   ```

3. **Use in your project**:
   ```scss
   // Import the main SCSS file
   @import 'build/scss/main.scss';
   ```

## Generated Files

After building, you'll get:

### SCSS Files
- `build/scss/variables.scss` - Base design tokens
- `build/scss/theme/variables-light.scss` - Light theme SCSS variables
- `build/scss/theme/variables-dark.scss` - Dark theme SCSS variables
- `build/scss/theme/getters.scss` - SCSS getter functions
- `build/scss/main.scss` - Main file that imports everything

### CSS Files
- `build/css/variables-light.css` - Light theme CSS variables
- `build/css/variables-dark.css` - Dark theme CSS variables

## Usage

### SCSS Functions

The design system provides several convenient functions:

```scss
// Get light theme color
background-color: light-color("background-primary");

// Get dark theme color
color: dark-color("text-primary");

// Get theme color with theme parameter
border-color: get-theme-color("border-primary", "dark");

// Get CSS custom property
background-color: css-var("background-primary", "light");
```

### CSS Variables

CSS variables are automatically applied based on the `data-theme` attribute:

```html
<!-- Light theme -->
<div data-theme="light">
  <p>This uses light theme colors</p>
</div>

<!-- Dark theme -->
<div data-theme="dark">
  <p>This uses dark theme colors</p>
</div>
```

### Available Color Tokens

#### Light Theme
- `background-primary`, `background-secondary`, `background-tertiary`
- `surface-primary`, `surface-secondary`, `surface-tertiary`
- `text-primary`, `text-secondary`, `text-tertiary`, `text-inverse`
- `border-primary`, `border-secondary`, `border-focus`
- `accent-primary`, `accent-secondary`

#### Dark Theme
- Same token names as light theme, but with dark theme values

## Theme Switching

### JavaScript
```javascript
// Switch to light theme
document.documentElement.setAttribute('data-theme', 'light');

// Switch to dark theme
document.documentElement.setAttribute('data-theme', 'dark');
```

### CSS
```css
/* Apply light theme */
:root[data-theme="light"] {
  /* Light theme variables are automatically applied */
}

/* Apply dark theme */
:root[data-theme="dark"] {
  /* Dark theme variables are automatically applied */
}
```

## Customization

### Adding New Colors

1. Edit the token files in `tokens/`:
   - `colors-light.json` for light theme colors
   - `colors-dark.json` for dark theme colors

2. Rebuild the tokens:
   ```bash
   npm run build:tokens
   ```

### Token Structure

Tokens follow the Style Dictionary format:

```json
{
  "Color": {
    "Light": {
      "Background": {
        "Primary": {
          "$type": "color",
          "$value": "#ffffff"
        }
      }
    }
  }
}
```

## Development

### Project Structure
```
design-system/
├── config/
│   ├── style-dictionary.config.js
│   └── formats/
│       └── scss-getters.js
├── tokens/
│   ├── colors.json
│   ├── colors-light.json
│   ├── colors-dark.json
│   ├── shadows.json
│   └── spaces.json
├── scripts/
│   └── build-tokens.js
└── build/
    ├── scss/
    └── css/
```

### Adding New Token Types

1. Create new token files in `tokens/`
2. Update `config/style-dictionary.config.js` to include new platforms/formats
3. Rebuild tokens

## License

ISC
