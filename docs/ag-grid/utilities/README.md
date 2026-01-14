# Design System Utilities

## Overview

This section documents the reusable hooks, utilities, and helper functions that form the foundation of the design system. These building blocks were developed for SUDS Culture and represent production-ready patterns that can be leveraged in any React/TypeScript project.

## Quick Navigation

### 📚 [React Hooks](./hooks.md)
Custom React hooks for common patterns:
- `useDebounce` - Debounce callbacks
- `useSetting` - Persistent user settings
- `useParams` - Type-safe route parameters
- `useAuth` - Authentication state
- `usePageVisit` - Analytics tracking
- `useActivityListeners` - Real-time updates

### 🔤 [String & Formatting](./string-formatting.md)
String manipulation and formatting utilities:
- `normalize` - Clean and normalize strings
- `toTitleCase` - Convert to Title Case
- `pluralize` - Smart pluralization
- `classList` - Conditional CSS classes
- `toBase64` - File to base64 conversion

### 📦 [Collections](./collections.md)
Array and object manipulation helpers:
- `distinct` - Remove duplicates
- `nonEmptyItems` - Filter nulls with type safety
- `sum` - Sum arrays with null handling

### 💾 [Downloads & Export](./downloads.md)
File download and export patterns:
- CSV generation
- Excel export
- Blob creation
- Browser downloads

### 📅 [Date & Time](./date-time.md)
Date/time formatting and manipulation:
- Date formatting patterns
- Relative time display
- Timezone handling
- dayjs integration

### 🎨 [Reusable Components](./components.md)
Shared UI components:
- `Panel` - Container wrapper
- `BarLoadingIcon` - Animated loader
- `CheckIcon` - SVG check mark
- `SearchIcon` - Search icon

## Quick Reference

### Common Imports

```typescript
// Hooks
import { useDebounce, useSetting } from '@/frontend/hooks';

// String utilities
import { normalize, toTitleCase, pluralize, classList } from '@/utils';

// Collection utilities
import { distinct, nonEmptyItems, sum } from '@/utils';

// Components
import { Panel, BarLoadingIcon } from '@/frontend/components';
```

### Usage Examples

#### Debounce Search Input
```typescript
import { useDebounce } from '@/frontend/hooks';

function SearchComponent() {
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce((value: string) => {
    // API call here
    fetchResults(value);
  }, 500);

  return (
    <input
      onChange={(e) => {
        setSearch(e.target.value);
        debouncedSearch(e.target.value);
      }}
    />
  );
}
```

#### Conditional CSS Classes
```typescript
import { classList } from '@/utils';

const className = classList(
  'base-class',
  { 'active': isActive },
  { 'error': hasError, 'success': !hasError }
);
// Result: "base-class active success"
```

#### Remove Duplicates
```typescript
import { distinct } from '@/utils';

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice' }
];

const uniqueUsers = distinct(users, 'id');
// Result: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
```

## Design Philosophy

### Type Safety First
All utilities are fully typed with TypeScript, providing:
- IntelliSense support
- Compile-time error checking
- Self-documenting code

### Composability
Utilities are designed to be composed together:
```typescript
const validItems = nonEmptyItems(
  distinct(items, 'id')
);
```

### Performance
- Optimized for common use cases
- Memoization where beneficial
- No unnecessary re-renders

### Reusability
- Framework-agnostic where possible
- Minimal dependencies
- Clear separation of concerns

## Best Practices

### When to Use Utilities

✅ **Use utilities for:**
- Repeated logic across components
- Common data transformations
- Standard formatting needs
- Type-safe operations

❌ **Don't use utilities for:**
- One-off transformations
- Complex business logic
- Domain-specific operations

### Import Organization

Organize imports by category:
```typescript
// External dependencies
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

// Hooks
import { useDebounce, useSetting } from '@/frontend/hooks';

// Utilities
import { classList, distinct } from '@/utils';

// Components
import { Panel } from '@/frontend/components';
```

## Contributing

When adding new utilities:

1. **Document thoroughly** - Include examples and edge cases
2. **Add TypeScript types** - Full type safety required
3. **Write tests** - Unit tests for all utilities
4. **Keep it simple** - Single responsibility principle
5. **Consider reusability** - Will others need this?

## File Structure

```
src/
├── frontend/
│   ├── hooks/
│   │   ├── useDebounce.ts
│   │   ├── useSetting.ts
│   │   ├── useParams.ts
│   │   └── ...
│   ├── utils/
│   │   ├── stringUtil.tsx
│   │   ├── gridUtil.tsx
│   │   └── ...
│   └── components/
│       ├── Panel.tsx
│       ├── BarLoadingIcon.tsx
│       └── ...
└── common/
    └── utils/
        ├── arrayUtil.ts
        ├── stringUtil.ts
        └── ...
```

## Credits

All utilities documented here were developed for SUDS Culture and are provided as production-ready templates for building robust React applications.

## Related Documentation

- [AG-Grid Implementation](../ag-grid-implementation.md)
- [Cell Editors](../cell-editors.md)
- [Grid Utilities](../grid-utilities.md)
- [Design System](../design-system.md)

---

**Need Help?**

- Start with the [Hooks documentation](./hooks.md) for common patterns
- Check [String & Formatting](./string-formatting.md) for text manipulation
- See [Collections](./collections.md) for data operations

