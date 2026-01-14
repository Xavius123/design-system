# React Hooks

## Overview

This collection of custom React hooks provides reusable patterns for common functionality. All hooks are fully typed with TypeScript and follow React best practices.

_Developed for SUDS Culture._

## Table of Contents

- [useDebounce](#usedebounce) - Debounce callbacks
- [useSetting](#usesetting) - Persistent user settings
- [useParams](#useparams) - Type-safe route parameters
- [useAuth](#useauth) - Authentication state
- [useIsRole](#useisrole) - Role-based access control
- [usePageVisit](#usepagevisit) - Analytics tracking

---

## useDebounce

Debounce callbacks to prevent excessive function calls, particularly useful for search inputs and API calls.

### Signature

```typescript
function useDebounce(
  callback: Function,
  duration?: number
): DebouncedFunc<(...args: any[]) => void>
```

### Parameters

- **callback** (`Function`) - The function to debounce
- **duration** (`number`, optional) - Debounce delay in milliseconds (default: 1000)

### Returns

- `DebouncedFunc` - Debounced version of the callback

### Usage

```typescript
import { useDebounce } from '@/frontend/hooks';
import { useState } from 'react';

function SearchComponent() {
  const [query, setQuery] = useState('');

  const debouncedSearch = useDebounce((searchQuery: string) => {
    // This will only fire 500ms after user stops typing
    fetch(`/api/search?q=${searchQuery}`)
      .then(res => res.json())
      .then(setResults);
  }, 500);

  return (
    <input
      value={query}
      onChange={(e) => {
        const value = e.target.value;
        setQuery(value);
        debouncedSearch(value);
      }}
      placeholder="Search..."
    />
  );
}
```

### Implementation Details

- Uses Material-UI's `debounce` function under the hood
- Properly handles callback reference changes with `useRef`
- Memoizes the debounced function to prevent re-creation

### Best Practices

✅ **Use for:**
- Search inputs
- Form validation
- Window resize handlers
- Scroll event handlers

❌ **Don't use for:**
- Critical real-time updates
- One-time operations
- Simple state updates

---

## useSetting

Manage persistent user settings with automatic API synchronization.

### Signature

```typescript
function useSetting(type: SettingType): {
  setting: Setting | undefined;
  updateSetting: (value: JsonValue, append?: boolean) => void;
}
```

### Parameters

- **type** (`SettingType`) - The type of setting (e.g., 'Grid', 'Theme', 'Preferences')

### Returns

Object with:
- **setting** (`Setting | undefined`) - Current setting value
- **updateSetting** (`Function`) - Update the setting

### Usage

```typescript
import { useSetting } from '@/frontend/hooks';
import { SettingType } from '@prisma/client';

function GridComponent() {
  const { setting, updateSetting } = useSetting(SettingType.Grid);

  // Get saved column widths
  const columnWidths = setting?.value?.columnWidths || {};

  // Save new column width
  const handleColumnResize = (colId: string, width: number) => {
    updateSetting({
      ...setting?.value,
      columnWidths: {
        ...columnWidths,
        [colId]: width,
      },
    });
  };

  return (
    <div>
      {/* Grid component */}
    </div>
  );
}
```

### Implementation Details

- Automatically creates setting if it doesn't exist
- Supports appending to existing settings
- Uses RTK Query for caching and synchronization
- Optimistic updates for better UX

### Best Practices

✅ **Use for:**
- User preferences
- UI state persistence
- Column widths/ordering
- Theme settings

❌ **Don't use for:**
- Temporary state
- Session-only data
- Sensitive information

---

## useParams

Type-safe route parameter extraction for React Router.

### Available Hooks

#### useClientParams

Extract client ID from route parameters.

```typescript
function useClientParams(): {
  clientId: string;
}
```

**Usage:**
```typescript
import { useClientParams } from '@/frontend/hooks';

function ClientDashboard() {
  const { clientId } = useClientParams();

  return <div>Client ID: {clientId}</div>;
}
```

#### useCatalogParams

Extract client and catalog IDs, with query parameter support.

```typescript
function useCatalogParams(): {
  clientId: string;
  catalogId: string;
}
```

**Usage:**
```typescript
import { useCatalogParams } from '@/frontend/hooks';

function CatalogView() {
  const { clientId, catalogId } = useCatalogParams();

  // Supports both route params and query strings:
  // /client/123/catalog/456
  // /client/123?catalog=456

  return <div>Catalog {catalogId} for Client {clientId}</div>;
}
```

#### useCatalogSourceParams

Extract complete workspace context with automatic workspace detection.

```typescript
function useCatalogSourceParams(): {
  clientId: string;
  catalogId: string;
  catalogSourceId: string;
  workspace: 'Admin' | 'Client' | 'Catalog' | 'Catalog Source';
}
```

**Usage:**
```typescript
import { useCatalogSourceParams } from '@/frontend/hooks';

function ContextAwareComponent() {
  const { clientId, catalogId, catalogSourceId, workspace } = useCatalogSourceParams();

  return (
    <div>
      <h1>{workspace} Workspace</h1>
      {/* Render based on context */}
    </div>
  );
}
```

### Best Practices

✅ **Use for:**
- Type-safe route parameters
- Avoiding null checks
- Workspace context detection

❌ **Don't use for:**
- Query parameters (except in `useCatalogParams`)
- State management
- Non-route data

---

## useAuth

Access authentication state and user information.

### Signature

```typescript
function useAuth(): {
  user: User | undefined;
  isLoading: boolean;
}
```

### Returns

Object with:
- **user** (`User | undefined`) - Current authenticated user
- **isLoading** (`boolean`) - Whether user data is loading

### Usage

```typescript
import { useAuth } from '@/frontend/hooks';

function ProfileComponent() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <LoginPrompt />;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

### Implementation Details

- Uses RTK Query for efficient caching
- Combines `isUninitialized` and `isLoading` states
- Automatically refetches on window focus
- Provides up-to-date auth status

### Best Practices

✅ **Use for:**
- Displaying user information
- Conditional rendering based on auth
- Loading states

❌ **Don't use for:**
- Authorization (use `useIsRole` instead)
- Route protection
- Complex permission checks

---

## useIsRole

Role-based access control checks.

### Signature

```typescript
function useIsRole(): {
  isAdmin: boolean;
  isCreator: boolean;
  isViewer: boolean;
  // ... other role checks
}
```

### Returns

Object with boolean flags for each role.

### Usage

```typescript
import { useIsRole } from '@/frontend/hooks';

function EditButton() {
  const { isCreator, isViewer } = useIsRole();

  if (isViewer) {
    return null; // Hide edit button for viewers
  }

  return (
    <button disabled={!isCreator}>
      {isCreator ? 'Edit' : 'View Only'}
    </button>
  );
}
```

### Permission Patterns

```typescript
function DocumentActions() {
  const { isAdmin, isCreator, isViewer } = useIsRole();

  return (
    <div>
      {/* Everyone can view */}
      <button>View</button>

      {/* Creators and Admins can edit */}
      {(isCreator || isAdmin) && (
        <button>Edit</button>
      )}

      {/* Only Admins can delete */}
      {isAdmin && (
        <button>Delete</button>
      )}
    </div>
  );
}
```

### Best Practices

✅ **Use for:**
- UI element visibility
- Feature flags
- Conditional rendering

❌ **Don't use for:**
- Server-side authorization (always validate on backend)
- Complex permission logic
- Route protection (use route guards instead)

---

## usePageVisit

Track page visits for analytics.

### Signature

```typescript
function usePageVisit(pageId: string): void
```

### Parameters

- **pageId** (`string`) - Unique identifier for the page

### Usage

```typescript
import { usePageVisit } from '@/frontend/hooks';

function DashboardPage() {
  usePageVisit('dashboard');

  return (
    <div>
      {/* Page content */}
    </div>
  );
}
```

### With Dynamic IDs

```typescript
import { usePageVisit } from '@/frontend/hooks';
import { useParams } from 'react-router';

function UserProfile() {
  const { userId } = useParams();

  // Track specific user profile view
  usePageVisit(`user-profile-${userId}`);

  return <div>User Profile</div>;
}
```

### Implementation Details

- Automatically tracks on component mount
- Integrates with analytics service
- Debounces rapid page changes
- No manual cleanup required

### Best Practices

✅ **Use for:**
- Page view analytics
- User journey tracking
- Feature usage metrics

❌ **Don't use for:**
- Event tracking (use separate analytics functions)
- Real-time metrics
- Server-side tracking

---

## Common Patterns

### Combining Hooks

```typescript
import { useAuth, useIsRole, useSetting } from '@/frontend/hooks';

function UserDashboard() {
  const { user, isLoading } = useAuth();
  const { isAdmin } = useIsRole();
  const { setting, updateSetting } = useSetting(SettingType.Dashboard);

  if (isLoading) return <LoadingSpinner />;
  if (!user) return <LoginPrompt />;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      {isAdmin && <AdminPanel />}
      <DashboardGrid settings={setting} onSettingsChange={updateSetting} />
    </div>
  );
}
```

### Custom Hook Composition

```typescript
// Create a custom hook that combines multiple hooks
function useUserContext() {
  const { user, isLoading } = useAuth();
  const { isAdmin, isCreator, isViewer } = useIsRole();
  const { clientId } = useClientParams();

  return {
    user,
    isLoading,
    permissions: { isAdmin, isCreator, isViewer },
    clientId,
  };
}

// Use in components
function MyComponent() {
  const { user, permissions, clientId } = useUserContext();
  // ...
}
```

## Testing Hooks

### Example Test Setup

```typescript
import { renderHook } from '@testing-library/react';
import { useDebounce } from '@/frontend/hooks';

describe('useDebounce', () => {
  it('debounces callback', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebounce(callback, 100));

    result.current('test');
    result.current('test');
    result.current('test');

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
```

## Related Documentation

- [String & Formatting Utilities](./string-formatting.md)
- [Collection Utilities](./collections.md)
- [Reusable Components](./components.md)
- [Design System](../design-system.md)

