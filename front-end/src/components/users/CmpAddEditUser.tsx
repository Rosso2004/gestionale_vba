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
                    }
                })
                .catch((error) => {
                    if (error.response.status === 409) {
                        console.log("error")
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
                        }
                    })
                    .catch((error) => {
                        console.log("passo")
                        if (error.response.status === 409) {
                            setError({
                                userEmail: error.response.data,
                                password: ''
                            })
                        }
                        if (error.response.status === 401) {
                            setError({
                                userEmail: '',
                                password: error.response.data
                            })
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
                <CustomInput
                    ec="mt-1.5"
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
                    ec="mt-1.5"
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
                    type="text"
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

                <div className="mt-5 flex justify-end gap-2">
                    <CustomButton
                        type="submit"
                        text={type === "add" ? "Aggiungi" : "Modifica"}
                        icon={type === "add" ? <MdPersonAdd/> : <MdModeEdit/>}
                        color={type === "add" ? "green": undefined}
                    />
                    <CustomButton
                        type="button"
                        text="Annulla"
                        icon={<MdCancel/>}
                        color="red"
                        onClick={handleClearAndClose}
                    />
                </div>
            </form>
        </CustomModal>
    );
};
export default CmpAddEditUser;