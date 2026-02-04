"use client";
import { formFieldsType } from "@/components/form/formComp";
import { IAction } from "@/components/functional/table";

import { useTranslations } from "next-intl";

const useTable = () => {
  const t = useTranslations();

  const columns: any = [
    {
      title: t("listing_count"),
      dataIndex: "listing_count",
      key: "listing_count",
      width: 150,
      render: (listing_count: any) => (
        <div className="truncate" title={listing_count}>
          {listing_count || 0}
        </div>
      ),
    },
    {
      title: t("agents_count"),
      dataIndex: "agents_count",
      key: "agents_count",
      width: 150,
      render: (agents_count: string) => (
        <div className="truncate" title={agents_count}>
          {agents_count || "N/A"}
        </div>
      ),
    },
    {
      title: t("status"),
      dataIndex: "is_master",
      key: "is_master",
      width: 120,
      render: (isMaster: boolean) => (
        <div
          className={`w-fit rounded-full px-2 py-1 font-medium ${
            !isMaster
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {isMaster ? t("main") : t("active")}
        </div>
      ),
    },
  ];

  const actions: IAction[] = [];

  const formFields: formFieldsType = [
    {
      label: t("branch"),
      name: "name",
      type: "input",
      required: true,
      innerProps: {
        placeholder: t("branchNamePlaceholder"),
      },
    },
    {
      label: t("phone"),
      name: "phone",
      type: "input",
      required: true,
      innerProps: {
        type: "number",
        placeholder: t("branchPhonePlaceholder"),
      },
    },
    {
      label: t("address"),
      name: "address",
      type: "input",
      required: true,
      innerProps: {
        placeholder: t("branchAddressPlaceholder"),
      },
    },
  ];

  return { columns, formFields, actions };
};

export default useTable;
