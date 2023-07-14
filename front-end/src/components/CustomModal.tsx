import CustomButton from "./CustomButton";
import {MdClose} from "react-icons/md";

type ICustomModal = React.PropsWithChildren <{
    title?: string
    show: boolean;
    handleClose: () => void;
}>

const CustomModal: React.FC<ICustomModal> = (props) => {
    const {title, show, handleClose, children} = props;

    return (
        <div className={`z-50 flex bg-[#333333bb] flex-col items-center justify-center h-screen fixed md:inset-0
            ${
                !show ? 'hidden' : ''
             }`}>
            <div className="relative w-full max-w-xl max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex justify-between p-2">
                        <h3 className="text-xl ml-1.5 mt-1.5 font-medium text-gray-900">{title}</h3>
                        <CustomButton type="button" ec="mr-1.5 mt-1.5" onClick={handleClose} icon={<MdClose/>} color="gray"/>
                    </div>
                    <hr className="mt-1.5 h-3 solid"/>
                    <div className="pb-4 lg:px-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
)}

export default CustomModal;