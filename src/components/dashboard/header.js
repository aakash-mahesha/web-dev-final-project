import { Typography, Box, useTheme } from "@mui/material";
import React from "react";

//const Header = ({ title, subtitle }) => {
const Header = ({title, subtitle}) =>{
  const theme = useTheme();
  
  return (
    <Box>
      <Typography
        variant="h4"
        color={theme.palette.main}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
       {title}
      </Typography>
      <Typography variant="h6" color={theme.palette.main}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;