import {ChangeEvent, useEffect, useState} from "react";

interface Option {
    value: string;
    label: string;
}

interface ICustomSelect {
    ec?: string;
    title?: string;
    error?: string;
    disabled?: boolean;
    option: Option[];
    value: string;
    onChange: (value: string) => void;
}

const CustomSelect: React.FC<ICustomSelect> = (props) => {
    const {ec, title, error, disabled, option, value, onChange} = props;

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        onChange(selectedValue);
    };

    return (
        <div className={`text-left ${ec}`}>
            {title && (
                <label className={`block text-sm font-medium ${error ? 'text-red-700' : 'text-gray-900'}`}>{title}</label>
            )}
            <div className="relative">
                <select
                    className={`border text-sm rounded-lg block w-full p-1.5
                    ${
                        error ? 'border-red-500 placeholder-red-700 focus:ring-red-500 focus:border-red-500' : 'bg-gray-50 border border-gray-300 focus:ring-gray-500 focus:border-gray-500'
                    }
                    ${
                        disabled ? 'text-gray-500' : 'text-gray-900'
                    }`}
                    value={value}
                    onChange={handleSelectChange}
                    disabled={disabled}
                >
                    {value === '' && (<option key={undefined} value={undefined}>
                        Seleziona un opzione...
                    </option>)}
                    {option.map((dt) => (
                        <option key={dt.value} value={dt.value}>
                            {dt.label}
                        </option>
                    ))}
                </select>
            </div>
            <p className="text-sm text-red-600 dark:text-red-500">{error}</p>
        </div>
    );
};

export default CustomSelect;