import { DeleteOutlined, EditOutlined, EditFilled, ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import ButtonComp from "@/components/functional/buttonComp";
import { IAction } from "../index";
import type { ColumnsType } from "antd/es/table";
import { SortState } from "../hooks/useTableSort";

interface BuildDefaultActionsProps {
  actions: IAction[];
  hideDefaultDelete?: boolean;
  hideDefaultUpdate?: boolean;
  onDelete?: (id: string | number) => Promise<any>;
  onUpdate?: (id: string | number, values: any) => Promise<any>;
  defaultFields: any[];
  updateFields: any[];
  handleUpdate: (record: any) => void;
  rowKey: string;
  t: (key: string) => string;
}

export const buildDefaultActions = ({
  actions,
  hideDefaultDelete,
  hideDefaultUpdate,
  onDelete,
  onUpdate,
  defaultFields,
  updateFields,
  handleUpdate,
  rowKey,
  t,
}: BuildDefaultActionsProps): IAction[] => {
  const allActions = [...actions];

  if (!hideDefaultDelete && onDelete) {
    allActions.push({
      label: t("delete"),
      icon: <DeleteOutlined />,
      onClick: () => {},
      danger: true,
      customRender: (record: any) => (
        <Popconfirm
          placement="topLeft"
          title={t("delete_confirmation")}
          description={t("are_you_sure_you_want_to_delete_this_item")}
          okText={t("yes")}
          cancelText={t("no")}
          okType="danger"
          onConfirm={async () => {
            try {
              await onDelete(record[rowKey]);
            } catch (error) {
              console.error("Error deleting item:", error);
            }
          }}
        >
          <div className="flex items-center gap-2 w-full">
            <DeleteOutlined />
            <span>{t("delete")}</span>
          </div>
        </Popconfirm>
      ),
    });
  }

  if (
    !hideDefaultUpdate &&
    onUpdate &&
    (defaultFields.length > 0 || updateFields.length > 0)
  ) {
    allActions.unshift({
      label: t("update"),
      icon: <EditOutlined />,
      onClick: handleUpdate,
      customRender: (record: any) => (
        <ButtonComp
          onClick={() => handleUpdate(record)}
          types="ghost"
          className="!text-black"
        >
          <EditFilled className="w-4 h-4" />
          {t("edit")}
        </ButtonComp>
      ),
    });
  }

  return allActions;
};

interface EnhanceColumnsWithSortProps<T> {
  columns: ColumnsType<T>;
  sortable: boolean;
  sortState: SortState;
  handleSort: (columnKey: string) => void;
  isRTL: boolean;
}

export const enhanceColumnsWithSort = <T extends object>({
  columns,
  sortable,
  sortState,
  handleSort,
  isRTL,
}: EnhanceColumnsWithSortProps<T>): ColumnsType<T> => {
  return columns.map((column) => {
    if (
      !sortable ||
      !("key" in column) ||
      !column.key ||
      !(column as any).sortable
    )
      return {
        ...column,
        title: (
          <div className="ltr:text-left rtl:text-right text-[14px] text-[#8B8893] font-normal uppercase">
            {column.title as string}
          </div>
        ),
      };

    const columnKey = Array.isArray(column.key)
      ? column.key.join(".")
      : String(column.key);

    const isCurrentSort = sortState.sort_by === columnKey;
    const sortOrder = isCurrentSort ? sortState.sort : null;

    return {
      ...column,
      title: (
        <div
          className={`flex items-center justify-between cursor-pointer select-none group ${
            isRTL ? "flex-row-reverse" : "flex-row"
          }`}
          onClick={() => handleSort(columnKey)}
        >
          <span>{column.title as string}</span>
          <div className="flex flex-col ml-2 opacity-50 group-hover:opacity-100 transition-opacity">
            {isCurrentSort && sortOrder === "asc" ? (
              <ArrowUpOutlined />
            ) : (
              <ArrowDownOutlined />
            )}
          </div>
        </div>
      ) as React.ReactNode,
    };
  });
};
