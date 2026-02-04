# Table Component Structure

## Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Table Component                         │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │                   Custom Hooks                      │    │
│  │                                                     │    │
│  │  ┌──────────────┐  ┌──────────────┐               │    │
│  │  │ useTableSort │  │useTableSearch│               │    │
│  │  │              │  │              │               │    │
│  │  │ • Sort state │  │ • Filter data│               │    │
│  │  │ • URL sync   │  │ • Get current│               │    │
│  │  │ • Toggle     │  │   data       │               │    │
│  │  └──────────────┘  └──────────────┘               │    │
│  │                                                     │    │
│  │  ┌──────────────┐  ┌──────────────┐               │    │
│  │  │useTableActions│ │useTableScroll│               │    │
│  │  │              │  │              │               │    │
│  │  │ • Add modal  │  │ • Calculate  │               │    │
│  │  │ • Update     │  │   scroll     │               │    │
│  │  │ • Form state │  │ • RTL support│               │    │
│  │  └──────────────┘  └──────────────┘               │    │
│  │                                                     │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │                 Utility Functions                   │    │
│  │                                                     │    │
│  │  ┌──────────────────┐  ┌────────────────────────┐ │    │
│  │  │ buildDefault     │  │ enhanceColumnsWithSort │ │    │
│  │  │ Actions          │  │                        │ │    │
│  │  │                  │  │ • Add sort icons       │ │    │
│  │  │ • Edit action    │  │ • Click handlers       │ │    │
│  │  │ • Delete action  │  │ • Sort state UI        │ │    │
│  │  └──────────────────┘  └────────────────────────┘ │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │                   Render Logic                      │    │
│  │                                                     │    │
│  │  • TopBar (search, filters, actions)               │    │
│  │  • Grid/Table View Toggle                          │    │
│  │  • Ant Design Table                                │    │
│  │  • Custom Pagination                               │    │
│  │  • Empty State                                     │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

```
User Input
    │
    ▼
┌─────────────────┐
│  TopBar         │
│  • Search       │──────┐
│  • Filters      │      │
│  • Create       │      │
└─────────────────┘      │
                         ▼
                  ┌──────────────┐
                  │ useTableSearch│
                  │ (filters data)│
                  └──────┬────────┘
                         │
                         ▼
                  ┌──────────────┐
                  │ getCurrentData│
                  └──────┬────────┘
                         │
    ┌────────────────────┴────────────────────┐
    │                                          │
    ▼                                          ▼
┌─────────────┐                        ┌─────────────┐
│  Grid View  │                        │ Table View  │
│  Render     │                        │  Render     │
└─────────────┘                        └─────────────┘
```

## Hook Dependencies

```
useTableSort
    │
    ├─ sortState ──────────────────────┐
    └─ handleSort ─────────────┐       │
                               │       │
                               ▼       ▼
                         enhanceColumnsWithSort
                               │
                               ▼
                         Enhanced Columns
                               │
                               ▼
                         Ant Design Table


useTableSearch
    │
    ├─ filteredData ────────┐
    └─ getCurrentData ───────┼───┐
                            │   │
                            ▼   ▼
                    useTableScroll  Table/Grid Render
                            │
                            ▼
                      Scroll Config
                            │
                            ▼
                    Ant Design Table


useTableActions
    │
    ├─ handleAdd ────────────┐
    └─ handleUpdate ─────────┼───────┐
                            │       │
                            ▼       ▼
                      buildDefaultActions
                            │
                            ▼
                      Action Buttons
                            │
                            ▼
                    TableActions Component
```

## File Organization

```
table/
├── hooks/                          # Custom React hooks
│   ├── index.ts                   # Barrel export
│   ├── useTableSort.ts            # Sorting logic
│   ├── useTableSearch.ts          # Search/filter logic
│   ├── useTableActions.tsx        # CRUD modals
│   └── useTableScroll.ts          # Scroll calculations
│
├── utils/                          # Utility functions
│   └── tableUtils.tsx             # Action builders & column enhancers
│
├── index.tsx                       # Main component
├── topBar.tsx                      # TopBar component
├── tableActions.tsx                # Actions dropdown
├── CustomPagination.tsx            # Pagination component
├── modalButtons.tsx                # Modal action buttons
├── EmptyStateComp.tsx             # Empty state
│
└── docs/                           # Documentation
    ├── README.md                  # Architecture guide
    ├── REFACTORING_SUMMARY.md     # Refactoring details
    └── STRUCTURE.md               # This file
```

## Responsibilities

### Main Component (index.tsx)
- Props handling
- State orchestration
- Component composition
- Render logic

### Hooks
- **useTableSort**: Sorting state and handlers
- **useTableSearch**: Data filtering
- **useTableActions**: Modal management
- **useTableScroll**: Layout calculations

### Utils
- **buildDefaultActions**: Action array construction
- **enhanceColumnsWithSort**: Column transformation

### Sub-components
- **TopBar**: Search, filters, actions bar
- **TableActions**: Action dropdown menu
- **CustomPagination**: Pagination controls
- **ModalButtons**: Form action buttons

## Props Flow

```
Parent Component
    │
    ├─ Data Props ────────┐
    ├─ Callback Props ────┤
    ├─ Config Props ──────┤
    └─ UI Props ──────────┤
                         │
                         ▼
                   Table Component
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
   useTableSort    useTableSearch   useTableActions
        │                │                │
        └────────────────┴────────────────┘
                         │
                         ▼
                  Render Components
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
    TopBar        Ant Table      CustomPagination
```

## Benefits of This Structure

1. **Clear Separation**: Each layer has distinct responsibilities
2. **Reusability**: Hooks can be used in other components
3. **Testability**: Each piece can be tested independently
4. **Maintainability**: Changes are localized
5. **Scalability**: Easy to add new features
6. **Type Safety**: TypeScript interfaces at each layer
