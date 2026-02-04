import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { useRegistrationStore } from "@/store/registrationStore";
import { StepWrapper } from "../StepWrapper";
import { FileUpload } from "../FileUpload";
import { sanitizeNumericInput, getFileTypeError } from "@/utils/validation";

export const Step3Contact: React.FC = () => {
  const { formData, updateSection } = useRegistrationStore();
  const t = useTranslations("register");

  const validationSchema = Yup.object({
    hotline: Yup.string()
      .required(t("validation.hotline_invalid"))
      .test("is-valid-hotline", t("validation.hotline_invalid"), (value) =>
        value ? /^1\d{4}$/.test(value) : false
      ),
    phoneNumber: Yup.string()
      .required(t("validation.phone_invalid"))
      .test("is-valid-phone", t("validation.phone_invalid"), (value) =>
        value ? /^01[0125]\d{8}$/.test(value) : false
      ),
    website: Yup.string().url(t("validation.url_invalid")).notRequired(),
  });

  const formik = useFormik({
    initialValues: {
      hotline: formData.contact.hotline,
      phoneNumber: formData.contact.phoneNumber,
      website: formData.contact.website,
    },
    validationSchema,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: () => {},
  });

  const [logoError, setLogoError] = React.useState<string>("");

  const handleChange = (
    field: keyof typeof formData.contact,
    value: string
  ) => {
    if (field === "hotline" || field === "phoneNumber") {
      value = sanitizeNumericInput(value);
    }

    updateSection("contact", { [field]: value });
    formik.setFieldValue(field, value, false);
    formik.setFieldTouched(field, true, false);
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      const error = getFileTypeError(file);
      if (error) {
        setLogoError(error);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        updateSection("contact", {
          companyLogo: file,
          companyLogoPreview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    } else {
      updateSection("contact", {
        companyLogo: null,
        companyLogoPreview: undefined,
      });
    }

    setLogoError("");
  };

  const getError = (field: keyof typeof formik.values) => {
    if (formik.touched[field] && formik.errors[field]) {
      return formik.errors[field];
    }
    return undefined;
  };

  return (
    <StepWrapper
      stepNumber={3}
      title={t("step3.title")}
      subtitle={t("step3.subtitle")}
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
      <div className="space-y-5">
        {/* Website */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("step3.website")}
          </label>
          <input
            type="url"
            value={formik.values.website}
            onChange={(e) => handleChange("website", e.target.value)}
            placeholder={t("step3.website_placeholder")}
            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2
              ${
                getError("website")
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-red-500"
              }`}
          />
          {getError("website") && (
            <p className="mt-1 text-sm text-red-500">{getError("website")}</p>
          )}
        </div>

        {/* Hotline & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("step3.hotline")} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              inputMode="numeric"
              value={formik.values.hotline}
              onChange={(e) => handleChange("hotline", e.target.value)}
              placeholder={t("step3.hotline_placeholder")}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2
                ${
                  getError("hotline")
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-red-500"
                }`}
            />
            {getError("hotline") && (
              <p className="mt-1 text-sm text-red-500">{getError("hotline")}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("step3.phone_number")} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              inputMode="numeric"
              value={formik.values.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              placeholder={t("step3.phone_placeholder")}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2
                ${
                  getError("phoneNumber")
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-red-500"
                }`}
            />
            {getError("phoneNumber") && (
              <p className="mt-1 text-sm text-red-500">
                {getError("phoneNumber")}
              </p>
            )}
          </div>
        </div>

        {/* Company Logo */}
        <FileUpload
          label={t("step3.company_logo")}
          file={formData.contact.companyLogo}
          preview={formData.contact.companyLogoPreview}
          onChange={handleFileChange}
          error={logoError}
        />
      </div>
    </StepWrapper>
  );
};
