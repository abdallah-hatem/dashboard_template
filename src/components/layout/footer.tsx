"use client";
import { useTranslations } from "next-intl";

export const Footer = () => {
  const t = useTranslations();
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="flex items-center justify-center h-[40px]  text-[14px] font-normal">
      <p>
        © {year} <span className="font-bold text-red-700">Esystematic</span> - {" "}
        {/* {t("rightsSaved")} */}
      </p>
    </div>
  );
};
