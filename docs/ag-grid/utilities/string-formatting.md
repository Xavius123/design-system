# String & Formatting Utilities

## Overview

This collection provides utilities for string manipulation, formatting, and file conversion. All functions are type-safe and handle edge cases gracefully.

_Developed for SUDS Culture._

## Table of Contents

- [normalize](#normalize) - Clean and normalize strings
- [toTitleCase](#totitlecase) - Convert to Title Case
- [pluralize](#pluralize) - Smart pluralization
- [classList](#classlist) - Conditional CSS classes
- [toBase64](#tobase64) - File to base64 conversion
- [emDash](#emdash) - Em dash constant

---

## normalize

Clean and normalize strings by trimming, removing spaces, and converting to lowercase.

### Signature

```typescript
function normalize(str: string): string
```

### Parameters

- **str** (`string`) - The string to normalize

### Returns

- `string` - Normalized string (trimmed, no spaces, lowercase)

### Usage

```typescript
import { normalize } from '@/common/utils';

// Comparison
const input1 = '  Hello World  ';
const input2 = 'hello world';
const input3 = 'HELLO WORLD';

normalize(input1); // "helloworld"
normalize(input2); // "helloworld"
normalize(input3); // "helloworld"

// All are equal after normalization
normalize(input1) === normalize(input2); // true
```

### Use Cases

```typescript
// Case-insensitive search
function searchItems(items: Item[], query: string) {
  const normalizedQuery = normalize(query);
  return items.filter(item =>
    normalize(item.name).includes(normalizedQuery)
  );
}

// Unique key generation
function generateKey(name: string) {
  return `item-${normalize(name)}`;
}

// Form validation
function isEmailUnique(email: string, existingEmails: string[]) {
  const normalizedEmail = normalize(email);
  return !existingEmails.some(e => normalize(e) === normalizedEmail);
}
```

### Best Practices

✅ **Use for:**
- Case-insensitive comparisons
- Search functionality
- Generating unique keys
- Data deduplication

❌ **Don't use for:**
- Display text (loses formatting)
- Preserving whitespace
- Internationalized strings

---

## toTitleCase

Convert camelCase or PascalCase strings to Title Case with spaces.

### Signature

```typescript
function toTitleCase(str?: string | null): string
```

### Parameters

- **str** (`string | null | undefined`) - The string to convert

### Returns

- `string` - Title Case string, or empty string if input is null/undefined

### Usage

```typescript
import { toTitleCase } from '@/common/utils';

toTitleCase('firstName');        // "First Name"
toTitleCase('lastName');         // "Last Name"
toTitleCase('userEmailAddress'); // "User Email Address"
toTitleCase('HTTPSConnection');  // "H T T P S Connection"
toTitleCase(null);               // ""
toTitleCase(undefined);          // ""
```

### Use Cases

```typescript
// Display field names
function FieldLabel({ fieldName }: { fieldName: string }) {
  return <label>{toTitleCase(fieldName)}</label>;
}

// Generate headers
const columns = ['firstName', 'lastName', 'emailAddress'];
const headers = columns.map(col => toTitleCase(col));
// ["First Name", "Last Name", "Email Address"]

// Error messages
function formatError(field: string) {
  return `${toTitleCase(field)} is required`;
}
// "First Name is required"
```

### Best Practices

✅ **Use for:**
- Display labels from field names
- Column headers
- User-facing text
- Error messages

❌ **Don't use for:**
- Data storage
- API keys
- Already formatted text

---

## pluralize

Add plural suffix to strings based on count.

### Signature

```typescript
function pluralize(
  str: string,
  count: number | null,
  pluralStr?: string
): string
```

### Parameters

- **str** (`string`) - The base string
- **count** (`number | null`) - The count to check
- **pluralStr** (`string`, optional) - Custom plural suffix (default: 's')

### Returns

- `string` - String with appropriate suffix

### Usage

```typescript
import { pluralize } from '@/common/utils';

// Basic usage
pluralize('item', 0);    // "items"
pluralize('item', 1);    // "item"
pluralize('item', 5);    // "items"
pluralize('item', null); // "items"

// Custom plural suffix
pluralize('child', 2, 'ren');     // "children"
pluralize('person', 3, 'people'); // "people" (not ideal, see below)
pluralize('category', 2, 'ies');  // "categoryies" (not ideal)
```

### Use Cases

```typescript
// Display counts
function ItemCount({ count }: { count: number }) {
  return <span>{count} {pluralize('item', count)}</span>;
}
// 0 items, 1 item, 5 items

// Messages
function getMessage(count: number) {
  return `You have ${count} ${pluralize('notification', count)}`;
}

// List summaries
function Summary({ items }: { items: any[] }) {
  return (
    <div>
      {items.length} {pluralize('result', items.length)} found
    </div>
  );
}
```

### Advanced Pluralization

For complex pluralization rules, create a helper:

```typescript
function smartPluralize(word: string, count: number): string {
  if (count === 1) return word;

  const rules: Record<string, string> = {
    'person': 'people',
    'child': 'children',
    'tooth': 'teeth',
    'foot': 'feet',
    'mouse': 'mice',
    'goose': 'geese',
  };

  if (rules[word]) {
    return rules[word];
  }

  // Handle words ending in 'y'
  if (word.endsWith('y') && !'aeiou'.includes(word[word.length - 2])) {
    return word.slice(0, -1) + 'ies';
  }

  // Handle words ending in 's', 'x', 'z', 'ch', 'sh'
  if (/[sxz]$|[cs]h$/.test(word)) {
    return word + 'es';
  }

  return pluralize(word, count);
}
```

### Best Practices

✅ **Use for:**
- Simple pluralization (add 's')
- Display text
- Count-based messages

❌ **Don't use for:**
- Complex irregular plurals
- Internationalization
- Grammar-sensitive contexts

---

## classList

Conditionally join CSS class names, similar to the `classnames` library.

### Signature

```typescript
type ClassListArg = string | { [cls: string]: boolean | [boolean, string] };

function classList(...args: ClassListArg[]): string
```

### Parameters

- **...args** (`ClassListArg[]`) - Strings or objects with conditional classes

### Returns

- `string` - Space-separated class names

### Usage

```typescript
import { classList } from '@/frontend/utils';

// Basic strings
classList('btn', 'primary'); // "btn primary"

// Conditional classes
const isActive = true;
const hasError = false;

classList('btn', {
  'active': isActive,    // Included
  'error': hasError,     // Excluded
});
// "btn active"

// Ternary conditions
classList('btn', {
  'success': [!hasError, 'error'], // If true: 'success', else: 'error'
});

// Mixed usage
classList(
  'base-class',
  { 'active': isActive },
  { 'disabled': isDisabled },
  'another-class'
);
```

### Use Cases

```typescript
// Button component
function Button({ variant, disabled, active }: ButtonProps) {
  const className = classList(
    'btn',
    `btn-${variant}`,
    {
      'btn-disabled': disabled,
      'btn-active': active,
    }
  );

  return <button className={className}>Click me</button>;
}

// Grid cell styling
function GridCell({ align, highlighted, error }: CellProps) {
  return (
    <div className={classList(
      'grid-cell',
      {
        'text-right': align === 'right',
        'text-center': align === 'center',
        'highlighted': highlighted,
        'error': error,
      }
    )}>
      {children}
    </div>
  );
}

// Dynamic form field
function FormField({ touched, error, focused }: FieldProps) {
  return (
    <input className={classList(
      'form-input',
      {
        'is-invalid': touched && error,
        'is-valid': touched && !error,
        'is-focused': focused,
      }
    )} />
  );
}
```

### Best Practices

✅ **Use for:**
- Conditional styling
- Component variants
- State-based classes
- Dynamic class names

❌ **Don't use for:**
- Static class names (just use strings)
- Complex logic (extract to function)
- Inline styles (use style prop)

---

## toBase64

Convert a File object to a base64-encoded string.

### Signature

```typescript
function toBase64(file?: File | null): Promise<string | null>
```

### Parameters

- **file** (`File | null | undefined`) - The file to convert

### Returns

- `Promise<string | null>` - Base64-encoded string or null if no file

### Usage

```typescript
import { toBase64 } from '@/frontend/utils';

// File input handler
async function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0];

  if (file) {
    try {
      const base64 = await toBase64(file);
      console.log('Base64:', base64);
      // "data:image/png;base64,iVBORw0KGgoAAAANS..."

      // Send to API
      await uploadImage({ data: base64 });
    } catch (error) {
      console.error('Failed to convert file:', error);
    }
  }
}

// Image preview
function ImageUploader() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const base64 = await toBase64(file);
    setPreview(base64);
  };

  return (
    <div>
      <input type="file" onChange={handleChange} accept="image/*" />
      {preview && <img src={preview} alt="Preview" />}
    </div>
  );
}
```

### Error Handling

```typescript
async function safeToBase64(file: File): Promise<string | null> {
  try {
    return await toBase64(file);
  } catch (error) {
    console.error('File conversion failed:', error);
    showNotification('Failed to process file', 'error');
    return null;
  }
}
```

### Best Practices

✅ **Use for:**
- Image previews
- Small file uploads
- Data URLs
- Embedding files

❌ **Don't use for:**
- Large files (> 1MB)
- Binary data processing
- Streaming uploads
- Server-side operations

**Note**: Base64 encoding increases file size by ~33%. Consider direct file uploads for large files.

---

## emDash

A constant for the em dash character (—).

### Value

```typescript
const emDash: string = '—';
```

### Usage

```typescript
import { emDash } from '@/frontend/utils';

// Display empty values
function DisplayValue({ value }: { value: string | null }) {
  return <span>{value || emDash}</span>;
}

// Format ranges
function DateRange({ start, end }: { start: Date; end: Date }) {
  return (
    <span>
      {formatDate(start)} {emDash} {formatDate(end)}
    </span>
  );
}

// Placeholder text
const placeholder = `No data ${emDash} please add items`;
```

### Best Practices

✅ **Use for:**
- Empty value display
- Date/number ranges
- Missing data indicators
- Professional typography

❌ **Don't use for:**
- Hyphens in words
- Minus signs
- List bullets

---

## Common Patterns

### Combining Utilities

```typescript
import { classList, toTitleCase, pluralize } from '@/utils';

function DataTable({ items, sortField }: TableProps) {
  const headerClass = (field: string) => classList(
    'table-header',
    { 'sorted': field === sortField }
  );

  return (
    <table>
      <thead>
        <tr>
          {fields.map(field => (
            <th key={field} className={headerClass(field)}>
              {toTitleCase(field)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* rows */}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={fields.length}>
            {items.length} {pluralize('item', items.length)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
```

## Related Documentation

- [React Hooks](./hooks.md)
- [Collection Utilities](./collections.md)
- [Reusable Components](./components.md)
- [Grid Utilities](../grid-utilities.md)

