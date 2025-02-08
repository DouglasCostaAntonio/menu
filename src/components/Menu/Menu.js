import React, { useContext, useEffect } from 'react';

import MenuContext from "../../context/MenuContext";

import Cart from "../Cart/Cart.js";
import MenuKind from "./MenuKind";
import MenuItem from "./MenuItem";
import Modal from "../Modal/Modal.js";

import './Menu.css';

function Menu() {
  const { getMenuSections, menuSections, getActiveSection } = useContext(MenuContext);

  useEffect(() => {
    getMenuSections();
    // dependency is missing here, I want to call only once
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <div className="menu-input-container">
        {/* TODO: The icon is not available in the mock, and it is also not clear what to search for here */}
        <input className="menu-input" id="check"  />
      </div>
      
      <div className="menu-container">
        <div className="menu-painel menu-items">
          <div className="menu-kind" key={0}>
            {menuSections.map((section) => (
              <MenuKind id={section.id} name={section.name} image={section.image}/>
            ))}
          </div>

          <h2 className="menu-title">{getActiveSection()?.name}</h2>

          { getActiveSection()?.items.map((item) => (
            <MenuItem
              id={item.id}
              name={item.name}
              description={item.description}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>

        <div className="menu-painel menu-cart">
          <Cart/>
        </div>
      </div>

      <Modal/>
    </div>
      
  );
}

export default Menu;
