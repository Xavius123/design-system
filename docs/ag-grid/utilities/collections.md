# Collection Utilities

## Overview

Utilities for working with arrays, objects, and collections. All functions are type-safe and handle null/undefined values gracefully.

_Developed for SUDS Culture._

## Table of Contents

- [distinct](#distinct) - Remove duplicates
- [nonEmptyItems](#nonemptyitems) - Filter null/undefined
- [sum](#sum) - Sum numeric arrays

---

## distinct

Remove duplicate items from an array, with optional field-based comparison for objects.

### Signature

```typescript
function distinct<T>(arr: T[], field?: string): T[]
```

### Parameters

- **arr** (`T[]`) - The array to deduplicate
- **field** (`string`, optional) - Field name for object comparison

### Returns

- `T[]` - Array with duplicates removed

### Usage

```typescript
import { distinct } from '@/common/utils';

// Primitive values
const numbers = [1, 2, 2, 3, 3, 3, 4];
distinct(numbers); // [1, 2, 3, 4]

const strings = ['a', 'b', 'a', 'c', 'b'];
distinct(strings); // ['a', 'b', 'c']

// Objects by field
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice (duplicate)' },
  { id: 3, name: 'Charlie' },
];

distinct(users, 'id');
// [
//   { id: 1, name: 'Alice' },
//   { id: 2, name: 'Bob' },
//   { id: 3, name: 'Charlie' }
// ]

// Objects without field (reference equality)
const obj1 = { name: 'Test' };
const obj2 = { name: 'Test' };
distinct([obj1, obj2, obj1]); // [obj1, obj2] (keeps first occurrence)
```

### Use Cases

```typescript
// Remove duplicate IDs
function getUniqueIds(items: Item[]): Item[] {
  return distinct(items, 'id');
}

// Unique tags
function mergeTags(items: { tags: string[] }[]): string[] {
  const allTags = items.flatMap(item => item.tags);
  return distinct(allTags);
}

// Deduplicate API responses
async function fetchUniqueUsers() {
  const [response1, response2] = await Promise.all([
    fetch('/api/users/active'),
    fetch('/api/users/recent')
  ]);

  const users1 = await response1.json();
  const users2 = await response2.json();

  return distinct([...users1, ...users2], 'id');
}
```

### Implementation Notes

- Uses `Map` for efficient O(n) performance
- Keeps first occurrence of duplicates
- Field comparison uses `(item as any)[field]`
- Primitive comparison uses `Set`

### Best Practices

✅ **Use for:**
- Deduplicating arrays
- Merging lists
- Unique value extraction
- Data normalization

❌ **Don't use for:**
- Deep object comparison
- Complex equality logic
- Maintaining specific duplicate

---

## nonEmptyItems

Filter out null and undefined values with proper TypeScript type narrowing.

### Signature

```typescript
function nonEmptyItems<T>(arr: (T | null | undefined)[]): T[]
```

### Parameters

- **arr** (`(T | null | undefined)[]`) - Array that may contain null/undefined

### Returns

- `T[]` - Array with null/undefined filtered out

### Usage

```typescript
import { nonEmptyItems } from '@/common/utils';

// Basic filtering
const mixed = [1, null, 2, undefined, 3, null, 4];
nonEmptyItems(mixed); // [1, 2, 3, 4]

// Type narrowing
const maybeStrings: (string | null)[] = ['a', null, 'b', undefined, 'c'];
const strings: string[] = nonEmptyItems(maybeStrings);
// TypeScript knows this is string[], not (string | null)[]

// With objects
interface User {
  id: number;
  name: string;
}

const users: (User | null)[] = [
  { id: 1, name: 'Alice' },
  null,
  { id: 2, name: 'Bob' },
  undefined,
];

const validUsers: User[] = nonEmptyItems(users);
// [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
```

### Use Cases

```typescript
// API response handling
async function fetchValidItems(): Promise<Item[]> {
  const response = await fetch('/api/items');
  const data: (Item | null)[] = await response.json();
  return nonEmptyItems(data);
}

// Form data processing
function getSelectedValues(checkboxes: HTMLInputElement[]): string[] {
  const values = checkboxes.map(cb => cb.checked ? cb.value : null);
  return nonEmptyItems(values);
}

// Conditional rendering
function UserList({ userIds }: { userIds: (string | null)[] }) {
  const validIds = nonEmptyItems(userIds);

  return (
    <ul>
      {validIds.map(id => (
        <li key={id}><User userId={id} /></li>
      ))}
    </ul>
  );
}

// Data transformation
function processResults(results: (Result | null)[]): ProcessedData {
  const valid = nonEmptyItems(results);
  return {
    count: valid.length,
    items: valid.map(r => transform(r)),
  };
}
```

### Type Safety Example

```typescript
// Without nonEmptyItems
const items: (string | null)[] = ['a', null, 'b'];
const filtered = items.filter(item => !!item);
// Type: (string | null)[] - TypeScript doesn't narrow the type!

// With nonEmptyItems
const items: (string | null)[] = ['a', null, 'b'];
const filtered = nonEmptyItems(items);
// Type: string[] - TypeScript knows nulls are removed!
```

### Best Practices

✅ **Use for:**
- Filtering null/undefined
- Type narrowing
- API response cleaning
- Optional value handling

❌ **Don't use for:**
- Filtering falsy values (0, '', false)
- Complex filtering logic
- Preserving null semantics

---

## sum

Sum numeric array values with null handling.

### Signature

```typescript
function sum(arr?: (number | null | undefined)[]): number | null
```

### Parameters

- **arr** (`(number | null | undefined)[] | undefined`) - Array of numbers (may contain nulls)

### Returns

- `number | null` - Sum of values, or null if array is empty/undefined

### Usage

```typescript
import { sum } from '@/common/utils';

// Basic summing
sum([1, 2, 3, 4, 5]); // 15
sum([10, 20, 30]); // 60

// With nulls
sum([1, null, 2, undefined, 3]); // 6 (nulls ignored)

// Empty/undefined
sum([]); // null
sum(undefined); // null
sum(null); // null

// All nulls
sum([null, null, undefined]); // null
```

### Use Cases

```typescript
// Calculate totals
function calculateTotal(items: { price: number | null }[]): number | null {
  const prices = items.map(item => item.price);
  return sum(prices);
}

// Financial calculations
function getTotalEarnings(statements: Statement[]): number {
  const earnings = statements.map(s => s.earnings);
  return sum(earnings) ?? 0; // Default to 0 if null
}

// Grid totals
function GridFooter({ rows }: { rows: GridRow[] }) {
  const total = sum(rows.map(r => r.value));

  return (
    <div>
      Total: {total !== null ? formatCurrency(total) : '—'}
    </div>
  );
}

// Aggregate statistics
function calculateStats(data: number[]) {
  const total = sum(data);
  const count = data.length;
  const average = total !== null ? total / count : null;

  return { total, count, average };
}
```

### Null Handling

```typescript
// Distinguish between zero and no data
const result1 = sum([0, 0, 0]); // 0 (valid sum)
const result2 = sum([]); // null (no data)
const result3 = sum([null, null]); // null (no valid numbers)

// Use with nullish coalescing
const total = sum(values) ?? 0; // Default to 0
const display = sum(values) ?? '—'; // Default to em dash
```

### Best Practices

✅ **Use for:**
- Summing arrays
- Financial calculations
- Aggregate totals
- Statistical operations

❌ **Don't use for:**
- Complex aggregations
- Weighted averages
- Non-numeric data
- Large arrays (consider reduce for performance)

---

## Common Patterns

### Combining Utilities

```typescript
import { distinct, nonEmptyItems, sum } from '@/common/utils';

// Get unique valid totals
function getUniqueTotals(items: { amount: number | null }[]): number {
  const amounts = items.map(item => item.amount);
  const validAmounts = nonEmptyItems(amounts);
  const uniqueAmounts = distinct(validAmounts);
  return sum(uniqueAmounts) ?? 0;
}

// Process and aggregate
function processData(data: (DataPoint | null)[]) {
  const valid = nonEmptyItems(data);
  const unique = distinct(valid, 'id');
  const values = unique.map(d => d.value);
  const total = sum(values);

  return {
    count: unique.length,
    total,
    average: total !== null ? total / unique.length : null,
  };
}
```

### Type-Safe Pipelines

```typescript
// Create a processing pipeline
function processItems<T extends { id: string; value: number | null }>(
  items: (T | null)[]
): { items: T[]; total: number | null } {
  const validItems = nonEmptyItems(items);
  const uniqueItems = distinct(validItems, 'id');
  const total = sum(uniqueItems.map(item => item.value));

  return {
    items: uniqueItems,
    total,
  };
}
```

### Custom Collection Utilities

Build on these foundations:

```typescript
// Average with null handling
function average(arr: (number | null)[]): number | null {
  const valid = nonEmptyItems(arr);
  const total = sum(valid);
  return total !== null && valid.length > 0 ? total / valid.length : null;
}

// Unique and sort
function uniqueSorted<T>(arr: T[], field?: string): T[] {
  const unique = distinct(arr, field);
  return unique.sort((a, b) => {
    const aVal = field ? (a as any)[field] : a;
    const bVal = field ? (b as any)[field] : b;
    return aVal > bVal ? 1 : -1;
  });
}

// Group by with deduplication
function groupByUnique<T>(
  arr: T[],
  keyFn: (item: T) => string
): Record<string, T[]> {
  const groups: Record<string, T[]> = {};

  for (const item of arr) {
    const key = keyFn(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
  }

  // Deduplicate each group
  return Object.fromEntries(
    Object.entries(groups).map(([key, items]) => [
      key,
      distinct(items),
    ])
  );
}
```

## Performance Considerations

### distinct
- Time: O(n)
- Space: O(n)
- Uses Map for efficient lookups

### nonEmptyItems
- Time: O(n)
- Space: O(n)
- Simple filter operation

### sum
- Time: O(n)
- Space: O(1)
- Single pass through array

## Related Documentation

- [String & Formatting](./string-formatting.md)
- [React Hooks](./hooks.md)
- [Grid Utilities](../grid-utilities.md)
- [API Reference](../api-reference.md)

