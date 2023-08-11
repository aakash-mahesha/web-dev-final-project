// // code based on "Persistent Drawer" template provided by MUI: https://mui.com/material-ui/react-drawer/
// // drawer nesting functionality based on Alkesh Desai's answer to https://stackoverflow.com/questions/63087007/nested-drawer-in-material-ui-reactjs

import MapPage from "../map-page";
import SearchBox from "./search-box";

export default function SearchPage() {
  return (
    <MapPage Component={SearchBox} />
  );
}