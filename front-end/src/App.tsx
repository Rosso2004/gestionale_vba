import { Routes, Route } from 'react-router-dom';
import './App.css'
import PageLogin from "./pages/login/PageLogin";
import PageDashboard from "./pages/PageDashboard"
import {useGlobalState} from "./global/GlobalStateContext";
import PageOrdersManagement from "./pages/PageOrdersManagement";
import PageResourcesType from "./pages/PageResourcesType";
import CmpLayout from "./components/layout/CmpLayout";
import PageCustomersSuppliers from "./pages/PageCustomersSuppliers";
import PageUsers from "./pages/PageUsers";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageActivityType from "./pages/PageActivityType";

const App = () => {
    const {titlePage} = useGlobalState()

    return (
        <CmpLayout title={titlePage}>
            <Routes>
                <Route path='/' element={<PageLogin/>}/>
                <Route path='/dashboard' element={<PageDashboard/>}/>
                <Route path='/users' element={<PageUsers/>}/>
                <Route path='/orders_management' element={<PageOrdersManagement/>}/>
                <Route path='/activities_type' element={<PageActivityType/>}/>
                <Route path='/resources_type' element={<PageResourcesType/>}/>
                <Route path='/customers_suppliers' element={<PageCustomersSuppliers/>}/>
            </Routes>
            <ToastContainer
                position="bottom-right"
                autoClose={6000}
                limit={3}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                className="text-left"
            />
        </CmpLayout>

    )
}

export default App;
