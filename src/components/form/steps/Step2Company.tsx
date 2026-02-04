import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslations } from "next-intl";

import { useRegistrationStore } from "@/store/registrationStore";
import { StepWrapper } from "../StepWrapper";

export const Step2Company: React.FC = () => {
  const { formData, updateSection } = useRegistrationStore();
  const t = useTranslations("register");

  const validationSchema = Yup.object({
    companyName: Yup.string().required(
      t("validation.please_enter_company_name")
    ),
    commercialRegistrationId: Yup.string().required(
      t("validation.please_enter_commercial_reg")
    ),
    taxId: Yup.string().required(t("validation.please_enter_tax_id")),
    companyAddress: Yup.string().required(
      t("validation.please_enter_company_address")
    ),
  });

  const formik = useFormik({
    initialValues: {
      companyName: formData.company.companyName,
      commercialRegistrationId: formData.company.commercialRegistrationId,
      taxId: formData.company.taxId,
      companyAddress: formData.company.companyAddress,
    },
    validationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
    onSubmit: () => {},
  });

  const handleChange = (
    field: keyof typeof formData.company,
    value: string
  ) => {
    updateSection("company", { [field]: value });
    formik.setFieldValue(field, value, false);
    formik.setFieldTouched(field, true, false);
  };

  const getError = (field: keyof typeof formik.values) => {
    if (formik.touched[field] && formik.errors[field]) {
      return formik.errors[field];
    }
    return undefined;
  };

  return (
    <StepWrapper
      stepNumber={2}
      title={t("step2.title")}
      subtitle={t("step2.subtitle")}
      onNext={async () => {
        const errors = await formik.validateForm();

        formik.setTouched(
          Object.keys(formik.values).reduce((acc, key) => {
            acc[key as keyof typeof formik.values] = true;
            return acc;
          }, {} as Record<string, boolean>)
        );

        if (Object.keys(errors).length > 0) {
          return false;
        }

        return true;
      }}
    >
      <div className="space-y-5">
        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("step2.company_name")} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formik.values.companyName}
            onChange={(e) => handleChange("companyName", e.target.value)}
            placeholder={t("step2.company_name_placeholder")}
            className={`flex w-full h-11 rounded-xl border px-3 py-2 text-sm
                ${
                  getError("companyName")
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-red-500"
                }`}
          />
          {getError("companyName") && (
            <p className="mt-1 text-sm text-red-500">
              {getError("companyName")}
            </p>
          )}
        </div>

        {/* Commercial Registration ID & Tax ID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("step2.commercial_reg_id")}{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formik.values.commercialRegistrationId}
              onChange={(e) =>
                handleChange("commercialRegistrationId", e.target.value)
              }
              placeholder={t("step2.commercial_reg_placeholder")}
              className={`flex w-full h-11 rounded-xl border px-3 py-2 text-sm
                  ${
                    getError("commercialRegistrationId")
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-red-500"
                  }`}
            />
            {getError("commercialRegistrationId") && (
              <p className="mt-1 text-sm text-red-500">
                {getError("commercialRegistrationId")}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("step2.tax_id")} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formik.values.taxId}
              onChange={(e) => handleChange("taxId", e.target.value)}
              placeholder={t("step2.tax_id_placeholder")}
              className={`flex w-full h-11 rounded-xl border px-3 py-2 text-sm
                  ${
                    getError("taxId")
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-red-500"
                  }`}
            />
            {getError("taxId") && (
              <p className="mt-1 text-sm text-red-500">{getError("taxId")}</p>
            )}
          </div>
        </div>

        {/* Company Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("step2.company_address")} <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={3}
            value={formik.values.companyAddress}
            onChange={(e) => handleChange("companyAddress", e.target.value)}
            placeholder={t("step2.company_address_placeholder")}
            className={`flex w-full rounded-xl border px-3 py-2 text-sm resize-none
                ${
                  getError("companyAddress")
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-red-500"
                }`}
          />
          {getError("companyAddress") && (
            <p className="mt-1 text-sm text-red-500">
              {getError("companyAddress")}
            </p>
          )}
        </div>
      </div>
    </StepWrapper>
  );
};
