import React, { useState } from "react";
import { Input, Button, DatePicker, Select, Space, Dropdown, Menu, Slider } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  DownloadOutlined,
  FilePdfOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { useTranslations } from "next-intl";
import GenericFilter, { GenericFilterProps } from "./GenericFilter";
import dayjs from "dayjs";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import ButtonComp from "../buttonComp";

const { RangePicker } = DatePicker;
const { Search } = Input;

export interface TopBarProps {
  showExport?: boolean;
  onResetFilter?: () => void;
  onApplyFilter?: (filter: any) => void;
  tabsGeneric?: any[];
  showCreateButton?: boolean;
  onCreate?: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showTabbedFilter?: boolean;
  projectNames?: Array<{ id: number; name: string }>;
  onProjectSelect?: (projectId: string | null) => void;
  projectTypes?: string[];
  onProjectTypeSelect?: (projectType: string | null) => void;
  statuses?: string[];
  onStatusSelect?: (status: string | null) => void;
  hideSearch?: boolean;
  showDateFilter?: boolean;
  startDate?: string;
  endDate?: string;
  onDateRangeChange?: (
    startDate: string | null,
    endDate: string | null
  ) => void;
  FilterDropdown?: boolean;
  dropDownOptions?: any;
  onPdfDownload?: (data?: any) => void;
  children?: React.ReactNode;
  genericFilters?: GenericFilterProps[];
  advancedFilters?: React.ReactNode;
  hasFilters?: boolean;
  searchPlaceholder?: string;
  searchStyleTw?: string;
}

const TopBar: React.FC<TopBarProps> = ({
  showExport,
  onResetFilter,
  onApplyFilter,
  tabsGeneric,
  showCreateButton,
  onCreate,
  searchValue,
  onSearchChange,
  showTabbedFilter,
  projectNames,
  onProjectSelect,
  projectTypes,
  onProjectTypeSelect,
  statuses,
  onStatusSelect,
  hideSearch,
  showDateFilter,
  startDate,
  endDate,
  onDateRangeChange,
  FilterDropdown,
  dropDownOptions,
  onPdfDownload,
  children,
  genericFilters,
  advancedFilters,
  hasFilters,
  searchPlaceholder, searchStyleTw
}) => {
  const t = useTranslations();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleReset = () => {
    if (onResetFilter) {
      onResetFilter();
      setShowAdvanced(false);
    }
  };

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

          {/* Filters Toggle Button */}
          {advancedFilters && (
            <ButtonComp
              onClick={() => setShowAdvanced(!showAdvanced)}
              // icon={<SlidersHorizontal className="w-4 h-4" />}
              className={`h-[40px] rounded-[5px] flex items-center gap-2 border border-[2px] px-3 ${
                showAdvanced
                  ? "!bg-primary-dark !border-primary-dark !text-white hover:!bg-primary-dark/90"
                  : "!bg-transparent border-gray-200 !text-gray-300"
                }`}
              types={!showAdvanced ? "ghost" : "primary"}
            >
              <SlidersHorizontal className={`w-4 h-4 ${showAdvanced ? "!text-white" : "!text-gray-300"}`} />
              {t("filters.label")}
            </ButtonComp>
          )}

          {/* Date Range Filter */}
          {showDateFilter && (
            <RangePicker
              className="h-[40px] rounded-[5px]"
              value={
                startDate && endDate
                  ? [dayjs(startDate), dayjs(endDate)]
                  : undefined
              }
              onChange={(dates, dateStrings) => {
                if (onDateRangeChange) {
                  onDateRangeChange(dateStrings[0], dateStrings[1]);
                }
              }}
            />
          )}

          {/* Status Filter */}
          {statuses && statuses.length > 0 && (
            <Select
              placeholder={t("status")}
              style={{ width: 150 }}
              allowClear
              onChange={onStatusSelect}
              suffixIcon={<ChevronDown className="w-4 h-4 text-gray-400" />}
              className="h-[40px] [&_.ant-select-selector]:!w-[250px] [&_.ant-select-selector]:!rounded-[5px] [&_.ant-select-selector]:!h-[40px] [&_.ant-select-selection-item]:!leading-[38px] [&_.ant-select-selection-placeholder]:text-black! [&_.ant-select-placeholder]:text-black!"
            >
              {statuses.map((status) => (
                <Select.Option key={status} value={status}>
                  {status}
                </Select.Option>
              ))}
            </Select>
          )}

          {/* Project Filter */}
          {projectNames && projectNames.length > 0 && (
            <Select
              placeholder={t("project")}
              style={{ width: 200 }}
              allowClear
              onChange={onProjectSelect}
              suffixIcon={<ChevronDown className="w-4 h-4 text-gray-400" />}
              className="!h-[30px] [&_.ant-select-selector]:!rounded-[5px] [&_.ant-select-selector]:!h-[30px] [&_.ant-select-selection-item]:!leading-[38px] [&_.ant-select-selection-placeholder]:text-black! [&_.ant-select-placeholder]:text-black!"
            >
              {projectNames.map((project) => (
                <Select.Option key={project.id} value={String(project.id)}>
                  {project.name}
                </Select.Option>
              ))}
            </Select>
          )}

          {/* Custom Children (Additional Filters) */}
          {children}

          {/* Clear All Button */}
          {hasFilters && onResetFilter && (
            <ButtonComp
              onClick={handleReset}
              types="ghost"
              className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm px-2 h-[40px] ms-auto"
            >
              <X className="w-4 h-4" />
              <span>{t("clear_all")}</span>
            </ButtonComp>
          )}
        </div>
      </div>

      {/* Advanced Filters Section */}
      {advancedFilters && showAdvanced && (
        <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-x-8 gap-y-4 items-end animate-in fade-in slide-in-from-top-2 duration-200">
          {advancedFilters}
        </div>
      )}
    </div>
  );
};

export default TopBar;
