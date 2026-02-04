import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslations } from "next-intl";

import { useRegistrationStore } from "@/store/registrationStore";
import { StepWrapper } from "../StepWrapper";
import { sanitizeNumericInput } from "@/utils/validation";

export const Step5Branch: React.FC = () => {
  const { formData, updateSection } = useRegistrationStore();
  const t = useTranslations("register");

  const validationSchema = Yup.object({
    branchName: Yup.string().required(t("validation.please_enter_branch_name")),
    branchAddress: Yup.string().required(
      t("validation.please_enter_branch_address")
    ),
    branchEmail: Yup.string()
      .email(t("validation.email_invalid"))
      .required(t("validation.email_invalid")),
    branchHotline: Yup.string().notRequired(),
    branchPhone: Yup.string().notRequired(),
  });

  const formik = useFormik({
    initialValues: {
      branchName: formData.branch.branchName,
      branchAddress: formData.branch.branchAddress,
      branchEmail: formData.branch.branchEmail,
      branchHotline: formData.branch.branchHotline,
      branchPhone: formData.branch.branchPhone,
    },
    validationSchema,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: () => {},
  });

  const handleChange = (field: keyof typeof formData.branch, value: string) => {
    if (field === "branchHotline" || field === "branchPhone") {
      value = sanitizeNumericInput(value);
    }

    updateSection("branch", { [field]: value });
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
      stepNumber={5}
      title={t("step5.title")}
      subtitle={t("step5.subtitle")}
      onNext={async () => {
        // Validate all fields
        const errors = await formik.validateForm();

        // Mark all fields as touched to show all errors
        formik.setTouched(
          Object.keys(formik.values).reduce((acc, key) => {
            acc[key as keyof typeof formik.values] = true;
            return acc;
          }, {} as Record<string, boolean>)
        );

        // If there are errors, do not proceed
        if (Object.keys(errors).length > 0) {
          return false;
        }

        return true;
      }}
    >
      <div className="bg-red-50 border border-red-200 rounded-xl p-3 my-5">
        <p className="text-sm text-red-600 font-medium">
          {t("step5.main_branch_note")}
        </p>
      </div>

      <div className="space-y-5">
        {/* Branch Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("step5.branch_name")} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formik.values.branchName}
            onChange={(e) => handleChange("branchName", e.target.value)}
            placeholder={t("step5.branch_name_placeholder")}
            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2
              ${
                getError("branchName")
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-red-500"
              }`}
          />
          {getError("branchName") && (
            <p className="mt-1 text-sm text-red-500">
              {getError("branchName")}
            </p>
          )}
        </div>

        {/* Branch Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("step5.branch_address")} <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={3}
            value={formik.values.branchAddress}
            onChange={(e) => handleChange("branchAddress", e.target.value)}
            placeholder={t("step5.branch_address_placeholder")}
            className={`w-full px-4 py-2.5 border rounded-lg resize-none focus:outline-none focus:ring-2
              ${
                getError("branchAddress")
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-red-500"
              }`}
          />
          {getError("branchAddress") && (
            <p className="mt-1 text-sm text-red-500">
              {getError("branchAddress")}
            </p>
          )}
        </div>

        {/* Hotline & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("step5.branch_hotline")}
            </label>
            <input
              type="tel"
              inputMode="numeric"
              value={formik.values.branchHotline}
              onChange={(e) => handleChange("branchHotline", e.target.value)}
              placeholder="19999"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("step5.branch_phone")}
            </label>
            <input
              type="tel"
              inputMode="numeric"
              value={formik.values.branchPhone}
              onChange={(e) => handleChange("branchPhone", e.target.value)}
              placeholder="01234567890"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Branch Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("step5.branch_email")} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formik.values.branchEmail}
            onChange={(e) => handleChange("branchEmail", e.target.value)}
            placeholder={t("step5.branch_email_placeholder")}
            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2
              ${
                getError("branchEmail")
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-red-500"
              }`}
          />
          {getError("branchEmail") && (
            <p className="mt-1 text-sm text-red-500">
              {getError("branchEmail")}
            </p>
          )}
        </div>
      </div>
    </StepWrapper>
  );
};
