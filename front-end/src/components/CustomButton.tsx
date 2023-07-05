interface IPCustomButton {
    ec?: string;
    id?: string;
    type: "button" | "submit" | "reset";
    text?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    color?: "red" | "green" | "gray";
    disabled?: boolean;
}

const CustomButton: React.FC<IPCustomButton> = (props) => {
    const {ec, id, type, text, icon, onClick, color, disabled} = props;
    return (
        //
        <button type={type} onClick={onClick} disabled={disabled} id={id} className={`font-medium rounded-lg text-sm text-center inline-flex items-center ${ec}
            ${text ? 'px-5 py-2' : 'px-2 py-2'}
            ${color === "green" && 'text-white bg-green-700 hover:bg-green-800'}
            ${color === "red" && 'text-white bg-red-700 hover:bg-red-800'}
            ${color === "gray" && 'bg-gray-100 hover:bg-gray-200'}
            ${!color && 'text-white bg-blue-700 hover:bg-blue-800'}`
        }>
            {icon && (
                <div className={`
                ${
                    text ? 'mr-2 -ml-2': ''
                }`}>
                    <span>{icon}</span>
                </div>
            )}
            {text}
        </button>
    )
}

export default CustomButton;