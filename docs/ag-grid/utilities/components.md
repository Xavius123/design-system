# Reusable Components

## Overview

Shared UI components that provide consistent styling and behavior across the application. Built with Material-UI and TypeScript.

_Developed for SUDS Culture._

## Table of Contents

- [Panel](#panel) - Container wrapper
- [BarLoadingIcon](#barloadingicon) - Animated loader
- [CheckIcon](#checkicon) - SVG check mark
- [SearchIcon](#searchicon) - Search icon

---

## Panel

A container component with consistent styling, borders, and spacing.

### Location

`src/frontend/components/Panel.tsx`

### Props

```typescript
interface PanelProps {
  className?: string;
  children?: ReactNode;
  borderless?: boolean;
}
```

### Usage

```typescript
import { Panel } from '@/frontend/components';

// With border (default)
function MyComponent() {
  return (
    <Panel>
      <h1>Content</h1>
      <p>Panel with rounded border</p>
    </Panel>
  );
}

// Borderless
function BorderlessPanel() {
  return (
    <Panel borderless>
      <div>No border</div>
    </Panel>
  );
}

// With custom className
function StyledPanel() {
  return (
    <Panel className="flex-1 overflow-hidden">
      <div>Custom styled panel</div>
    </Panel>
  );
}
```

### Styling

Default styles:
- White background
- Rounded corners (border-radius: 1rem)
- Border: 1px solid #E5E7EB
- Uses Material-UI Stack component

```typescript
// Implementation
export function Panel({ className = '', children, borderless = false }: PanelProps) {
  return (
    <Stack className={`
      bg-white
      ${!borderless ? 'rounded-2xl border border-solid border-[#E5E7EB]' : ''}
      ${className}
    `}>
      {children}
    </Stack>
  );
}
```

### Use Cases

```typescript
// Grid container
<Panel className="flex-1 overflow-hidden">
  <CustomAgGrid {...props} />
</Panel>

// Card layout
<Panel className="p-4">
  <h2>Card Title</h2>
  <p>Card content</p>
</Panel>

// Dashboard widget
<Panel className="h-64">
  <Chart data={data} />
</Panel>
```

---

## BarLoadingIcon

Animated loading indicator with music-bar style animation.

### Location

`src/frontend/components/BarLoadingIcon.tsx`

### Props

```typescript
interface BarLoadingIconProps {
  size?: 'small' | 'medium' | 'large';
  bars?: number;
}
```

### Usage

```typescript
import { BarLoadingIcon } from '@/frontend/components';

// Default (medium, 4 bars)
<BarLoadingIcon />

// Small with 3 bars
<BarLoadingIcon size="small" bars={3} />

// Large with 7 bars
<BarLoadingIcon size="large" bars={7} />
```

### Sizes

- **small**: 2rem (32px) height
- **medium**: 3rem (48px) height (default)
- **large**: 4rem (64px) height

### Animation

Each bar animates independently with staggered delays, creating a wave effect.

```scss
@keyframes music-bar {
  10% { height: 30%; }
  30% { height: 100%; }
  60% { height: 50%; }
  80% { height: 75%; }
  100% { height: 60%; }
}

.bar-loading {
  animation: music-bar 2.2s ease infinite alternate;

  &:nth-of-type(2) { animation-delay: -2.2s; }
  &:nth-of-type(3) { animation-delay: -3.7s; }
  &:nth-of-type(4) { animation-delay: -1.4s; }
  // ... etc
}
```

### Use Cases

```typescript
// Loading overlay
function LoadingOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/80">
      <BarLoadingIcon size="large" bars={7} />
    </div>
  );
}

// Grid loading cell
loadingCellRenderer={() => (
  <GridCell align="center">
    <BarLoadingIcon bars={4} />
  </GridCell>
)}

// Button loading state
function LoadingButton({ loading, children }: ButtonProps) {
  return (
    <button disabled={loading}>
      {loading ? <BarLoadingIcon size="small" bars={3} /> : children}
    </button>
  );
}
```

---

## CheckIcon

Custom SVG check mark icon.

### Location

`src/frontend/components/CheckIcon.tsx`

### Props

```typescript
interface CheckIconProps {
  className?: string;
}
```

### Usage

```typescript
import { CheckIcon } from '@/frontend/components';

// Basic usage
<CheckIcon />

// With custom styling
<CheckIcon className="fill-[#320E83] w-4 h-4" />

// In a status indicator
function StatusBadge({ completed }: { completed: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {completed && <CheckIcon className="fill-green-600" />}
      <span>{completed ? 'Complete' : 'Pending'}</span>
    </div>
  );
}
```

### SVG Implementation

```typescript
export function CheckIcon({ className = '' }: CheckIconProps) {
  return (
    <svg
      className={className}
      width="10"
      height="8"
      viewBox="0 0 10 8"
      fill="none"
    >
      <path
        d="M1 4L3.5 6.5L9 1"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
```

### Use Cases

```typescript
// Boolean cell renderer
function gridBooleanCellRenderer(params: ICellRendererParams<any, boolean>) {
  return params.value ? (
    <GridCell align="center">
      <CheckIcon className="fill-[#320E83]" />
    </GridCell>
  ) : null;
}

// Status indicator
function ProcessedBadge() {
  return (
    <Box className="w-[0.875rem] h-[0.875rem] rounded-full bg-[#320E83] flex items-center justify-center">
      <CheckIcon className="fill-white h-[0.375rem]" />
    </Box>
  );
}
```

---

## SearchIcon

Custom search icon for input fields.

### Location

`src/frontend/components/SearchIcon.tsx`

### Usage

```typescript
import { SearchIcon } from '@/frontend/components';
import { TextField, InputAdornment } from '@mui/material';

function SearchField() {
  return (
    <TextField
      placeholder="Search..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}
```

### Implementation

```typescript
export function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16">
      <path
        d="M7 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 0l4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}
```

---

## Component Patterns

### Composition

```typescript
import { Panel, BarLoadingIcon } from '@/frontend/components';

function LoadingPanel({ loading, children }: PanelProps & { loading: boolean }) {
  return (
    <Panel>
      {loading ? (
        <div className="flex items-center justify-center p-8">
          <BarLoadingIcon />
        </div>
      ) : (
        children
      )}
    </Panel>
  );
}
```

### Conditional Rendering

```typescript
import { CheckIcon } from '@/frontend/components';

function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id} className="flex items-center gap-2">
          {task.completed && <CheckIcon className="fill-green-600" />}
          <span className={task.completed ? 'line-through' : ''}>
            {task.title}
          </span>
        </li>
      ))}
    </ul>
  );
}
```

### Custom Variants

```typescript
import { Panel } from '@/frontend/components';

function ErrorPanel({ children }: { children: ReactNode }) {
  return (
    <Panel className="border-red-500 bg-red-50">
      <div className="p-4 text-red-900">
        {children}
      </div>
    </Panel>
  );
}

function SuccessPanel({ children }: { children: ReactNode }) {
  return (
    <Panel className="border-green-500 bg-green-50">
      <div className="p-4 text-green-900">
        {children}
      </div>
    </Panel>
  );
}
```

## Best Practices

### Panel

✅ **Use for:**
- Grid containers
- Card layouts
- Content sections
- Dashboard widgets

❌ **Don't use for:**
- Inline elements
- Overlays
- Modals (use Material-UI Dialog)

### BarLoadingIcon

✅ **Use for:**
- Loading states
- Processing indicators
- Async operations
- Grid overlays

❌ **Don't use for:**
- Progress bars (use Material-UI LinearProgress)
- Spinners (use Material-UI CircularProgress for indeterminate)
- Static indicators

### Icons

✅ **Use for:**
- Status indicators
- Boolean displays
- UI accents
- Consistent iconography

❌ **Don't use for:**
- Complex illustrations
- Large graphics
- Interactive buttons (use Material-UI IconButton)

## Related Documentation

- [React Hooks](./hooks.md)
- [Design System](../design-system.md)
- [Grid Utilities](../grid-utilities.md)

