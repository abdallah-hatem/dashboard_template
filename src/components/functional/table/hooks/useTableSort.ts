import { useState, useEffect } from "react";

export interface SortState {
  sort_by?: string;
  sort?: "asc" | "desc";
}

interface UseTableSortProps {
  currentSort?: SortState;
  sortable?: boolean;
  onSort?: (sortBy: string, sortOrder: "asc" | "desc") => void;
}

export const useTableSort = ({
  currentSort = {},
  sortable = false,
  onSort,
}: UseTableSortProps) => {
  const [sortState, setSortState] = useState<SortState>(currentSort);

  // Initialize sort state from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sortBy = urlParams.get("sort_by");
    const sortOrder = urlParams.get("sort_direction") as "asc" | "desc";

    if (sortBy && sortOrder && (sortOrder === "asc" || sortOrder === "desc")) {
      setSortState({
        sort_by: sortBy,
        sort: sortOrder,
      });
    }
  }, []);

  const handleSort = (columnKey: string) => {
    if (!sortable || !onSort) return;

    let newSortOrder: "asc" | "desc" = "asc";

    if (sortState.sort_by === columnKey) {
      newSortOrder = sortState.sort === "asc" ? "desc" : "asc";
    }

    const newSortState = {
      sort_by: columnKey,
      sort: newSortOrder,
    };

    setSortState(newSortState);

    // Update URL without page reload
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("sort_by", columnKey);
    currentParams.set("sort_direction", newSortOrder);

    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
    window.history.pushState({}, "", newUrl);

    onSort(columnKey, newSortOrder);
  };

  return {
    sortState,
    handleSort,
  };
};
