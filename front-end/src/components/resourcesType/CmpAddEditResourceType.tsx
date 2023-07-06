import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import CustomModal from "../CustomModal";
import PocketBase from 'pocketbase';
import {useEffect, useState} from "react";
import {MdAdd, MdCancel, MdModeEdit, MdTextFields} from "react-icons/md";
import {IResourcesType} from "../../interfaces/IResourcesType";

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
        const pb = new PocketBase('http://127.0.0.1:8090');
        const dataToSubmit = {
            name: formData.name,
            description: formData.description,
            note: formData.note,
        };
        if (type === "add") {
            try {
                const record = await pb.collection('resources_type').create(dataToSubmit);

                if (record) {
                    handleClearAndClose();
                    onUpdate();
                }
            } catch (error) {
                const errorObj: Error = error as Error;
                console.log("error: ", errorObj)
            }
        } else if (type === "update") {
            if (data?.id) {
                try {
                    const record = await pb.collection('resources_type').update(data.id, dataToSubmit);

                    if (record) {
                        handleClearAndClose();
                        onUpdate();
                    }
                } catch (error) {
                    const errorObj: Error = error as Error;
                    console.log("error: ", errorObj)
                }
            } else {
                console.log("ID non definito");
            }
        }
    }

    const handleClearAndClose = () => {
        handleClose();
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
                    ec="mt-2"
                    StartIcon={<MdTextFields/>}
                    title="Nome"
                    type="text"
                    placeholder="Nome"
                    value={formData.name}
                    onChange={(e) => {
                        setFormData((prevData) => ({
                            ...prevData,
                            name: e.target.value
                        }));
                    }}
                />
                <CustomInput
                    ec="mt-2"
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
                    ec="mt-2"
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
                        color="green"
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
export default CmpAddEditResourceType;