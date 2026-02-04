'use client';
import Image from "next/image";
import { useTranslations } from "next-intl";

interface EmptyStateCompProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export default function EmptyStateComp({
  title,
  description,
  icon,
}: EmptyStateCompProps) {
  const t = useTranslations("empty_state");
  return (
    <div className="flex flex-col items-center justify-center h-full py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-[#f7f7f780] flex items-center justify-center mb-4 text-[#8b8893] text-lg">
        {icon}
      </div>

      <h1 className="text-lg font-medium mb-1">
        {title}
      </h1>

      <p className="text-sm text-muted-foreground max-w-[300px]">
        {description}
      </p>
    </div>
  );
}
