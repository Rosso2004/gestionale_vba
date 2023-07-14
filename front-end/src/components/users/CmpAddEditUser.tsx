import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import CustomModal from "../CustomModal";
import {useEffect, useState} from "react";
import {
    MdCancel,
    MdEmail,
    MdLock,
    MdModeEdit,
    MdPerson,
    MdPersonAdd,
    MdPhone,
    MdTextFields
} from "react-icons/md";
import axios from "axios";
import {IUsers} from "../../interfaces/IUsers";
import {toast} from "react-toastify";

interface ICmpAddEditUser {
    show: boolean;
    handleClose: () => void;
    data?: IUsers;
    type: "add" | "update";
    onUpdate: () => void;
}
const CmpAddEditUser : React.FC<ICmpAddEditUser> = (props) => {
    const {show, handleClose, type, data, onUpdate} = props;
    const [formData, setFormData] = useState<IUsers>({
        id:'',
        lastname: '',
        firstname: '',
        username: '',
        email: '',
        phone_number: '',
        password: ''
    })

    const [error, setError] = useState({
        userEmail: '',
        password: ''
    })

    useEffect(() => {
        if (type === "update") {
            setFormData({
                id: data?.id || '',
                lastname: data?.lastname || '',
                firstname: data?.firstname || '',
                username: data?.username || '',
                email: data?.email || '',
                phone_number: data?.phone_number || '',
                password: ''
            });
        }
    }, [type, data]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
         event.preventDefault();

        if (type === "add") {
            axios
                .post(import.meta.env.VITE_URL_WEB_API + '/api/user/createUser', formData)
                .then((response) => {
                    if (response.status === 200) {
                        handleClearAndClose();
                        onUpdate();
                        toast.success(response.data.message)
                    }
                })
                .catch((error) => {
                    if (error.response.status === 409) {
                        setError({
                            userEmail: error.response.data,
                            password: ''
                        })
                        toast.error(error.response.data)
                    }
                });
        } else if (type === "update") {
            if (data?.id) {
                axios
                    .put(import.meta.env.VITE_URL_WEB_API + '/api/user/updateUser/' + data.id, formData)
                    .then((response) => {
                        if (response.status === 200) {
                            handleClearAndClose();
                            onUpdate();
                            toast.success(response.data.message)
                        }
                    })
                    .catch((error) => {
                        if (error.response.status === 409) {
                            setError({
                                userEmail: error.response.data,
                                password: ''
                            })
                            toast.error(error.response.data)
                        }
                        if (error.response.status === 401) {
                            setError({
                                userEmail: '',
                                password: error.response.data
                            })
                            toast.error(error.response.data)
                        }
                    });
            } else {
                console.log("L'ID del tipo risorsa da modificare non definito");
            }
        }
    }

    const handleClearAndClose = () => {
        handleClose();
        setError({
            userEmail: '',
            password: ''
        })
        setFormData({
            id:'',
            lastname: '',
            firstname: '',
            username: '',
            email: '',
            phone_number: '',
            password: ''
        })
    }

    return (
        <CustomModal title={type === "add" ? "Inserimento Utente" : "Modifica Utente"} show={show} handleClose={handleClearAndClose}>
            <form className="" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-2">
                    <CustomInput
                        StartIcon={<MdPerson/>}
                        title="Username"
                        type="text"
                        placeholder="Username"
                        required
                        value={formData.username}
                        error={error.userEmail}
                        onChange={(e) => {
                            setFormData((prevData) => ({
                                ...prevData,
                                username: e.target.value
                            }));
                        }}
                    />
                    <CustomInput
                        StartIcon={<MdTextFields/>}
                        title="Cognome"
                        type="text"
                        placeholder="Cognome"
                        required
                        value={formData.lastname}
                        onChange={(e) => {
                            setFormData((prevData) => ({
                                ...prevData,
                                lastname: e.target.value
                            }));
                        }}
                    />
                    <CustomInput
                        ec="mt-1.5"
                        StartIcon={<MdTextFields/>}
                        title="Nome"
                        type="text"
                        placeholder="Nome"
                        required
                        value={formData.firstname}
                        onChange={(e) => {
                            setFormData((prevData) => ({
                                ...prevData,
                                firstname: e.target.value
                            }));
                        }}
                    />
                    <CustomInput
                        ec="mt-1.5"
                        StartIcon={<MdEmail/>}
                        title="Email"
                        type="email"
                        placeholder="Email"
                        required
                        value={formData.email}
                        error={error.userEmail}
                        onChange={(e) => {
                            setFormData((prevData) => ({
                                ...prevData,
                                email: e.target.value
                            }));
                        }}
                    />
                    <CustomInput
                        ec="mt-1.5"
                        StartIcon={<MdPhone/>}
                        title="Numero di telefono"
                        type="tel"
                        placeholder="Numero di telefono"
                        value={formData.phone_number}
                        onChange={(e) => {
                            setFormData((prevData) => ({
                                ...prevData,
                                phone_number: e.target.value
                            }));
                        }}
                    />
                    <CustomInput
                        ec="mt-1.5"
                        StartIcon={<MdLock/>}
                        title="Password"
                        type="password"
                        placeholder="Password"
                        error={error.password}
                        required
                        value={formData.password}
                        onChange={(e) => {
                            setFormData((prevData) => ({
                                ...prevData,
                                password: e.target.value
                            }));
                        }}
                    />
                </div>

                <div className="mt-5 flex justify-end gap-2">
                    <CustomButton
                        type="button"
                        text="Annulla"
                        icon={<MdCancel/>}
                        color="red"
                        onClick={handleClearAndClose}
                    />
                    <CustomButton
                        type="submit"
                        text={type === "add" ? "Aggiungi" : "Modifica"}
                        icon={type === "add" ? <MdPersonAdd/> : <MdModeEdit/>}
                        color={type === "add" ? "green": undefined}
                    />
                </div>
            </form>
        </CustomModal>
    );
};
export default CmpAddEditUser;