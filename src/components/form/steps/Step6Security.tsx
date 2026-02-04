"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Checkbox, Input } from "antd";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { StepWrapper } from "../StepWrapper";
import { PasswordRequirement } from "@/types/registration";
import { useRegistrationStore } from "@/store/registrationStore";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

export default function CreateNewPasswordForm() {
  const t = useTranslations("general.login");
  const tregister = useTranslations("register.step6");
  const { formData, updateSection } = useRegistrationStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(tregister("email_invalid"))
      .required(tregister("required_field")),
    password: Yup.string()
      .min(8, t("req_min_chars"))
      .matches(/[A-Z]/, t("req_uppercase"))
      .matches(/[a-z]/, t("req_lowercase"))
      .matches(/[0-9]/, t("req_number"))
      .matches(/[!@#$%^&*(),.?":{}|<>]/, t("req_special"))
      .required(tregister("required_field")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], tregister("passwords_not_match"))
      .required(tregister("required_field")),
    acceptTerms: Yup.boolean()
      .oneOf([true], tregister("must_accept_terms"))
      .required(tregister("must_accept_terms")),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      email: formData.security.email,
      password: formData.security.password,
      confirmPassword: formData.security.confirmPassword,
      acceptTerms: false,
    },
    validationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
    onSubmit: () => {
      // Submission is handled by StepWrapper
    },
  });

  const requirements: PasswordRequirement[] = useMemo(
    () => [
      {
        key: "minChars",
        label: t("req_min_chars"),
        test: (p) => p.length >= 8,
      },
      {
        key: "uppercase",
        label: t("req_uppercase"),
        test: (p) => /[A-Z]/.test(p),
      },
      {
        key: "lowercase",
        label: t("req_lowercase"),
        test: (p) => /[a-z]/.test(p),
      },
      { key: "number", label: t("req_number"), test: (p) => /[0-9]/.test(p) },
      {
        key: "special",
        label: t("req_special"),
        test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p),
      },
    ],
    [t]
  );

  useEffect(() => {
    const handleValidation = async () => {
      formik.setTouched({
        email: true,
        password: true,
        confirmPassword: true,
        acceptTerms: true,
      });

      const errors = await formik.validateForm();

      if (Object.keys(errors).length === 0) {
        window.dispatchEvent(new Event("step-6-valid"));
      } else {
        window.dispatchEvent(new Event("step-6-invalid"));
      }
    };

    window.addEventListener("validate-step-6", handleValidation);

    return () =>
      window.removeEventListener("validate-step-6", handleValidation);
  }, [formik]);

  const handleEmailChange = (value: string) => {
    formik.setFieldValue("email", value);
    updateSection("security", { email: value });
  };

  const handlePasswordChange = (value: string) => {
    formik.setFieldValue("password", value);
    updateSection("security", { password: value });
  };

  const handleConfirmPasswordChange = (value: string) => {
    formik.setFieldValue("confirmPassword", value);
    updateSection("security", { confirmPassword: value });
  };

  const handleAcceptTermsChange = (checked: boolean) => {
    formik.setFieldValue("acceptTerms", checked);
  };

  return (
    <StepWrapper stepNumber={6} title="Security" subtitle="Secure your account">
      <form className="mt-6 space-y-4">
        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-700">
            {t("email_label")}
          </label>
          <Input
            type="email"
            value={formik.values.email}
            placeholder={t("email_placeholder")}
            status={formik.touched.email && formik.errors.email ? "error" : ""}
            onChange={(e) => handleEmailChange(e.target.value)}
            onBlur={() => formik.validateField("email")}
            className={`w-full !px-4 !py-2.5 !border !rounded-lg focus:outline-none focus:ring-2
              ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-red-500"
              }`}
          />
          {formik.touched.email && formik.errors.email && (
            <span className="text-xs text-red-500">{formik.errors.email}</span>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-700">
            {t("new_password")}
          </label>
          <Input
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            className={`w-full !px-4 !py-2.5 !border !rounded-lg focus:outline-none focus:ring-2
              ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-red-500"
              }`}
            placeholder={t("new_password_placeholder")}
            status={
              formik.touched.password && formik.errors.password ? "error" : ""
            }
            onChange={(e) => handlePasswordChange(e.target.value)}
            suffix={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />
          {formik.touched.password && formik.errors.password && (
            <span className="text-xs text-red-500">
              {formik.errors.password}
            </span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-700">
            {t("confirm_password")}
          </label>
          <Input
            className={`w-full !px-4 !py-2.5 !border !rounded-lg focus:outline-none focus:ring-2
              ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-red-500"
              }`}
            type={showConfirmPassword ? "text" : "password"}
            value={formik.values.confirmPassword}
            placeholder={t("confirm_password_placeholder")}
            status={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? "error"
                : ""
            }
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            suffix={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <span className="text-xs text-red-500">
              {formik.errors.confirmPassword}
            </span>
          )}
        </div>

        {/* Password Rules */}
        <div className="bg-gray-50 rounded-xl p-4">
          <span className="block text-xs font-medium text-gray-700 mb-2">
            {t("password_requirements")}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {requirements.map((req) => {
              const met = req.test(formik.values.password);
              return (
                <div
                  key={req.key}
                  className={`flex items-center gap-2 text-xs ${
                    met ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {met ? <Check size={12} /> : <X size={12} />}
                  {req.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Terms */}
        <div className="flex flex-col gap-1">
          <Checkbox
            checked={formik.values.acceptTerms}
            onChange={(e) => handleAcceptTermsChange(e.target.checked)}
          >
            <span className="text-sm text-gray-500">
              {tregister("agreeTo")}{" "}
              <Link href="#" className="!text-red-500 !hover:underline">
                {tregister("terms")}
              </Link>{" "}
              {tregister("and")}{" "}
              <Link href="#" className="!text-red-500 !hover:underline">
                {tregister("privacy")}
              </Link>
            </span>
          </Checkbox>
          {formik.touched.acceptTerms && formik.errors.acceptTerms && (
            <span className="text-xs text-red-500">
              {formik.errors.acceptTerms}
            </span>
          )}
        </div>
      </form>
    </StepWrapper>
  );
}
