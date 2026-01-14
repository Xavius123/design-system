# API Reference

## Overview

Complete API reference for this AG-Grid implementation, including all interfaces, types, props, and method signatures. Developed for SUDS Culture as a comprehensive, production-ready solution.

## Custom AG-Grid Component

### CustomAgGridProps

Main props interface for the custom AG-Grid wrapper component.

```typescript
interface CustomAgGridProps extends AgGridReactProps {
  // Required Props
  id: string;

  // Optional Custom Props
  theme?: string;
  loading?: boolean;
  withSearch?: boolean;
  withExport?: boolean;
  withCustomPlaceholder?: boolean;
  filters?: CustomAgGridFilter[];
  headerComponent?: ReactNode;
  exportFileName?: string;
  processHeader?: (params: ProcessHeaderForExportParams) => string;
  customExports?: [string, () => Promise<void>][];
  borderless?: boolean;
  noRowsText?: string;
  searchClass?: string;

  // Inherited from AgGridReactProps
  columnDefs?: (ColDef | ColGroupDef)[];
  rowData?: any[];
  defaultColDef?: ColDef;
  rowModelType?: 'clientSide' | 'serverSide' | 'infinite' | 'viewport';
  serverSideDatasource?: IServerSideDatasource;
  getRowId?: GetRowIdFunc;
  onGridReady?: (event: GridReadyEvent) => void;
  onCellEditRequest?: (event: CellEditRequestEvent) => void;
  onRowDataUpdated?: (event: RowDataUpdatedEvent) => void;
  onFilterChanged?: (event: FilterChangedEvent) => void;
  // ... and 200+ other AG-Grid props
}
```

#### Prop Details

**id** (required)
- Type: `string`
- Purpose: Unique identifier for grid instance
- Used for: Settings persistence, analytics tracking
- Example: `"catalog-songs"`

**theme**
- Type: `string`
- Default: `"quartz"`
- Options: `"quartz"` | `"notifications"` | `"alerts"`
- Purpose: AG-Grid theme selection

**loading**
- Type: `boolean`
- Default: `false`
- Purpose: Shows loading overlay when true
- Behavior: Displays BarLoadingIcon over grid

**withSearch**
- Type: `boolean`
- Default: `false`
- Purpose: Enables search toolbar
- Behavior: Adds Material-UI TextField with quick filter

**withExport**
- Type: `boolean`
- Default: `false`
- Purpose: Enables export button and context menu items
- Behavior: Adds export menu with CSV and Excel options

**filters**
- Type: `CustomAgGridFilter[]`
- Default: `undefined`
- Purpose: Custom filter chips
- See: [CustomAgGridFilter Interface](#CustomAgGridfilter)

**headerComponent**
- Type: `ReactNode`
- Default: `undefined`
- Purpose: Custom content in toolbar
- Placement: Between filters and export button

**exportFileName**
- Type: `string`
- Default: `"export"`
- Purpose: Default filename for exports

**processHeader**
- Type: `(params: ProcessHeaderForExportParams) => string`
- Default: Uses column header name
- Purpose: Transform column headers for export

**customExports**
- Type: `[string, () => Promise<void>][]`
- Default: `[]`
- Purpose: Additional export options
- Format: Array of `[label, handler]` tuples

**borderless**
- Type: `boolean`
- Default: `false`
- Purpose: Removes Panel border

**noRowsText**
- Type: `string`
- Default: `"No Data"`
- Purpose: Text shown when grid is empty

**searchClass**
- Type: `string`
- Default: `""`
- Purpose: Additional classes for search field

### CustomAgGridRef

Ref interface for accessing grid instance and methods.

```typescript
interface CustomAgGridRef<T = any> {
  grid: AgGridReact<T> | null;
  resetGrid: () => void;
}
```

#### Methods

**grid**
- Type: `AgGridReact<T> | null`
- Purpose: Access to underlying AG-Grid instance
- Usage:
  ```typescript
  gridRef.current?.grid?.api.deselectAll();
  gridRef.current?.grid?.columnApi.autoSizeAllColumns();
  ```

**resetGrid**
- Type: `() => void`
- Purpose: Reset filters and sorting to initial state
- Usage:
  ```typescript
  gridRef.current?.resetGrid();
  ```

## Filter Interface

### CustomAgGridFilter

Interface for filter chip configuration.

```typescript
interface CustomAgGridFilter {
  label: string;
  withCount?: boolean;
  selected?: boolean;
  filterFn?: (item: IRowNode) => boolean;
  fn?: (grid: AgGridReact) => void;
}
```

#### Properties

**label** (required)
- Type: `string`
- Purpose: Display text for filter chip

**withCount**
- Type: `boolean`
- Default: `true`
- Purpose: Show row count in chip label

**selected**
- Type: `boolean`
- Default: `false`
- Purpose: Initially selected filter

**filterFn**
- Type: `(item: IRowNode) => boolean`
- Default: `undefined`
- Purpose: Filter predicate function
- Example:
  ```typescript
  filterFn: (node) => node.data.status === 'active'
  ```

**fn**
- Type: `(grid: AgGridReact) => void`
- Default: `undefined`
- Purpose: Additional grid operations when filter selected
- Example:
  ```typescript
  fn: (grid) => grid.api.expandAll()
  ```

## Cell Editor Interfaces

### CustomCellEditorProps

Base interface for all custom cell editors.

```typescript
interface CustomCellEditorProps<TData = any, TValue = any> {
  value: TValue;
  onValueChange: (value: TValue) => void;
  stopEditing: () => void;
  data: TData;
  node: IRowNode<TData>;
  colDef: ColDef<TData>;
  column: Column;
  rowIndex: number;
  // ... additional AG-Grid props
}
```

### Specific Editor Props

**StringCellEditorProps**
```typescript
interface StringCellEditorProps extends CustomCellEditorProps<any, string | null> {
  value: string | null;
  allowNull?: boolean;
}
```

**NumericCellEditorProps**
```typescript
interface NumericCellEditorProps extends CustomCellEditorProps<any, number | null> {
  allowNull?: boolean;
}
```

## Value Formatter Types

### ValueFormatterParams

AG-Grid's standard params for value formatters.

```typescript
interface ValueFormatterParams<TData = any, TValue = any> {
  value: TValue;
  data?: TData;
  node: IRowNode<TData>;
  colDef: ColDef<TData>;
  column: Column;
  api: GridApi<TData>;
  columnApi: ColumnApi;
  context: any;
}
```

### Formatter Function Signatures

```typescript
// Currency formatters
function currencyValueFormatter<T = any>(
  currency?: CurrencyType
): (params: ValueFormatterParams<T>) => string;

function clientCurrencyValueFormatter(
  params: ValueFormatterParams<Client>
): string;

function negativeCurrencyValueFormatter<T = any>(
  currency?: CurrencyType
): (params: ValueFormatterParams<T>) => string;

// Percentage formatter
function percentValueFormatter<T>(
  params: ValueFormatterParams<T>
): string;

// Number formatter
function numberValueFormatter<T>(
  params: ValueFormatterParams<T>
): string;

// Date formatters
function dateValueFormatter<T>(
  params: ValueFormatterParams<T>
): string;

function dateTimeValueFormatter<T>(
  params: ValueFormatterParams<T>
): string;

// Empty value formatter
function emptyValueFormatter<T>(
  params: ValueFormatterParams<T>
): string;
```

## Cell Renderer Types

### ICellRendererParams

AG-Grid's standard params for cell renderers.

```typescript
interface ICellRendererParams<TData = any, TValue = any> {
  value: TValue;
  valueFormatted: string | null;
  data: TData;
  node: IRowNode<TData>;
  colDef: ColDef<TData>;
  column: Column;
  rowIndex: number;
  api: GridApi<TData>;
  columnApi: ColumnApi;
  context: any;
  eGridCell: HTMLElement;
  eParentOfValue: HTMLElement;
  // ... additional props
}
```

### Renderer Function Signatures

```typescript
// Tag renderer
function gridTagsCellRenderer<T>(
  params: ICellRendererParams<T, string[]>
): JSX.Element;

// Boolean renderer
function gridBooleanCellRenderer<T>(
  params: ICellRendererParams<T, boolean>
): JSX.Element;

// Color-coded value renderer
function gridValueColorCellRenderer<T>(
  params: ICellRendererParams<T, number>
): JSX.Element;

// Status renderers
function catalogFileStatusCellRenderer<T>(
  params: ICellRendererParams<T, CatalogFileStatus>
): JSX.Element;

function catalogReportStatusCellRenderer<T>(
  params: ICellRendererParams<T, CatalogReportStatus>
): JSX.Element;
```

### GridCell Component

```typescript
interface GridCellProps {
  align?: 'right' | 'center' | 'left';
  row?: boolean;
  children: ReactNode;
  className?: string;
  title?: string;
}

function GridCell(props: GridCellProps): JSX.Element;
```

## Server-Side Datasource

### IServerSideDatasource

AG-Grid's interface for server-side data sources.

```typescript
interface IServerSideDatasource {
  getRows(params: IServerSideGetRowsParams): void;
  destroy?(): void;
}

interface IServerSideGetRowsParams {
  request: IServerSideGetRowsRequest;
  parentNode: IRowNode;
  success(params: LoadSuccessParams): void;
  fail(): void;
}

interface IServerSideGetRowsRequest {
  startRow: number;
  endRow: number;
  rowGroupCols: ColumnVO[];
  valueCols: ColumnVO[];
  pivotCols: ColumnVO[];
  pivotMode: boolean;
  groupKeys: string[];
  filterModel: any;
  sortModel: SortModelItem[];
}

interface LoadSuccessParams {
  rowData: any[];
  rowCount?: number;
}
```

### useServerSideDatasource

Custom hook for financial performance datasource.

```typescript
interface FinancialPerformanceDatasourceParams {
  selectedFilters: Dictionary<string>;
  gridRef: RefObject<CustomAgGridRef<any>>;
  catalogSourceIdFilter?: string;
}

function useServerSideDatasource(
  params: FinancialPerformanceDatasourceParams
): {
  datasource: IServerSideDatasource;
  units: FinancialPerformanceUnitYear[];
  lastUpdated: Date | null;
};
```

## Column Definition Types

### ColDef

Extended AG-Grid column definition with custom properties.

```typescript
interface ColDef<TData = any> {
  // Identity
  field?: string;
  colId?: string;

  // Display
  headerName?: string;
  headerTooltip?: string;

  // Dimensions
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  flex?: number;

  // Behavior
  sortable?: boolean;
  filter?: boolean | string;
  resizable?: boolean;
  editable?: boolean | EditableCallback<TData>;

  // Formatting
  valueFormatter?: ValueFormatterFunc<TData>;
  valueGetter?: ValueGetterFunc<TData>;
  valueSetter?: ValueSetterFunc<TData>;

  // Custom Components
  cellRenderer?: string | ICellRendererComp | ICellRendererFunc;
  cellEditor?: string | ICellEditorComp;
  cellEditorParams?: any;

  // Styling
  cellClass?: string | string[] | CellClassFunc<TData>;
  cellStyle?: CellStyle | CellStyleFunc<TData>;
  headerClass?: string | string[];

  // Pinning
  pinned?: 'left' | 'right' | null;
  lockPinned?: boolean;

  // Selection
  checkboxSelection?: boolean | CheckboxSelectionCallback<TData>;
  headerCheckboxSelection?: boolean;

  // Filtering
  filter?: boolean | string | IFilterComp;
  filterParams?: any;
  floatingFilter?: boolean;

  // Grouping
  rowGroup?: boolean;
  enableRowGroup?: boolean;
  showRowGroup?: boolean | string;

  // Type
  type?: string | string[];

  // ... 50+ additional AG-Grid properties
}
```

### ColGroupDef

Column group definition.

```typescript
interface ColGroupDef<TData = any> {
  headerName?: string;
  groupId?: string;
  children: (ColDef<TData> | ColGroupDef<TData>)[];
  columnGroupShow?: 'open' | 'closed';
  marryChildren?: boolean;
  headerClass?: string | string[];
  // ... additional properties
}
```

## Event Types

### Common Event Interfaces

```typescript
// Grid Ready
interface GridReadyEvent<TData = any> {
  type: string;
  api: GridApi<TData>;
  columnApi: ColumnApi;
}

// Cell Edit Request
interface CellEditRequestEvent<TData = any> {
  type: string;
  api: GridApi<TData>;
  columnApi: ColumnApi;
  data: TData;
  node: IRowNode<TData>;
  rowIndex: number;
  column: Column;
  colDef: ColDef<TData>;
  oldValue: any;
  newValue: any;
}

// Row Data Updated
interface RowDataUpdatedEvent<TData = any> {
  type: string;
  api: GridApi<TData>;
  columnApi: ColumnApi;
}

// Filter Changed
interface FilterChangedEvent<TData = any> {
  type: string;
  api: GridApi<TData>;
  columnApi: ColumnApi;
  afterFloatingFilter?: boolean;
  afterDataChange?: boolean;
  columns: Column[];
}

// Column Resized
interface ColumnResizedEvent<TData = any> {
  type: string;
  api: GridApi<TData>;
  columnApi: ColumnApi;
  column?: Column | null;
  columns?: Column[] | null;
  finished: boolean;
  source: string;
}
```

## Helper Function Types

### Row Comparison

```typescript
function isPreviousRowEqual(
  params: BaseColDefOptionalDataParams<any> | RowClassParams<any>,
  field: string,
  ignoreEmpty?: boolean
): boolean;

function isNextRowEqual(
  params: BaseColDefOptionalDataParams<any> | RowClassParams<any>,
  field: string,
  ignoreEmpty?: boolean
): boolean;
```

### Filter Value Getter

```typescript
function percentFilterValueGetter<TData, TValue>(
  params: ValueGetterParams<TData, TValue>
): number | null;
```

## Type Definitions

### Common Types

```typescript
// Currency types
type CurrencyType = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY' | ...;

// Source types
type SourceType = 'Digital' | 'Physical' | 'Sync' | 'Performance' | ...;

// Right types
type Right = 'Master' | 'Publishing' | 'Both' | 'Neighboring';

// Fee types
type FeeType = 'Flat' | 'Percent';

// Period types
type SourcePeriodType = 'Days' | 'Months' | 'Years';

// File status
type CatalogFileStatus = 'Saved' | 'Processed' | 'Processing' | 'Error' | 'ReUploading';

// Report status
type CatalogReportStatus = 'Generating' | 'Generated' | 'Error';
```

### Complex Types

```typescript
// Dictionary
type Dictionary<T> = Record<string, T>;

// Catalog file fee
interface CatalogFileFee {
  id?: string;
  name: string;
  type: FeeType;
  value: number;
}

// Catalog file currency
interface CatalogFileCurrency {
  id?: string;
  currency: CurrencyType;
  fxRate: number;
}

// Financial performance request
interface FinancialPerformanceRequest {
  group?: FinancialPerformanceGroup;
  sort?: string;
  clientId?: string;
  catalogId?: string;
  catalogSourceId?: string;
  includeUnits?: string;
  periodType?: FinancialPerformancePeriodType;
  dateType?: FinancialPerformanceDateType;
  valueType?: FinancialPerformanceValueType;
  [key: string]: any; // Dynamic group filters
}

// Financial performance unit year
interface FinancialPerformanceUnitYear {
  year: number;
  units?: string[];
}
```

## Callback Types

### Common Callbacks

```typescript
// Editable callback
type EditableCallback<TData> = (params: EditableCallbackParams<TData>) => boolean;

interface EditableCallbackParams<TData> {
  data: TData;
  node: IRowNode<TData>;
  column: Column;
  colDef: ColDef<TData>;
  api: GridApi<TData>;
  columnApi: ColumnApi;
  context: any;
}

// Cell class callback
type CellClassFunc<TData> = (params: CellClassParams<TData>) => string | string[];

interface CellClassParams<TData> {
  value: any;
  data: TData;
  node: IRowNode<TData>;
  colDef: ColDef<TData>;
  column: Column;
  api: GridApi<TData>;
  columnApi: ColumnApi;
  context: any;
}

// Cell style callback
type CellStyleFunc<TData> = (params: CellStyleParams<TData>) => CellStyle | null;

interface CellStyle {
  [cssProperty: string]: string | number;
}

// Row class callback
type RowClassFunc<TData> = (params: RowClassParams<TData>) => string | string[];

interface RowClassParams<TData> {
  data: TData;
  node: IRowNode<TData>;
  rowIndex: number;
  api: GridApi<TData>;
  columnApi: ColumnApi;
  context: any;
}

// Get row ID callback
type GetRowIdFunc<TData = any> = (params: GetRowIdParams<TData>) => string;

interface GetRowIdParams<TData> {
  data: TData;
  parentKeys?: string[];
  level: number;
}
```

## Constants

### Default Column Definition

```typescript
const DEFAULT_COL_DEF: ColDef = {
  resizable: true,
  filter: true,
  sortable: true,
  cellDataType: false,
  filterParams: {
    buttons: ['reset'],
  },
};
```

### Theme Names

```typescript
const THEMES = {
  QUARTZ: 'quartz',
  NOTIFICATIONS: 'notifications',
  ALERTS: 'alerts',
} as const;
```

## AG-Grid API Reference

### GridApi (Most Used Methods)

```typescript
interface GridApi<TData = any> {
  // Selection
  getSelectedRows(): TData[];
  getSelectedNodes(): IRowNode<TData>[];
  deselectAll(): void;
  selectAll(): void;

  // Data
  updateGridOptions(options: GridOptions<TData>): void;
  setRowData(rowData: TData[]): void;
  applyTransaction(transaction: RowDataTransaction<TData>): RowNodeTransaction;

  // Filtering
  setQuickFilter(newFilter: string): void;
  isAnyFilterPresent(): boolean;
  setFilterModel(model: any): void;
  getFilterModel(): any;

  // Display
  sizeColumnsToFit(params?: ISizeColumnsToFitParams): void;
  autoSizeAllColumns(skipHeader?: boolean): void;
  hideOverlay(): void;
  showLoadingOverlay(): void;
  showNoRowsOverlay(): void;

  // Export
  exportDataAsCsv(params?: CsvExportParams): void;
  exportDataAsExcel(params?: ExcelExportParams): void;

  // Server-Side
  refreshServerSide(params?: RefreshServerSideParams): void;

  // Iteration
  forEachNode(callback: (rowNode: IRowNode<TData>) => void): void;
  forEachNodeAfterFilter(callback: (rowNode: IRowNode<TData>) => void): void;

  // Rows
  getRowNode(id: string): IRowNode<TData> | undefined;
  getDisplayedRowAtIndex(index: number): IRowNode<TData> | undefined;
  getDisplayedRowCount(): number;

  // Refresh
  refreshCells(params?: RefreshCellsParams): void;
  redrawRows(params?: RedrawRowsParams): void;
}
```

### ColumnApi (Most Used Methods)

```typescript
interface ColumnApi {
  // Column State
  getColumnState(): ColumnState[];
  setColumnState(columnState: ColumnState[]): boolean;
  resetColumnState(): void;

  // Column Sizing
  autoSizeColumn(key: string | Column, skipHeader?: boolean): void;
  autoSizeColumns(keys: (string | Column)[], skipHeader?: boolean): void;
  autoSizeAllColumns(skipHeader?: boolean): void;

  // Column Visibility
  setColumnsVisible(keys: (string | Column)[], visible: boolean): void;
  setColumnVisible(key: string | Column, visible: boolean): void;

  // Column Groups
  setColumnGroupOpened(group: string | ColumnGroup, newValue: boolean): void;
  expandAllColumnGroups(): void;
  collapseAllColumnGroups(): void;

  // Column Access
  getColumn(key: string | Column): Column | null;
  getAllColumns(): Column[];
  getAllDisplayedColumns(): Column[];
  getAllGridColumns(): Column[];
}
```

## Related Documentation

### Core Documentation
- [CustomAgGrid Component](./rylty-ag-grid-component.md)
- [Cell Editors Guide](./cell-editors.md)
- [Grid Utilities](./grid-utilities.md)
- [Server-Side Datasource](./server-side-datasource.md)
- [Design System](./design-system.md)
- [Usage Examples](./usage-examples.md)

### Utilities
- **[Utilities Overview](./utilities/README.md)** - Complete utilities index
- **[React Hooks](./utilities/hooks.md)** - Custom hooks API reference
- **[String & Formatting](./utilities/string-formatting.md)** - String utilities API
- **[Collection Utilities](./utilities/collections.md)** - Array/object utilities API
- **[Date & Time](./utilities/date-time.md)** - Date formatting API
- **[Reusable Components](./utilities/components.md)** - Component props reference

## External References

- [AG-Grid React Documentation](https://www.ag-grid.com/react-data-grid/)
- [AG-Grid API Reference](https://www.ag-grid.com/react-data-grid/grid-api/)
- [Material-UI Documentation](https://mui.com/material-ui/)
- [TypeScript Documentation](https://www.typescriptlang.org/)


