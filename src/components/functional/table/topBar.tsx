import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";
import GenericFilter, { GenericFilterProps } from "./GenericFilter";

export interface TopBarProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  hideSearch?: boolean;
  genericFilters?: GenericFilterProps[];
  searchPlaceholder?: string;
  searchStyleTw?: string;
}

const TopBar: React.FC<TopBarProps> = ({
  searchValue,
  onSearchChange,
  hideSearch,
  genericFilters,
  searchPlaceholder,
  searchStyleTw,
}) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-4 mb-5 p-4 rounded-lg border border-gray-200 bg-white">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-3 flex-wrap flex-1">
          {/* Search */}
          {!hideSearch && (
            <Input
              placeholder={searchPlaceholder || t("search")}
              prefix={<SearchOutlined className="text-gray-400" />}
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className={`!max-w-[350px] !h-[40px] !rounded-[5px] ${searchStyleTw}`}
              allowClear
            />
          )}

          {/* Generic Filters */}
          {genericFilters?.map((filter, index) => (
            <GenericFilter key={filter.filterKey || index} {...filter} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
