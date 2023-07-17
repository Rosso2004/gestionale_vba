import {useGlobalState} from "../global/GlobalStateContext";
import CustomPaper from "../components/CutomPaper";
import CustomButton from "../components/CustomButton";
import {MdAdd} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import CmpAddEditInfoOrder from "../components/orders/CmpAddEditInfoOrder";
import axios from "axios";
import {toast} from "react-toastify";
import {IOrders} from "../interfaces/IOrders";
import CmpTableOrders from "../components/orders/CmpTableOrders";

const PageOrdersManagement = () => {
    const navigate = useNavigate();
    const { isVerified } = useGlobalState();

    useEffect(() => {
        if (!isVerified) {
            return navigate("/")
        }
    })

    const [ordersData, setOrdersData] = useState<IOrders[]>([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        axios
            .get(import.meta.env.VITE_URL_WEB_API + '/api/order/getAllOrder')
            .then((response) => {
                const dataTo = response.data.map((res: any) => {
                    return ({
                        id: res.id,
                        manager: JSON.parse(res.manager),
                        customer: JSON.parse(res.customer),
                        name: res.name,
                        status: JSON.parse(res.status),
                        type: JSON.parse(res.type),
                        start_date: res.start_date,
                        end_date: res.end_date,
                        note: res.note
                    })
                })
                setOrdersData(dataTo);
            })
            .catch((error) => {
                toast.error(error);
            });
    };
    

    const [showAddOrder, setShowAddOrder] = useState(false);
    const handleShowAddOrder = () => {
        setShowAddOrder(!showAddOrder);
    };

    return (
        <div className={`w-full mx-4 grid gap-4`}>
            <CustomPaper ec="m-3 flex justify-end gap-2">
                <CustomButton type="button" text="Nuova Commessa" icon={<MdAdd/>} onClick={handleShowAddOrder}></CustomButton>
            </CustomPaper>


            <CmpAddEditInfoOrder show={showAddOrder} type="add" handleClose={handleShowAddOrder} onUpdate={fetchOrders}></CmpAddEditInfoOrder>

            <CmpTableOrders data={ordersData} onUpdate={fetchOrders}/>
        </div>
    )
}

export default PageOrdersManagement;