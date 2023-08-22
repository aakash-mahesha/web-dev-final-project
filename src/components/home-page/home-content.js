import { Divider, Box } from "@mui/material"
import Description from "./description"
import EventSuggestions from "./event-suggestions"
import SearchLink from "./search-link"
import UserLinks from "./user-links"
import Welcome from "./welcome"

const HomeContent = () => {
    return (
        <Box flexGrow={1}>
            {/* brief description/tagline */}
            <Description />
            {/* welcome to mapverse */}
            <Welcome />
            {/* link to search */}
            <SearchLink />
            {/* links register/login (loggedIn=false) or profile (loggedIn=true) */}
            <UserLinks />
            <Divider />
            {/* likedEvents and goingEvents (as lists in side-by-side grids) */}
            <EventSuggestions />
        </Box>
    )
}

export default HomeContent