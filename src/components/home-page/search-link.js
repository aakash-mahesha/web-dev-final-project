import { useNavigate } from "react-router";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const SearchLink = () => {
    const navigate = useNavigate();
    const handleSearch = () => navigate("/search");

    // image source: https://unsplash.com/photos/bn-D2bCvpik
    const imageUrl = 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';

    return (
        <Box
            sx={{
                mt: 6,
                p: 13,
                py: 20,
                position: 'relative',
                backgroundColor: 'grey.100',
                color: '#fff',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${imageUrl})`,
                // opacity: .5,
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(255,255,255,.3)',
                }}
            />
            {<img style={{ display: 'none' }} src={imageUrl} alt='party image' />}
            <Box
                sx={{ position: 'relative', }}
            >
                <Typography variant="h6"
                    sx={{ color: "primary" }}
                >
                    Ready to find the next best experience of your life?
                </Typography>
                <IconButton color="primary" onClick={handleSearch}
                    sx={{ p: 3 }}
                >
                    <SearchIcon sx={{ mr: 1 }} />
                    <Typography variant="h5">
                        Search the MapVerse now
                    </Typography>
                </IconButton>
            </Box>
        </Box>
    )
}

export default SearchLink