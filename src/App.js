// import logo from './logo.svg';
import './App.css';

import { HashRouter, Navigate } from "react-router-dom";
import { Routes, Route } from "react-router";
import EventPage from './components/event-page';
import SearchPage from './components/search-page';


function App() {
  return (
    // <div className='App'>
    //   <SearchPage />
    //   <TemporaryDrawer />
    // </div>

    //new:
    <HashRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/search" />} />
          <Route path="/search/*" element={<SearchPage />} />
          {/* <Route path="/search/*" element={<MapPage Component={SearchBox} />} /> */}
          <Route path="/details/*" element={<EventPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
