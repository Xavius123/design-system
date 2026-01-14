# Date & Time Utilities

## Overview

Utilities for formatting and displaying dates and times. Built on dayjs for reliable date manipulation.

_Developed for SUDS Culture._

## humanizeDateTime

Format a date with time in a human-readable format.

### Signature

```typescript
function humanizeDateTime(value: Date | string | null): string
```

### Parameters

- **value** (`Date | string | null`) - The date to format

### Returns

- `string` - Formatted date/time or "—" if invalid/null

### Format

`MMM DD, YYYY   hh:mm A`

Example: `Jan 15, 2024   02:30 PM`

### Usage

```typescript
import { humanizeDateTime } from '@/common/utils';

// With Date object
const date = new Date('2024-01-15T14:30:00');
humanizeDateTime(date); // "Jan 15, 2024   02:30 PM"

// With ISO string
humanizeDateTime('2024-01-15T14:30:00Z'); // "Jan 15, 2024   02:30 PM"

// With null
humanizeDateTime(null); // "—"

// With invalid date
humanizeDateTime('invalid'); // "—"
```

### Use Cases

```typescript
// Display last updated time
function LastUpdated({ timestamp }: { timestamp: Date }) {
  return (
    <span>
      Last updated: {humanizeDateTime(timestamp)}
    </span>
  );
}

// Format API timestamps
function formatApiResponse(data: ApiResponse) {
  return {
    ...data,
    createdAt: humanizeDateTime(data.createdAt),
    updatedAt: humanizeDateTime(data.updatedAt),
  };
}

// Grid column formatter
const columnDefs = [
  {
    field: 'timestamp',
    headerName: 'Date & Time',
    valueFormatter: (params) => humanizeDateTime(params.value),
  },
];
```

---

## humanizeMonth

Convert month number (1-12) to abbreviated month name.

### Signature

```typescript
function humanizeMonth(month: number): string
```

### Parameters

- **month** (`number`) - Month number (1-12)

### Returns

- `string` - Abbreviated month name (Jan-Dec)

### Usage

```typescript
import { humanizeMonth } from '@/common/utils';

humanizeMonth(1);  // "Jan"
humanizeMonth(6);  // "Jun"
humanizeMonth(12); // "Dec"

// With date
const date = new Date();
const monthName = humanizeMonth(date.getMonth() + 1); // Note: +1 because getMonth() is 0-indexed
```

### Use Cases

```typescript
// Format month/year display
function MonthYearDisplay({ month, year }: { month: number; year: number }) {
  return <span>{humanizeMonth(month)} {year}</span>;
}

// Generate month labels
function getMonthLabels(): string[] {
  return Array.from({ length: 12 }, (_, i) => humanizeMonth(i + 1));
}
// ["Jan", "Feb", "Mar", ..., "Dec"]

// Chart axis labels
function generateChartData(data: MonthlyData[]) {
  return data.map(item => ({
    label: `${humanizeMonth(item.month)} ${item.year}`,
    value: item.amount,
  }));
}
```

---

## Date Formatting Patterns

### Common Patterns with dayjs

```typescript
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

// Date only (MMM DD, YYYY)
function formatDate(date: Date | string): string {
  const d = dayjs.utc(date);
  return d.isValid() ? d.format('MMM DD, YYYY') : '—';
}

// Time only (hh:mm A)
function formatTime(date: Date | string): string {
  const d = dayjs(date);
  return d.isValid() ? d.format('hh:mm A') : '—';
}

// Relative time
function formatRelative(date: Date | string): string {
  const d = dayjs(date);
  if (!d.isValid()) return '—';

  const now = dayjs();
  const diffDays = now.diff(d, 'day');

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

// ISO format
function toISO(date: Date | string): string {
  return dayjs(date).toISOString();
}

// Unix timestamp
function toUnix(date: Date | string): number {
  return dayjs(date).unix();
}
```

### Date Range Formatting

```typescript
import { emDash } from '@/frontend/utils';

function formatDateRange(start: Date, end: Date): string {
  const startStr = formatDate(start);
  const endStr = formatDate(end);
  return `${startStr} ${emDash} ${endStr}`;
}

// Smart range (same month/year)
function formatSmartRange(start: Date, end: Date): string {
  const s = dayjs(start);
  const e = dayjs(end);

  if (s.year() === e.year() && s.month() === e.month()) {
    return `${s.format('MMM DD')} ${emDash} ${e.format('DD, YYYY')}`;
  }

  if (s.year() === e.year()) {
    return `${s.format('MMM DD')} ${emDash} ${e.format('MMM DD, YYYY')}`;
  }

  return `${s.format('MMM DD, YYYY')} ${emDash} ${e.format('MMM DD, YYYY')}`;
}
```

### Timezone Handling

```typescript
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

// Convert to specific timezone
function formatInTimezone(date: Date | string, tz: string): string {
  return dayjs(date).tz(tz).format('MMM DD, YYYY hh:mm A z');
}

// User's local timezone
function formatLocal(date: Date | string): string {
  return dayjs(date).format('MMM DD, YYYY hh:mm A');
}

// UTC
function formatUTC(date: Date | string): string {
  return dayjs.utc(date).format('MMM DD, YYYY HH:mm') + ' UTC';
}
```

### Date Validation

```typescript
function isValidDate(date: any): boolean {
  return dayjs(date).isValid();
}

function isDateInRange(date: Date, start: Date, end: Date): boolean {
  const d = dayjs(date);
  return d.isAfter(start) && d.isBefore(end);
}

function isFutureDate(date: Date): boolean {
  return dayjs(date).isAfter(dayjs());
}

function isPastDate(date: Date): boolean {
  return dayjs(date).isBefore(dayjs());
}
```

## Best Practices

### Always Validate Dates

```typescript
function safeFormatDate(date: Date | string | null): string {
  if (!date) return '—';

  const d = dayjs(date);
  if (!d.isValid()) return '—';

  return d.format('MMM DD, YYYY');
}
```

### Use UTC for Storage

```typescript
// Store in UTC
function saveDate(date: Date) {
  const utcDate = dayjs(date).utc().toISOString();
  api.save({ date: utcDate });
}

// Display in local time
function displayDate(utcDate: string) {
  return dayjs.utc(utcDate).local().format('MMM DD, YYYY hh:mm A');
}
```

### Consistent Formatting

```typescript
// Create constants for formats
const DATE_FORMAT = 'MMM DD, YYYY';
const TIME_FORMAT = 'hh:mm A';
const DATETIME_FORMAT = 'MMM DD, YYYY   hh:mm A';

function formatDate(date: Date): string {
  return dayjs(date).format(DATE_FORMAT);
}
```

## Related Documentation

- [String & Formatting](./string-formatting.md)
- [Grid Utilities](../grid-utilities.md)
- [API Reference](../api-reference.md)

