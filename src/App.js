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
import searchReducer from './reducers/search-reducer';
import eventDetailsReducer from './reducers/event-details-reducer';
import ExamplePage from './components/layout-page/example-test-page';
import UserTable from './pages/user-table';
// import ProfileScreen from './pages/user-profile-page';
import ProfileForm from './pages/edit-profile.js';
import ResultDetails from './components/result-page';
import ResultPage from './components/result-page';


function App() {
  const store = configureStore({
    reducer: {
      eventFormState: eventFormReducer,
      results: searchReducer,
      eventDetails: eventDetailsReducer,
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
              <Route path="/results/:origin/:id" element={<ResultPage />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/table" element={<EventTable />} />
              <Route path="/create-event" element={<EventForm />} />
              {/* <Route path="/search/*" element={<MapPage Component={SearchBox} />} /> */}
              <Route path="/details/*" element={<EventPage />} />
              <Route path="/example" element={<ExamplePage />} />
              <Route path="/usertable" element={<UserTable />} />
              <Route path="/create-profile" element={< ProfileForm />} />
            </Routes>
          </div>
        </HashRouter>
      </Provider>
    </LocalizationProvider>
  );
}

export default App;
