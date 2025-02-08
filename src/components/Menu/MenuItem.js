import React, { useContext } from 'react';

import MenuContext from "../../context/MenuContext";

import { dollarFormat } from "../../helpers/number.helper";

import './MenuItem.css';

function MenuItem({name, description, image, price, id}) {
  const { setActiveItem} = useContext(MenuContext);

  return (
    <div className="menu-item" onClick={() => setActiveItem(id)}>
      <div className="menu-item-info">
        <p className="menu-item-info-text name">{name}</p>
        <p className="menu-item-info-text description">{description}</p>
        <p className="menu-item-info-text price">{dollarFormat.format(price)}</p>
      </div>

      <div className="menu-item-img">
        <img className="menu-item-img" src={image} alt='img'/>
      </div>
    </div>
  );
}

export default MenuItem;
