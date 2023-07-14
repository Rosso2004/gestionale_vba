import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useState } from "react";

interface ICustomInput {
    ec?: string;
    id?: string;
    type?: string;
    title?: string;
    textArea?: boolean;
    placeholder?: string;
    StartIcon?: React.ReactNode;
    EndIcon?: React.ReactNode
    disabled?: boolean;
    error?: string;
    size?: "xs";
    onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    value?: string;
    required?: boolean;
    datePicker?: boolean;
    rows?: number;
}

const CustomInput: React.FC<ICustomInput> = (props) => {
    const {ec, id, type, title, textArea, placeholder, StartIcon, EndIcon, size, disabled, error, onChange, rows, value, required, datePicker} = props;
    const [passwordShow, setPasswordShow] = useState(false);

    const togglePassword = () => {
        setPasswordShow(!passwordShow);
    };
    return (
        <div className={`text-left ${ec}`}>
            {title && (
                <label className={`mb-1 block text-sm font-medium dark:text-white ${error ? 'text-red-700' : 'text-gray-900'}`}>{title}</label>
            )}
            <div className="relative">
                {StartIcon && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className={`${error ? 'text-red-700' : 'text-gray-400'}`}>{StartIcon}</span>
                    </div>
                )}
                {EndIcon && type !== "password" && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className={`${error ? 'text-red-700' : 'text-gray-400'}`}>{EndIcon}</span>
                    </div>
                )}
                {type === "password" && (
                    <div className="absolute inset-y-0 right-0 flex items-center">
                        <button
                            type="button"
                            className="p-2 text-gray-400 absolute top-1/2 transform -translate-y-1/2 right-2"
                            onClick={togglePassword}
                        >
                            {passwordShow ? <MdVisibilityOff /> : <MdVisibility />}
                        </button>
                    </div>
                )}
                {!textArea && !datePicker && (<input
                    id={id}
                    type={type === "password" ? (passwordShow ? "text" : "password") : type}
                    onChange={onChange}
                    value={value}
                    disabled={disabled}
                    required={required}
                    className={`border text-sm rounded-lg block w-full
                    ${
                        disabled ? 'text-gray-400 bg-gray-50 border border-gray-200 focus:ring-gray-500 focus:border-gray-500' : 'text-gray-900 bg-gray-50 border border-gray-300 focus:ring-gray-500 focus:border-gray-500'
                    }
                    ${
                        size === "xs" ? 'p-1' : 'p-1.5'
                    }
                    ${
                        StartIcon ? 'pl-10' : ''
                    }
                    ${
                        error ? 'border-red-500 placeholder-red-700 focus:ring-red-500 focus:border-red-500' : ''
                    }`}
                    placeholder={placeholder}
                />)}

                {textArea && (<textarea
                    id={id}
                    rows={rows ? rows : 4}
                    onChange={onChange}
                    value={value}
                    disabled={disabled}
                    required={required}
                    className={`text-sm rounded-lg block w-full p-2.5
                    ${
                        disabled ? 'text-gray-400 bg-gray-50 border border-gray-200 focus:ring-gray-500 focus:border-gray-500' : 'text-gray-900 bg-gray-50 border border-gray-300 focus:ring-gray-500 focus:border-gray-500'
                    }
                    ${
                        error ? 'border-red-500 placeholder-red-700 focus:ring-red-500 focus:border-red-500' : 'bg-gray-50 border border-gray-300 focus:ring-gray-500 focus:border-gray-500'
                    }`}
                    placeholder={placeholder}
                />)}

            </div>
            <p className="text-sm text-red-600 dark:text-red-500">{error}</p>
        </div>
    )
}

export default CustomInput;