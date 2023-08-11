// import logo from './logo.svg';
import './App.css';
import { HashRouter, Routes, Navigate } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import EventForm from './components/create-event';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import EventPage from './components/event-page/index.js';
import SearchPage from './components/search-page';
import Dashboard from './components/dashboard';
import EventTable from './components/dashboard/table';
import eventFormReducer from "./reducers/event-form-reducer"

function App() {
  const store = configureStore({
    reducer: {
        eventFormState: eventFormReducer
    }
})
  return (

    // <div className='App'>
    //   <SearchPage />
    //   <TemporaryDrawer />
    // </div>

    //new:
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <HashRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Navigate to="/search" />} />
              <Route path="/search/*" element={<SearchPage />} />
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/table" element={<EventTable />} />
              <Route path="/create-event" element={<EventForm/>} />
              {/* <Route path="/search/*" element={<MapPage Component={SearchBox} />} /> */}
              <Route path="/details/*" element={<EventPage />} />
            </Routes>
          </div>
        </HashRouter>
      </Provider>
    </LocalizationProvider>
  );
}

export default App;
