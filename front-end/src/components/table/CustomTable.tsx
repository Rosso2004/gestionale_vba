import CustomInput from "../CustomInput";
import {MdSearch} from "react-icons/md";
import CustomPaper from "../CutomPaper";
import {useState} from "react";

type ICustomTable = React.PropsWithChildren<{
    searchInput?: boolean;
}>;
const CustomTable: React.FC<ICustomTable> = (props) => {
    const {searchInput, children} = props
    const [searchValue, setSearchValue] = useState('');

    return (
        <CustomPaper ec="overflow-x-auto sm:rounded-lg">
            {searchInput && (
                <div className="flex justify-end">
                    <CustomInput
                        ec="w-64 m-3"
                        StartIcon={<MdSearch/>}
                        placeholder="Cerca"
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                        }}
                    />
                </div>
                )}
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                {children}
            </table>
        </CustomPaper>
    );
};

export default CustomTable;