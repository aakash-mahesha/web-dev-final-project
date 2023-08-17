import React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from "@mui/material/styles";

const InterestTabBox = ({interestTabsList, selectedTags, handleTagChange}) =>{

    const CustomToggleButton = styled(ToggleButton)({
        "&.Mui-selected, &.Mui-selected:hover": {
          color: "white",
          backgroundColor: '#2196f3'
        }
    });

    return(
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ToggleButtonGroup
            value = {selectedTags}
            onChange = {handleTagChange}
            aria-label="Interest Tags"
            sx={{ display: 'flex', width: '100%', flexWrap: 'wrap', gap: '8px' }}>
                {interestTabsList.map( tab => (
                    <CustomToggleButton 
                    xs={6} 
                    key={tab.value} 
                    value = {tab.value} 
                    aria-label = {tab.value} 
                    sx={{
                        flex: '0 0 calc(33.33% - 8px)',
                        padding: '16px',
                        textTransform: 'none', 
                        margin : '2px'
                    }}> 
                        {tab.value}
                    </CustomToggleButton>
                ))}
            </ToggleButtonGroup>
        </div>
    );

}

export default InterestTabBox