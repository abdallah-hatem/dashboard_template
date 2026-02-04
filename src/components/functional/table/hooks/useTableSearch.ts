import { useState, useEffect } from "react";

interface UseTableSearchProps<T> {
  dataSource?: T[];
  searchable?: boolean;
  serverPagination?: boolean;
}

export const useTableSearch = <T extends object>({
  dataSource,
  searchable = false,
  serverPagination = false,
}: UseTableSearchProps<T>) => {
  const [filteredData, setFilteredData] = useState<T[]>(dataSource || []);

  useEffect(() => {
    setFilteredData(dataSource || []);
  }, [dataSource]);

  const handleSearch = (value: string) => {
    if (!value) {
      setFilteredData(dataSource || []);
      return;
    }

    const searchLower = value.toLowerCase();
    const filtered = (dataSource || [])?.filter((item: any) => {
      return Object.keys(item).some((key) => {
        const val = item[key];
        if (val === null || val === undefined) return false;
        return String(val).toLowerCase().includes(searchLower);
      });
    });
    setFilteredData(filtered);
  };

  const getCurrentData = () => {
    return searchable && !serverPagination ? filteredData : dataSource || [];
  };

  return {
    filteredData,
    handleSearch,
    getCurrentData,
  };
};
