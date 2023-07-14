import {useGlobalState} from "../global/GlobalStateContext";
import CustomPaper from "../components/CutomPaper";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const PageDashboard = () => {
    const navigate = useNavigate();
    const { isVerified } = useGlobalState();

    useEffect(() => {
        if (!isVerified) {
            return navigate("/")
        }
    })

    return (
        <div className={`w-full mx-4 grid gap-4`}>
            <CustomPaper>
                <p>Work in progress...</p>
            </CustomPaper>
        </div>
    )
}

export default PageDashboard;