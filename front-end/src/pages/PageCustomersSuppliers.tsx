import {useNavigate} from "react-router-dom";
import {useGlobalState} from "../global/GlobalStateContext";
import {useEffect, useState} from "react";
import {ICustomersSuppliers} from "../interfaces/ICustomersSuppliers";
import PocketBase from "pocketbase";

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
        console.log(customersSuppliersData)
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
                fields: 'id, type, function, name, city, address, cap, phone_number, email, piva, iban',
            })
            .then((response) => {
                const updatedData: ICustomersSuppliers[] = response.map((record) => ({
                    id: record.id,
                    type: record.type,
                    function: record.function,
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
            })
            .catch((error) => {
                console.error('Errore durante la richiesta GET:', error);
            });
    };

    return (
        <div>

        </div>
    );
};

export default PageCustomersSuppliers;