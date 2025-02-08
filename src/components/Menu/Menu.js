import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import MenuContext from "../../context/MenuContext";
import Cart from "../Cart/Cart.js";
import MenuKind from "./MenuKind";
import MenuItem from "./MenuItem";
import Modal from "../Modal/Modal.js";

import './Menu.css';

function Menu() {
  const { getMenuSections, menuSections, getActiveSection, orders, getActiveItem } = useContext(MenuContext);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    getMenuSections();
    // dependency is missing here, I want to call only once
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <div className="menu-input-container">
        {/* TODO: The icon is not available in the mock, and it is also not clear what to search for here */}
        <FontAwesomeIcon icon={faSearch} className="menu-search-icon"/>
        <input className="menu-input" id="check" placeholder="Search menu items" />
      </div>
      
      <div className="menu-container">
        <div className={`menu-painel menu-items  ${showCart ? 'menu-hidden' : 'menu-show'}`}>
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

        <div className={`menu-painel menu-cart ${showCart ? 'menu-show' : 'menu-hidden'}`}>
          <div>
            {/* TODO: Why different header? */}
            <div className="cart-basket-mobile">
              <span className="cart-basket-label">Basket</span>

              <span
                className="cart-basket-close"
                onClick={() => setShowCart(!showCart)}
              >
                <FontAwesomeIcon icon={faClose} />
              </span>
            </div>
            <Cart/>
          </div>
        </div>
      </div>

      <button
        className="action-btn show-cart-btn"
        onClick={() => setShowCart(!showCart)}
      >
        Your basket • {orders.length} {`${orders.length === 1 ? 'item' : 'items'}`}
      </button>
      <Modal/>
    </div>
      
  );
}

export default Menu;
