import React, { createContext, useState } from "react";

import menu from "../fixtures/menu.json";
import { mapper } from "../helpers/mapper.helper";

export const MenuContext = createContext(null);

export const MenuContextProvider = ({ children }) => {
  // is possible to use custom hooks to avoid this kind of repetition, but I have no time to do it :(
  const [menuSections, setMenuSections] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [selectedModifier, setSelectedModifier] = useState(null);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [orders, setOrders] = useState([]);
  const [activeItem, setActiveItem] = useState(null);

  // the endpoint is not working properly, so I'm using a local file
  const getMenuSections = () => {
    // This mapper is EXTREMELY important. There's no consistency in the payload, so I'm mapping to avoid conditionals in the components.
    setMenuSections(mapper(menu.sections));
  };

  const getActiveSection = () => {
    return menuSections.find((section) => section.id === activeSection);
  };

  const getActiveItem = () => {
    return getActiveSection()?.items.find((item) => item.id === activeItem);
  }

  // TODO: I'm not sure if this is the best way to handle this, a custom hook could be a better approach
  const addToOrder = () => {
    const order = orders.find((order) => order.id === selectedModifier);
    const item = getActiveItem();

    setActiveItem(null);
    setSelectedModifier(null);

    // If the order already exists, just update the quantity
    if (orders.find((order) => order.id === selectedModifier)) {
      updateOrder(selectedModifier, order.quantity + itemQuantity);
      return;
    }

    const modifier = item.modifiers.find((modifier) => modifier.id === selectedModifier);

    const newOrder = {
      id: modifier?.id,
      item: { name: item.name, id: item.id },
      modifier: { price: modifier.price, id: modifier.id, name: modifier.name },
      quantity: itemQuantity,
    };

    setOrders([...orders, newOrder]);
  };

  const updateOrder = (id, quantity) => {
    // there's no remove button, os if the user update quantity to 0, I'll remove the item from the order
    if (quantity <= 0) {
      setOrders(orders.filter((order) => order.id !== id));
      return;
    }

    const newOrders = orders.map((order) => {
      if (order.id === id) {
        return { ...order, quantity };
      }

      return order;
    });

    setOrders(newOrders);
  };

  const getTotalOrder = () => {
    return orders.reduce((acc, order) => acc + order.modifier.price * order.quantity, 0);
  };

  // is possible to use custom hooks to avoid this kind of repetition
  // or create another context to handle it, but time flies and I have no time to do it :(
  const value = {
    getMenuSections,
    menuSections,
    activeSection,
    setActiveSection,
    getActiveSection,
    activeItem,
    setActiveItem,
    getActiveItem,
    selectedModifier,
    setSelectedModifier,
    itemQuantity,
    setItemQuantity,
    addToOrder,
    orders,
    updateOrder,
    getTotalOrder
  };

  return (
    <MenuContext.Provider value={value}> {children} </MenuContext.Provider>
  );
};

export default MenuContext;