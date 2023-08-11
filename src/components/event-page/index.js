
// // code based on "Persistent Drawer" template provided by MUI: https://mui.com/material-ui/react-drawer/
// // drawer nesting functionality based on Alkesh Desai's answer to https://stackoverflow.com/questions/63087007/nested-drawer-in-material-ui-reactjs

import MapPage from '../map-page';
import EventDetails from './event-details';

function EventPage() {
  return (
    <MapPage Component={EventDetails} />
  );
}

export default EventPage