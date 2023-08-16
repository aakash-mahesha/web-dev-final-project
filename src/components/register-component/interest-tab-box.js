import React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const InterestTabBox = ({interestTabsList, selectedTags, handleTagChange}) =>{
    return(
        <ToggleButtonGroup
        value = {selectedTags}
        onChange = {handleTagChange}
        aria-label="Interest Tags">
            {interestTabsList.map( tab => (
                <ToggleButton key={tab.value} value = {tab.value} aria-label = {tab.value}> 
                    {tab.value}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
}

export default InterestTabBox