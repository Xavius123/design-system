# @toyota/core

Core types, enums, constants, and metadata for the Toyota Design System. Shared between web and React Native implementations.

## Purpose

This package provides the shared foundation that ensures consistency between `@toyota/react-ui` (web) and `@toyota/react-native-ui` (native) packages.

## What's Included

### 1. Enums

Standardized enumerations for component props:

```typescript
import { ButtonVariant, ComponentSize, InputType } from '@toyota/core';

// ButtonVariant: Primary, Secondary, Ghost, Outline
// ComponentSize: Small, Medium, Large
// InputType: Text, Email, Password, Number, Tel, Url, Search
```

### 2. TypeScript Types

Type definitions for component props:

```typescript
import type { 
  BaseComponentProps, 
  InteractiveWebProps,
  InteractiveNativeProps,
  FormFieldProps,
  WithChildren
} from '@toyota/core';

// Use these as building blocks for component props
interface MyButtonProps extends BaseComponentProps, InteractiveWebProps, WithChildren {
  variant?: ButtonVariant;
}
```

### 3. Design Token Types

Type definitions for design tokens:

```typescript
import type { Theme, ColorTokens, SpacingTokens } from '@toyota/core';

// Provides type safety when working with design tokens
```

### 4. Component Metadata

Metadata files that describe component structure and provide AI-assisted translation guidance:

```typescript
import { ButtonMetadata, InputMetadata, CheckboxMetadata } from '@toyota/core';

// Each metadata object describes:
// - Platform-specific implementations
// - Prop mappings
// - State mappings
// - Conversion notes
// - Examples for both platforms
```

### 5. Constants

Shared constants and default values:

```typescript
import { DEFAULT_SIZE, DEFAULT_BUTTON_VARIANT } from '@toyota/core';
```

## Usage

### In Web Components (@toyota/react-ui)

```typescript
import { ButtonVariant, ComponentSize } from '@toyota/core';
import type { BaseComponentProps, InteractiveWebProps } from '@toyota/core';

interface ButtonProps extends BaseComponentProps, InteractiveWebProps {
  variant?: ButtonVariant;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ variant = ButtonVariant.Primary, ... }) => {
  // Implementation
};
```

### In React Native Components (@toyota/react-native-ui)

```typescript
import { ButtonVariant, ComponentSize } from '@toyota/core';
import type { BaseComponentProps, InteractiveNativeProps } from '@toyota/core';

interface ButtonProps extends BaseComponentProps, InteractiveNativeProps {
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({ variant = ButtonVariant.Primary, ... }) => {
  // Implementation
};
```

### For AI-Assisted Development

```typescript
import { ButtonMetadata } from '@toyota/core';

// AI can read metadata to understand:
console.log(ButtonMetadata.conversionNotes);
// Output: ["Replace onClick with onPress", "Replace button element with Pressable", ...]

console.log(ButtonMetadata.stateMapping.hover);
// Output: { web: ':hover CSS pseudo-class', native: 'onPressIn/onPressOut callbacks', ... }
```

## Installation

This package is part of the Toyota Design System monorepo. It's installed automatically when you install other packages.

```bash
npm install @toyota/core
```

## Development

```bash
# Build TypeScript
npm run build

# Watch mode
npm run dev

# Clean build
npm run clean
```

## License

ISC

