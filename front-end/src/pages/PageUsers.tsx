import {useGlobalState} from "../global/GlobalStateContext";
import CustomPaper from "../components/CutomPaper";
import CustomButton from "../components/CustomButton";
import {MdPersonAdd} from "react-icons/md";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {IUsers} from "../interfaces/IUsers";
import CmpTableUsers from "../components/users/CmpTableUsers";
import CmpAddEditUser from "../components/users/CmpAddEditUser";
import {toast} from "react-toastify";
import success = toast.success;

const PageUsers = () => {
    const navigate = useNavigate();
    const { isVerified } = useGlobalState();

    useEffect(() => {
        if (!isVerified) {
            return navigate("/")
        }
    })

    const [usersData, setUsersData] = useState<IUsers[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios
            .get(import.meta.env.VITE_URL_WEB_API + '/api/user/getAllUser')
            .then((response) => {
                setUsersData(response.data);
            })
            .catch((error) => {
                toast.error(error)
            });
    };

    const [showAddUsers, setShowAddUsers] = useState(false);
    const handleShowAddUser = () => {
        setShowAddUsers(!showAddUsers);
    };

    return (
        <div className={`w-full mx-40 grid gap-4`}>
            <CustomPaper ec="m-3 flex justify-end gap-2">
                <CustomButton type="button" text="Nuovo Utente" icon={<MdPersonAdd/>} onClick={handleShowAddUser}></CustomButton>
            </CustomPaper>

            <CmpAddEditUser show={showAddUsers} type="add" handleClose={handleShowAddUser} onUpdate={fetchUsers}></CmpAddEditUser>

            <CmpTableUsers data={usersData} onUpdate={fetchUsers}/>
        </div>
    )
}

export default PageUsers;