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

  function increaseCartQuantity(cartItem) {
    setCartItems(currentItems => {
      return [...currentItems, cartItem];
    });
  } 
    function clearCart(){
      setCartItems([]);
    }
  const contextValue = {
    increaseCartQuantity,
    cartQuantity,
    clearCart,
    setCartItems,
    cartItems
  };

  return (
    <ShoppingCartContext.Provider value={{...contextValue}}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
