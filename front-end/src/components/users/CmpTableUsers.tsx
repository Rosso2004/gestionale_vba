import CustomTable from "../table/CustomTable";
import CustomButton from "../CustomButton";
import {MdDelete, MdModeEdit} from "react-icons/md"
import {useCallback, useMemo, useState} from "react";
import getIndex from "../../utility/getIndex";
import {IUsers} from "../../interfaces/IUsers";
import CmpAddEditUser from "./CmpAddEditUser";
import CmpDeleteUser from "./CmpDeleteUser";

interface ICmpTableResourcesType {
    data: IUsers[];
    onUpdate: () => void;
}

const CmpTableUsers: React.FC<ICmpTableResourcesType> = (props) => {
    const {data, onUpdate} = props;

    const [showActionUser, setShowActionUser] = useState<{ userData: IUsers; show: { update: boolean; delete: boolean } }>({
        userData: {
            id:'',
            lastname: '',
            firstname: '',
            username: '',
            email: '',
            phone_number: '',
            password: ''
        },
        show: {
            update: false,
            delete: false
        }
    });

    const handleShowActionUser = useCallback((id: string | undefined, type: "update" | "delete") => {
        const indexPump = getIndex(data, "id", id)
        if (type === "update") {
            setShowActionUser({
                userData: data[indexPump],
                show: {
                    update: true,
                    delete: false
                }
            });
        } else if (type === "delete") {
            setShowActionUser({
                userData: data[indexPump],
                show: {
                    update: false,
                    delete: true
                }
            });
        }
    }, [data, setShowActionUser]);

    const handleCancelActionUser = () => {
        setShowActionUser({
            userData: {
                id:'',
                lastname: '',
                firstname: '',
                username: '',
                email: '',
                phone_number: '',
                password: ''
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
                Header: 'Username',
                accessor: 'username',
            },
            {
                Header: 'Cognome',
                accessor: 'lastname',
            },
            {
                Header: 'Nome',
                accessor: 'firstname',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Numero di Telefono',
                accessor: 'phone_number',
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
                                    handleShowActionUser(values.id, "update")
                                }}
                                icon={<MdModeEdit/>}
                            />
                            <CustomButton
                                color="gray"
                                type="button"
                                ec="text-red-700"
                                onClick={() => {
                                    handleShowActionUser(values.id, "delete")
                                }}
                                icon={<MdDelete/>}
                            />
                        </>
                    );
                }
            }
        ],
        [handleShowActionUser]
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

            <CmpAddEditUser
                show={showActionUser.show.update}
                data={showActionUser.userData}
                type="update"
                handleClose={handleCancelActionUser}
                onUpdate={onUpdate}
            />

            <CmpDeleteUser
                show={showActionUser.show.delete}
                data={showActionUser.userData}
                handleCancel={handleCancelActionUser}
                onUpdate={onUpdate}
            />
        </>
    );
};

export default CmpTableUsers;