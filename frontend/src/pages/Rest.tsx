import React, { useEffect, useState } from 'react';
// import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiInfo } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useParams } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import mapIcon from '../utils/mapIcon';
import api from "../services/api";

import '../styles/pages/rest.css';

interface Rest {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: Array<{
    id: number;
    url: string;
  }>;
};

interface RestParams {
  id: string;
}

export default function Rest() {
  const params = useParams<RestParams>();
  const [rest, setRest] = useState<Rest>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`rests/${params.id}`).then(res => {
      setRest(res.data);
    })
  }, [params.id]);

  if (!rest) {
    return <p>Carregando...</p>
  }

  return (
    <div id="page-rest">
      <Sidebar />

      <main>
        <div className="rest-details">
          <img src={rest.images[activeImageIndex].url} alt={rest.name} />

          <div className="images">
            {rest.images.map((image, index) => {
              return (
                <button 
                  key={image.id} 
                  className={activeImageIndex === index ? 'active' : ''} 
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                >
                  <img src={image.url} alt={rest.name} />
                </button>
              )
            })}
          </div>
          
          <div className="rest-details-content">
            <h1>{rest.name}</h1>
            <p>{rest.about}</p>

            <div className="map-container">
              <Map 
                center={[rest.latitude,rest.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[rest.latitude,rest.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${rest.latitude},${rest.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{rest.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {rest.opening_hours}
              </div>
              { rest.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  Não atendemos <br />
                  fim de semana
                </div>
              ) }
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}