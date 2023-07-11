import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import CustomModal from "../CustomModal";
import {useEffect, useState} from "react";
import {MdAdd, MdCancel, MdModeEdit, MdTextFields} from "react-icons/md";
import {IResourcesType} from "../../interfaces/IResourcesType";
import axios from "axios";
import CustomAlert from "../CustomAlert";

interface ICmpAddResourceType {
    show: boolean;
    handleClose: () => void;
    data?: IResourcesType;
    type: "add" | "update";
    onUpdate: () => void;
}
const CmpAddEditResourceType : React.FC<ICmpAddResourceType> = (props) => {
    const {show, handleClose, type, data, onUpdate} = props;
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
                .post("http://localhost:5000/api/resourceType/createResourceType", formData)
                .then((response) => {
                    if (response.status === 200) {
                        handleClearAndClose();
                        onUpdate();
                    }
                })
                .catch((error) => {
                    if (error.response.status === 409) {
                        setNameError(error.response.data)
                    }
                });
        } else if (type === "update") {
            if (data?.id) {
                axios
                    .put("http://localhost:5000/api/resourceType/updateResourceType/" + data.id, formData)
                    .then((response) => {
                        if (response.status === 200) {
                            handleClearAndClose();
                            onUpdate();
                        }
                    })
                    .catch((error) => {
                        if (error.response.status === 409) {
                            setNameError(error.response.data)
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
                        type="submit"
                        text={type === "add" ? "Aggiungi" : "Modifica"}
                        icon={type === "add" ? <MdAdd/> : <MdModeEdit/>}
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
            <CustomAlert/>
        </CustomModal>
    );
};
export default CmpAddEditResourceType;