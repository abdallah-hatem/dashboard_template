"use client";

import React from "react";
import { Select } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

export interface FilterOption {
  label: string;
  value: string | number;
}

export interface GenericFilterProps {
  filterKey: string;
  label: string;
  options: FilterOption[];
  placeholder?: string;
  width?: string | number;
  icon?: React.ReactNode;
  defaultValue?: string | number;
}

const GenericFilter: React.FC<GenericFilterProps> = ({
  filterKey,
  label,
  options,
  placeholder,
  width = 200,
  icon,
  defaultValue,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentValue = searchParams.get(filterKey) || defaultValue;

  const handleChange = (value: string | number | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(filterKey, String(value));
    } else {
      params.delete(filterKey);
    }

    // Reset page to 1 when filter changes
    params.delete("page");

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Select
      prefix={<span className="text-gray-400">{icon}</span>}
      placeholder={placeholder || label}
      style={{ width }}
      allowClear
      value={currentValue ? String(currentValue) : undefined}
      onChange={handleChange}
      options={options}
      className="h-[40px] [&_.ant-select-selector]:rounded-[5px]! [&_.ant-select-selector]:h-[40px]! [&_.ant-select-selection-item]:leading-[38px]! [&_.ant-select-selection-placeholder]:flex! [&_.ant-select-selection-placeholder]:items-center! [&_.ant-select-placeholder]:text-black! [&_.ant-select-selection-placeholder]:text-black!"
      labelInValue={false}
      suffixIcon={<ChevronDown className="w-4 h-4 text-gray-400" />}
    />
  );
};

export default GenericFilter;
