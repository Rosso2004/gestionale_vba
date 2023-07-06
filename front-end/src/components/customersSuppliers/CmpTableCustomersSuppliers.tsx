import TableHead from "../table/TableHead";
import TableRow from "../table/TableRow";
import TableHeader from "../table/TableHeader";
import TableBody from "../table/TableBody";
import TableCell from "../table/TableCell";
import CustomTable from "../table/CustomTable";
import {IResourcesType} from "../../interfaces/IResourcesType";
import CustomButton from "../CustomButton";
import {MdDelete, MdModeEdit} from "react-icons/md"
import {useState} from "react";
import getIndex from "../../utility/getIndex";
import {ICustomersSuppliers} from "../../interfaces/ICustomersSuppliers";

interface ICmpTableCustomersSuppliers {
    data: ICustomersSuppliers[];
    onUpdate: () => void;
}

const CmpTableCustomersSuppliers: React.FC<ICmpTableCustomersSuppliers> = (props) => {
    const {data, onUpdate} = props

    // const [showActionResourceType, setShowActionResourceType] = useState<{ resourceTypeData: IResourcesType; show: {update: boolean; delete: boolean}}>({
    //     resourceTypeData: {
    //         id: '',
    //         name: '',
    //         description: '',
    //         note: ''
    //     },
    //     show: {
    //         update: false,
    //         delete: false
    //     }
    // });

    // const handleShowDeleteResourceType = (id: string | undefined, type: "update" | "delete") => {
    //     const indexPump = getIndex(data, "id", id)
    //     if (type === "update") {
    //         setShowActionResourceType({
    //             resourceTypeData: data[indexPump],
    //             show: {
    //                 update: true,
    //                 delete: false
    //             }
    //         });
    //     } else if (type === "delete") {
    //         setShowActionResourceType({
    //             resourceTypeData: data[indexPump],
    //             show: {
    //                 update: false,
    //                 delete: true
    //             }
    //         });
    //     }
    // };

    // const handleCancelActionResourceType = () => {
    //     setShowActionResourceType({
    //         resourceTypeData: {
    //             id: '',
    //             name: '',
    //             description: '',
    //             note: ''
    //         },
    //         show: {
    //             update: false,
    //             delete: false
    //         }
    //     });
    // };

    return (
        <>
            <CustomTable searchInput>
                <TableHead>
                    <TableRow>
                        <TableHeader head>
                            Nome
                        </TableHeader>
                        <TableHeader head>
                            Città
                        </TableHeader>
                        <TableHeader head>
                            Tipo Risorsa
                        </TableHeader>
                        <TableHeader head>
                            Funzione Risorsa
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
                                <TableCell>{row.city}</TableCell>
                                <TableCell>{row.type.name}</TableCell>
                                <TableCell>{row.function.name}</TableCell>
                                <TableCell action>
                                    <CustomButton color="gray" type="button" onClick={() => {handleShowDeleteResourceType(row.id, "update")}} icon={<MdModeEdit/>}/>
                                    <CustomButton color="gray" type="button" onClick={() => {handleShowDeleteResourceType(row.id, "delete")}} icon={<MdDelete/>}/>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </CustomTable>
        </>
    );
};

export default CmpTableCustomersSuppliers;