import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import CustomModal from "../CustomModal";
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
import axios from "axios";
import {IResourcesType} from "../../interfaces/IResourcesType";
import {IResourcesFunction} from "../../interfaces/IResourcesFunction";
import {toast} from "react-toastify";

interface ICmpAddEditInfoCustomersSuppliers {
    show: boolean;
    handleClose: () => void;
    data?: ICustomersSuppliers;
    type: "add" | "update" | "info";
    onUpdate: () => void;
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
        fnc: {
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

    const [selectInputData, setSelectInputData] = useState({
        type: [],
        fnc: [],
    })

    const [error, setError] = useState({
        type: '',
        fnc: '',
        name: ''
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
                fnc: {
                    id: data?.fnc.id || '',
                    name: data?.fnc.name || '',
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
        axios
            .get(import.meta.env.VITE_URL_WEB_API + '/api/resourceType/getAllResourceType')
            .then((response) => {
                const resourcesTypeData = response.data.map((res: IResourcesType) => ({
                    id: res.id,
                    name: res.name,
                    description: res.description,
                    note: res.note
                }));
                setSelectInputData((prevData) => ({
                    ...prevData,
                    type: resourcesTypeData
                }));
            })
            .catch((error) => {
                toast.error(error);
            });
        axios
            .get(import.meta.env.VITE_URL_WEB_API + '/api/resourceFunction/getAllResourceFunction')
            .then((response) => {
                const resourcesFunctionData = response.data.map((res: IResourcesFunction) => ({
                    id: res.id,
                    name: res.name
                }));
                setSelectInputData((prevData) => ({
                    ...prevData,
                    fnc: resourcesFunctionData
                }));
            })
            .catch((error) => {
                toast.error(error);
            });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const toSubmit = {
            type: formData.type.id,
            fnc: formData.fnc.id,
            name: formData.name,
            city: formData.city,
            address: formData.address,
            cap: formData.cap,
            phone_number: formData.phone_number,
            email: formData.email,
            piva: formData.phone_number,
            iban: formData.email,
        };

        if (toSubmit.type === '') {
            setError({
                name: '',
                fnc: '',
                type: 'Il valore di questo campo non è valido'
            })
        } else if (toSubmit.fnc === '') {
            setError({
                name: '',
                type: '',
                fnc: 'Il valore di questo campo non è valido'
            })
        } else {
            if (type === "add") {
                axios
                    .post(import.meta.env.VITE_URL_WEB_API + '/api/customerSupplier/createCustomerSupplier', toSubmit)
                    .then((response)=>{
                        if (response.status === 200) {
                            handleClearAndClose();
                            onUpdate();
                            toast.success(response.data.message);
                        }
                    })
                    .catch((error) => {
                        if (error.response.status === 409) {
                            setError({
                                fnc: '',
                                type: '',
                                name: error.response.data
                            })
                            toast.error(error.response.data);
                        }
                    });
            } else if (type === "update") {
                if (data?.id) {
                    axios
                        .put(import.meta.env.VITE_URL_WEB_API + '/api/customerSupplier/updateCustomerSupplier/' + data.id, toSubmit)
                        .then((response) => {
                            if (response.status === 200) {
                                handleClearAndClose();
                                onUpdate();
                                toast.success(response.data.message);
                            }
                        })
                        .catch((error) => {
                            if (error.response.status === 409) {
                                setError({
                                    fnc: '',
                                    type: '',
                                    name: error.response.data
                                })
                                toast.error(error.response.data);
                            }
                        });
                } else {
                    console.log("ID non definito");
                }
            }
        }
    }

    const handleClearAndClose = () => {
        handleClose();
        setError({
            type: '',
            fnc: '',
            name: ''
        })
        setFormData({
            id: '',
            type: {
                id: '',
                name: '',
                description: '',
                note: ''
            },
            fnc: {
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
        });
    }

    return (
        <CustomModal title={type === "add" ? "Inserimento Cliente / Fornitore" : type === "update" ? "Modifica Cliente / Fornitore" : "Informazioni Cliente / Fornitore"} show={show} handleClose={handleClearAndClose}>
            <form className="" onSubmit={handleSubmit}>
                <CustomSelect
                    ec="mt-1.5"
                    title="Tipo Risorsa"
                    disabled={type === "info"}
                    option={selectInputData.type.map((item: IResourcesType) => ({ id: item.id, name: item.name }))}
                    value={formData.type.id}
                    error={error.type}
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
                    option={selectInputData.fnc.map((item: IResourcesFunction) => ({ id: item.id, name: item.name }))}
                    value={formData.fnc.id}
                    error={error.fnc}
                    onChange={(e) => {
                        setFormData((prevData) => ({
                            ...prevData,
                            fnc: {
                                ...prevData.fnc,
                                id: e
                            }
                        }))
                        console.log(formData.fnc)
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
                    error={error.name}
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