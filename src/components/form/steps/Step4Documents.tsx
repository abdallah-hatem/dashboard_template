import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslations } from "next-intl";

import { useRegistrationStore } from "@/store/registrationStore";
import { StepWrapper } from "../StepWrapper";
import { FileUpload } from "../FileUpload";
import { getFileTypeError } from "@/utils/validation";

export const Step4Documents: React.FC = () => {
  const { formData, updateSection } = useRegistrationStore();
  const t = useTranslations("register");

  const validationSchema = Yup.object({
    commercialRegistrationImage: Yup.mixed().required(
      t("validation.field_required")
    ),
    taxCardFront: Yup.mixed().required(t("validation.field_required")),
    taxCardBack: Yup.mixed().required(t("validation.field_required")),
  });

  const formik = useFormik({
    initialValues: {
      commercialRegistrationImage:
        formData.documents.commercialRegistrationImage,
      taxCardFront: formData.documents.taxCardFront,
      taxCardBack: formData.documents.taxCardBack,
    },
    validationSchema,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: () => {},
  });

  const [fileErrors, setFileErrors] = React.useState<Record<string, string>>(
    {}
  );

  const handleFileChange = (
    field: "commercialRegistrationImage" | "taxCardFront" | "taxCardBack",
    file: File | null
  ) => {
    if (file) {
      const error = getFileTypeError(file);
      if (error) {
        setFileErrors((prev) => ({ ...prev, [field]: error }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const previewField =
          `${field}Preview` as keyof typeof formData.documents;

        updateSection("documents", {
          [field]: file,
          [previewField]: reader.result as string,
        });

        // Only validate & touch the changed field
        formik.setFieldValue(field, file, false);
        formik.setFieldTouched(field, true, false);
      };
      reader.readAsDataURL(file);
    } else {
      const previewField = `${field}Preview` as keyof typeof formData.documents;

      updateSection("documents", {
        [field]: null,
        [previewField]: undefined,
      });

      formik.setFieldValue(field, null, true);
      formik.setFieldTouched(field, true, false);
    }

    setFileErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const getFieldError = (field: keyof typeof formik.values) => {
    if (fileErrors[field]) return fileErrors[field];

    if (formik.touched[field] && formik.errors[field]) {
      return formik.errors[field] as string;
    }

    return undefined;
  };

  return (
    <StepWrapper
      stepNumber={4}
      title={t("step4.title")}
      subtitle={t("step4.subtitle")}
      onNext={async () => {
        const errors = await formik.validateForm();

        if (Object.keys(errors).length > 0) {
          formik.setTouched(
            Object.keys(errors).reduce((acc, key) => {
              acc[key] = true;
              return acc;
            }, {} as Record<string, boolean>)
          );
          return false;
        }

        return true;
      }}
    >
      <div className="my-6 text-gray-500 rounded-lg">
        <p className="text-sm">{t("step4.upload_description")}</p>
      </div>

      <div className="space-y-6">
        <FileUpload
          label={t("step4.commercial_reg_image")}
          required
          file={formData.documents.commercialRegistrationImage}
          preview={formData.documents.commercialRegistrationPreview}
          onChange={(file) =>
            handleFileChange("commercialRegistrationImage", file)
          }
          error={getFieldError("commercialRegistrationImage")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUpload
            label={t("step4.tax_card_front")}
            required
            file={formData.documents.taxCardFront}
            preview={formData.documents.taxCardFrontPreview}
            onChange={(file) => handleFileChange("taxCardFront", file)}
            error={getFieldError("taxCardFront")}
          />

          <FileUpload
            label={t("step4.tax_card_back")}
            required
            file={formData.documents.taxCardBack}
            preview={formData.documents.taxCardBackPreview}
            onChange={(file) => handleFileChange("taxCardBack", file)}
            error={getFieldError("taxCardBack")}
          />
        </div>
      </div>
    </StepWrapper>
  );
};
