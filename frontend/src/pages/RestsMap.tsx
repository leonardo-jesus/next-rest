import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

import '../styles/pages/rests-map.css';

interface Rest {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
};

function RestsMap() {
  const [rests, setRests] = useState<Rest[]>([]);

  useEffect(() => {
    api.get('rests').then(res => {
      setRests(res.data);
    })
  }, []);

  return(
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt=""/>

          <h2>Escolha uma casa de repouso no mapa</h2>
          <p>Muitos idosos estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>São Paulo</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map
       center={[-23.551339,-46.634372]}
       zoom={13}
       style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>
        
        {rests.map(rest => {
          return(
            <Marker
              key={rest.id}
              icon={mapIcon}
              position={[rest.latitude,rest.longitude]}  
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {rest.name}
                <Link to={`/rests/${rest.id}`}>
                  <FiArrowRight size={20} color="#FFFFFF" />
                </Link>
              </Popup>
            </Marker>
          )
          
        })}
      </Map>

      

      <Link to="/rests/create" className="create-rest">
        <FiPlus size={32} color="#ffffff" />
      </Link>
    </div>
  );
};

export default RestsMap;