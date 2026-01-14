# Download & Export Utilities

## Overview

Utilities for downloading files and exporting data from the browser. These helpers simplify file creation and browser download triggers.

_Developed for SUDS Culture._

## downloadFile

Trigger a browser download for a file blob or data URL.

### Signature

```typescript
function downloadFile(filename: string, data: string | Blob): void
```

### Parameters

- **filename** (`string`) - The name for the downloaded file
- **data** (`string | Blob`) - File data (data URL, blob, or text)

### Usage

```typescript
import { downloadFile } from '@/frontend/utils';

// Download text file
const textData = 'Hello, World!';
const blob = new Blob([textData], { type: 'text/plain' });
downloadFile('hello.txt', blob);

// Download JSON
const jsonData = { name: 'John', age: 30 };
const jsonBlob = new Blob([JSON.stringify(jsonData, null, 2)], {
  type: 'application/json'
});
downloadFile('data.json', jsonBlob);

// Download CSV
const csvData = 'Name,Age\nJohn,30\nJane,25';
const csvBlob = new Blob([csvData], { type: 'text/csv' });
downloadFile('users.csv', csvBlob);

// Download from data URL
const dataUrl = 'data:text/plain;base64,SGVsbG8gV29ybGQh';
downloadFile('encoded.txt', dataUrl);
```

### Common Patterns

```typescript
// Export grid data to CSV
function exportGridToCsv(rows: any[], columns: string[]) {
  const header = columns.join(',');
  const body = rows.map(row =>
    columns.map(col => row[col]).join(',')
  ).join('\n');

  const csv = `${header}\n${body}`;
  const blob = new Blob([csv], { type: 'text/csv' });
  downloadFile('export.csv', blob);
}

// Download JSON report
function downloadReport(data: Report) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  downloadFile(`report-${Date.now()}.json`, blob);
}

// Download image from canvas
function downloadCanvasImage(canvas: HTMLCanvasElement) {
  canvas.toBlob((blob) => {
    if (blob) {
      downloadFile('chart.png', blob);
    }
  });
}
```

### Best Practices

✅ **Use for:**
- CSV exports
- JSON downloads
- Text file generation
- Client-side file creation

❌ **Don't use for:**
- Large files (> 100MB)
- Streaming downloads
- Server-generated files
- Binary file processing

---

## Related Patterns

### CSV Export with AG-Grid

```typescript
import { downloadFile } from '@/frontend/utils';

function exportGridData(gridApi: GridApi) {
  // Get CSV from AG-Grid
  const csv = gridApi.getDataAsCsv({
    skipHeader: false,
    columnSeparator: ',',
    suppressQuotes: false,
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  downloadFile('grid-export.csv', blob);
}
```

### Excel Export

```typescript
// Note: Requires AG-Grid Enterprise
function exportToExcel(gridApi: GridApi, filename: string) {
  gridApi.exportDataAsExcel({
    fileName: filename,
    sheetName: 'Data',
  });
  // AG-Grid handles the download internally
}
```

### Custom Data Export

```typescript
interface ExportOptions {
  data: any[];
  filename: string;
  format: 'csv' | 'json' | 'txt';
}

function exportData({ data, filename, format }: ExportOptions) {
  let blob: Blob;
  let fullFilename: string;

  switch (format) {
    case 'csv':
      const csv = convertToCSV(data);
      blob = new Blob([csv], { type: 'text/csv' });
      fullFilename = `${filename}.csv`;
      break;

    case 'json':
      const json = JSON.stringify(data, null, 2);
      blob = new Blob([json], { type: 'application/json' });
      fullFilename = `${filename}.json`;
      break;

    case 'txt':
      const text = data.map(item => JSON.stringify(item)).join('\n');
      blob = new Blob([text], { type: 'text/plain' });
      fullFilename = `${filename}.txt`;
      break;
  }

  downloadFile(fullFilename, blob);
}

function convertToCSV(data: any[]): string {
  if (!data.length) return '';

  const headers = Object.keys(data[0]);
  const headerRow = headers.join(',');

  const rows = data.map(row =>
    headers.map(header => {
      const value = row[header];
      // Escape commas and quotes
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }).join(',')
  );

  return [headerRow, ...rows].join('\n');
}
```

### Download with Progress

```typescript
async function downloadWithProgress(url: string, filename: string) {
  const response = await fetch(url);
  const reader = response.body?.getReader();
  const contentLength = +(response.headers.get('Content-Length') ?? 0);

  let receivedLength = 0;
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader!.read();

    if (done) break;

    chunks.push(value);
    receivedLength += value.length;

    const progress = (receivedLength / contentLength) * 100;
    console.log(`Downloaded ${progress.toFixed(2)}%`);
  }

  const blob = new Blob(chunks);
  downloadFile(filename, blob);
}
```

## Related Documentation

- [String & Formatting](./string-formatting.md)
- [Collection Utilities](./collections.md)
- [Grid Utilities](../grid-utilities.md)

