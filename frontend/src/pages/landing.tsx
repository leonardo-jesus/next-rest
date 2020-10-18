import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import '../styles/pages/landing.css';
import mapMarkerImg from '../images/map-marker.svg';
import { Link } from 'react-router-dom';

function Landing() {
  return(
    <div id="page-landing">
      <div className="content-wrapper">
        <div className="logo">
          <img src={mapMarkerImg} alt=""/>
          <h1>next rest</h1>
        </div>
        

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite casas de reopouso e mude o dia de muitos idosos.</p>
        </main>

        <div className="location">
          <strong>São Paulo</strong>
          <span>São Paulo</span>
        </div>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </div>
    </div>
  );
};

export default Landing;