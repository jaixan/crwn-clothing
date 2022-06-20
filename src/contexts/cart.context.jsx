import { createContext, useState } from "react";

export const CartContext = createContext({
  cartItems: [],
  cartVisible: false,
  setCartItems: () => null,
  setCartVisible: () => null,
});

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState(null);
    const [cartVisible, setCartVisible] = useState(false);

    return (
      <CartContext.Provider
        value={{ cartItems, setCartItems, cartVisible, setCartVisible }}
      >
        {children}
      </CartContext.Provider>
    );
}
