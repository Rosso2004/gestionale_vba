import TableHead from "../table/TableHead";
import TableRow from "../table/TableRow";
import TableHeader from "../table/TableHeader";
import TableBody from "../table/TableBody";
import TableCell from "../table/TableCell";
import CustomTable from "../table/CustomTable";
import {IResourcesType} from "../../interfaces/IResourcesType";
import CustomButton from "../CustomButton";
import {MdDelete, MdModeEdit} from "react-icons/md"
import CmpDeleteResourceType from "./CmpDeleteResourceType";
import {useState} from "react";

interface ICmpTableResourcesType {
    data: IResourcesType[];
}

const CmpTableResourcesType: React.FC<ICmpTableResourcesType> = (props) => {
    const {data} = props

    const [showDeleteResourceType, setShowDeleteResourceType] = useState(false);
    const handleShowDeleteResourceType = () => {
        setShowDeleteResourceType(!showDeleteResourceType);
    };

    return (
      <>
        <CustomTable searchInput>
            <TableHead>
                <TableRow>
                    <TableHeader head>
                        Nome
                    </TableHeader>
                    <TableHeader head>
                        Descrizione
                    </TableHeader>
                    <TableHeader head>
                        Note
                    </TableHeader>
                    <TableHeader head>
                        Azioni
                    </TableHeader>
                </TableRow>
            </TableHead>

            <TableBody>
                {data.length === 0 ? (
                      <TableRow containsCells>
                        <TableCell colSpan={5}>Nessun elemento presente</TableCell>
                      </TableRow>
                ) : (
                        data.map((row) => (
                            <TableRow key={row.id} containsCells>
                                <TableHeader>{row.name}</TableHeader>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{row.note}</TableCell>
                                <TableCell action>
                                    <CustomButton color="gray" type="button" icon={<MdModeEdit/>}/>
                                    <CustomButton color="gray" type="button" onClick={handleShowDeleteResourceType} icon={<MdDelete/>}/>
                                </TableCell>
                            </TableRow>
                        ))
                )}
            </TableBody>
        </CustomTable>

        <CmpDeleteResourceType show={showDeleteResourceType}/>
      </>
    );
};

export default CmpTableResourcesType;