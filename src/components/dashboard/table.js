import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
const data = [
    {eventId: 1, title: 'Event 1', date: '2021-10-10', address: '123 Main St'},
    {eventId: 2, title: 'Event 2', date: '2021-10-11', address: '123 Main St'},
    {eventId: 3, title: 'Event 3', date: '2021-10-12', address: '123 Main St'},
    {eventId: 4, title: 'Event 4', date: '2021-10-13', address: '123 Main St'},
  ]
  const EventTable = () => {
    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    // const [sort, setSort] = useState({});
    // const [search, setSearch] = useState('');

    const [searchInput, setSearchInput] = useState("");
    //const [data, setData] = useState([]);
   // const [isLoading, setIsLoading] = useState(false);
    //useEffect(() => {getEventData()}, []);
    const columns = [
        {
          field: 'eventId',
          headerName: 'Event ID',
          flex: 1,
        },
        
        {
          field: 'title',
          headerName: 'Title',
          flex: 0.5,
          
        },
        {
          field: 'date',
          headerName: 'Date',
          flex: 1,
         
        },
        {
            field: 'address',
            headerName: 'Address',
            flex: 1,
           
          },
    
      ];
    //   const rows= data.map((row) => {
    //     return {

    //     eventId: row.eventId,
    //     title: row.title,
    //     date: row.date,
    //     address: row.address,
    //     };       
        // } )
        return (
            <Box>
                <DataGrid>
                rows={data}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                paginationMode="server"
                onPageChange={(newPage) => setPage(newPage)}
                {/* loading={isLoading} */}

                </DataGrid>
            </Box>

        );
    };
    export default EventTable;
