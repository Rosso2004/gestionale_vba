import {useGlobalState} from "../global/GlobalStateContext";
import CustomPaper from "../components/CutomPaper";

const PageDashboard = () => {
    const { isVerified } = useGlobalState();

    if (!isVerified) {
        return <p>401: Non sei autorizzato!</p>;
    }
    return (
        <CustomPaper>
            ciao
        </CustomPaper>
    )
}

export default PageDashboard;