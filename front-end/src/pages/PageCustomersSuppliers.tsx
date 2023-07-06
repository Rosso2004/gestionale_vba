import {useNavigate} from "react-router-dom";
import {useGlobalState} from "../global/GlobalStateContext";
import {useEffect, useState} from "react";
import {ICustomersSuppliers} from "../interfaces/ICustomersSuppliers";
import PocketBase from "pocketbase";
import CustomPaper from "../components/CutomPaper";
import CustomButton from "../components/CustomButton";
import {MdAdd} from "react-icons/md";
import CmpAddEditResourceType from "../components/resourcesType/CmpAddEditResourceType";
import CmpTableResourcesType from "../components/resourcesType/CmpTableResourcesType";
import CmpTableCustomersSuppliers from "../components/customersSuppliers/CmpTableCustomersSuppliers";

interface IPageCustomersSuppliers {
    data: ICustomersSuppliers[];
    call: boolean;
}

const PageCustomersSuppliers = () => {
    const navigate = useNavigate();
    const { isVerified } = useGlobalState();

    useEffect(() => {
        if (!isVerified) {
            return navigate("/")
        }
    })

    const [customersSuppliersData, setCustomersSuppliersData] = useState<IPageCustomersSuppliers>({ data: [], call: false });

    useEffect(() => {
        fetchCustomersSuppliers();
    }, []);

    useEffect(() => {
        if (customersSuppliersData.call) {
            fetchCustomersSuppliers();
            setCustomersSuppliersData((prevData) => ({
                ...prevData,
                call: false,
            }));
        }
    }, [customersSuppliersData.call]);

    const fetchCustomersSuppliers = () => {
        const pb = new PocketBase('http://127.0.0.1:8090');
        pb.collection('customers_suppliers')
            .getFullList({
                expand: 'type, function'
                // fields: 'id, type, function, name, city, address, cap, phone_number, email, piva, iban',
            })
            .then((response) => {
                const updatedData: ICustomersSuppliers[] = response.map((record) => ({
                    id: record.id,
                    type: {
                        id: record.expand.type.id,
                        name: record.expand.type.name,
                        description: record.expand.type.description,
                        note: record.expand.type.note
                    },
                    function: {
                        id: record.expand.type.id,
                        name: record.expand.type.name
                    },
                    name: record.name,
                    city: record.city,
                    address: record.address,
                    cap: record.cap,
                    phone_number: record.phone_number,
                    email: record.email,
                    piva: record.piva,
                    iban: record.iban,
                }));
                setCustomersSuppliersData((prevData) => ({
                    ...prevData,
                    data: updatedData,
                }));
                console.log(customersSuppliersData)
            })
            .catch((error) => {
                console.error('Errore durante la richiesta GET:', error);
            });
    };

    return (
        <div className={`w-full mx-40 grid gap-4`}>
            <CustomPaper ec="m-3 flex justify-end gap-2">
                <CustomButton type="button" text="Nuovo Cliente / Fornitore" icon={<MdAdd/>} onClick={fetchCustomersSuppliers}></CustomButton>
            </CustomPaper>

            <CmpTableCustomersSuppliers data={customersSuppliersData.data} onUpdate={fetchCustomersSuppliers}/>
        </div>
    );
};

export default PageCustomersSuppliers;