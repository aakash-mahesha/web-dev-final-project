import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
const TGrid = () => {
    const rows = [
        {eventId: 1, title: "Event 1", date: "2021-10-10", address: "123 Main St"},
        {eventId: 2, title: "Event 2", date: "2021-10-11", address: "123 Main St"},
        {eventId: 3, title: "Event 3", date: "2021-10-12", address: "123 Main St"},
        {eventId: 4, title: "Event 4", date: "2021-10-13", address: "123 Main St"},
      ];

      
    const columns = [
        {
          field: "eventId",
          headerName: "Event ID",
          width: 150
        },
        
        {
          field: "title",
          headerName: "Title",
          width: 150
          
        },
        {
          field: "date",
          headerName: "Date",
          width: 150
        },
        {
            field: "address",
            headerName: "Address",
            width: 150
           
          },
    
      ];
    return(
            <DataGrid   
            rows={rows}
            columns={columns}
            getRowId={(row) => row.eventId}
            pageSize={5}
            rowsPerPageOptions={[5]}
            
            />
    )
}
export default TGrid;