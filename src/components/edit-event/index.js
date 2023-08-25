import LayoutPage from "../layout-page/index.js";
import EditEventForm from "./edit-event-form/edit-form.js";

const EditEventFormBox = () => {
  return(
    <div>
      <LayoutPage Content={EditEventForm}/>
    </div>
  );
}

export default EditEventFormBox;