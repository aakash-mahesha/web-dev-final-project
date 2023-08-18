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
// import EventTable from './components/dashboard/table';
import eventFormReducer from "./reducers/event-form-reducer"
import LoginComponent from "./components/login-component"
import authReducers from './reducers/auth-reducer';
import Register from './components/register-component';
import ExamplePage from './components/layout-page/example-test-page';

function App() {
  const store = configureStore({
    reducer: {
        eventFormState: eventFormReducer,
        auth: authReducers,
      eventFormState: eventFormReducer
    }
  })
  return (

    //new:
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <HashRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Navigate to="/search" />} />
              <Route path="/search/*" element={<SearchPage />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              {/* <Route path="/table" element={<EventTable />} /> */}
              <Route path="/create-event" element={<EventForm />} />
              <Route path="/details/*" element={<EventPage />} />
              <Route path="/login" element = {<LoginComponent/>}/>
              <Route path="/register/*" element = {<Register/>}/>
              <Route path="/example" element={<ExamplePage />} />
            </Routes>
          </div>
        </HashRouter>
      </Provider>
    </LocalizationProvider>

  );
};

export default App;