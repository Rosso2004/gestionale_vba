import CustomTable from "../table/CustomTable";
import {IResourcesType} from "../../interfaces/IResourcesType";
import CustomButton from "../CustomButton";
import {MdDelete, MdModeEdit} from "react-icons/md"
import CmpDeleteResourceType from "./CmpDeleteResourceType";
import {useCallback, useMemo, useState} from "react";
import getIndex from "../../utility/getIndex";
import CmpAddEditResourceType from "./CmpAddEditResourceType";

interface ICmpTableResourcesType {
    data: IResourcesType[];
    onUpdate: () => void;
}

const CmpTableResourcesType: React.FC<ICmpTableResourcesType> = (props) => {
    const {data, onUpdate} = props

    const [showActionResourceType, setShowActionResourceType] = useState<{ resourceTypeData: IResourcesType; show: { update: boolean; delete: boolean } }>({
        resourceTypeData: {
            id: '',
            name: '',
            description: '',
            note: ''
        },
        show: {
            update: false,
            delete: false
        }
    });

    const handleShowActionResourceType = useCallback((id: string | undefined, type: "update" | "delete") => {
        const indexPump = getIndex(data, "id", id)
        if (type === "update") {
            setShowActionResourceType({
                resourceTypeData: data[indexPump],
                show: {
                    update: true,
                    delete: false
                }
            });
        } else if (type === "delete") {
            setShowActionResourceType({
                resourceTypeData: data[indexPump],
                show: {
                    update: false,
                    delete: true
                }
            });
        }
    }, [data, setShowActionResourceType]);

    const handleCancelActionResourceType = () => {
        setShowActionResourceType({
            resourceTypeData: {
                id: '',
                name: '',
                description: '',
                note: ''
            },
            show: {
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
                Header: 'Descrizione',
                accessor: 'description',
            },
            {
                Header: 'Note',
                accessor: 'note',
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
                                ec="text-blue-700"
                                onClick={() => {
                                    handleShowActionResourceType(values.id, "update")
                                }}
                                icon={<MdModeEdit/>}
                            />
                            <CustomButton
                                color="gray"
                                type="button"
                                ec="text-red-700"
                                onClick={() => {
                                    handleShowActionResourceType(values.id, "delete")
                                }}
                                icon={<MdDelete/>}
                            />
                        </>
                    );
                }
            }
        ],
        [handleShowActionResourceType]
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

            <CmpAddEditResourceType
                show={showActionResourceType.show.update}
                data={showActionResourceType.resourceTypeData}
                type="update"
                handleClose={handleCancelActionResourceType}
                onUpdate={onUpdate}
            />

            <CmpDeleteResourceType
                show={showActionResourceType.show.delete}
                data={showActionResourceType.resourceTypeData}
                handleCancel={handleCancelActionResourceType}
                onUpdate={onUpdate}
            />
        </>
    );
};

export default CmpTableResourcesType;