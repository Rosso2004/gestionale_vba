import {useNavigate} from "react-router-dom";
import {useGlobalState} from "../global/GlobalStateContext";
import {useEffect, useState} from "react";
import {ICustomersSuppliers} from "../interfaces/ICustomersSuppliers";
import CustomPaper from "../components/CutomPaper";
import CustomButton from "../components/CustomButton";
import {MdAdd} from "react-icons/md";
import CmpTableCustomersSuppliers from "../components/customersSuppliers/CmpTableCustomersSuppliers";
import CmpAddEditInfoCustomersSuppliers from "../components/customersSuppliers/CmpAddEditInfoCustomersSuppliers";
import axios from "axios";
import {toast} from "react-toastify";

const PageCustomersSuppliers = () => {
    const navigate = useNavigate();
    const { isVerified } = useGlobalState();

    useEffect(() => {
        if (!isVerified) {
            return navigate("/")
        }
    })

    const [customersSuppliersData, setCustomersSuppliersData] = useState<ICustomersSuppliers[]>([]);

    useEffect(() => {
        fetchCustomersSuppliers();
        console.log(customersSuppliersData)
    }, []);

    const fetchCustomersSuppliers = () => {
        axios
            .get(import.meta.env.VITE_URL_WEB_API + '/api/customerSupplier/getAllCustomerSupplier')
            .then((response) => {
                const dataTo = response.data.map((res: any) => {
                    return ({
                        id: res.id,
                        type: JSON.parse(res.type),
                        fnc: JSON.parse(res.fnc),
                        name: res.name,
                        city: res.city,
                        address: res.address,
                        cap: res.cap,
                        phone_number: res.phone_number,
                        email: res.email,
                        piva: res.piva,
                        iban: res.iban
                    })
                })
                console.log("data: ", dataTo)
                setCustomersSuppliersData(dataTo);
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const [showAddCustomersSuppliers, setShowAddCustomersSuppliers] = useState(false);
    const handleShowAddResourceType = () => {
        setShowAddCustomersSuppliers(!showAddCustomersSuppliers);
    };

    return (
        <div className={`w-full mx-4 grid gap-4`}>
            <CustomPaper ec="m-3 flex justify-end gap-2">
                <CustomButton type="button" text="Nuovo Cliente / Fornitore" icon={<MdAdd/>} onClick={handleShowAddResourceType}></CustomButton>
            </CustomPaper>

            <CmpAddEditInfoCustomersSuppliers show={showAddCustomersSuppliers} handleClose={handleShowAddResourceType} type="add" onUpdate={fetchCustomersSuppliers}/>

            <CmpTableCustomersSuppliers data={customersSuppliersData} onUpdate={fetchCustomersSuppliers}/>
        </div>
    );
};

export default PageCustomersSuppliers;