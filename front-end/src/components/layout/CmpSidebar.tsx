import {MdAdminPanelSettings, MdConstruction, MdEngineering, MdExitToApp, MdKeyboardArrowDown, MdKeyboardArrowUp, MdPeople, MdSpaceDashboard, MdTopic} from "react-icons/md";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import {useGlobalState} from "../../global/GlobalStateContext";

const CmpSidebar = () => {
    const { setTitlePage } = useGlobalState();
    const navigate = useNavigate();
    const [dropMenu, setDropMenu] = useState(false);
    const handleOpenDropMenu = () => {
        setDropMenu(!dropMenu);
    };

    const handleClickNav = (title: string, path: string) => {
        setTitlePage(title);
        navigate(path);
    }

    return (
        <aside id="logo-sidebar"
               className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0"
               aria-label="Sidebar">
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <li onClick={() => handleClickNav("Dashboard", "/dashboard")}>
                        <div
                           className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                            <span className="text-gray-500"><MdSpaceDashboard/></span>
                            <span className="ml-3">Dashboard</span>
                        </div>
                    </li>
                    <li onClick={() => handleClickNav("GestioneCommesse", "/gestioneCommesse")}>
                        <div
                           className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                            <span className="text-gray-500"><MdTopic/></span>
                            <span className="ml-3">Gestione Commesse</span>
                        </div>
                    </li>
                    <li>
                        <button type="button" onClick={handleOpenDropMenu} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100">
                            <span className="text-gray-500"><MdAdminPanelSettings/></span>
                            <span className="flex-1 ml-3 text-left">Amministrazione</span>
                            {!dropMenu ? <MdKeyboardArrowDown/>: <MdKeyboardArrowUp/>}
                        </button>
                        <ul id="dropdown-example" className={`py-2 space-y-2
                            ${
                                !dropMenu ? 'hidden' : ''
                            }`}>
                            <li onClick={() => handleClickNav("Tipo Risorse", "/tipoRisorse")}>
                                <div
                                   className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ml-3">
                                    <span className="text-gray-500"><MdEngineering/></span>
                                    <span className="ml-3">Tipo Risorse</span>
                                </div>
                            </li>
                            <li onClick={() => handleClickNav("Tipo Attività", "/tipoAttivita")}>
                                <div
                                   className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ml-3">
                                    <span className="text-gray-500"><MdConstruction/></span>
                                    <span className="ml-3">Tipo Attività</span>
                                </div>
                            </li>
                            <li onClick={() => handleClickNav("Clienti / Fornitori", "/clientiFornitori")}>
                                <div
                                   className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ml-3">
                                    <span className="text-gray-500"><MdPeople/></span>
                                    <span className="ml-3">Clienti / Fornitori</span>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="/"
                           className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                            <span className="text-gray-500"><MdExitToApp/></span>
                            <span className="ml-3">Esci</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
)}

export default CmpSidebar;