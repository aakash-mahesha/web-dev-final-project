import './App.css';
import { HashRouter, Routes, Navigate } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import EventFormBox from './components/create-event-page';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import EventPage from './components/event-page/index.js';
import SearchPage from './components/search-page';
import Dashboard from './components/dashboard';
import eventFormReducer from "./reducers/event-form-reducer";
import searchReducer from './reducers/search-reducer';
import eventDetailsReducer from './reducers/event-details-reducer';
import ExamplePage from './components/layout-page/example-test-page';
// import ResultPage from './components/result-page';
import tagsReducer from './reducers/tags-reducer';
import LoginComponent from "./components/login-component"
import authReducers from './reducers/auth-reducer';
import Register from './components/register-component';
import AuthContext from './utils/auth-context';
import ProtectedRoute from './utils/protected-route';
import HomePage from './components/home-page';
import EditEventFormBox from './components/edit-event';

function App() {
  const store = configureStore({
    reducer: {
      eventFormState: eventFormReducer,
      results: searchReducer,
      eventDetails: eventDetailsReducer,
      tagOptions: tagsReducer,
      auth: authReducers,
    }
  })

  
  return (

    //new:
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <HashRouter>
        <AuthContext>
          <div className="App">
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/search/*" element={<SearchPage />} />
              {/* <Route path="/results/:origin/:id" element={<ResultPage />} /> */}
              <Route path="/details/:origin/:id" element={<EventPage />} />
              <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              {/* <Route path="/table" element={<EventTable />} /> */}
              <Route path="/create-event" element={<ProtectedRoute>< EventFormBox /></ProtectedRoute>} />
              <Route path="/edit-event" element={<ProtectedRoute>< EditEventFormBox /></ProtectedRoute>} />
              <Route path="/details/*" element={<EventPage />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/register/*" element={<Register />} />
              <Route path="/example" element={<ExamplePage />} />
            </Routes>
          </div>
          </AuthContext>
        </HashRouter>
      </Provider>
    </LocalizationProvider>

  );
};

export default App;