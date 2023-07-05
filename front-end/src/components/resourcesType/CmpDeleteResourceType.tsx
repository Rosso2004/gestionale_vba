import CustomAlertDialog from "../CustomAlertDialog";

type ICmpDeleteResourceType = {
  text?: string
  confirmBtn?: string;
  cancelBtn?: string;
  show: boolean;
  handleConfirm?: () => void;
  handleClose?: () => void;
}
const CmpDeleteResourceType: React.FC<ICmpDeleteResourceType> = (props) => {
  const {text, confirmBtn, cancelBtn, show, handleClose, handleConfirm} = props;
  return (
    <>
      <CustomAlertDialog
        show={show}

      />
    </>
  );
};

export default CmpDeleteResourceType;