import CustomTable from "../table/CustomTable";
import CustomButton from "../CustomButton";
import {MdDelete, MdInfoOutline, MdModeEdit} from "react-icons/md"
import {useMemo, useState} from "react";
import getIndex from "../../utility/getIndex";
import {ICustomersSuppliers} from "../../interfaces/ICustomersSuppliers";
import CmpAddEditInfoCustomersSuppliers from "./CmpAddEditInfoCustomersSuppliers";
import CmpDeleteCustomersSuppliers from "./CmpDeleteCustomersSuppliers";

interface ICmpTableCustomersSuppliers {
    data: ICustomersSuppliers[];
    onUpdate: () => void;
}

const CmpTableCustomersSuppliers: React.FC<ICmpTableCustomersSuppliers> = (props) => {
    const {data, onUpdate} = props

    const [showActionCustomersSuppliers, setShowActionCustomersSuppliers] = useState<{ customersSuppliersData: ICustomersSuppliers; show: {info: boolean; update: boolean; delete: boolean}}>({
        customersSuppliersData: {
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
        },
        show: {
            info: false,
            update: false,
            delete: false
        }
    });

    const handleShowActionCustomersSuppliers = (id: string | undefined, type: "info" | "update" | "delete") => {
        const indexPump = getIndex(data, "id", id)
        if (type === "update") {
            setShowActionCustomersSuppliers({
                customersSuppliersData: data[indexPump],
                show: {
                    info: false,
                    update: true,
                    delete: false
                }
            });
        } else if (type === "info") {
            setShowActionCustomersSuppliers({
                customersSuppliersData: data[indexPump],
                show: {
                    info: true,
                    update: false,
                    delete: false
                }
            });
        } else if (type === "delete") {
            setShowActionCustomersSuppliers({
                customersSuppliersData: data[indexPump],
                show: {
                    info: false,
                    update: false,
                    delete: true
                }
            });
        }
    };

    const handleCancelActionCustomersSuppliers = () => {
        setShowActionCustomersSuppliers({
            customersSuppliersData: {
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
                Header: '#',
                accessor: 'id',
            },
            {
                Header: 'Nome',
                accessor: 'name',
            },
            {
                Header: 'Città',
                accessor: 'city',
            },
            {
                Header: 'Tipo Risorsa',
                accessor: 'type.name',
            },
            {
                Header: 'Funzione Risorsa',
                accessor: 'function.name',
            },
            {
                Header: 'Azioni',
                disableFilters: true,
                Cell: ({row}: any) => {
                    const {values} = row;
                    return (
                        <>
                            <CustomButton
                                color="gray"
                                type="button"
                                ec="text-blue-800"
                                onClick={() => {
                                    handleShowActionCustomersSuppliers(values.id, "info")
                                }}
                                icon={<MdInfoOutline/>}
                            />
                            <CustomButton
                                color="gray"
                                type="button"
                                ec="text-blue-700"
                                onClick={() => {
                                    handleShowActionCustomersSuppliers(values.id, "update")
                                }}
                                icon={<MdModeEdit/>}
                            />
                            <CustomButton
                                color="gray"
                                type="button"
                                ec="text-red-700"
                                onClick={() => {
                                    handleShowActionCustomersSuppliers(values.id, "delete")
                                }}
                                icon={<MdDelete/>}
                            />
                        </>
                    );
                }
            }
        ],
        [handleShowActionCustomersSuppliers]
    );

    const tData = useMemo(() => data, [data])

    return (
        <>
            <CustomTable
                globalSearch
                hiddenColumns={['id']}
                columns={tColumns}
                data={tData}
            />

            <CmpAddEditInfoCustomersSuppliers
                show={showActionCustomersSuppliers.show.update}
                data={showActionCustomersSuppliers.customersSuppliersData}
                type="update"
                handleClose={handleCancelActionCustomersSuppliers}
                onUpdate={onUpdate}
            />

            <CmpAddEditInfoCustomersSuppliers
                show={showActionCustomersSuppliers.show.info}
                data={showActionCustomersSuppliers.customersSuppliersData}
                type="info"
                handleClose={handleCancelActionCustomersSuppliers}
                onUpdate={onUpdate}
            />

            <CmpDeleteCustomersSuppliers
                show={showActionCustomersSuppliers.show.delete}
                data={showActionCustomersSuppliers.customersSuppliersData}
                handleCancel={handleCancelActionCustomersSuppliers}
                onUpdate={onUpdate}
            />
        </>
    );
};

export default CmpTableCustomersSuppliers;