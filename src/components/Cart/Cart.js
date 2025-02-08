import React, { useContext } from 'react';

import { dollarFormat } from "../../helpers/number.helper";
import MenuContext from "../../context/MenuContext";

import './Cart.css';

function Cart() {
  const {
    orders,
    updateOrder,
    getTotalOrder
  } = useContext(MenuContext);

  return (
    <div className="cart-container">
      <span className="cart-title">Carrinho</span>

      {!orders.length && (
        <div className="cart-no-item">Seu carrinho esta vazio</div>
      )}

      {orders.map((order) => (
        <div className="cart-item-container">
          <div className="cart-item-info">
            <div className="cart-item-name">{order.item.name}</div>
            <div className="cart-item-modifier">{order.modifier.name}</div>
            
            {/* TODO: This could be reused, but the size is different  */}
            <div className="cart-quantity-container">
              <div className="cart-quantity-minus" onClick={() => updateOrder(order.id, order.quantity  - 1)}><p>-</p></div>
              <div className="cart-quantity-number">{order.quantity}</div>
              <div className="cart-quantity-plus" onClick={() => updateOrder(order.id, order.quantity  + 1)}><p>+</p></div>
            </div>
          </div>

          <div className="cart-item-price">
            {dollarFormat.format(order.modifier.price * order.quantity)}
          </div>
        </div>
      ))}

      {/* TODO: The mock shows a "sub total". I don't know why :) */}
      <div className="cart-total-container">
        <span className="cart-total-label">Total:</span>
        <span className="cart-total-price">
          {dollarFormat.format(getTotalOrder())}
        </span>
      </div>

      {/* TODO: we have checkout btn on mobile but why not on desktop? */}
      <button className="action-btn show-cart-btn">
        Checkout now
      </button>
    </div>
  );
}

export default Cart;
