import { Form, FormInstance } from "antd";
import { formFieldsType } from "@/components/form/formComp";
import FormComp from "@/components/form/formComp";
import ModalButtons from "../modalButtons";
import { generalStore } from "@/store/generalStore";
import { useTranslations } from "next-intl";

interface UseTableActionsProps {
  formFields?: formFieldsType;
  formFieldsUpdate?: formFieldsType;
  additionalUpdateValues?: Record<string, any>;
  onAdd?: (values: any) => Promise<any>;
  onUpdate?: (id: string | number, values: any) => Promise<any>;
  onDelete?: (id: string | number) => Promise<any>;
  addButtonText?: string;
  addButtonSubText?: string;
  fieldMapping?: Record<string, string>;
  transformForForm?: (values: any) => any;
  rowKey?: string;
  title?: string;
  formRefAdd?: FormInstance;
  formRefEdit?: FormInstance;
  showModal: (config: any) => void;
  hideModal: () => void;
}

export const useTableActions = ({
  formFields = [],
  formFieldsUpdate,
  additionalUpdateValues = {},
  onAdd,
  onUpdate,
  onDelete,
  addButtonText = "Add New",
  addButtonSubText = "",
  fieldMapping = {},
  transformForForm,
  rowKey = "id",
  title = "",
  formRefAdd,
  formRefEdit,
  showModal,
  hideModal,
}: UseTableActionsProps) => {
  const formRefCreate = formRefAdd || Form.useForm()[0];
  const formRefUpdate = formRefEdit || Form.useForm()[0];
  const t = useTranslations();
  const updateFields = formFieldsUpdate || [];
  const defaultFields = formFields || [];

  const handleAdd = () => {
    if (!formFields?.length) return;

    const onFinish = async (values: any) => {
      try {
        if (onAdd) {
          const response = await onAdd(values);
          if (response?.success === true) {
            hideModal();
            formRefCreate?.resetFields();
          }
        }
      } catch (error) {
        console.error("Error adding item:", error);
      }
    };

    showModal({
      content: (
        <div className="px-2">
          <h2 className="text-xl font-semibold mb-1">{addButtonText}</h2>
          <p className="text-gray-600 mb-4">{addButtonSubText}</p>
          <FormComp
            form={formRefCreate}
            fileds={formFields}
            onFinish={onFinish}
            layout="vertical"
            submitText="Submit"
            submitStyleTw="w-full bg-primary text-white py-3 rounded-lg font-medium"
            responsiveRows
          />
          <ModalButtons formRef={formRefCreate} hideModal={hideModal} />
        </div>
      ),
    });
  };

  const handleUpdate = (record: any) => {
    const hasUpdateFields = updateFields.length > 0;
    const hasDefaultFields = defaultFields.length > 0;

    if ((!hasDefaultFields && !hasUpdateFields) || !onUpdate) return;

    const initialValues = {
      ...record,
      ...Object.entries(fieldMapping).reduce(
        (acc, [formField, dataField]) => ({
          ...acc,
          [formField]: record[dataField],
        }),
        {},
      ),
      ...additionalUpdateValues,
    };

    const transformedValues = transformForForm
      ? transformForForm(initialValues)
      : initialValues;

    formRefUpdate?.setFieldsValue(transformedValues);

    const onFinish = async (values: any) => {
      generalStore.getState().updateGeneral({ loadingKey: "update" });
      try {
        const response = await onUpdate(record[rowKey], values);
      } catch (error) {
        console.error("Error updating item:", error);
      } finally {
        hideModal();
        formRefUpdate?.resetFields();
        generalStore.getState().updateGeneral({ loadingKey: "" });
      }
    };

    showModal({
      content: (
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">
            {t("update")} {title}
          </h2>
          <FormComp
            form={formRefUpdate}
            fileds={updateFields.length > 0 ? updateFields : defaultFields}
            initialValues={transformedValues}
            onFinish={onFinish}
            layout="vertical"
            submitText="Update"
            submitStyleTw="w-full bg-primary text-white py-3 rounded-lg font-medium"
            responsiveRows
          />
          <ModalButtons
            formRef={formRefUpdate}
            hideModal={hideModal}
            loadingKey="update"
          />
        </div>
      ),
    });
  };

  return {
    formRefCreate,
    formRefUpdate,
    handleAdd,
    handleUpdate,
  };
};
