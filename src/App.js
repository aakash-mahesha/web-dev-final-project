/* import logo from './logo.svg';
import './App.css'; */

import { Map } from './components/Map';
import { MapEvents } from './components/MapEvents'
import LeafletLogo from './assets/leafletlogo.png'
import ReactIcon from './assets/reacticon.png';

function App() {
  return (
    <div className='App'>
      <nav>
        <img src={LeafletLogo} alt={'leaflet logo'} className='logo-mid'/>
        <img src={ReactIcon} alt={'react logo'} className='logo-small'/>
      </nav>
      <Map />
      <MapEvents />
    </div>
  );
}

export default App;
