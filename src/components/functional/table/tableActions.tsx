import React from "react";
import { Button, Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { IAction } from "./index";

interface TableActionsProps {
  actions: IAction[];
  record: any;
}

const TableActions: React.FC<TableActionsProps> = ({ actions, record }) => {
  const visibleActions = actions.filter(
    (action) => !action.hide || !action.hide(record)
  );
  if (visibleActions.length === 0) return null;

  // If only one action, render it directly
  if (visibleActions.length === 1) {
    const action = visibleActions[0];
    if (action.customRender) {
      return action.customRender(record);
    }
    return (
      <Button
        type={action.danger ? "primary" : "default"}
        danger={action.danger}
        disabled={action.disabled}
        icon={action.icon}
        onClick={(e) => {
          e.stopPropagation();
          action.onClick(record);
        }}
        className="flex items-center gap-2"
      >
        {action.label}
      </Button>
    );
  }

  // If multiple actions, use dropdown
  return (
    <Dropdown
      menu={{
        items: visibleActions.map((action, index) => ({
          key: index,
          label: action.customRender ? (
            action.customRender(record)
          ) : (
            <div className="flex items-center gap-2">
              {action.icon}
              <span>{action.label}</span>
            </div>
          ),
          disabled: action.disabled,
          danger: action.danger,
          onClick: action.customRender
            ? undefined
            : (e) => {
                e.domEvent.stopPropagation();
                action.onClick(record);
              },
        })),
      }}
      trigger={["click"]}
    >
      <Button
        type="text"
        icon={<MoreOutlined />}
        onClick={(e) => e.stopPropagation()}
      />
    </Dropdown>
  );
};

export default TableActions; 