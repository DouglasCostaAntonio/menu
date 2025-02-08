import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <a className="header-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <i className="fa fa-bars"></i>
        <FontAwesomeIcon icon={faBars} />
      </a>

      <div className={`header ${isMenuOpen ? 'responsive' : ''}`}>
        <div className="header-container-item" href="#">Menu</div>  
        <div className="header-container-item" href="#">Entrar</div>
        <div className="header-container-item" href="#">Contato</div>
      </div>
    </div>
  );
}

export default Header;