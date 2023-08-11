// import logo from './logo.svg';
import './App.css';
import { HashRouter, Routes } from 'react-router-dom';
import MapVerse from './mapverse';
import { Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import EventForm from './mapverse/component/create_event';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const store = configureStore({reducer: {}});

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { HashRouter, Navigate } from "react-router-dom";
import { Routes, Route } from "react-router";
import EventPage from './components/event-page';
import SearchPage from './components/search-page';
import Dashboard from './components/dashboard';
import EventTable from './components/dashboard/table';


function App() {
  return (

    // <div className='App'>
    //   <SearchPage />
    //   <TemporaryDrawer />
    // </div>

    //new:
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <HashRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/search" />} />
            <Route path="/search/*" element={<SearchPage />} />
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/table" element={<EventTable />} />
            <Route path="/create-event" element={<MapVerse/>} />
            {/* <Route path="/search/*" element={<MapPage Component={SearchBox} />} /> */}
            <Route path="/details/*" element={<EventPage />} />
          </Routes>
        </div>
      </HashRouter>
    </LocalizationProvider>
  );
}

export default App;
