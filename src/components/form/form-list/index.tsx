import { Form, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { formFieldsType } from "../formComp";
import MyFormItem from "../form-item";

interface FormListProps {
  name: string | number | (string | number)[];
  formListData: formFieldsType;
}

const FormList: React.FC<FormListProps> = ({ name, formListData }) => {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          {fields.map((field, index) => (
            <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
              {formListData.map((item: any) => (
                <MyFormItem
                  {...item}
                  key={item.name[1]}
                  name={[field.name, item.name[1]]}
                  required={item.required}
                />
              ))}
              {fields.length > 1 && (
                <MinusCircleOutlined onClick={() => remove(field.name)} style={{ color: '#ff4d4f' }} />
              )}
            </Space>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Add field
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default FormList; 