import {Box, Typography, Tabs, Tab} from '@mui/material';
import { TabContext,TabList,TabPanel } from '@mui/lab';
import { useState } from 'react';
import EventCard from '../card/eventCard';
import EditEventCard from '../card/editEventCard';

const TabsComponent =  () => {
    const [value, setValue] = useState('1');
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
    return (
      <Box sx={{ width: '100%' }}>
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="tabs">
                    <Tab label="Published" value="1" />
                    <Tab label="Draft" value="2" />
                    <Tab label="Past" value="3" />
                </TabList>
            </Box>
            <TabPanel value="1"><EventCard/></TabPanel>
            <TabPanel value="2"><EditEventCard/></TabPanel>
            <TabPanel value="3"><EventCard/></TabPanel>
        </TabContext>
        </Box>
    );
} 
export default TabsComponent;