# Usage Examples

## Overview

This document provides real-world implementation examples of the custom AG-Grid component, demonstrating various configurations and use cases. These patterns were developed for SUDS Culture and serve as templates for building production-ready data grids.

## Example 1: Simple Client-Side Grid

**Use Case**: Display a list of reports with search and selection capabilities.

### Implementation

```typescript
import { CustomAgGrid, catalogReportStatusCellRenderer, dateTimeValueFormatter } from '@/frontend';

export default function CatalogReports() {
  const { catalogId } = useCatalogParams();
  const { data, isLoading } = useGetCatalogReportsQuery({ catalogId });

  return (
    <CustomAgGrid
      id="catalog-reports"
      className="self-stretch"
      rowData={data}
      loading={isLoading}
      withSearch
      rowGroupPanelShow="always"
      filters={[{ label: 'All', selected: true }]}
      defaultColDef={{ minWidth: 0 }}
      rowSelection="multiple"
      enableRangeSelection
      columnDefs={[
        {
          field: 'name',
          headerName: 'Report',
          flex: 1,
          filter: 'agTextColumnFilter',
          filterParams: {
            buttons: ['apply', 'reset'],
            closeOnApply: true,
          },
          checkboxSelection: true,
          headerCheckboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
        },
        {
          field: 'status',
          headerName: 'Status',
          cellRenderer: catalogReportStatusCellRenderer,
        },
        {
          field: 'updatedAt',
          headerName: 'Last Generated',
          filter: false,
          valueFormatter: dateTimeValueFormatter,
        },
        {
          width: 70,
          pinned: 'right',
          cellRenderer: ActionsRenderer,
        },
      ]}
    />
  );
}
```

### Key Features

- ✅ Client-side data (all loaded at once)
- ✅ Search functionality
- ✅ Multiple row selection
- ✅ Custom status renderer
- ✅ Date formatting
- ✅ Actions column with custom renderer
- ✅ Range selection enabled
- ✅ Row grouping panel

---

## Example 2: Server-Side Hierarchical Grid

**Use Case**: Display financial performance data with multiple grouping levels and dynamic columns.


### Implementation

```typescript
import { CustomAgGrid, useServerSideDatasource, currencyValueFormatter } from '@/frontend';

export default function Performance() {
  const { clientId, catalogId } = useCatalogSourceParams();
  const gridRef = useRef<CustomAgGridRef>(null);

  const [selectedFilters, setSelectedFilters] = useState({
    group: 'catalogId, sourceId, songId',
    periodType: 'quarter',
    dateType: 'statementDate',
    valueType: 'earnings',
  });

  const { datasource, lastUpdated, units } = useServerSideDatasource({
    selectedFilters,
    gridRef,
  });

  const columns = useMemo(() => {
    const cols: ColDef[] = [
      {
        colId: 'group',
        field: 'group',
        width: 300,
        headerName: 'Catalog / Source / Song',
        pinned: 'left',
        showRowGroup: true,
        cellRenderer: 'agGroupCellRenderer',
      },
      // Dynamic columns based on units
      ...(units || []).map((year) => ({
        headerName: year.year.toString(),
        children: year.units.map((quarter) => ({
          colId: `${year.year}-${quarter}`,
          headerName: quarter,
          type: 'numericColumn',
          valueFormatter: currencyValueFormatter('USD'),
          valueGetter: ({ data }) => data?.[`${year.year} ${quarter}`],
        })),
      })),
      {
        colId: 'total',
        headerName: 'Total',
        width: 125,
        pinned: 'right',
        type: 'numericColumn',
        valueFormatter: currencyValueFormatter('USD'),
        valueGetter: ({ data }) => data?.total,
      },
    ];
    return cols;
  }, [units]);

  return (
    <CustomAgGrid
      id="performance"
      ref={gridRef}
      columnDefs={columns}
      headerComponent={
        <Typography className="ml-auto text-[12px] font-bold">
          Last updated: {humanizeDateTime(lastUpdated)}
        </Typography>
      }
      defaultColDef={{ filter: false }}
      className="h-full"
      exportFileName="Performance Report"
      withExport
      enableRangeSelection
      serverSideDatasource={datasource}
      rowModelType="serverSide"
      groupDisplayType="custom"
      noRowsText="No Performance Data"
      getRowId={(params) =>
        [...(params.parentKeys || []), params.data.id]?.join('|')
      }
      processHeader={({ column }) =>
        column.getDefinition().headerName || column.getId()
      }
    />
  );
}
```

### Key Features

- ✅ Server-side row model for large datasets
- ✅ Hierarchical grouping (3 levels)
- ✅ Dynamic column generation based on API response
- ✅ Pinned totals row
- ✅ Custom export configuration
- ✅ Currency formatting
- ✅ Custom row ID generation for hierarchy
- ✅ Last updated timestamp display

---

## Example 3: Editable Grid with Multiple Cell Editors

**Use Case**: Financial documents grid with inline editing, custom filters, and totals calculation.


### Implementation

```typescript
import {
  CustomAgGrid,
  DateCellEditor,
  PercentCellEditor,
  AdditionalFeesCellEditor,
  currencyValueFormatter,
  percentValueFormatter,
  dateValueFormatter,
} from '@/frontend';

export default function Documents() {
  const { catalogId } = useCatalogParams();
  const { data: documents, isLoading } = useGetCatalogFilesQuery({ catalogId });
  const [updateCatalogFiles] = useUpdateCatalogFilesMutation();
  const { isViewer } = useIsRole();

  const onCellEdit = ({ api, data, column, newValue }: CellEditRequestEvent<CatalogFile>) => {
    const colId = column.getColId();
    const selectedFileIds = new Set(api.getSelectedRows().map((r) => r.id));

    // Update selected rows or current row
    const fileIds = selectedFileIds.has(data.id)
      ? Array.from(selectedFileIds)
      : [data.id];

    updateCatalogFiles({
      catalogId,
      request: {
        ids: fileIds,
        [colId]: newValue,
      },
    });
  };

  const calculateTotals = ({ api }: AgGridEvent<CatalogFile>) => {
    const totals: any = { name: 'Totals' };

    api.forEachNodeAfterFilter(({ data }) => {
      if (!data) return;
      const statementRoyalties = getStatementRoyalties(data);
      totals.statementRoyalties = (totals.statementRoyalties || 0) + statementRoyalties;
      // ... calculate other totals
    });

    api.updateGridOptions({ pinnedTopRowData: [totals] });
  };

  return (
    <CustomAgGrid
      id="catalog-documents"
      className="self-stretch"
      rowData={documents}
      loading={isLoading}
      withSearch
      rowGroupPanelShow="always"
      headerComponent={
        <Button onClick={handleUpload}>
          Edit Documents
        </Button>
      }
      filters={[
        { label: 'All', selected: true },
        { label: 'Schedule As', filterFn: (i) => i.data.type === 'ScheduleA' },
        { label: 'Exports', filterFn: (i) => i.data.type === 'Export' },
        { label: 'Statements', filterFn: (i) => i.data.type === 'Statement' },
        { label: 'Agreements', filterFn: (i) => i.data.type === 'Agreement' },
      ]}
      defaultColDef={{ minWidth: 0 }}
      rowSelection="multiple"
      onCellEditRequest={onCellEdit}
      enableRangeSelection
      onRowDataUpdated={calculateTotals}
      onFilterChanged={calculateTotals}
      columnDefs={[
        {
          field: 'name',
          headerName: 'File Name',
          width: 250,
          pinned: 'left',
          checkboxSelection: true,
          headerCheckboxSelection: true,
        },
        {
          field: 'statementDate',
          headerName: 'Statement Date',
          editable: !isViewer,
          cellEditor: DateCellEditor,
          valueFormatter: dateValueFormatter,
          width: 140,
        },
        {
          field: 'statementRoyalties',
          headerName: 'Statement Royalties',
          type: 'numericColumn',
          valueFormatter: currencyValueFormatter('USD'),
          valueGetter: ({ data }) => getStatementRoyalties(data),
        },
        {
          field: 'royaltySourceFeePct',
          headerName: 'Source Fee %',
          editable: !isViewer,
          cellEditor: PercentCellEditor,
          valueFormatter: percentValueFormatter,
          filterValueGetter: percentFilterValueGetter,
        },
        {
          field: 'catalogFileFees',
          headerName: 'Additional Fees',
          editable: !isViewer,
          cellEditor: AdditionalFeesCellEditor,
          cellEditorPopup: true,
          cellEditorPopupPosition: 'under',
          valueFormatter: ({ value }) =>
            value?.map(f => `${f.name}: ${f.value}`).join(', '),
        },
      ]}
    />
  );
}
```

### Key Features

- ✅ Multiple custom cell editors (Date, Percent, Complex objects)
- ✅ Batch editing (selected rows)
- ✅ Calculated totals in pinned row
- ✅ Custom filter chips with predicates
- ✅ Value getters for computed fields
- ✅ Conditional editability based on user role
- ✅ onRowDataUpdated and onFilterChanged callbacks
- ✅ Popup editors for complex data

---

## Example 4: Grid with Tags and Editable Metadata

**Use Case**: Song financials with tag editing and custom formatters.


### Implementation

```typescript
import {
  CustomAgGrid,
  TagCellEditor,
  NumericCellEditor,
  StringCellEditor,
  gridTagsCellRenderer,
} from '@/frontend';

export default function CatalogSongFinancials() {
  const { catalogId } = useCatalogParams();
  const { data: songs } = useGetSongsForFinancialsQuery({ catalogId });
  const [updateSongs] = useUpdateSongsMutation();
  const { isViewer } = useIsRole();

  const onCellEdit = ({ data, column, newValue }: CellEditRequestEvent) => {
    updateSongs({
      catalogId,
      request: {
        ids: [data.id],
        [column.getColId()]: newValue,
      },
    });
  };

  return (
    <CustomAgGrid
      id="catalog-song-financials"
      rowData={songs}
      onCellEditRequest={onCellEdit}
      withSearch
      withExport
      columnDefs={[
        {
          field: 'title',
          headerName: 'Title',
          filter: 'agTextColumnFilter',
          floatingFilter: true,
          width: 250,
          pinned: 'left',
          checkboxSelection: true,
          headerCheckboxSelection: true,
        },
        {
          field: 'tags',
          headerName: 'Tags',
          width: 150,
          pinned: 'left',
          editable: true,
          cellEditor: TagCellEditor,
          floatingFilter: true,
          valueFormatter: (params) => params.value?.join(', ') || '',
          cellRenderer: gridTagsCellRenderer,
          suppressKeyboardEvent: (params) =>
            params.editing && params.event.key === 'Enter',
        },
        {
          field: 'vintageYear',
          headerName: 'Vintage Year',
          editable: !isViewer,
          type: 'numericColumn',
          floatingFilter: true,
          width: 120,
          cellEditor: NumericCellEditor,
          cellEditorParams: {
            allowNull: true,
          },
        },
        {
          field: 'genre',
          headerName: 'Genre',
          editable: !isViewer,
          cellEditor: StringCellEditor,
          width: 120,
        },
        {
          field: 'writers',
          headerName: 'Writers',
          width: 200,
          valueFormatter: (params) => params.value?.join(', ') || '',
        },
        {
          field: 'earnings',
          headerName: 'Total Earnings',
          type: 'numericColumn',
          valueFormatter: currencyValueFormatter('USD'),
          width: 150,
        },
      ]}
    />
  );
}
```

### Key Features

- ✅ Tag editing with Enter key suppression
- ✅ Floating filters on columns
- ✅ Numeric editor with null support
- ✅ Array value formatting (tags, writers)
- ✅ Mixed editable/read-only columns
- ✅ Custom keyboard event handling

---

## Example 5: Grid with Row Actions

**Use Case**: Admin grid with inline action buttons.


### Implementation

```typescript
import { CustomAgGrid, SourceTypeCellEditor, RightCellEditor, DurationCellEditor } from '@/frontend';

export default function AdminRoyaltySources() {
  const { data: sources } = useGetSourcesQuery();
  const [deleteSource] = useDeleteSourceMutation();
  const { isCreator } = useIsRole();

  return (
    <CustomAgGrid
      id="admin-sources"
      rowData={sources}
      withSearch
      rowSelection="single"
      columnDefs={[
        {
          field: 'name',
          headerName: 'Source Name',
          flex: 1,
          pinned: 'left',
        },
        {
          field: 'type',
          headerName: 'Source Type',
          flex: 1,
          editable: true,
          cellEditor: SourceTypeCellEditor,
          valueFormatter: (params) => humanizeSourceType(params.value),
        },
        {
          field: 'right',
          headerName: 'Right',
          flex: 1,
          editable: true,
          cellEditor: RightCellEditor,
          valueFormatter: (params) => humanizeRight(params.value),
        },
        {
          field: 'period',
          headerName: 'Recoverable Period',
          flex: 1,
          editable: true,
          valueGetter: ({ data }) => [data?.period, data?.periodType],
          cellEditor: DurationCellEditor,
          cellEditorPopupPosition: 'under',
          cellRenderer: ({ data }) => (
            <GridCell>
              <Stack className="flex-row gap-1">
                <Typography>{data?.period}</Typography>
                <Typography>{data?.periodType}</Typography>
              </Stack>
            </GridCell>
          ),
        },
        {
          width: 60,
          pinned: 'right',
          cellRenderer: ({ data, api }) => (
            <GridCell align="center">
              {isCreator && (
                <Tooltip title="Delete Source">
                  <Delete
                    className="cursor-pointer text-[18px]"
                    onClick={() => {
                      if (confirm('Delete this source?')) {
                        deleteSource({ sourceId: data.id });
                      }
                    }}
                  />
                </Tooltip>
              )}
            </GridCell>
          ),
        },
      ]}
    />
  );
}
```

### Key Features

- ✅ Single row selection
- ✅ Enum dropdown editors
- ✅ Compound value editor (Duration)
- ✅ Value getters for compound fields
- ✅ Custom cell renderer for display
- ✅ Action button with confirmation
- ✅ Role-based action visibility

---

## Example 6: Minimal Read-Only Grid

**Use Case**: Simple data display without interactions.

### Implementation

```typescript
import { CustomAgGrid, dateValueFormatter } from '@/frontend';

export default function SimpleList() {
  const { data } = useGetDataQuery();

  return (
    <CustomAgGrid
      id="simple-list"
      rowData={data}
      columnDefs={[
        { field: 'name', headerName: 'Name' },
        {
          field: 'date',
          headerName: 'Date',
          valueFormatter: dateValueFormatter,
        },
        { field: 'status', headerName: 'Status' },
      ]}
    />
  );
}
```

### Key Features

- ✅ Minimal configuration
- ✅ Default behaviors (sortable, filterable, resizable)
- ✅ Clean read-only display

---

## Example 7: Grid with Custom Export

**Use Case**: Export with custom header processing.

### Implementation

```typescript
import { CustomAgGrid } from '@/frontend';

export default function CustomExportGrid() {
  const exportToExcel = async () => {
    // Custom export logic
    const data = await fetchAllData();
    const workbook = createWorkbook(data);
    downloadWorkbook(workbook, 'custom-export.xlsx');
  };

  return (
    <CustomAgGrid
      id="custom-export"
      rowData={data}
      withExport
      exportFileName="My Report"
      processHeader={({ column }) => {
        const def = column.getDefinition();
        // Custom header text for exports
        if (def.field === 'amt') return 'Amount (USD)';
        return def.headerName || column.getId();
      }}
      customExports={[
        ['Excel (Custom)', exportToExcel],
        ['PDF Export', exportToPdf],
      ]}
      columnDefs={columns}
    />
  );
}
```

### Key Features

- ✅ Custom export filename
- ✅ Header text transformation
- ✅ Additional custom export options
- ✅ Context menu integration

---

## Example 8: Grid with Conditional Styling

**Use Case**: Highlight rows and cells based on data.

### Implementation

```typescript
import { CustomAgGrid, currencyValueFormatter } from '@/frontend';

export default function StyledGrid() {
  const getRowClass = (params: RowClassParams) => {
    if (params.data.status === 'error') {
      return 'bg-red-50 border-l-4 border-red-500';
    }
    if (params.data.highlighted) {
      return 'bg-yellow-50 font-bold';
    }
    return '';
  };

  return (
    <CustomAgGrid
      id="styled-grid"
      rowData={data}
      getRowClass={getRowClass}
      columnDefs={[
        {
          field: 'name',
          cellClass: (params) =>
            params.data.important ? 'font-bold text-purple-700' : '',
        },
        {
          field: 'amount',
          valueFormatter: currencyValueFormatter('USD'),
          cellStyle: (params) => {
            if (params.value < 0) {
              return { color: '#C1686F', fontWeight: 'bold' };
            }
            return null;
          },
        },
        {
          field: 'status',
          cellClass: 'uppercase text-center',
        },
      ]}
    />
  );
}
```

### Key Features

- ✅ Row-level styling with `getRowClass`
- ✅ Cell-level styling with `cellClass` and `cellStyle`
- ✅ Conditional formatting based on data
- ✅ Tailwind CSS classes for styling

---

## Common Patterns

### Pattern 1: Loading State

```typescript
const { data, isLoading } = useQuery();

<CustomAgGrid
  id="my-grid"
  rowData={data}
  loading={isLoading}
  columnDefs={columns}
/>
```

### Pattern 2: Ref Access

```typescript
const gridRef = useRef<CustomAgGridRef>(null);

// Access grid API
const handleAction = () => {
  const selected = gridRef.current?.grid?.api.getSelectedRows();
  console.log('Selected:', selected);
};

<CustomAgGrid
  ref={gridRef}
  id="my-grid"
  // ...
/>
```

### Pattern 3: Memoized Columns

```typescript
const columns = useMemo(() => [
  { field: 'name', headerName: 'Name' },
  { field: 'value', headerName: 'Value' },
], []);

<CustomAgGrid
  id="my-grid"
  columnDefs={columns}
  // ...
/>
```

### Pattern 4: Filter State Management

```typescript
const [selectedFilter, setSelectedFilter] = useState('all');

const filters = useMemo(() => [
  { label: 'All', selected: selectedFilter === 'all' },
  { label: 'Active', selected: selectedFilter === 'active', filterFn: (node) => node.data.active },
], [selectedFilter]);

<CustomAgGrid
  id="my-grid"
  filters={filters}
  // ...
/>
```

### Pattern 5: Batch Operations

```typescript
const onCellEdit = ({ api, data, column, newValue }) => {
  const selectedRows = api.getSelectedRows();
  const rowsToUpdate = selectedRows.includes(data) ? selectedRows : [data];

  updateMultipleRecords({
    ids: rowsToUpdate.map(r => r.id),
    [column.getColId()]: newValue,
  });
};
```

## Best Practices

1. **Always provide a unique `id`** for settings persistence
2. **Use `useMemo` for columnDefs** to prevent unnecessary re-renders
3. **Memoize custom renderers** with `useCallback`
4. **Provide proper `getRowId`** for server-side and dynamic data
5. **Pair formatters with editors** for consistent data display
6. **Handle loading states** with the `loading` prop
7. **Use ref access** for imperative operations
8. **Implement error handling** in cell edit callbacks

## Related Documentation

### Core Documentation
- [CustomAgGrid Component](./rylty-ag-grid-component.md)
- [Cell Editors Guide](./cell-editors.md)
- [Grid Utilities](./grid-utilities.md)
- [Server-Side Datasource](./server-side-datasource.md)
- [Design System](./design-system.md)
- [API Reference](./api-reference.md)

### Related Utilities
- **[React Hooks](./utilities/hooks.md)** - useDebounce, useSetting, useAuth
- **[String & Formatting](./utilities/string-formatting.md)** - toTitleCase, classList, pluralize
- **[Collection Utilities](./utilities/collections.md)** - distinct, nonEmptyItems, sum
- **[Date & Time](./utilities/date-time.md)** - humanizeDateTime, date formatting
- **[Reusable Components](./utilities/components.md)** - Panel, BarLoadingIcon, CheckIcon
- **[Utilities Overview](./utilities/README.md)** - Complete utilities index


