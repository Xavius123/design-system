# React UI

Toyota-branded React UI components built with Radix UI and CSS Modules.

## Installation

```bash
npm install @your-org/react-ui
```

## Usage

### Import Components

```jsx
import { Button, Input, Checkbox } from '@your-org/react-ui';
```

### Import Styles

```jsx
// Option 1: Import all styles
import '@your-org/react-ui/styles';

// Option 2: Import tokens only
import '@your-org/react-ui/tokens/light';
import '@your-org/react-ui/tokens/dark';
```

### Example

```jsx
import { Button } from '@your-org/react-ui';
import '@your-org/react-ui/styles';

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


