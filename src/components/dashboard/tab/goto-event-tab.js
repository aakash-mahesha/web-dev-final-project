import {Box, Typography, Tabs, Tab} from '@mui/material';
import { TabContext,TabList,TabPanel } from '@mui/lab';
import { useState } from 'react';
import EventCard from '../card/eventCard';
import EditEventCard from '../card/editEventCard';

const GotoEventTabs =  () => {
    const [value, setValue] = useState('1');
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
    return (
      <Box sx={{ width: '100%' }}>
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="tabs">
                    <Tab label="Upcoming" value="1" />
                    <Tab label="Past" value="2" />
                    
                </TabList>
            </Box>
            <TabPanel value="1"><EventCard/></TabPanel>
            <TabPanel value="2"><EventCard/></TabPanel>
            
        </TabContext>
        
        </Box>
    );
} 
export default GotoEventTabs;