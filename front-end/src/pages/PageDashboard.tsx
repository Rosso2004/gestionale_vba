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
        <CustomPaper>
            ciao
        </CustomPaper>
    )
}

export default PageDashboard;