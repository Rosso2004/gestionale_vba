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
import getIndex from "../../utility/getIndex";
import CmpAddEditResourceType from "./CmpAddEditResourceType";

interface ICmpTableResourcesType {
    data: IResourcesType[];
    onUpdate: () => void;
}

const CmpTableResourcesType: React.FC<ICmpTableResourcesType> = (props) => {
    const {data, onUpdate} = props

    const [showActionResourceType, setShowActionResourceType] = useState<{ resourceTypeData: IResourcesType; show: {update: boolean; delete: boolean}}>({
        resourceTypeData: {
            id: '',
            name: '',
            description: '',
            note: ''
        },
        show: {
            update: false,
            delete: false
        }
    });
    const handleShowDeleteResourceType = (id: string | undefined, type: "update" | "delete") => {
        const indexPump = getIndex(data, "id", id)
        if (type === "update") {
            setShowActionResourceType({
                resourceTypeData: data[indexPump],
                show: {
                    update: true,
                    delete: false
                }
            });
        } else if (type === "delete") {
            setShowActionResourceType({
                resourceTypeData: data[indexPump],
                show: {
                    update: false,
                    delete: true
                }
            });
        }
    };

    const handleCancelActionResourceType = () => {
        setShowActionResourceType({
            resourceTypeData: {
                id: '',
                name: '',
                description: '',
                note: ''
            },
            show: {
                update: false,
                delete: false
            }
        });
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
                                    <CustomButton color="gray" type="button" onClick={() => {handleShowDeleteResourceType(row.id, "update")}} icon={<MdModeEdit/>}/>
                                    <CustomButton color="gray" type="button" onClick={() => {handleShowDeleteResourceType(row.id, "delete")}} icon={<MdDelete/>}/>
                                </TableCell>
                            </TableRow>
                        ))
                )}
            </TableBody>
        </CustomTable>

        <CmpAddEditResourceType
          show={showActionResourceType.show.update}
          data={showActionResourceType.resourceTypeData}
          type="update"
          handleClose={handleCancelActionResourceType}
          onUpdate={onUpdate}
        />

        <CmpDeleteResourceType
          show={showActionResourceType.show.delete}
          data={showActionResourceType.resourceTypeData}
          handleCancel={handleCancelActionResourceType}
          onUpdate={onUpdate}
        />
      </>
    );
};

export default CmpTableResourcesType;