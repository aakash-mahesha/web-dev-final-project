import MapPage from "../map-page";
import SearchBox from "./search-box";
import { useSelector } from "react-redux";

export default function SearchPage() {
  return (
    <MapPage Component={SearchBox} />
  );
}