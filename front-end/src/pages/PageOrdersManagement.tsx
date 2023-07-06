import {useGlobalState} from "../global/GlobalStateContext";
import CustomPaper from "../components/CutomPaper";
import CustomButton from "../components/CustomButton";
import {MdAdd} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const PageOrdersManagement = () => {
    const navigate = useNavigate();
    const { isVerified } = useGlobalState();

    useEffect(() => {
        if (!isVerified) {
            return navigate("/")
        }
    })
    return (
        <div className={`w-full mx-40 grid gap-4`}>
            <CustomPaper ec="m-3 flex justify-end">
                <CustomButton
                  type="button"
                  text="Nuova Commessa"
                  icon={<MdAdd/>}
                />
            </CustomPaper>
        </div>
    )
}

export default PageOrdersManagement;