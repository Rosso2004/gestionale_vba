import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import CustomModal from "../CustomModal";
import {useEffect, useState} from "react";
import {
    MdAdd, MdCalendarMonth,
    MdCancel,
    MdModeEdit,
    MdTextFields
} from "react-icons/md";
import CustomSelect from "../CustomSelect";
import axios from "axios";
import {toast} from "react-toastify";
import {IOrders} from "../../interfaces/IOrders";

interface ICmpAddEditInfoCustomersSuppliers {
    show: boolean;
    handleClose: () => void;
    data?: IOrders;
    type: "add" | "update" | "info";
    onUpdate: () => void;
}
const CmpAddEditInfoOrder : React.FC<ICmpAddEditInfoCustomersSuppliers> = (props) => {
    const {show, handleClose, type, data, onUpdate} = props;
    const [formData, setFormData] = useState<IOrders>({
        id: '',
        manager: {
            id: '',
            name: '',
        },
        customer: {
            id: '',
            name: '',
        },
        name: '',
        status: {
            id: '',
            name: '',
        },
        type: {
            id: '',
            name: '',
        },
        start_date: '',
        end_date: '',
        note: ''
    });

    const [selectInputData, setSelectInputData] = useState({
        manager: [],
        customer: [],
        status: [],
        type: []
    });

    const [error, setError] = useState({
        manager: '',
        customer: '',
        status: '',
        type: '',
        name: ''
    });


    useEffect(() => {
        getSelectInputData()
        if (type === "update" || type === "info") {
            setFormData({
                id: data?.id || '',
                manager: {
                    id: data?.manager.id || '',
                    name: data?.manager.name || ''
                },
                customer: {
                    id: data?.customer.id || '',
                    name: data?.customer.name || '',
                },
                status: {
                    id: data?.status.id || '',
                    name: data?.status.name || ''
                },
                type: {
                    id: data?.type.id || '',
                    name: data?.type.name || '',
                },
                name: data?.name || '',
                start_date: data?.start_date || '',
                end_date: data?.end_date || '',
                note: data?.note || ''
            });
        }
    }, [type, data]);

    const getSelectInputData = () => {
        axios
            .get(import.meta.env.VITE_URL_WEB_API + '/api/user/getAllUser')
            .then((response) => {
                const userData = response.data.map((res: { id: string; lastname: string; firstname: string; }) => ({
                    id: res.id,
                    name: res.lastname + ' ' + res.firstname,
                }));
                setSelectInputData((prevData) => ({
                    ...prevData,
                    manager: userData
                }));
            })
            .catch((error) => {
                toast.error(error);
            });
        axios
            .get(import.meta.env.VITE_URL_WEB_API + '/api/customerSupplier/getAllCustomerSupplier')
            .then((response) => {
                const filteredData = response.data.filter((res: { fnc: {id: number} }) => res.fnc.id === 1 || res.fnc.id === 2);
                const customerData = filteredData.map((res: { id: string; name: string; }) => ({
                    id: res.id,
                    name: res.name,
                }));
                setSelectInputData((prevData) => ({
                    ...prevData,
                    customer: customerData
                }));
            })
            .catch((error) => {
                toast.error(error);
            });
        axios
            .get(import.meta.env.VITE_URL_WEB_API + '/api/orderStatus/getAllOrderStatus')
            .then((response) => {
                const statusData = response.data.map((res: { id: string; name: string; }) => ({
                    id: res.id,
                    name: res.name,
                }));
                setSelectInputData((prevData) => ({
                    ...prevData,
                    status: statusData
                }));
            })
            .catch((error) => {
                toast.error(error);
            });
        axios
            .get(import.meta.env.VITE_URL_WEB_API + '/api/orderTypes/getAllOrderTypes')
            .then((response) => {
                const typesData = response.data.map((res: { id: string; name: string; }) => ({
                    id: res.id,
                    name: res.name,
                }));
                setSelectInputData((prevData) => ({
                    ...prevData,
                    type: typesData
                }));
            })
            .catch((error) => {
                toast.error(error);
            });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const toSubmit = {
            manager: formData.manager.id,
            customer: formData.customer.id,
            name: formData.name,
            status: formData.status.id,
            type: formData.type.id,
            start_date: formData.start_date,
            end_date: formData.end_date,
            note: formData.note
        };

        if (toSubmit.manager === '') {
            setError({
                manager: 'Il valore di questo campo non è valido',
                customer: '',
                status: '',
                type: '',
                name: ''
            })
        } else if (toSubmit.customer === '') {
            setError({
                manager: '',
                customer: 'Il valore di questo campo non è valido',
                status: '',
                type: '',
                name: ''
            })
        } else if (toSubmit.status === '') {
            setError({
                manager: '',
                customer: '',
                status: 'Il valore di questo campo non è valido',
                type: '',
                name: ''
            })
        } else if (toSubmit.type === '') {
            setError({
                manager: '',
                customer: '',
                status: '',
                type: 'Il valore di questo campo non è valido',
                name: ''
            })
        } else {
            if (type === "add") {
                axios
                    .post(import.meta.env.VITE_URL_WEB_API + '/api/order/createOrder', toSubmit)
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
                                manager: '',
                                customer: '',
                                status: '',
                                type: '',
                                name: error.response.data
                            })
                            toast.error(error.response.data);
                        }
                    });
            }
            else if (type === "update") {
                if (data?.id) {
                    axios
                        .put(import.meta.env.VITE_URL_WEB_API + '/api/order/updateOrder/' + data.id, toSubmit)
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
                                    manager: '',
                                    customer: '',
                                    status: '',
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
            manager: '',
            customer: '',
            status: '',
            type: '',
            name: ''
        })
        setFormData({
            id: '',
            manager: {
                id: '',
                name: '',
            },
            customer: {
                id: '',
                name: '',
            },
            name: '',
            status: {
                id: '',
                name: '',
            },
            type: {
                id: '',
                name: '',
            },
            start_date: '',
            end_date: '',
            note: ''
        });
    }
    console.log(formData.status.id)
    return (
        <CustomModal title={type === "add" ? "Inserimento Commessa" : type === "update" ? "Modifica Commessa" : "Informazioni Commessa"} show={show} handleClose={handleClearAndClose}>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 md:pr-2">
                        <CustomSelect
                            title="Responsabile"
                            disabled={type === "info"}
                            option={selectInputData.manager.map((item: { id: string; name: string }) => ({ id: item.id, name: item.name }))}
                            value={formData.manager.id}
                            error={error.manager}
                            onChange={(e) => {
                                setFormData((prevData) => ({
                                    ...prevData,
                                    manager: {
                                        ...prevData.manager,
                                        id: e
                                    }
                                }))
                            }}
                        />
                        <CustomSelect
                            ec="mt-1.5"
                            title="Cliente"
                            disabled={type === "info"}
                            option={selectInputData.customer.map((item: { id: string; name: string }) => ({ id: item.id, name: item.name }))}
                            value={formData.customer.id}
                            error={error.customer}
                            onChange={(e) => {
                                setFormData((prevData) => ({
                                    ...prevData,
                                    customer: {
                                        ...prevData.customer,
                                        id: e
                                    }
                                }))
                            }}
                        />
                        <CustomInput
                            ec="mt-1.5"
                            StartIcon={<MdTextFields/>}
                            title="Titolo"
                            placeholder="Titolo"
                            type="text"
                            required
                            error={error.name}
                            disabled={type === "info"}
                            value={formData.name}
                            onChange={(e) => {
                                setFormData((prevData) => ({
                                    ...prevData,
                                    name: e.target.value
                                }));
                            }}
                        />
                        <CustomSelect
                            ec="mt-1.5"
                            title="Stato Commessa"
                            disabled={type === "info"}
                            option={selectInputData.status.map((item: { id: string; name: string }) => ({ id: item.id, name: item.name }))}
                            value={formData.status.id}
                            error={error.status}
                            onChange={(e) => {
                                setFormData((prevData) => ({
                                    ...prevData,
                                    status: {
                                        ...prevData.status,
                                        id: e
                                    }
                                }))
                            }}
                        />
                        <CustomSelect
                            ec="mt-1.5"
                            title="Tipo Commessa"
                            disabled={type === "info"}
                            option={selectInputData.type.map((item: { id: string; name: string }) => ({ id: item.id, name: item.name }))}
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
                    </div>
                    <div className="md:w-1/2 md:pl-2">
                        <CustomInput
                            StartIcon={<MdCalendarMonth/>}
                            title="Data di Inizio"
                            placeholder="Data di Inizio"
                            type="date"
                            required
                            disabled={type === "info"}
                            value={formData.start_date}
                            onChange={(e) => {
                                setFormData((prevData) => ({
                                    ...prevData,
                                    start_date: e.target.value
                                }));
                            }}
                        />
                        <CustomInput
                            ec="mt-1.5"
                            StartIcon={<MdCalendarMonth/>}
                            title="Data di Fine"
                            placeholder="Data di Fine"
                            type="date"
                            disabled={type === "info"}
                            value={formData.end_date}
                            onChange={(e) => {
                                setFormData((prevData) => ({
                                    ...prevData,
                                    end_date: e.target.value
                                }));
                            }}
                        />
                        <CustomInput
                            ec="mt-1.5"
                            title="Note"
                            placeholder="Note"
                            type="text"
                            disabled={type === "info"}
                            textArea
                            rows={7}
                            value={formData.note}
                            onChange={(e) => {
                                setFormData((prevData) => ({
                                    ...prevData,
                                    note: e.target.value
                                }));
                            }}
                        />
                    </div>
                </div>

                {type !== "info" && (<div className="mt-5 flex justify-end gap-2">
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
                        color={type === "add" ? "green" : undefined}
                    />
                </div>)}
            </form>
        </CustomModal>
    );
};
export default CmpAddEditInfoOrder;