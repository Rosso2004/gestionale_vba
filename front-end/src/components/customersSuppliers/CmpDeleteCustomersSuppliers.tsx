import CustomAlertDialog from "../CustomAlertDialog";
import {ICustomersSuppliers} from "../../interfaces/ICustomersSuppliers";
import axios from "axios";
import {toast} from "react-toastify";

type ICmpDeleteResourceType = {
    show: boolean;
    data: ICustomersSuppliers;
    handleCancel: () => void;
    onUpdate: () => void;
}
const CmpDeleteCustomersSuppliers: React.FC<ICmpDeleteResourceType> = (props) => {
    const {show, data, handleCancel, onUpdate} = props;
    const handleDelete = async () => {
        axios
            .delete(import.meta.env.VITE_URL_WEB_API + '/api/customerSupplier/deleteCustomerSupplier/' + data.id)
            .then((response) => {
                if (response.status === 200) {
                    onUpdate();
                    handleCancel();
                    toast.warning(response.data.message);
                }
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    toast.error(error.response.data);
                }
            });
    }
    return (
        <>
            <CustomAlertDialog
                text={"Sei sicuro di voler rimuovere il " + data.fnc.name + " " + data.name + "? Quest'azione sarà irreveribile!"}
                show={show}
                confirmBtn="Si, sono sicuro"
                cancelBtn="No, annulla"
                handleConfirm={handleDelete}
                handleCancel={handleCancel}
            />
        </>
    );
};

export default CmpDeleteCustomersSuppliers;