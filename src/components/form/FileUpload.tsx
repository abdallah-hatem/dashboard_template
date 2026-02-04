'use client'
import { FileUploadProps } from '@/types/registration';
import { Trash, Upload, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
export const FileUpload: React.FC<FileUploadProps> = ({
    label,
    required = false,
    file,
    preview,
    onChange,
    error,
    accept = 'image/*',
}) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const t = useTranslations('register');
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        onChange(selectedFile);
    };

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleRemove = () => {
        onChange(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            {!file && !preview ? (
                <div
                    onClick={handleClick}
                    className="border-2 border-dashed rounded-xl p-4 text-center transition-colors cursor-pointer border-gray-200 hover:border-red-300 bg-gray-50 flex flex-col items-center justify-center"
                >
                    <Upload className='text-sm text-gray-500' />
                    <p className="mt-2 text-sm text-gray-500">{t('click_to_upload')}</p>
                </div>
            ) : (
                <div className="border-2 border-dashed border-red-300 bg-red-50 rounded-xl p-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* {preview && (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-16 h-16 object-cover rounded"
                                />
                            )} */}
                            <div className='flex flex-col justify-center items-start gap-1'>
                                <p className="text-sm font-normal text-gray-900">
                                    {file?.name ? (file.name.length > 30 ? file.name.slice(0, 30) + '...' : file.name) : 'Uploaded file'}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {file?.size ? `${(file.size / 1024).toFixed(2)} KB` : 'File uploaded'}
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                        >
                            <X />
                        </button>
                    </div>
                </div>
            )}

            <input
                ref={inputRef}
                type="file"
                accept={accept}
                onChange={handleFileChange}
                className="hidden"
            />

            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};
