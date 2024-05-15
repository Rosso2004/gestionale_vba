import CustomPaper from "../components/CutomPaper";
import useTokenCheck from "../utility/useTokenCheck.ts";

const PageDashboard = () => {
    useTokenCheck();

    return (
        <div className={`w-full mx-4 grid gap-4`}>
            <CustomPaper>
                <p className="my-5">Work in progress...</p>
            </CustomPaper>
        </div>
    )
}

export default PageDashboard;