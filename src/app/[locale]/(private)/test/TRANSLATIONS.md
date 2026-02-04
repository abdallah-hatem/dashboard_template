# Test Module Translations

## Overview
This document lists all the translation keys used in the test module (testClient.tsx, useTable.tsx, and page.tsx).

## Translation Keys Added

### General Keys

| Key | English | Arabic | Used In |
|-----|---------|--------|---------|
| `branch` | Branch | الفرع | testClient.tsx |
| `add_branch` | Add Branch | إضافة فرع | testClient.tsx |
| `add_branch_sub_text` | Add a new branch to your organization | أضف فرعًا جديدًا إلى مؤسستك | testClient.tsx |
| `search_placeholder` | Search... | بحث... | testClient.tsx |

### Table Column Headers

| Key | English | Arabic | Used In |
|-----|---------|--------|---------|
| `listing_count` | Listing Count | عدد القوائم | useTable.tsx |
| `agents_count` | Agents Count | عدد الوكلاء | useTable.tsx |
| `status` | Status | الحالة | useTable.tsx |

### Status Labels

| Key | English | Arabic | Used In |
|-----|---------|--------|---------|
| `main` | Main | رئيسي | useTable.tsx |
| `active` | Active | نشط | useTable.tsx |

### Form Fields

| Key | English | Arabic | Used In |
|-----|---------|--------|---------|
| `phone` | Phone | الهاتف | useTable.tsx |
| `address` | Address | العنوان | useTable.tsx |

### Form Placeholders

| Key | English | Arabic | Used In |
|-----|---------|--------|---------|
| `branchNamePlaceholder` | Enter branch name | أدخل اسم الفرع | useTable.tsx |
| `branchPhonePlaceholder` | Enter phone number | أدخل رقم الهاتف | useTable.tsx |
| `branchAddressPlaceholder` | Enter branch address | أدخل عنوان الفرع | useTable.tsx |

### Empty State

| Key | English | Arabic | Used In |
|-----|---------|--------|---------|
| `branches_title` | No Branches Found | لم يتم العثور على فروع | testClient.tsx |
| `branches_description` | Start by creating your first branch to manage your organization | ابدأ بإنشاء فرعك الأول لإدارة مؤسستك | testClient.tsx |

## Usage Examples

### In testClient.tsx
```tsx
<Table
  title={t("branch")}
  addButtonText={t("add_branch")}
  addButtonSubText={t("add_branch_sub_text")}
  searchPlaceholder={t("search_placeholder")}
  emptyStateTitle={t("branches_title")}
  emptyStateDescription={t("branches_description")}
/>
```

### In useTable.tsx
```tsx
const columns = [
  {
    title: t("listing_count"),
    dataIndex: "listing_count",
  },
  {
    title: t("agents_count"),
    dataIndex: "agents_count",
  },
  {
    title: t("status"),
    dataIndex: "is_master",
    render: (isMaster: boolean) => (
      isMaster ? t("main") : t("active")
    )
  }
];

const formFields = [
  {
    label: t("branch"),
    name: "name",
    innerProps: {
      placeholder: t("branchNamePlaceholder"),
    },
  },
  {
    label: t("phone"),
    name: "phone",
    innerProps: {
      placeholder: t("branchPhonePlaceholder"),
    },
  },
  {
    label: t("address"),
    name: "address",
    innerProps: {
      placeholder: t("branchAddressPlaceholder"),
    },
  }
];
```

## File Locations

- **English translations**: `src/locales/en.json`
- **Arabic translations**: `src/locales/ar.json`

## Translation Files Structure

All translations use a flat structure with no nested objects:

```json
{
  "branch": "Branch",
  "add_branch": "Add Branch",
  "branches_title": "No Branches Found",
  "branches_description": "Start by creating your first branch"
}
```

## Naming Convention

Related translations use underscore-separated prefixes:
- `branches_title` - Title for branches empty state
- `branches_description` - Description for branches empty state
- `branchNamePlaceholder` - Placeholder for branch name field
