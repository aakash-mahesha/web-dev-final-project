import logo from './logo.svg';
import './App.css';
import { HashRouter, Routes } from 'react-router-dom';
import MapVerse from './mapverse';
import { Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import EventForm from './mapverse/create_event/test';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className="App">
      <HashRouter>
        <div className='container'>
          <Routes>
            <Route path="/" element={<EventForm/>} />
          </Routes>
        </div>
      </HashRouter>
    </div>
    </LocalizationProvider>
  );
}

export default App;
