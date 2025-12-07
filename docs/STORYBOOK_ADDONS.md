# Storybook Addons Guide

Complete guide to all Storybook addons configured in this design system.

## Installed Addons

### Core Addons (from @storybook/addon-essentials)

These are included automatically with `@storybook/addon-essentials`:

- **@storybook/addon-actions** - Log actions/events in the Actions panel
- **@storybook/addon-controls** - Interactive controls for component props
- **@storybook/addon-docs** - Enhanced documentation with MDX support
- **@storybook/addon-viewport** - Test components at different screen sizes
- **@storybook/addon-backgrounds** - Test components on different backgrounds
- **@storybook/addon-measure** - Measure component dimensions
- **@storybook/addon-outline** - Show element outlines for debugging

### Additional Addons

#### @storybook/addon-a11y

Automated accessibility testing for all components.

**Features:**
- WCAG compliance checking
- Color contrast validation
- Keyboard navigation testing
- ARIA attribute validation
- Visual accessibility violations panel

**Usage:**
The addon automatically runs on all stories. Check the "Accessibility" panel in Storybook to see violations.

**Configuration:**
```javascript
// .storybook/preview.js
parameters: {
  a11y: {
    config: {
      rules: [
        { id: 'color-contrast', enabled: true },
        { id: 'keyboard-navigation', enabled: true },
      ],
    },
  },
}
```

**Best Practices:**
- Fix all critical violations before publishing
- Test keyboard navigation for all interactive components
- Ensure proper ARIA labels on icon-only buttons
- Verify color contrast meets WCAG AA standards

#### @storybook/addon-interactions

Test component interactions and user flows.

**Features:**
- Interaction testing with `play` functions
- User event simulation
- Async interaction testing
- Visual interaction timeline

**Usage:**
```jsx
import { userEvent, within, expect } from '@storybook/test';

export const Clicked = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    await expect(button).toHaveTextContent('Clicked!');
  },
};
```

#### @storybook/addon-links

Link between stories for navigation flows.

**Features:**
- Navigate between related stories
- Create story flows
- Link components together

**Usage:**
```jsx
import { linkTo } from '@storybook/addon-links';

<Button onClick={linkTo('Components/Modal', 'Default')}>
  Open Modal Story
</Button>
```

## Theme Switching

### Custom Theme Switcher

We use a custom theme switcher integrated with our design system's theme utilities.

**Configuration:**
```javascript
// .storybook/preview.js
globalTypes: {
  theme: {
    toolbar: {
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
    },
  },
}
```

**Usage:**
- Use the theme selector in the Storybook toolbar
- All components automatically adapt to the selected theme
- Theme preference is persisted in localStorage

## Viewport Testing

### Custom Viewports

Pre-configured viewports for Toyota design system:

- **Mobile**: 375px × 667px (iPhone SE)
- **Tablet**: 768px × 1024px (iPad)
- **Desktop**: 1920px × 1080px (Full HD)

**Usage:**
- Select viewport from toolbar
- Test responsive behavior
- Verify mobile-first design

**Adding Custom Viewports:**
```javascript
// .storybook/preview.js
parameters: {
  viewport: {
    viewports: {
      custom: {
        name: 'Custom',
        styles: { width: '1440px', height: '900px' },
      },
    },
  },
}
```

## Background Testing

### Pre-configured Backgrounds

- **Light**: #ffffff (default)
- **Dark**: #000000
- **Gray**: #f5f5f5

**Usage:**
- Test component contrast
- Verify visibility on different backgrounds
- Ensure proper color contrast ratios

## Accessibility Testing

### Running A11y Tests

1. Open any story in Storybook
2. Check the "Accessibility" panel (bottom)
3. Review violations and warnings
4. Fix issues in component code
5. Re-test to verify fixes

### Common Issues and Fixes

**Color Contrast:**
- Issue: Text doesn't meet WCAG AA (4.5:1 ratio)
- Fix: Use design tokens with proper contrast ratios

**Missing ARIA Labels:**
- Issue: Icon-only buttons lack labels
- Fix: Add `aria-label` prop

**Keyboard Navigation:**
- Issue: Component not keyboard accessible
- Fix: Ensure proper tab order and focus management

**Focus Indicators:**
- Issue: No visible focus state
- Fix: Add focus-visible styles using design tokens

## Design Integration

### Figma Integration (Manual)

While we don't have the addon installed (requires Storybook 10), you can manually link to Figma:

```jsx
export const Button = {
  parameters: {
    docs: {
      description: {
        component: 'Button component. [View in Figma](https://figma.com/file/...)',
      },
    },
  },
};
```

## Best Practices

### 1. Always Test Accessibility

- Run a11y addon on every new component
- Fix critical violations before merging
- Document accessibility features in stories

### 2. Test Multiple Viewports

- Test all components at mobile, tablet, and desktop
- Verify responsive behavior
- Check for layout issues

### 3. Use Theme Switcher

- Test components in both light and dark themes
- Verify all design tokens work correctly
- Ensure proper contrast in both themes

### 4. Document Interactions

- Use interaction tests for complex components
- Show user flows in stories
- Document keyboard shortcuts

### 5. Test on Different Backgrounds

- Verify component visibility
- Check contrast ratios
- Ensure proper styling

## Troubleshooting

### A11y Addon Not Showing

- Ensure `@storybook/addon-a11y` is in `main.js` addons array
- Restart Storybook server
- Clear browser cache

### Theme Not Switching

- Check that `initTheme()` is called in preview.js
- Verify `data-theme` attribute is set on document
- Ensure CSS variables are loaded

### Viewport Not Working

- Check viewport configuration in preview.js
- Verify viewport addon is included in essentials
- Restart Storybook

## Future Addons to Consider

When upgrading to Storybook 10:

- **@storybook/addon-themes** - Official theme switching addon
- **@storybook/addon-designs** - Figma integration (v10 compatible)
- **storybook-addon-design-tokens** - Visualize design tokens
- **@storybook/addon-measure** - Enhanced measurement tools

## Resources

- [Storybook Addons Catalog](https://storybook.js.org/addons)
- [A11y Addon Docs](https://storybook.js.org/addons/@storybook/addon-a11y)
- [Interactions Addon Docs](https://storybook.js.org/addons/@storybook/addon-interactions)
- [Viewport Addon Docs](https://storybook.js.org/addons/@storybook/addon-viewport)

