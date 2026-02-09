import React from "react";
// import arrowLeft from "@/assets/svgs/arrow-left.svg";
// import arrowRight from "@/assets/svgs/arrow-right.svg";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import useIsArabic from "@/hooks/useIsArabic";
interface CustomPaginationProps {
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
  showCount?: boolean;
}

const getPages = (current: number, totalPages: number) => {
  const pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    if (current <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", totalPages);
    } else if (current >= totalPages - 3) {
      pages.push(
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      );
    } else {
      pages.push(
        1,
        "...",
        current - 1,
        current,
        current + 1,
        "...",
        totalPages,
      );
    }
  }
  return pages;
};

const CustomPagination: React.FC<CustomPaginationProps> = ({
  current,
  pageSize,
  total,
  onChange,
  showCount = true,
}) => {
  const t = useTranslations();
  const totalPages = Math.ceil(total / pageSize);
  const isArabic = useIsArabic(); // Custom hook to determine if the current locale is Arabic

  // Calculate showing range
  const from = (current - 1) * pageSize + 1;
  const to = Math.min(current * pageSize, total);

  if (totalPages <= 1) return null;

  const pages = getPages(current, totalPages);

  return (
    <div
      className={`flex flex-col sm:flex-row ${showCount ? "justify-between" : "justify-end"} items-center gap-4 mt-4`}
    >
      {/* Showing text - conditional */}
      {showCount && (
        <div className="text-sm text-gray-600">
          {t("showing")} {from} {t("to")} {to} {t("from")} {total}
        </div>
      )}

      {/* Pagination controls */}
      <div className="flex items-center gap-1">
        <button
          className="w-8 h-8 rounded-full border bg-white text-gray-700 border-gray-300 hover:bg-gray-100 disabled:opacity-50 flex items-center justify-center cursor-pointer"
          onClick={() => onChange(current - 1)}
          disabled={current === 1}
        >
          {/* <Image 
            src={arrowRight} 
            alt="arrow-right" 
            width={16} 
            height={16} 
            className={isArabic ? 'rotate-180' : ''} 
          /> */}
          <ArrowLeft className={"w-4 h-4 " + (isArabic ? "rotate-180" : "")} />
        </button>
        {pages.map((page, idx) =>
          page === "..." ? (
            <span
              key={idx + Math.random()}
              className="w-8 h-8 flex items-center justify-center"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`w-8 h-8 rounded-full border text-center transition-colors duration-150 cursor-pointer ${
                current === page
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => onChange(Number(page))}
            >
              {page}
            </button>
          ),
        )}
        <button
          className="w-8 h-8 rounded-full border bg-white text-gray-700 border-gray-300 hover:bg-gray-100 disabled:opacity-50 flex items-center justify-center cursor-pointer"
          onClick={() => onChange(current + 1)}
          disabled={current === totalPages}
        >
          {/* <Image 
            src={arrowRight} 
            alt="arrow-right" 
            width={16} 
            height={16} 
            className={isArabic ? 'rotate-180' : ''} 
          /> */}
          <ArrowRight className={"w-4 h-4 " + (isArabic ? "rotate-180" : "")} />
        </button>
      </div>
    </div>
  );
};

export default CustomPagination;
