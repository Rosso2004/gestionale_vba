import CmpSidebar from "./CmpSidebar";
import CmpHeader from "./CmpHeader";
import {useGlobalState} from "../../global/GlobalStateContext";

type ICmpLayout = React.PropsWithChildren <{
    title?: string
}>

const CmpLayout: React.FC<ICmpLayout> = (props) => {
    const {title, children} = props;
    const {isVerified} = useGlobalState()
    return (
        <>
            { isVerified &&
                <>
                    <CmpHeader title={title}/>
                    <CmpSidebar/>
                </>
            }
            <div className={`${
                isVerified ? "mt-16 sm:ml-64 flex justify-center" : ""
            }`}>
                {children}
            </div>
        </>
    );
};

export default CmpLayout;