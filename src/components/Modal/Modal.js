import React, { useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import MenuContext from "../../context/MenuContext";
import ModifierList from './ModifierList';

import './Modal.css';

function Modal() {
  const {
    getActiveItem,
    setActiveItem,
    itemQuantity,
    setItemQuantity,
    addToOrder,
    selectedModifier
  } = useContext(MenuContext);
  
  if (!getActiveItem()) {
    document.body.style.overflow = 'auto'
    return null;
  } else {
    document.body.style.overflow = 'hidden';
  }

  return (
    <div className="backdrop">
      <dialog open className="dialog-menu">
        <div className="modal-container">
          <div className="modal-container-details">
            <FontAwesomeIcon icon={faClose} className="modal-close" onClick={() => setActiveItem(null)} />
            {getActiveItem().image && (
              <img
                className="modal-image"
                src={getActiveItem().image}
                alt="modal"
                width={480}
                height={320}
              />
            )}

            <div className="modal-info-container">
              <div className="modal-info">
                <div className="modal-info-title">
                  {getActiveItem().name}
                </div>

                <div className="modal-info-description">
                  {getActiveItem().description}
                </div>
              </div>

              {/* TODO: This makes no sense, items other options not only size */}
              <div className="modal-size">
                <p>Choose your size</p>
                <p>Select 1 option</p>
              </div>

              {getActiveItem().modifiers.map((modifier) => (
                <ModifierList
                  id={modifier.id}
                  name={modifier.name}
                  price={modifier.price}
                />
              ))}
              {/* TODO: This div makes no sense. Why should the add button have the opacity effect? */}
              <div className="spacing"></div>
            </div>
          </div>
          
          <div className="quantity-section">
            <div className="quantity-container">
              <button
                className="quantity-minus"
                onClick={() => setItemQuantity(itemQuantity - 1)}
                disabled={itemQuantity <= 1}
              >
                <p>-</p>
              </button>

              <div className="quantity-number">{itemQuantity}</div>

              <button className="quantity-plus" onClick={() => setItemQuantity(itemQuantity + 1)}>
                <p>+</p>
              </button>
            </div>

            <button
              className="action-btn"
              onClick={() => addToOrder(getActiveItem().id)}
              disabled={!selectedModifier}
            >
              Add to Order
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Modal;