import {useGlobalState} from "../global/GlobalStateContext";
import CustomPaper from "../components/CutomPaper";
import CustomButton from "../components/CustomButton";
import {MdAdd} from "react-icons/md";

const PageOrderManagement = () => {
    const { isVerified } = useGlobalState();
    if (!isVerified) {
        return <p>401: Non sei autorizzato!</p>;
    }
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

export default PageOrderManagement;