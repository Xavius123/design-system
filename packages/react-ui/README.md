# @redhorn/react-ui

Redhorn React UI components built with Radix UI and CSS Modules.

## Installation

```bash
npm install @redhorn/react-ui
```

## Usage

### Import Components

```jsx
import { Button, Input, Checkbox } from '@redhorn/react-ui';
```

### Import Styles

```jsx
// Option 1: Import all styles
import '@redhorn/react-ui/styles';

// Option 2: Import tokens only
import '@redhorn/react-ui/tokens/light';
import '@redhorn/react-ui/tokens/dark';
```

### Example

```jsx
import { Button } from '@redhorn/react-ui';
import '@redhorn/react-ui/styles';

function App() {
  return (
    <Button variant="primary" size="md">
      Click me
    </Button>
  );
}
```

## Components

- **Button** - Primary action component
- **Input** - Text input with label and error states
- **Checkbox** - Checkbox with label support

## Development

This package is part of the design-system monorepo.

```bash
# Build tokens (from root)
npm run build:token

# Start Storybook
npm run storybook

# Build package
npm run build
```

## License

ISC


