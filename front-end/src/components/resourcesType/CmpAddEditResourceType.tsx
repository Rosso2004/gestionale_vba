import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import CustomModal from "../CustomModal";
import {useEffect, useState} from "react";
import {MdAdd, MdCancel, MdModeEdit, MdTextFields} from "react-icons/md";
import {IResourcesType} from "../../interfaces/IResourcesType";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useGlobalState} from "../../global/GlobalStateContext.tsx";

interface ICmpAddResourceType {
    show: boolean;
    handleClose: () => void;
    data?: IResourcesType;
    type: "add" | "update";
    onUpdate: () => void;
}
const CmpAddEditResourceType : React.FC<ICmpAddResourceType> = (props) => {
    const {show, handleClose, type, data, onUpdate} = props;
    const navigate = useNavigate();
    const { setIsVerified } = useGlobalState();
    const [formData, setFormData] = useState<IResourcesType>({
        id:'',
        name: '',
        description: '',
        note: ''
    })

    const [nameError, setNameError] = useState<string>('')

    useEffect(() => {
        if (type === "update") {
            setFormData({
                id: data?.id || '',
                name: data?.name || '',
                description: data?.description || '',
                note: data?.note || ''
            });
        }
    }, [type, data]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (type === "add") {
            axios
                .post(import.meta.env.VITE_URL_WEB_API + '/api/resourceType/createResourceType', formData, { withCredentials: true })
                .then((response) => {
                    if (response.status === 200) {
                        handleClearAndClose();
                        onUpdate();
                        toast.success(response.data.message)
                    }
                })
                .catch((error) => {
                    if (error.response.status === 409) {
                        setNameError(error.response.data)
                        toast.error(error.response.data)
                    }
                    if (error.response.status === 403) {
                        navigate("/");
                        setIsVerified(false);
                        toast.error(error.response.data.message);
                    }
                });
        } else if (type === "update") {
            if (data?.id) {
                axios
                    .put(import.meta.env.VITE_URL_WEB_API + '/api/resourceType/updateResourceType/' + data.id, formData, { withCredentials: true })
                    .then((response) => {
                        if (response.status === 200) {
                            handleClearAndClose();
                            onUpdate();
                            toast.success(response.data.message)
                        }
                    })
                    .catch((error) => {
                        if (error.response.status === 409) {
                            setNameError(error.response.data)
                            toast.error(error.response.data)
                        }
                        if (error.response.status === 403) {
                            navigate("/");
                            setIsVerified(false);
                            toast.error(error.response.data.message);
                        }
                    });
            } else {
                console.log("L'ID del tipo risorsa da modificare non definito");
            }
        }
    }

    const handleClearAndClose = () => {
        handleClose();
        setNameError('');
        setFormData({
            id:'',
            name: '',
            description: '',
            note: ''
        })
    }

    return (
        <>
            <CustomModal title={type === "add" ? "Inserimento Tipo Risorsa" : "Modifica Tipo Risorsa"} show={show} handleClose={handleClearAndClose}>
                <form className="" onSubmit={handleSubmit}>
                    <CustomInput
                        ec="mt-1.5"
                        StartIcon={<MdTextFields/>}
                        title="Nome"
                        type="text"
                        placeholder="Nome"
                        error={nameError}
                        value={formData.name}
                        onChange={(e) => {
                            setFormData((prevData) => ({
                                ...prevData,
                                name: e.target.value
                            }));
                        }}
                    />
                    <CustomInput
                        ec="mt-1.5"
                        title="Descrizione"
                        type="text"
                        placeholder="Descrizione"
                        textArea
                        value={formData.description}
                        onChange={(e) => {
                            setFormData((prevData) => ({
                                ...prevData,
                                description: e.target.value
                            }));
                        }}
                    />
                    <CustomInput
                        ec="mt-1.5"
                        title="Note"
                        placeholder="Note"
                        textArea
                        value={formData.note}
                        onChange={(e) => {
                            setFormData((prevData) => ({
                                ...prevData,
                                note: e.target.value
                            }));
                        }}
                    />

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
                            icon={type === "add" ? <MdAdd/> : <MdModeEdit/>}
                            color={type === "add" ? "green": undefined}
                        />
                    </div>
                </form>
            </CustomModal>
        </>
    );
};
export default CmpAddEditResourceType;