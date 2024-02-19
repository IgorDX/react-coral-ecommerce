import { createContext, useContext, useState } from "react";

const ShoppingCartContext = createContext({});

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
  const storedCartItems = localStorage.getItem("cartItems");

  const parsedCartItems =  storedCartItems ? JSON.parse(storedCartItems) : [];

  const [cartItems, setCartItems] = useState(parsedCartItems);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  function increaseCartQuantity() {
    setCartItems(currentItems => {
      return [...currentItems, { quantity: 1 }];
    });
  }
  function decreaseCartQuantity() {
    setCartItems(currentItems => {
      const updatedItems = currentItems.slice(0, -1);
      return updatedItems;
    });
  }
    function setCartQuantity(quantity){
      const initialCartItems = Array.from({ length: quantity }, (_, index) => ({
        quantity: 1,
      }));
      setCartItems(initialCartItems)
    }
    function clearCart(){
      setCartItems([]);
    }
  const contextValue = {
    increaseCartQuantity,
    cartQuantity,
    decreaseCartQuantity,
    setCartQuantity,
    clearCart
  };

  return (
    <ShoppingCartContext.Provider value={{...contextValue}}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
