import logo from './logo.svg';
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

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <div className="App">
          <HashRouter>
            <div className='container'>
              <Routes>
                <Route path="/" element={<MapVerse/>} />
              </Routes>
            </div>
          </HashRouter>
        </div>
      </Provider>
    </LocalizationProvider>
  );
}

export default App;
