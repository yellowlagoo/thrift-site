import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const editorialBg = 'https://i.pinimg.com/736x/21/b1/51/21b151236fc6134e1fb056d8af87abb5.jpg';
const clothingGarbageImg = 'https://i.pinimg.com/736x/6a/a4/e2/6aa4e20f05897a2bf7b139ffdbfaf756.jpg';

const Home = () => {
  return (
    <div className="editorial-landing-bg">
      <nav className="editorial-nav">
        <div className="editorial-logo-row">
          <Link to="/" className="editorial-logo">901</Link>
          <img src={clothingGarbageImg} alt="Clothing is not Garbage" className="clothing-garbage-img" />
        </div>
        <div className="editorial-nav-links">
          <Link to="/outfit-builder">Outfit Builder</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>
      <main className="editorial-hero">
        <img src={editorialBg} alt="Editorial Fashion" className="editorial-hero-img" />
        <div className="editorial-hero-content">
          <div className="editorial-title-block">
            <span className="editorial-script editorial-script-large"><strong>901</strong></span>
            <span>$5 tops</span>
            <span>$7 bottoms</span>
          </div>
        </div>
        <div className="editorial-corner-info">
          <span>ISSUE 01</span>
          <FontAwesomeIcon icon={faCircle} className="editorial-icon" />
          <span>JUNE 2025</span>
        </div>
      </main>
    </div>
  );
};

export default Home; 