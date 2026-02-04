'use client'
import { Step, StepperProps } from '@/types/registration';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
export const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
    const t = useTranslations("register")
    const steps: Step[] = [
        { number: 1, label: t("type") },
        { number: 2, label: t("company") },
        { number: 3, label: t("contact") },
        { number: 4, label: t('documents') },
        { number: 5, label: t("branch") },
        { number: 6, label: t('Security') },
    ];
    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="flex flex-wrap  space-y-5 md:space-y-0 items-center justify-between max-w-4xl px-4">
                {steps?.map((step, index) => {
                    const isCompleted = currentStep > step.number;
                    const isActive = currentStep === step.number;
                    const isPending = currentStep < step.number;
                    return (
                        <React.Fragment key={step.number}>
                            <div className="flex flex-col items-center relative">
                                <div
                                    className={` w-8 h-8 sm:w-10 sm:h-10  rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-300 ease-in-out transform ${isActive || isCompleted
                                        ? 'bg-red-500 text-white   shadow-red-500/30 opacity-100 scale-100'
                                        : 'bg-white/20 text-white/60 opacity-50 scale-90'}`}
                                >
                                    {isCompleted ? (
                                        <Check
                                            size={16}
                                            className="transition-opacity duration-300 opacity-100"
                                        />
                                    ) : (
                                        <span className="transition-opacity duration-300 opacity-100">
                                            {step.number}
                                        </span>
                                    )}
                                </div>

                                <span
                                    className={` text-[10px] sm:text-xs transition-all duration-300 ease-in-out text-white/60   translate-y-1`}
                                >
                                    {step.label}
                                </span>
                            </div>
                            {/* Connecting Line */}
                            <div className='flex items-center justify-center '>

                                {index < steps.length - 1 && (
                                    !isCompleted ? (
                                        <span
                                            className="w-[12px] h-[1px]  sm:mx-2 bg-white/20  transition-width duration-500 ease-in-out"
                                        />
                                    ) : (
                                        <span
                                            className="w-6 sm:w-12 h-[2px]  sm:mx-2 bg-red-500 transition-width duration-500 ease-in-out"
                                        />
                                    )
                                )}
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};
