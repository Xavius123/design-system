# AG-Grid Implementation Documentation

Welcome to the comprehensive documentation for this ag-grid implementation, originally developed for SUDS Culture. This documentation covers all aspects of the custom grid system, from basic usage to advanced server-side integration.

## Documentation Index

### 📚 Core Documentation

1. **[AG-Grid Implementation Overview](./ag-grid-implementation.md)**
   - System architecture and design philosophy
   - Technology stack and dependencies
   - Key features and capabilities
   - Getting started guide

2. **[Custom AgGrid Component](./rylty-ag-grid-component.md)**
   - Component props and configuration
   - Built-in features (search, filters, export)
   - Persistent settings
   - Event handlers
   - Advanced features

3. **[Cell Editors Guide](./cell-editors.md)**
   - All 13 custom cell editors
   - Basic editors (String, Numeric, Date, Percent)
   - Selection editors (Currency, SourceType, Right)
   - Complex editors (Tags, Duration, Fees, FX Rates)
   - Usage patterns and best practices

4. **[Grid Utilities and Formatters](./grid-utilities.md)**
   - Value formatters (currency, percent, date, number)
   - Cell renderers (tags, boolean, status, color-coded)
   - Helper functions
   - GridCell component

5. **[Server-Side Datasource](./server-side-datasource.md)**
   - When to use server-side vs client-side
   - IServerSideDatasource implementation
   - Hierarchical grouping
   - useFinancialPerformanceDatasource hook
   - Performance optimization

6. **[Design System Integration](./design-system.md)**
   - AG-Grid theming (ag-theme-quartz)
   - Material-UI component integration
   - Tailwind CSS utilities
   - Custom icons and loading components
   - Styling patterns

7. **[Usage Examples](./usage-examples.md)**
   - Simple client-side grid
   - Server-side hierarchical grid
   - Editable grid with multiple editors
   - Grid with tags and metadata
   - Grid with row actions
   - Common patterns and best practices

8. **[API Reference](./api-reference.md)**
   - Complete TypeScript interfaces
   - Props and types
   - Cell editor interfaces
   - Value formatter signatures
   - Event types
   - Callback types

### 🛠️ Utilities & Helpers

9. **[Utilities Overview](./utilities/README.md)**
   - Complete index of all reusable utilities
   - Quick reference and import examples
   - Design philosophy and best practices

10. **[React Hooks](./utilities/hooks.md)**
    - useDebounce - Debounce callbacks
    - useSetting - Persistent user settings
    - useParams - Type-safe route parameters
    - useAuth - Authentication state
    - useIsRole - Role-based access control
    - usePageVisit - Analytics tracking

11. **[String & Formatting](./utilities/string-formatting.md)**
    - normalize - String normalization
    - toTitleCase - Convert to Title Case
    - pluralize - Smart pluralization
    - classList - Conditional CSS classes
    - toBase64 - File to base64 conversion

12. **[Collection Utilities](./utilities/collections.md)**
    - distinct - Remove duplicates
    - nonEmptyItems - Filter null/undefined
    - sum - Sum numeric arrays

13. **[Download & Export](./utilities/downloads.md)**
    - downloadFile - Browser file downloads
    - CSV generation patterns
    - Export helpers

14. **[Date & Time](./utilities/date-time.md)**
    - humanizeDateTime - Format date/time
    - humanizeMonth - Month abbreviations
    - dayjs integration patterns

15. **[Reusable Components](./utilities/components.md)**
    - Panel - Container wrapper
    - BarLoadingIcon - Animated loader
    - CheckIcon - SVG check mark
    - SearchIcon - Search icon

## Quick Start

### Basic Grid

```typescript
import { CustomAgGrid } from '@/frontend';

function MyComponent() {
  const [rowData] = useState([
    { id: 1, name: 'Item 1', value: 100 },
    { id: 2, name: 'Item 2', value: 200 },
  ]);

  const columnDefs = [
    { field: 'name', headerName: 'Name' },
    { field: 'value', headerName: 'Value' },
  ];

  return (
    <CustomAgGrid
      id="my-grid"
      rowData={rowData}
      columnDefs={columnDefs}
      withSearch
    />
  );
}
```

### With Cell Editors

```typescript
import { CustomAgGrid, NumericCellEditor, TagCellEditor } from '@/frontend';

const columnDefs = [
  {
    field: 'amount',
    editable: true,
    cellEditor: NumericCellEditor,
  },
  {
    field: 'tags',
    editable: true,
    cellEditor: TagCellEditor,
  },
];
```

### Server-Side Grid

```typescript
import { CustomAgGrid, useServerSideDatasource } from '@/frontend';

function PerformanceGrid() {
  const gridRef = useRef<CustomAgGridRef>(null);
  const { datasource } = useServerSideDatasource({
    selectedFilters,
    gridRef,
  });

  return (
    <CustomAgGrid
      id="performance"
      ref={gridRef}
      rowModelType="serverSide"
      serverSideDatasource={datasource}
      columnDefs={columns}
    />
  );
}
```

## Key Features

- ✅ **13 Custom Cell Editors** - Domain-specific editors for all data types
- ✅ **Value Formatters** - Consistent data display (currency, percent, date)
- ✅ **Cell Renderers** - Custom rendering for complex data
- ✅ **Server-Side Support** - Handle millions of rows efficiently
- ✅ **Hierarchical Grouping** - Multi-level data organization
- ✅ **Persistent Settings** - Column widths saved per user
- ✅ **Search & Filters** - Built-in toolbar with quick filter
- ✅ **Export** - CSV and Excel export with customization
- ✅ **Material-UI Integration** - Consistent design system
- ✅ **Type Safety** - Full TypeScript support
- ✅ **Accessibility** - WCAG compliant components

## Component Hierarchy

```
CustomAgGrid
├── Panel (wrapper)
├── Toolbar
│   ├── Search TextField
│   ├── Filter Chips
│   ├── Header Component (custom)
│   └── Export Menu
└── AgGridReact
    ├── Column Definitions
    │   ├── Cell Editors
    │   ├── Value Formatters
    │   └── Cell Renderers
    ├── Row Data (client-side)
    └── Server-Side Datasource
```

## File Structure

```
src/
├── frontend/
│   ├── components/
│   │   ├── CustomAgGrid.tsx
│   │   ├── CustomAgGridFilters.tsx
│   │   └── Panel.tsx
│   ├── cell-editors/
│   │   ├── StringCellEditor.tsx
│   │   ├── NumericCellEditor.tsx
│   │   ├── PercentCellEditor.tsx
│   │   ├── DateCellEditor.tsx
│   │   ├── CurrencyCellEditor.tsx
│   │   ├── TagCellEditor.tsx
│   │   └── ... (7 more editors)
│   ├── utils/
│   │   ├── gridUtil.tsx
│   │   └── serverSideDatasourceUtil.ts
│   └── models/
│       ├── CustomAgGridRef.tsx
│       └── CustomAgGridFilter.ts
└── styles/
    └── globals.scss
```

## Technology Stack

- **ag-grid-community**: `^31.3.2`
- **ag-grid-enterprise**: `^31.3.2`
- **ag-grid-react**: `^31.3.2`
- **@mui/material**: `^5.15.10`
- **React**: `^18.3.1`
- **TypeScript**: `^5.5.2`

## Best Practices

1. ✅ Always provide a unique `id` prop for settings persistence
2. ✅ Use `useMemo` for column definitions to prevent unnecessary re-renders
3. ✅ Memoize custom renderers with `useCallback`
4. ✅ Provide proper `getRowId` for server-side and dynamic data
5. ✅ Pair formatters with editors for consistent data display
6. ✅ Handle loading states with the `loading` prop
7. ✅ Use ref access for imperative operations
8. ✅ Implement error handling in cell edit callbacks

## Common Patterns

### Memoized Columns
```typescript
const columns = useMemo(() => [
  { field: 'name', headerName: 'Name' },
  { field: 'value', headerName: 'Value' },
], [dependencies]);
```

### Grid Ref Access
```typescript
const gridRef = useRef<CustomAgGridRef>(null);
const selected = gridRef.current?.grid?.api.getSelectedRows();
```

### Loading State
```typescript
<CustomAgGrid
  id="my-grid"
  rowData={data}
  loading={isLoading}
/>
```

### Custom Filters
```typescript
const filters = [
  { label: 'All', selected: true },
  { label: 'Active', filterFn: (node) => node.data.active },
  { label: 'Archived', filterFn: (node) => node.data.archived },
];
```

## Support and Resources

### Internal Resources
- Component source: `src/frontend/components/CustomAgGrid.tsx`
- Examples throughout application modules and components
- Type definitions: `src/frontend/models/`

### External Resources
- [AG-Grid Documentation](https://www.ag-grid.com/react-data-grid/)
- [Material-UI Documentation](https://mui.com/material-ui/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## Contributing

When extending the grid system:

1. Follow existing patterns and conventions
2. Use TypeScript for type safety
3. Integrate Material-UI components for consistency
4. Add appropriate formatters and renderers
5. Document new features in this documentation
6. Test with both client-side and server-side data

## Version History

- **v1.0** - Initial implementation with custom AG-Grid wrapper
- **v2.0** - Added 13 custom cell editors
- **v3.0** - Server-side datasource support
- **v4.0** - Persistent settings and enhanced theming

## Credits

This AG-Grid implementation was developed for SUDS Culture and serves as a comprehensive template for building production-ready data grids with React, TypeScript, and Material-UI.

---

**Last Updated**: January 2026

For questions or issues, refer to the detailed documentation sections above.

