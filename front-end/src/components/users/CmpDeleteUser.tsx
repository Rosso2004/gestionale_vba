import CustomAlertDialog from "../CustomAlertDialog";
import axios from "axios";
import {IUsers} from "../../interfaces/IUsers";
import {toast} from "react-toastify";

type ICmpDeleteUser = {
    show: boolean;
    data: IUsers;
    handleCancel: () => void;
    onUpdate: () => void;
}
const CmpDeleteUser: React.FC<ICmpDeleteUser> = (props) => {
    const {show, data, handleCancel, onUpdate} = props;
    const handleDelete = async () => {
        axios
            .delete(import.meta.env.VITE_URL_WEB_API + '/api/user/deleteUser/' + data.id)
            .then((response) => {
                if (response.status === 200) {
                    onUpdate();
                    handleCancel();
                    toast.warning(response.data.message)
                }
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    toast.error(error.response.data)
                }
            });
    }
    return (
        <>
            <CustomAlertDialog
                text={"Sei sicuro di voler rimuovere il'Utente " + data.username + "? Quest'azione sarà irreveribile!"}
                show={show}
                confirmBtn="Si, sono sicuro"
                cancelBtn="No, annulla"
                handleConfirm={handleDelete}
                handleCancel={handleCancel}
            />
        </>
    );
};

export default CmpDeleteUser;