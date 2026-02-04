"use client";
import React, { useState } from "react";
import { useRegistrationStore } from "@/store/registrationStore";
import { ArrowLeft, ArrowRight, LoaderCircle, MoveLeft } from "lucide-react";
import { StepWrapperProps } from "@/types/registration";
import { useLocale, useTranslations } from "next-intl";
import { REGISTER } from "@/apis";
import { useRouter } from "next/navigation";

export const StepWrapper: React.FC<StepWrapperProps> = ({
  stepNumber,
  title,
  subtitle,
  children,
  onNext,
  showBackButton = true,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations("register");
  const locale = useLocale();
  const isAR = locale == "ar";
  const {
    currentStep,
    nextStep,
    previousStep,
    validateCurrentStep,
    formData,
    getFlattenedData,
    resetForm,
  } = useRegistrationStore();

  const handleNext = async () => {
    if (onNext) {
      const canProceed = await onNext(); // wait for validation
      if (!canProceed) return;
    }
    nextStep();
  };

  const handleBack = () => {
    previousStep();
  };
  const handleSubmit = async () => {
    setLoading(true);

    const isValid = await new Promise<boolean>((resolve) => {
      const onValid = () => {
        cleanup();
        resolve(true);
      };

      const onInvalid = () => {
        cleanup();
        resolve(false);
      };

      const cleanup = () => {
        window.removeEventListener("step-6-valid", onValid);
        window.removeEventListener("step-6-invalid", onInvalid);
      };

      window.addEventListener("step-6-valid", onValid);
      window.addEventListener("step-6-invalid", onInvalid);

      window.dispatchEvent(new CustomEvent(`validate-step-${stepNumber}`));
    });

    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const flatData = getFlattenedData();
      const formDataToSubmit = new FormData();

      Object.entries(flatData).forEach(([key, value]) => {
        if (value !== null && !(value instanceof File)) {
          formDataToSubmit.append(key, String(value));
        }
      });

      if (flatData.logo instanceof File) {
        formDataToSubmit.append("logo", flatData.logo);
      }
      if (flatData.commercial_registration_image instanceof File) {
        formDataToSubmit.append(
          "commercial_registration_image",
          flatData.commercial_registration_image
        );
      }
      if (flatData.tax_image_back instanceof File) {
        formDataToSubmit.append("tax_image_back", flatData.tax_image_back);
      }
      if (flatData.tax_image instanceof File) {
        formDataToSubmit.append("tax_image", flatData.tax_image);
      }

      const response = await REGISTER({ data: formDataToSubmit });

      if (response.success) {
        resetForm();
        localStorage.removeItem("registration-storage");
        router.push(`/${locale}/login`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto ">
      {/* Content Card */}
      <div
        className={`bg-white ${
          currentStep != 1 ? "rounded-lg" : "rounded-tl-lg rounded-tr-lg"
        } shadow-lg p-8`}
      >
        {/* Header */}
        <div className="flex justify-between">
          <div className="flex flex-col mb-2">
            <h2 className="text-2xl font-medium text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
          <div className="text-xs font-normal sm:text-sm text-gray-400">
            {t("step")} {stepNumber} {t("from")} 6
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8 animate-fade-in-right-delayed">{children}</div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          {/* Back Button */}
          <button
            type="button"
            onClick={handleBack}
            className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors  border text-sm py-2 h-11 px-5 rounded-full border-gray-200 text-gray-600 hover:bg-gray-50  ${
              currentStep === 1
                ? "!cursor-not-allowed opacity-50"
                : "cursor-pointer "
            }`}
          >
            {isAR ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
            {t("back")}
          </button>

          {/* Next Button */}
          <button
            type={currentStep === 6 ? "submit" : "button"}
            onClick={currentStep === 6 ? handleSubmit : handleNext}
            className={`flex items-center gap-2 px-8 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all cursor-pointer duration-200 font-medium ${
              loading ? "cursor-not-allowed opacity-50" : "cursor-pointer "
            }`}
          >
            {loading ? (
              <>
                {t("submiting")}
                <LoaderCircle className="animate-spin transition-all duration-200" />
              </>
            ) : (
              <>
                {currentStep === 6 ? t("completeRegister") : t("next")}
                {currentStep != 6 && isAR ? (
                  <ArrowLeft size={14} />
                ) : (
                  <ArrowRight size={14} />
                )}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
