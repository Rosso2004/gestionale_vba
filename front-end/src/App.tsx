import { Routes, Route } from 'react-router-dom';
import './App.css'
import PageLogin from "./pages/login/PageLogin";
import PageDashboard from "./pages/PageDashboard"
import {useGlobalState} from "./global/GlobalStateContext";
import PageOrderManagement from "./pages/PageOrderManagement";
import PageResourcesType from "./pages/PageResourcesType";
import CmpLayout from "./components/layout/CmpLayout";

const App = () => {
    const {titlePage} = useGlobalState()

    return (
        <CmpLayout title={titlePage}>
            <Routes>
                <Route path='/' element={<PageLogin/>}/>
                <Route path='/dashboard' element={<PageDashboard/>}/>
                <Route path='/gestioneCommesse' element={<PageOrderManagement/>}/>
                <Route path='/tipoRisorse' element={<PageResourcesType/>}/>
            </Routes>
        </CmpLayout>

    )
}

export default App;
