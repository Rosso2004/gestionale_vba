import CustomAlertDialog from "../CustomAlertDialog";
import {IResourcesType} from "../../interfaces/IResourcesType";
import axios from "axios";

type ICmpDeleteResourceType = {
  show: boolean;
  data: IResourcesType;
  handleCancel: () => void;
  onUpdate: () => void;
}
const CmpDeleteResourceType: React.FC<ICmpDeleteResourceType> = (props) => {
  const {show, data, handleCancel, onUpdate} = props;
  const handleDelete = async () => {
      axios
          .delete(import.meta.env.VITE_URL_WEB_API + '/api/resourceType/deleteResourceType/' + data.id)
          .then((response) => {
              if (response.status === 200) {
                  onUpdate();
                  handleCancel();
                  console.log(response.data.message)
              }
          })
          .catch((error) => {
              if (error.response.status === 404) {
                  console.log(error.response.data)
              }
              if (error.response.status === 409) {
                  console.log(error.response.data)
              }
          });
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