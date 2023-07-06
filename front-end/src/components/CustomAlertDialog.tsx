import CustomButton from "./CustomButton";
import {MdWarning} from "react-icons/md"

type ICustomAlertDialog = {
  text?: string
  confirmBtn?: string;
  cancelBtn?: string;
  show: boolean;
  handleConfirm?: () => void;
  handleCancel?: () => void;
}
const CustomAlertDialog: React.FC<ICustomAlertDialog> = (props) => {
  const {text, confirmBtn, cancelBtn, show, handleCancel, handleConfirm} = props;
  return (
    <div className={`z-50 flex bg-[#333333bb] flex-col items-center justify-center h-screen fixed md:inset-0
        ${
          !show ? 'hidden' : ''
        }`}>
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="p-6 text-center">
            <div className="text-amber-400 text-8xl flex items-center justify-center">
              <MdWarning/>
            </div>
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              {text}
            </h3>
            <div className="space-x-2">
              <CustomButton type="button" text={confirmBtn} onClick={handleConfirm} color="red"/>
              <CustomButton type="button" text={cancelBtn} onClick={handleCancel} color="gray"/>
            </div>
          </div>
        </div>
    </div>
  );
};

export default CustomAlertDialog;