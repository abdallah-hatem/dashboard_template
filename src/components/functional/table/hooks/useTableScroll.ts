import { useMemo } from "react";

interface UseTableScrollProps {
  dataSource?: any[];
  filteredData?: any[];
  searchable?: boolean;
  serverPagination?: boolean;
  isRTL?: boolean;
  scroll?: { x?: number | string; y?: number | string };
}

export const useTableScroll = ({
  dataSource = [],
  filteredData = [],
  searchable = false,
  serverPagination = false,
  isRTL = false,
  scroll = { x: 1000 },
}: UseTableScrollProps) => {
  const needsVerticalScroll = useMemo(() => {
    const estimatedRowHeight = 54;
    const tableHeaderHeight = 55;
    const maxViewportHeight =
      typeof window !== "undefined" ? window.innerHeight * 0.45 : 400;
    const maxVisibleRows = Math.floor(
      (maxViewportHeight - tableHeaderHeight) / estimatedRowHeight,
    );

    const currentData =
      searchable && !serverPagination ? filteredData : dataSource || [];
    return currentData?.length > maxVisibleRows;
  }, [dataSource?.length, filteredData?.length, searchable, serverPagination]);

  const tableScroll = useMemo(() => {
    if (isRTL) {
      return {
        x: scroll?.x || 1000,
        y: needsVerticalScroll ? "45vh" : undefined,
      };
    }

    return {
      x: scroll?.x || 1000,
      y: needsVerticalScroll ? "45vh" : undefined,
    };
  }, [needsVerticalScroll, isRTL, scroll]);

  return {
    needsVerticalScroll,
    tableScroll,
  };
};
