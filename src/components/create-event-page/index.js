import LayoutPage from "../layout-page/index.js";
import EventForm from "./event-form/event-form.js"

const EventFormBox = () => {
  return(
    <div>
      <LayoutPage Content={EventForm}/>
    </div>
  );
}

export default EventFormBox;