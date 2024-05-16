import CustomAlertDialog from "../CustomAlertDialog";
import axios from "axios";
import {IUsers} from "../../interfaces/IUsers";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useGlobalState} from "../../global/GlobalStateContext.tsx";

type ICmpDeleteUser = {
    show: boolean;
    data: IUsers;
    handleCancel: () => void;
    onUpdate: () => void;
}
const CmpDeleteUser: React.FC<ICmpDeleteUser> = (props) => {
    const {show, data, handleCancel, onUpdate} = props;
    const navigate = useNavigate();
    const {setIsVerified} = useGlobalState();
    const handleDelete = async () => {
        axios
            .delete(import.meta.env.VITE_URL_WEB_API + '/api/user/deleteUser/' + data.id, { withCredentials: true })
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
                if (error.response.status === 409) {
                    handleCancel();
                    toast.error(error.response.data)
                }
                if (error.response.status === 403) {
                    navigate("/");
                    setIsVerified(false);
                    toast.error(error.response.data.message);
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