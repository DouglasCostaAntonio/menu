import React, { useContext, useId } from 'react';

import MenuContext from "../../context/MenuContext";

import './MenuKind.css';

function MenuKind({id, name, image}) {
  const { setActiveSection, activeSection } = useContext(MenuContext);
  
  return (
    <div
      className={`menu-kind ${activeSection === id ? 'menu-kind-active' : ''}`}
      onClick={() => setActiveSection(id)}

      key={useId()} 
    >
      <div className="menu-kind-container">
        <img className="menu-kind-img" src={image} alt='img'/>
        <div className="menu-kind-text">{name}</div>
      </div>
    </div>
  );
}

export default MenuKind;
