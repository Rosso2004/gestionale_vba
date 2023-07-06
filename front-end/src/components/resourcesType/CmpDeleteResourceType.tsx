import CustomAlertDialog from "../CustomAlertDialog";
import {IResourcesType} from "../../interfaces/IResourcesType";
import PocketBase from 'pocketbase';

type ICmpDeleteResourceType = {
  show: boolean;
  data: IResourcesType;
  handleCancel: () => void;
  onUpdate: () => void;
}
const CmpDeleteResourceType: React.FC<ICmpDeleteResourceType> = (props) => {
  const {show, data, handleCancel, onUpdate} = props;
  const handleDelete = async () => {
    const pb = new PocketBase('http://127.0.0.1:8090');
    try {
      const res = await pb.collection('resources_type').delete(data.id);
      if (res){
        onUpdate();
        handleCancel();
      }
    } catch (error) {
      const errorObj: Error = error as Error;
      console.log("error: ", errorObj)
    }
  }
  return (
    <>
      <CustomAlertDialog
        text={"Sei sicuro di voler rimuovere il Tipo Risorsa " + data.name + "? Quest'azione sarà irreveribile!"}
        show={show}
        confirmBtn="Si, sono sicuro"
        cancelBtn="No, annulla"
        handleConfirm={handleDelete}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default CmpDeleteResourceType;