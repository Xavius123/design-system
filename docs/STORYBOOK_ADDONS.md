# Storybook Addons Reference

Quick reference for all Storybook addons installed in this project.

## Installed Addons

### Official Addons

#### @storybook/addon-essentials
**Included by default** - Bundle of essential addons:
- **Controls**: Interactive component props editor
- **Actions**: Event handler logging
- **Docs**: Auto-generated documentation
- **Viewport**: Responsive design testing
- **Backgrounds**: Background color testing
- **Toolbars**: Custom toolbar items

**Usage:** Always active, no configuration needed.

---

#### @storybook/addon-themes
**Purpose:** Switch between light and dark themes

**Features:**
- Theme switcher in toolbar
- Applies `data-theme` attribute to document
- Syncs with design tokens

**Configuration:** `packages/react-ui/.storybook/preview.js`

```javascript
import { withThemeByDataAttribute } from '@storybook/addon-themes';

decorators: [
  withThemeByDataAttribute({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
    attributeName: 'data-theme',
  }),
]
```

**How to use:**
1. Open Storybook
2. Click theme icon in toolbar
3. Select Light or Dark

---

#### @storybook/addon-a11y
**Purpose:** Accessibility testing

**Features:**
- Runs axe accessibility tests
- Shows violations in Accessibility panel
- Highlights problematic elements
- Provides fix suggestions

**Configuration:** `packages/react-ui/.storybook/preview.js`

```javascript
a11y: {
  config: {
    rules: [
      { id: 'color-contrast', enabled: true },
      { id: 'keyboard-navigation', enabled: true },
      { id: 'focus-order-semantics', enabled: true },
    ],
  },
}
```

**How to use:**
1. View any story
2. Open "Accessibility" panel (bottom)
3. Review violations and passes

---

#### @storybook/addon-interactions
**Purpose:** View and debug interaction tests

**Features:**
- Shows step-by-step test execution
- Displays assertions and results
- Provides detailed error messages
- Allows replay of interactions

**How to use:**
1. View story with `play` function
2. Open "Interactions" panel (bottom)
3. Watch tests run automatically
4. Review pass/fail status

**Example:**
```typescript
export const ClickTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    await expect(button).toBeInTheDocument();
  },
};
```

---

#### @storybook/addon-measure
**Purpose:** Inspect component dimensions

**Features:**
- Measure element widths and heights
- Show padding and margins
- Visualize spacing

**How to use:**
1. Click measure icon in toolbar
2. Hover over elements to see dimensions
3. Toggle on/off as needed

---

#### @storybook/addon-outline
**Purpose:** Visualize component boundaries

**Features:**
- Shows outlines around all elements
- Helps debug layout issues
- Reveals hidden elements

**How to use:**
1. Click outline icon in toolbar
2. See all element boundaries
3. Toggle on/off as needed

---

#### @storybook/addon-links
**Purpose:** Create links between stories

**Features:**
- Link from one story to another
- Build story navigation flows
- Demo user journeys

**Example:**
```typescript
import { linkTo } from '@storybook/addon-links';

<Button onClick={linkTo('Components/Input', 'Default')}>
  Go to Input
</Button>
```

---

### Custom Addons

#### Design Tokens Panel
**Purpose:** Show design tokens used by each component

**Location:** `packages/react-ui/.storybook/addons/design-tokens-panel/`

**Features:**
- Displays tokens by category (colors, spacing, typography, etc.)
- Shows values for light and dark themes
- Copy CSS variable names
- Color preview swatches

**How to use:**
1. Open any component story
2. Click "Design Tokens" tab (bottom panel)
3. Switch between light/dark themes
4. Click "Copy CSS" to copy token variable names

**Adding tokens to a story:**
```typescript
export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    designTokens: {
      colors: ['color-light-primary', 'color-light-text-inverse'],
      spacing: ['spacing-md', 'spacing-lg'],
      typography: ['fontSize-body', 'fontWeight-semibold'],
      borderRadius: ['borderRadius-md'],
    },
  },
};
```

---

## Addon Configuration Files

### Main Configuration
`packages/react-ui/.storybook/main.js`

Lists all registered addons:
```javascript
addons: [
  '@storybook/addon-essentials',
  '@storybook/addon-interactions',
  '@storybook/addon-links',
  '@storybook/addon-a11y',
  '@storybook/addon-themes',
  '@storybook/addon-measure',
  '@storybook/addon-outline',
  './addons/design-tokens-panel/register.js',
]
```

### Preview Configuration
`packages/react-ui/.storybook/preview.js`

Configures addon behavior and global settings.

---

## Useful Addon Combinations

### Accessibility Testing
1. **a11y addon** - Check violations
2. **Interactions addon** - Test keyboard navigation
3. **Outline addon** - Visualize focus order

### Design Review
1. **Theme addon** - Test light/dark modes
2. **Design Tokens panel** - Verify token usage
3. **Measure addon** - Check spacing
4. **Viewport addon** - Test responsive behavior

### Development
1. **Controls addon** - Experiment with props
2. **Actions addon** - See event handlers fire
3. **Interactions addon** - Test user flows
4. **Outline addon** - Debug layout

---

## Adding New Addons

### 1. Install the addon
```bash
cd packages/react-ui
npm install --save-dev @storybook/addon-name
```

### 2. Register in main.js
```javascript
// packages/react-ui/.storybook/main.js
addons: [
  // ... existing addons
  '@storybook/addon-name',
]
```

### 3. Configure in preview.js (if needed)
```javascript
// packages/react-ui/.storybook/preview.js
export default {
  parameters: {
    addonName: {
      // configuration options
    },
  },
};
```

---

## Popular Addons to Consider

### @storybook/addon-designs
Link Figma designs to stories
```bash
npm install --save-dev @storybook/addon-designs
```

### @storybook/addon-coverage
Show test coverage from interaction tests
```bash
npm install --save-dev @storybook/addon-coverage
```

### @storybook/addon-jest
Display Jest test results
```bash
npm install --save-dev @storybook/addon-jest
```

### @chromaui/addon-visual-tests
Chromatic visual tests directly in Storybook
```bash
npm install --save-dev @chromaui/addon-visual-tests
```

---

## Troubleshooting

### Addon not showing up
1. Check it's listed in `main.js` addons array
2. Restart Storybook dev server
3. Clear browser cache

### Addon conflicts
Some addons may conflict. Check:
- Addon versions match Storybook version
- No duplicate addons
- Check console for errors

### Performance issues
Too many addons can slow down Storybook:
- Disable unused addons
- Use lazy loading for heavy addons
- Consider splitting into multiple Storybook instances

---

## Resources

- [Storybook Addons Catalog](https://storybook.js.org/addons)
- [Creating Custom Addons](https://storybook.js.org/docs/react/addons/writing-addons)
- [Addon API Documentation](https://storybook.js.org/docs/react/addons/addon-api)
