import {MdClose, MdInfoOutline, MdTaskAlt, MdWarningAmber, MdErrorOutline} from "react-icons/md";
import CustomButton from "./CustomButton";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {setTimeout} from "timers-promises";
import {useEffect} from "react";

interface ICustomAlert {
    open: boolean;
    type: "info" | "success" | "warning" | "error";
    text: string;
    onClose: () => void;
}
const CustomAlert: React.FC<ICustomAlert> = (props) => {
    const {open, type, text, onClose} = props;

    useEffect( () => {
        const waitToHide = async () => {
            if (open) {
                await setTimeout(5000);
                console.log("Waited 5s");
                onClose();
            }
        }
        
        waitToHide()
    }, [onClose, open])

    return (
        <div className={`fixed bottom-2 right-5 flex items-center p-4 mb-4 rounded-lg
            ${open ? '' : 'hidden'}
            ${type === "info" && 'text-blue-800 bg-blue-50 border border-blue-300'}
            ${type === "success" && 'text-green-800 bg-green-50 border border-green-300'}
            ${type === "warning" && 'text-yellow-800 bg-yellow-50 border border-yellow-300'}
            ${type === "error" && 'text-red-800 bg-red-50 border border-red-300'}`}>
            <div className="flex flex-col items-start">
                <div className="flex items-center">
                    {type === "info" && <MdInfoOutline/>}
                    {type === "success" && <MdTaskAlt/>}
                    {type === "warning" && <MdWarningAmber/>}
                    {type === "error" && <MdErrorOutline/>}
                    <div className="ml-2 text-lg font-medium">
                        {type === "info" && 'Info'}
                        {type === "success" && 'Successo'}
                        {type === "warning" && 'Attenzione'}
                        {type === "error" && 'Errore'}
                    </div>
                </div>
                <div className="mt-2 text-sm text-left font-medium break-all max-w-sm">
                    {text}
                </div>
            </div>
            <CustomButton type="button" icon={<MdClose/>} onClick={onClose} ec="ml-2" color="transparent" />
        </div>
    );
};

export default CustomAlert;