# @toyota/react-native-ui

Toyota-branded React Native UI components built with design tokens.

## Installation

```bash
npm install @toyota/react-native-ui
```

## Peer Dependencies

- `react` >= 18.0.0
- `react-native` >= 0.72.0

## Usage

```javascript
import { Button } from '@toyota/react-native-ui';

function MyComponent() {
  return (
    <Button 
      variant="primary" 
      size="md" 
      onPress={() => console.log('Pressed')}
    >
      Click me
    </Button>
  );
}
```

## Components

### Button

Button component with multiple variants and sizes, mirroring the web Button API.

**Props:**
- `variant`: 'primary' | 'secondary' | 'ghost' | 'outline' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `disabled`: boolean (default: false)
- `onPress`: function (React Native uses onPress instead of onClick)
- `theme`: 'light' | 'dark' (default: 'light')
- `style`: additional styles
- `testID`: string for testing

**Example:**
```javascript
<Button variant="primary" size="md" onPress={handlePress}>
  Submit
</Button>
```

## Design Tokens

Components use shared design tokens from the monorepo. Tokens are automatically generated from `tokens/*.json` files and exported as JavaScript modules.

## Development

This package is part of the Toyota Design System monorepo. See the root README for development setup.

## License

ISC

