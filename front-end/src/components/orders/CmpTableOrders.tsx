import CustomTable from "../table/CustomTable";
import CustomButton from "../CustomButton";
import {MdInfoOutline, MdModeEdit, MdVisibility, MdVisibilityOff} from "react-icons/md"
import {useCallback, useEffect, useMemo, useState} from "react";
import getIndex from "../../utility/getIndex";
import {IOrders} from "../../interfaces/IOrders";
import CmpAddEditInfoOrder from "./CmpAddEditInfoOrder";

interface ICmpTableCustomersSuppliers {
    data: IOrders[];
    onUpdate: () => void;
}

const CmpTableCustomersSuppliers: React.FC<ICmpTableCustomersSuppliers> = (props) => {
    const {data, onUpdate} = props

    const [showOthers, setShowOthers] = useState(false);
    const [filteredData, setFilteredData] = useState<IOrders[]>([]);

    useEffect(() => {
        const filtered = showOthers ? data : data.filter((item) => item.status.name !== "Terminata" && item.status.name !== "Abortita" && item.status.name !== "Fatturata");
        setFilteredData(filtered);
    }, [data, showOthers]);

    const handleShowOthers = () => {
        setShowOthers(!showOthers);
    };

    const [showActionOrders, setShowActionOrders] = useState<{ ordersData: IOrders; show: {info: boolean; update: boolean; delete: boolean}}>({
        ordersData: {
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
        },
        show: {
            info: false,
            update: false,
            delete: false
        }
    });

    const handleShowActionOrders = useCallback((id: string | undefined, type: "info" | "update" | "delete") => {
        const indexPump = getIndex(data, "id", id)
        if (type === "update") {
            setShowActionOrders({
                ordersData: data[indexPump],
                show: {
                    info: false,
                    update: true,
                    delete: false
                }
            });
        } else if (type === "info") {
            setShowActionOrders({
                ordersData: data[indexPump],
                show: {
                    info: true,
                    update: false,
                    delete: false
                }
            });
        } else if (type === "delete") {
            setShowActionOrders({
                ordersData: data[indexPump],
                show: {
                    info: false,
                    update: false,
                    delete: true
                }
            });
        }
    }, [data, setShowActionOrders]);

    const getStatusColor = (statusName: string) => {
        switch (statusName) {
            case "Creata":
                return "bg-orange-300";
            case "Offerta":
                return "bg-red-300";
            case "Acquisizione Ordine":
                return "bg-yellow-400";
            case "In Lavorazione":
                return "bg-yellow-200";
            case "In Collaudo":
                return "bg-green-300";
            case "Terminata":
                return "bg-green-900";
            case "Abortita":
                return "bg-red-700";
            case "Fatturata":
                return "bg-gray-500";
        }
    };

    const handleCancelActionCustomersSuppliers = () => {
        setShowActionOrders({
            ordersData: {
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
            },
            show: {
                info: false,
                update: false,
                delete: false
            }
        });
    };

    const tColumns = useMemo(
        () => [
            {
                Header: 'ID Commessa',
                accessor: 'id',
                width: 50,
            },
            {
                Header: 'Responsabile',
                accessor: 'manager.name',
                width: 100,
            },
            {
                Header: 'Cliente',
                accessor: 'customer.name',
            },
            {
                Header: 'Titolo',
                accessor: 'name',
            },
            {
                Header: 'Tipo Commessa',
                accessor: 'type.name',
            },
            {
                Header: 'Data di Inizio',
                accessor: 'start_date',
                width: 85,
                Cell: ({row}: any) => {
                    const {values} = row;
                    const formatDate = (dateString: string): string => {
                        const [year, month, day] = dateString.split('-');
                        return `${day}/${month}/${year}`;
                    };
                    return(
                        <span>{formatDate(values.start_date)}</span>
                    );
                }
            },
            {
                Header: 'Data di Fine',
                accessor: 'end_date',
                width: 85,
                Cell: ({row}: any) => {
                    const {values} = row;
                        const formatDate = (dateString: string): string => {
                            const [year, month, day] = dateString.split('-');
                            return `${day}/${month}/${year}`;
                        };
                        return(
                            <>
                                {values.end_date && (
                                    <span>{formatDate(values.end_date)}</span>
                                )}
                            </>
                        );
                }
            },
            {
                Header: 'Stato Commessa',
                accessor: 'status.name',
                width: 100,
                Cell: ({ value }: any) => {
                    console.log(value)
                    return (
                        <div className="flex justify-between items-center">
                            <span>{value}</span>
                            <div className="flex items-center">
                                <span className={`h-3 w-8 rounded-full mr-1 ${getStatusColor(value)}`} />
                            </div>
                        </div>
                    );
                }
            },
            {
                Header: 'Azioni',
                disableFilters: true,
                width: 100,
                Cell: ({row}: any) => {
                    const {values} = row;
                    return (
                        <>
                            <CustomButton
                                color="gray"
                                type="button"
                                ec="text-blue-800"
                                onClick={() => {
                                    handleShowActionOrders(values.id, "info")
                                }}
                                icon={<MdInfoOutline/>}
                            />
                            <CustomButton
                                color="gray"
                                type="button"
                                ec="text-blue-700"
                                onClick={() => {
                                    handleShowActionOrders(values.id, "update")
                                }}
                                icon={<MdModeEdit/>}
                            />
                        </>
                    );
                }
            }
        ],
        [handleShowActionOrders]
    );

    return (
        <>
            <CustomTable
                globalSearch
                hiddenColumns={[]}
                columns={tColumns}
                data={filteredData}
                btnSupport={
                    <CustomButton
                        ec="mt-3 mb-3 mr-3"
                        type="button"
                        icon={showOthers ? <MdVisibilityOff/> : <MdVisibility/>}
                        color={showOthers ? 'red' : 'green'}
                        text={showOthers ? 'Nascondi Irrilevanti' : 'Mostra Irrilevanti'}
                        onClick={handleShowOthers}
                    />
                }
            />

            <CmpAddEditInfoOrder
                show={showActionOrders.show.update}
                data={showActionOrders.ordersData}
                type="update"
                handleClose={handleCancelActionCustomersSuppliers}
                onUpdate={onUpdate}
            />

            <CmpAddEditInfoOrder
                show={showActionOrders.show.info}
                data={showActionOrders.ordersData}
                type="info"
                handleClose={handleCancelActionCustomersSuppliers}
                onUpdate={onUpdate}
            />
        </>
    );
};

export default CmpTableCustomersSuppliers;