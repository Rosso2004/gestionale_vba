import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import CustomModal from "../CustomModal";
import PocketBase from 'pocketbase';
import {useState} from "react";
import {MdAdd, MdCancel, MdTextFields} from "react-icons/md";
import {IResourcesType} from "../../interfaces/IResourcesType";

interface ICmpAddResourceType {
    show: boolean;
    handleClose: () => void;
    onUpdate: () => void;
}
const CmpAddResourceType : React.FC<ICmpAddResourceType> = (props) => {
    const {show, handleClose, onUpdate} = props;
    const [formData, setFormData] = useState<IResourcesType>({
        name: '',
        description: '',
        note: ''
    })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const pb = new PocketBase('http://127.0.0.1:8090');
        try {
            const data = {
                name: formData.name,
                description: formData.description,
                note: formData.note,
            };

            const record = await pb.collection('resources_type').create(data);

            if (record) {
                handleClearAndClose();
                onUpdate();
            }
        } catch (error) {
            const errorObj: Error = error as Error;
            console.log("error: ", errorObj)
        }
    }

    const handleClearAndClose = () => {
        handleClose();
        setFormData({
            name: '',
            description: '',
            note: ''
        })
    }
    return (
        <CustomModal title="Inserimento nuova risorsa" show={show} handleClose={handleClearAndClose}>
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
                        text="Aggiungi"
                        icon={<MdAdd/>}
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

export default CmpAddResourceType;