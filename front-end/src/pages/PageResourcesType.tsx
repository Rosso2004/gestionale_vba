import {useGlobalState} from "../global/GlobalStateContext";
import CustomPaper from "../components/CutomPaper";
import CustomButton from "../components/CustomButton";
import {MdAdd} from "react-icons/md";
import {useState, useEffect} from "react";
import CmpAddEditResourceType from "../components/resourcesType/CmpAddEditResourceType";
import CmpTableResourcesType from "../components/resourcesType/CmpTableResourcesType";
import {useNavigate} from "react-router-dom";
import {IResourcesType} from "../interfaces/IResourcesType"
import axios from "axios";
import {toast} from "react-toastify";

const PageResourcesType = () => {
    const navigate = useNavigate();
    const { isVerified } = useGlobalState();

    useEffect(() => {
        if (!isVerified) {
            return navigate("/")
        }
    })

    const [resourcesTypeData, setResourcesTypeData] = useState<IResourcesType[]>([]);

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = () => {
        axios
            .get(import.meta.env.VITE_URL_WEB_API + '/api/resourceType/getAllResourceType')
            .then((response) => {
                setResourcesTypeData(response.data);
            })
            .catch((error) => {
                toast.error(error.response.data)
            });
    };

    const [showAddResourceType, setShowAddResourceType] = useState(false);
    const handleShowAddResourceType = () => {
        setShowAddResourceType(!showAddResourceType);
    };

    return (
        <div className={`w-full mx-4 grid gap-4`}>
            <CustomPaper ec="m-3 flex justify-end gap-2">
                <CustomButton type="button" text="Nuova Risorsa" icon={<MdAdd/>} onClick={handleShowAddResourceType}></CustomButton>
            </CustomPaper>

            <CmpAddEditResourceType show={showAddResourceType} type="add" handleClose={handleShowAddResourceType} onUpdate={fetchResources}></CmpAddEditResourceType>

            <CmpTableResourcesType data={resourcesTypeData} onUpdate={fetchResources}/>
        </div>
    )
}

export default PageResourcesType;