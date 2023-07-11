import {MdClose, MdInfo} from "react-icons/md";
import CustomButton from "./CustomButton";

interface ICustomAlert {
    open?: boolean;
    type?: "info" | "success" | "warning" | "error";
    text?: string;
    onClose?: () => void;
}
const CustomAlert: React.FC<ICustomAlert> = (props) => {
    const {open, type, text, onClose} = props;
    return (
        <div className="fixed bottom-2 right-5 flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-50">
            <div className="flex flex-col items-start">
                <div className="flex items-center">
                    <MdInfo />
                    <div className="ml-2 text-lg font-medium">Info</div>
                </div>
                <div className="mt-2 text-sm text-left font-medium break-all max-w-sm">
                    asdasdasdasdsasadasdasdasdasdsadasdasdasdasdadasdasdasdasdasdasdasdsasadasdasdasdasdsadasdasdasdasdadasdasdasdasdasdasdasdsasadasdasdasdasdsadasdasdasdasdadasdasdasd
                </div>
            </div>
            <CustomButton type="button" icon={<MdClose />} ec="ml-5" color="transparent" />
        </div>
    );
};

export default CustomAlert;