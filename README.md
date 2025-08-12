# Design System - Angular Button Component

A shared Angular button component library that can be installed via npm and used across multiple Angular applications.

## Features

- 🎨 **Multiple Variants**: Primary, secondary, outline, ghost, and danger styles
- 📏 **Size Options**: Small, medium, and large sizes
- 🔄 **Loading States**: Built-in loading spinner with disabled state
- ♿ **Accessibility**: Full ARIA support and keyboard navigation
- 🎯 **Form Integration**: Works seamlessly with Angular reactive forms
- 🌙 **Theme Support**: Light and dark theme support
- 📱 **Responsive**: Mobile-friendly and responsive design
- 🎭 **Customizable**: Easy to customize with CSS custom properties

## Installation

```bash
npm install @your-org/design-system
```

## Usage

### 1. Import the Module

```typescript
import { ButtonModule } from '@your-org/design-system';

@NgModule({
  imports: [ButtonModule],
  // ...
})
export class AppModule { }
```

### 2. Use the Component

```html
<!-- Basic usage -->
<ds-button>Click me</ds-button>

<!-- With variant -->
<ds-button variant="primary">Primary Button</ds-button>
<ds-button variant="secondary">Secondary Button</ds-button>
<ds-button variant="outline">Outline Button</ds-button>
<ds-button variant="ghost">Ghost Button</ds-button>
<ds-button variant="danger">Danger Button</ds-button>

<!-- With size -->
<ds-button size="sm">Small Button</ds-button>
<ds-button size="md">Medium Button</ds-button>
<ds-button size="lg">Large Button</ds-button>

<!-- With loading state -->
<ds-button [loading]="true">Loading...</ds-button>

<!-- Disabled state -->
<ds-button [disabled]="true">Disabled Button</ds-button>

<!-- Full width -->
<ds-button [fullWidth]="true">Full Width Button</ds-button>

<!-- Form submit button -->
<ds-button type="submit" variant="primary">Submit Form</ds-button>
```

### 3. Event Handling

```html
<ds-button 
  (click)="onButtonClick($event)"
  (focus)="onButtonFocus($event)"
  (blur)="onButtonBlur($event)"
  (mouseenter)="onMouseEnter($event)"
  (mouseleave)="onMouseLeave($event)">
  Interactive Button
</ds-button>
```

### 4. Form Integration

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="email" type="email" placeholder="Email">
      <ds-button 
        type="submit" 
        variant="primary"
        [loading]="isSubmitting"
        [disabled]="!form.valid">
        {{ isSubmitting ? 'Submitting...' : 'Submit' }}
      </ds-button>
    </form>
  `
})
export class FormComponent {
  form: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitting = true;
      // Handle form submission
    }
  }
}
```

## API Reference

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `loading` | `boolean` | `false` | Shows loading spinner and disables button |
| `fullWidth` | `boolean` | `false` | Makes button full width |
| `ariaLabel` | `string` | - | ARIA label for accessibility |
| `ariaDescribedby` | `string` | - | ARIA describedby attribute |
| `ariaPressed` | `string` | - | ARIA pressed state |
| `ariaExpanded` | `string` | - | ARIA expanded state |
| `ariaHaspopup` | `string` | - | ARIA haspopup attribute |
| `ariaControls` | `string` | - | ARIA controls attribute |
| `ariaCurrent` | `string` | - | ARIA current attribute |
| `ariaLive` | `string` | - | ARIA live region |
| `ariaAtomic` | `string` | - | ARIA atomic attribute |
| `ariaRelevant` | `string` | - | ARIA relevant attribute |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `click` | `MouseEvent` | Emitted when button is clicked |
| `focus` | `FocusEvent` | Emitted when button receives focus |
| `blur` | `FocusEvent` | Emitted when button loses focus |
| `mouseenter` | `MouseEvent` | Emitted when mouse enters button |
| `mouseleave` | `MouseEvent` | Emitted when mouse leaves button |

### Methods

| Method | Description |
|--------|-------------|
| `focus()` | Programmatically focus the button |
| `blur()` | Programmatically blur the button |

## Styling

The button component uses CSS custom properties (design tokens) for styling. You can customize the appearance by overriding these variables:

```css
:root {
  /* Colors */
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-gray-100: #f3f4f6;
  --color-gray-900: #111827;
  --color-red-600: #dc2626;

  /* Spacing */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-6: 24px;

  /* Typography */
  --font-family-base: system-ui, sans-serif;
  --font-weight-medium: 500;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --line-height-sm: 20px;
  --line-height-base: 24px;
  --line-height-lg: 28px;
}
```

## Accessibility

The button component includes comprehensive accessibility features:

- **ARIA Support**: Full ARIA attribute support for screen readers
- **Keyboard Navigation**: Proper focus management and keyboard interaction
- **Loading States**: ARIA busy and disabled states for loading
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects user's motion preferences

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development

### Building the Library

```bash
# Build design tokens first
npm run build:token

# Build the Angular library
npm run build:angular

# Build everything
npm run build:lib
```

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Publishing

```bash
npm run publish:lib
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
