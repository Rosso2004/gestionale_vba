import {useGlobalState} from "../global/GlobalStateContext";
import CustomPaper from "../components/CutomPaper";
import CustomButton from "../components/CustomButton";
import {MdAdd} from "react-icons/md";
import {useState, useEffect} from "react";
import CmpAddEditResourceType from "../components/resourcesType/CmpAddEditResourceType";
import PocketBase from 'pocketbase';
import CmpTableResourcesType from "../components/resourcesType/CmpTableResourcesType";
import {useNavigate} from "react-router-dom";
import {IResourcesType} from "../interfaces/IResourcesType"
interface IPageResourcesType {
    data: IResourcesType[];
    call: boolean;
}
const PageResourcesType = () => {
    const navigate = useNavigate();
    const { isVerified } = useGlobalState();

    useEffect(() => {
        if (!isVerified) {
            return navigate("/")
        }
    })

    const [resourcesData, setResourcesData] = useState<IPageResourcesType>({ data: [], call: false });

    useEffect(() => {
        fetchResources();
    }, []);

    useEffect(() => {
        if (resourcesData.call) {
            fetchResources();
            setResourcesData((prevData) => ({
                ...prevData,
                call: false,
            }));
        }
    }, [resourcesData.call]);
    const fetchResources = () => {
        const pb = new PocketBase('http://127.0.0.1:8090');
        pb.collection('resources_type')
            .getFullList({
                fields: 'id, name, description, note',
            })
            .then((response) => {
                const updatedData: IResourcesType[] = response.map((record) => ({
                    id: record.id,
                    name: record.name,
                    description: record.description,
                    note: record.note,
                }));
                setResourcesData((prevData) => ({
                    ...prevData,
                    data: updatedData,
                }));
            })
            .catch((error) => {
                console.error('Errore durante la richiesta GET:', error);
            });
    };

    const [showAddResourceType, setShowAddResourceType] = useState(false);
    const handleShowAddResourceType = () => {
        setShowAddResourceType(!showAddResourceType);
    };

    return (
        <div className={`w-full mx-40 grid gap-4`}>
            <CustomPaper ec="m-3 flex justify-end gap-2">
                <CustomButton type="button" text="Nuova Risorsa" icon={<MdAdd/>} onClick={handleShowAddResourceType}></CustomButton>
            </CustomPaper>

            <CmpAddEditResourceType show={showAddResourceType} type="add" handleClose={handleShowAddResourceType} onUpdate={fetchResources}></CmpAddEditResourceType>

            <CmpTableResourcesType data={resourcesData.data} onUpdate={fetchResources}/>
        </div>
    )
}

export default PageResourcesType;