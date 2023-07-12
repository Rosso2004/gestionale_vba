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

const App = () => {
    const {titlePage} = useGlobalState()

    return (
        <CmpLayout title={titlePage}>
            <Routes>
                <Route path='/' element={<PageLogin/>}/>
                <Route path='/dashboard' element={<PageDashboard/>}/>
                <Route path='/users' element={<PageUsers/>}/>
                <Route path='/orders_management' element={<PageOrdersManagement/>}/>
                <Route path='/activities_type' element={<p>ss</p>}/>
                <Route path='/resources_type' element={<PageResourcesType/>}/>
                <Route path='/customers_suppliers' element={<PageCustomersSuppliers/>}/>
            </Routes>
        </CmpLayout>

    )
}

export default App;
