# Design System

A comprehensive design system that generates CSS variables for dark/light themes and SCSS variables with getter functions for easy access.

## Features

- 🎨 **Theme Support**: Light and dark theme color tokens
- 🎯 **CSS Variables**: Auto-generated CSS custom properties for themes
- 🔧 **SCSS Functions**: Convenient getter functions for theme colors
- 📦 **Modular Output**: Separate files for different use cases
- 🚀 **Easy Integration**: Simple import and usage
- ⚛️ **React Components**: Reusable React components with Tailwind CSS
- 🎨 **Tailwind Integration**: Design tokens integrated with Tailwind CSS

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Build tokens**:
   ```bash
   npm run build:tokens
   ```

3. **Build CSS** (for React components):
   ```bash
   npm run build:css
   ```

4. **Use in your project**:
   ```css
   /* Import CSS variables */
   @import 'build/css/light.css';
   @import 'build/css/dark.css';
   ```
   
   ```jsx
   // Import React components
   import { Button } from './components';
   ```

## Generated Files

After building, you'll get:

### CSS Files
- `build/css/light.css` - Light theme CSS variables
- `build/css/dark.css` - Dark theme CSS variables

## Usage

### React Components

The design system includes React components built with Tailwind CSS:

```jsx
import { Button } from './components';

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// With custom styling
<Button 
  variant="primary" 
  className="shadow-lg transform hover:scale-105"
  onClick={() => console.log('Clicked!')}
>
  Custom Button
</Button>
```

#### Button Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'outline'` | `'primary'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disabled state |
| `className` | `string` | `''` | Additional CSS classes |
| `onClick` | `function` | - | Click handler |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type |

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
├── components/
│   ├── Button/
│   │   ├── Button.jsx
│   │   └── index.js
│   └── index.js
├── config/
│   ├── style-dictionary.config.js
│   └── formats/
│       └── scss-getters.js
├── examples/
│   └── ButtonDemo.jsx
├── src/
│   └── styles/
│       └── input.css
├── tokens/
│   ├── colors.json
│   ├── colors-light.json
│   ├── colors-dark.json
│   ├── shadows.json
│   └── spaces.json
├── scripts/
│   └── build-tokens.js
├── build/
│   ├── scss/
│   └── css/
├── tailwind.config.js
└── postcss.config.js
```

### Adding New Token Types

1. Create new token files in `tokens/`
2. Update `config/style-dictionary.config.js` to include new platforms/formats
3. Rebuild tokens

## License

ISC
