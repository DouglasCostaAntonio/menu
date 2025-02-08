import React, { useContext } from 'react';
import MenuContext from "../../context/MenuContext";
import { dollarFormat } from "../../helpers/number.helper";

import './ModifierList.css';

function ModifierList({name, price, id}) {
  const {
    setSelectedModifier,
    selectedModifier    
  } = useContext(MenuContext);

  return (
    <div className="modifier-container">
      <div className="modifier-info">
        <div className="modifier-name">{name}</div>
        <div className="modifier-price">{dollarFormat.format(price)}</div>
      </div>

      <div className="modifier-btn" onClick={() => setSelectedModifier(id)}>
        {selectedModifier === id && (
          <div className="modifier-active"></div>
        )}
      </div>
    </div>
  );
}

export default ModifierList;