# Table Component Architecture

This document describes the refactored Table component architecture. The original monolithic component has been broken down into modular hooks and utilities for better maintainability.

## Directory Structure

```
table/
├── hooks/
│   ├── index.ts                 # Barrel export for all hooks
│   ├── useTableSort.ts          # Sorting logic and URL state management
│   ├── useTableSearch.ts        # Client-side search and filtering
│   ├── useTableActions.tsx      # Add/Update/Delete modal logic
│   └── useTableScroll.ts        # Scroll calculations for table
├── utils/
│   └── tableUtils.tsx           # Utility functions for actions and columns
├── index.tsx                    # Main Table component
├── topBar.tsx                   # TopBar component
├── tableActions.tsx             # TableActions component
├── CustomPagination.tsx         # Custom pagination component
└── README.md                    # This file
```

## Custom Hooks

### `useTableSort`
Handles all table sorting logic including:
- Sort state management
- URL parameter synchronization
- Toggle between ascending/descending order

**Usage:**
```tsx
const { sortState, handleSort } = useTableSort({
  currentSort,
  sortable,
  onSort,
});
```

### `useTableSearch`
Manages client-side search and filtering:
- Filters data based on search value
- Returns current filtered data
- Provides helper to get the appropriate data source

**Usage:**
```tsx
const { filteredData, getCurrentData } = useTableSearch({
  dataSource,
  searchable,
  serverPagination,
});
```

### `useTableActions`
Encapsulates all CRUD modal operations:
- Add new items with form modal
- Update existing items with form modal
- Form state management
- Success/error handling

**Usage:**
```tsx
const { handleAdd, handleUpdate } = useTableActions({
  formFields,
  formFieldsUpdate,
  onAdd,
  onUpdate,
  showModal,
  hideModal,
  // ... other props
});
```

### `useTableScroll`
Calculates optimal scroll configuration:
- Determines if vertical scroll is needed
- Handles RTL layout considerations
- Returns configured scroll object for Ant Design Table

**Usage:**
```tsx
const { tableScroll } = useTableScroll({
  dataSource,
  filteredData,
  searchable,
  serverPagination,
  isRTL,
  scroll,
});
```

## Utility Functions

### `buildDefaultActions`
Constructs default actions (edit, delete) with proper handlers and UI:
- Adds delete action with Popconfirm
- Adds edit action with custom button
- Respects hide flags
- Properly translates action labels

### `enhanceColumnsWithSort`
Enhances table columns with sorting functionality:
- Adds sort icons to sortable columns
- Handles RTL layout
- Creates click handlers for column headers
- Shows current sort state

## Benefits of Refactoring

1. **Separation of Concerns**: Each hook handles a specific aspect of table functionality
2. **Reusability**: Hooks can be used independently in other components
3. **Testability**: Isolated logic is easier to unit test
4. **Maintainability**: Smaller, focused files are easier to understand and modify
5. **Type Safety**: Each module has clear TypeScript interfaces
6. **Performance**: Memoization and optimizations are localized to specific hooks

## Migration Guide

The Table component API remains unchanged. No modifications needed for components using the Table.

For new table implementations, you can now:
1. Use hooks independently if you're building a custom table
2. Extend or override specific hooks for custom behavior
3. Compose hooks in different ways for variations

## Example: Custom Table Using Hooks

```tsx
import { useTableSort, useTableSearch, useTableScroll } from './hooks';

function CustomTable({ data }) {
  const { sortState, handleSort } = useTableSort({ sortable: true });
  const { getCurrentData } = useTableSearch({ dataSource: data });
  const { tableScroll } = useTableScroll({ dataSource: data });

  const currentData = getCurrentData();

  // Build your custom table...
}
```
