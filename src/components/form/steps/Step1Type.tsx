    import React from 'react';
    import { useRegistrationStore } from '@/store/registrationStore';
    import { CompanyType } from '@/types/registration';
    import { StepWrapper } from '../StepWrapper';
    import Link from 'next/link';
    import { Building, Users } from 'lucide-react';
    import { useTranslations } from 'next-intl';
    import { useFormik } from 'formik';
    import * as Yup from 'yup';

    export const Step1Type: React.FC = () => {
        const { formData, updateSection } = useRegistrationStore();
        const t = useTranslations('register');

        const validationSchema = Yup.object({
            companyType: Yup.string().required(t('step1.please_select'))
        });

        const formik = useFormik({
            initialValues: {
                companyType: formData.type.companyType || ''
            },
            validationSchema,
            validateOnChange: true, // Only validate on blur
            validateOnBlur: true,
            enableReinitialize: true,
            onSubmit: () => {
                // Submission is handled by StepWrapper
            }
        });

        const handleSelectType = (type: CompanyType) => {
            formik.setFieldValue('companyType', type);
            updateSection('type', { companyType: type });
        };

        // This will be called by StepWrapper when Next is clicked
        React.useEffect(() => {
            const checkValidation = () => {
                formik.setTouched({ companyType: true });
                formik.validateForm();
            };

            // Listen for validation events
            window.addEventListener('validate-step-1', checkValidation);
            return () => window.removeEventListener('validate-step-1', checkValidation);
        }, [formik]);

        return (
            <div className='w-full max-w-2xl mx-auto overflow-hidden'>

                <StepWrapper
                    stepNumber={1}
                    title={t('step1.title')}
                    subtitle={t('step1.subtitle')}
                    showBackButton={false}
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
                    <p className="text-gray-600 my-4">{t('step1.select_type')}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Developer Option */}
                        <button
                            type="button"
                            onClick={() => handleSelectType('developer')}
                            className={`
                            px-5 py-3 rounded-xl border-2 text-left transition-all border-gray-200 hover:border-red-300  transition-transform duration-300 cursor-pointer hover:scale-105
                            ${formData.type.companyType === 'developer'
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300 hover:border-red-300 hover:bg-gray-50'
                                }
                            `}
                        >
                            <div className="flex flex-col items-start gap-2">
                                <div
                                    className={`
                                        w-10 h-10 rounded-xl flex items-center justify-center
                                    
                                    `}
                                >
                                    <Building className='text-red-500' size={30} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-lg text-gray-900 mb-1">{t('step1.developer')}</h3>
                                    <p className="text-sm text-gray-600">
                                        {t('step1.developer_desc')}
                                    </p>
                                </div>
                            </div>
                        </button>

                        {/* Brokerage Option */}
                        <button
                            type="button"
                            onClick={() => handleSelectType('broker')}
                            className={`
                        px-5 py-3 border-2 rounded-xl text-left  transition-transform duration-300 cursor-pointer hover:scale-105
                            ${formData.type.companyType === 'broker'
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300 hover:border-red-300 hover:bg-gray-50 '
                                }
                            `}
                        >
                            <div className="flex flex-col items-start gap-2">
                                <div
                                    className={`
                                        w-10 h-10 rounded-lg flex items-center justify-center
                                    
                                        `}
                                >
                                    <Users className='text-red-500' size={30} />
                                </div>
                                <div className=" flex-1">
                                    <h3 className="font-medium text-lg text-gray-900 mb-1 w-fit">{t('step1.brokerage')}</h3>
                                    <p className="text-sm text-gray-600">
                                        {t('step1.brokerage_desc')}
                                    </p>
                                </div>
                            </div>
                        </button>
                    </div>

                    {formik.touched.companyType && formik.errors.companyType && (
                        <p className="text-red-500 text-sm mt-4">
                            {formik.errors.companyType}
                        </p>
                    )}
                </StepWrapper>
                <div className="bg-gray-50 rounded-bl-lg rounded-br-lg  py-4 text-center border-t border-gray-100 w-full max-w-2xl mx-auto">
                    <p className="text-sm text-gray-500">
                        {t('already_have_account')}{' '}
                        <Link href="/login" className="text-red-500 hover:text-red-600 font-medium">
                            {t('sign_in')}
                        </Link>
                    </p>
                </div>
            </div>
        );
    };
