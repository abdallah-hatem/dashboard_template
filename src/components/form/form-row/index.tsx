// FormRow.tsx
import React from "react";
import type { RowProps } from "antd";

import { Col, Row } from "antd";
import MyFormItem, { MyFormItemProps, ControlTypes } from "../form-item";
import { FormItemRow } from "../formComp";

interface FormRowProps {
  fields: MyFormItemProps<ControlTypes>[];
  colProps?: { span: number; offset?: number }[];
  rowProps?: RowProps;
}

const FormRow: React.FC<FormRowProps> = ({ fields, colProps, rowProps }) => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-4">
      {fields.map((field, index) => (
        <div key={field.name?.toString() || index} className="flex-1 min-w-[200px]">
          <MyFormItem {...field} />
        </div>
      ))}
    </div>
  );
};

export default FormRow;
