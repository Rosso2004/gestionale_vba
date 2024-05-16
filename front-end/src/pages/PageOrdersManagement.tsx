import CustomPaper from "../components/CutomPaper";
import CustomButton from "../components/CustomButton";
import {MdAdd} from "react-icons/md";
import {useEffect, useState} from "react";
import CmpAddEditInfoOrder from "../components/orders/CmpAddEditInfoOrder";
import axios from "axios";
import {toast} from "react-toastify";
import {IOrders} from "../interfaces/IOrders";
import CmpTableOrders from "../components/orders/CmpTableOrders";
import useTokenCheck from "../utility/useTokenCheck.ts";

const PageOrdersManagement = () => {
    useTokenCheck();

    const [ordersData, setOrdersData] = useState<IOrders[]>([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        axios
            .get(import.meta.env.VITE_URL_WEB_API + '/api/order/getAllOrder', { withCredentials: true })
            .then((response) => {
                setOrdersData(response.data);
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