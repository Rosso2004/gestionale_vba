import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import CustomModal from "../CustomModal";
import PocketBase from 'pocketbase';
import {useEffect, useState} from "react";
import {
    MdAccountBalance,
    MdAdd,
    MdCancel,
    MdDialpad,
    MdEmail,
    MdLocationCity, MdMap,
    MdModeEdit, MdReceipt,
    MdSignpost,
    MdTextFields
} from "react-icons/md";
import {ICustomersSuppliers} from "../../interfaces/ICustomersSuppliers";
import CustomSelect from "../CustomSelect";

interface ICmpAddEditInfoCustomersSuppliers {
    show: boolean;
    handleClose: () => void;
    data?: ICustomersSuppliers;
    type: "add" | "update" | "info";
    onUpdate: () => void;
}

interface ISelectInputData {
    type: {label: string; value: string;}[];
    function:  {label: string; value: string;}[];
}
const CmpAddEditInfoCustomersSuppliers : React.FC<ICmpAddEditInfoCustomersSuppliers> = (props) => {
    const {show, handleClose, type, data, onUpdate} = props;
    const [formData, setFormData] = useState<ICustomersSuppliers>({
        id: '',
        type: {
            id: '',
            name: '',
            description: '',
            note: ''
        },
        function: {
            id: '',
            name: '',
        },
        name: '',
        city: '',
        address: '',
        cap: '',
        phone_number: '',
        email: '',
        piva: '',
        iban: ''
    })
    const [selectInputData, setSelectInputData] = useState<ISelectInputData>({
        type: [],
        function: [],
    })

    useEffect(() => {
        getResourcesTypeAndResourcesFunction()
        if (type === "update" || type === "info") {
            setFormData({
                id: data?.id || '',
                type: {
                    id: data?.type.id || '',
                    name: data?.type.name || '',
                    description: data?.type.description || '',
                    note: data?.type.note || ''
                },
                function: {
                    id: data?.function.id || '',
                    name: data?.function.name || '',
                },
                name: data?.name || '',
                city: data?.city || '',
                address: data?.address || '',
                cap: data?.cap || '',
                phone_number: data?.phone_number || '',
                email: data?.email || '',
                piva: data?.piva || '',
                iban: data?.iban || ''
            });
        }
    }, [type, data]);

    const getResourcesTypeAndResourcesFunction = () => {
        const pb = new PocketBase('http://127.0.0.1:8090');
        pb.collection('resources_type')
            .getFullList({
                fields: 'id, name',
            })
            .then((response) => {
                const resourcesTypeData = response.map((record) => ({
                    value: record.id,
                    label: record.name
                }));
                setSelectInputData((prevData) => ({
                    ...prevData,
                    type: resourcesTypeData,
                }));
            })
            .catch((error) => {
                console.error('Errore durante la richiesta GET:', error);
            });
        pb.collection('resources_function')
            .getFullList({
                fields: 'id, name',
            })
            .then((response) => {
                const resourcesFunctionData = response.map((record) => ({
                    value: record.id,
                    label: record.name
                }));
                setSelectInputData((prevData) => ({
                    ...prevData,
                    function: resourcesFunctionData,
                }));
            })
            .catch((error) => {
                console.error('Errore durante la richiesta GET:', error);
            });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const pb = new PocketBase('http://127.0.0.1:8090');
        const dataToSubmit = {
            type: formData.type.id,
            function: formData.function.id,
            name: formData.name,
            city: formData.city,
            address: formData.address,
            cap: formData.cap,
            phone_number: formData.phone_number,
            email: formData.email,
            piva: formData.phone_number,
            iban: formData.email,
        };

        if (type === "add") {
            try {
                const record = await pb.collection('customers_suppliers').create(dataToSubmit);

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
                    const record = await pb.collection('customers_suppliers').update(data.id, dataToSubmit);

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
            id: '',
            type: {
                id: '',
                name: '',
                description: '',
                note: ''
            },
            function: {
                id: '',
                name: '',
            },
            name: '',
            city: '',
            address: '',
            cap: '',
            phone_number: '',
            email: '',
            piva: '',
            iban: ''
        })
    }

    return (
        <CustomModal title={type === "add" ? "Inserimento Cliente / Fornitore" : type === "update" ? "Modifica Cliente / Fornitore" : "Informazioni Cliente / Fornitore"} show={show} handleClose={handleClearAndClose}>
            <form className="" onSubmit={handleSubmit}>
                <CustomSelect
                    ec="mt-1.5"
                    title="Tipo Risorsa"
                    disabled={type === "info"}
                    option={selectInputData.type}
                    value={formData.type.id}
                    onChange={(e) => {
                        setFormData((prevData) => ({
                            ...prevData,
                            type: {
                                ...prevData.type,
                                id: e
                            }
                        }))
                    }}
                />
                <CustomSelect
                    ec="mt-1.5"
                    title="Funzione Risorsa"
                    disabled={type === "info"}
                    option={selectInputData.function}
                    value={formData.function.id}
                    onChange={(e) => {
                        setFormData((prevData) => ({
                            ...prevData,
                            function: {
                                ...prevData.function,
                                id: e
                            }
                        }))
                    }}
                />
                <CustomInput
                    ec="mt-1.5"
                    StartIcon={<MdTextFields/>}
                    title="Nome Risorsa"
                    placeholder="Nome Risorsa"
                    type="text"
                    disabled={type === "info"}
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
                    StartIcon={<MdLocationCity/>}
                    title="Città"
                    placeholder="Città"
                    type="text"
                    disabled={type === "info"}
                    value={formData.city}
                    onChange={(e) => {
                        setFormData((prevData) => ({
                            ...prevData,
                            city: e.target.value
                        }));
                    }}
                />
                <CustomInput
                    ec="mt-1.5"
                    StartIcon={<MdSignpost/>}
                    title="Indirizzo"
                    placeholder="Indirizzo"
                    type="text"
                    disabled={type === "info"}
                    value={formData.address}
                    onChange={(e) => {
                        setFormData((prevData) => ({
                            ...prevData,
                            address: e.target.value
                        }));
                    }}
                />
                <CustomInput
                    ec="mt-1.5"
                    StartIcon={<MdMap/>}
                    title="CAP"
                    placeholder="CAP"
                    type="text"
                    disabled={type === "info"}
                    value={formData.cap}
                    onChange={(e) => {
                        setFormData((prevData) => ({
                            ...prevData,
                            cap: e.target.value
                        }));
                    }}
                />
                <CustomInput
                    ec="mt-1.5"
                    StartIcon={<MdDialpad/>}
                    title="Numero di Telefono"
                    placeholder="Numero di Telefono"
                    type="text"
                    disabled={type === "info"}
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
                    StartIcon={<MdEmail/>}
                    title="Email"
                    placeholder="Email"
                    type="text"
                    disabled={type === "info"}
                    value={formData.email}
                    onChange={(e) => {
                        setFormData((prevData) => ({
                            ...prevData,
                            email: e.target.value
                        }));
                    }}
                />
                <CustomInput
                    ec="mt-1.5"
                    StartIcon={<MdReceipt/>}
                    title="P. IVA"
                    placeholder="P. IVA"
                    type="text"
                    disabled={type === "info"}
                    value={formData.piva}
                    onChange={(e) => {
                        setFormData((prevData) => ({
                            ...prevData,
                            piva: e.target.value
                        }));
                    }}
                />
                <CustomInput
                    ec="mt-1.5"
                    StartIcon={<MdAccountBalance/>}
                    title="IBAN"
                    placeholder="IBAN"
                    type="text"
                    disabled={type === "info"}
                    value={formData.iban}
                    onChange={(e) => {
                        setFormData((prevData) => ({
                            ...prevData,
                            iban: e.target.value
                        }));
                    }}
                />

                {type !== "info" && (<div className="mt-5 flex justify-end gap-2">
                    <CustomButton
                        type="submit"
                        text={type === "add" ? "Aggiungi" : "Modifica"}
                        icon={type === "add" ? <MdAdd/> : <MdModeEdit/>}
                        color={type === "add" ? "green" : undefined}
                    />
                    <CustomButton
                        type="button"
                        text="Annulla"
                        icon={<MdCancel/>}
                        color="red"
                        onClick={handleClearAndClose}
                    />
                </div>)}
            </form>
        </CustomModal>
    );
};
export default CmpAddEditInfoCustomersSuppliers;