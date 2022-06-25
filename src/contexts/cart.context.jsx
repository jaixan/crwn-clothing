import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  cartItems: [],
  cartVisible: false,
  addItemToCart: () => null,
  increaseItemQuantity: () => null,
  decreaseItemQuantity: () => null,
  removeItemFromCart: () => null,
  setCartVisible: () => null,
  cartCount: 0,
  cartTotal: 0,
});

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(x => x.id === productToAdd.id);
  if (existingCartItem) {
    return cartItems.map( cartItem =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, {...productToAdd, quantity: 1}];
}

const changeCartItemQuantity = (cartItems, cartItemToChange, delta) => {
  const existingCartItem = cartItems.find(x => x.id === cartItemToChange.id);
  if (existingCartItem) {
    if (existingCartItem.quantity + delta > 0) {
      return cartItems.map((cartItem) =>
        cartItem.id === cartItemToChange.id
          ? { ...cartItem, quantity: cartItem.quantity + delta }
          : cartItem
      );
    }
  }
  return cartItems;
}

const removeCartItem = (cartItems, itemToRemove) => {
  return cartItems.filter(cartItem => cartItem.id !== itemToRemove.id);
}

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);
    const [cartVisible, setCartVisible] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
      const newCartCount = cartItems.reduce(
        (accumulator, cartItem) => accumulator + cartItem.quantity,
        0
      );
      const newCartTotal = cartItems.reduce(
        (accumulator, cartItem) =>
          accumulator + cartItem.quantity * cartItem.price,
        0
      );
      setCartCount(newCartCount);
      setCartTotal(newCartTotal);
    }, [cartItems]);
    
    const addItemToCart = (productToAdd) => {
      setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
      setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const increaseItemQuantity = (cartItemToIncreaseQuantity) => {
      setCartItems(changeCartItemQuantity(cartItems, cartItemToIncreaseQuantity, 1));
    }

    const decreaseItemQuantity = (cartItemToDecreaseQuantity) => {
      setCartItems(changeCartItemQuantity(cartItems, cartItemToDecreaseQuantity, -1));
    }


    return (
      <CartContext.Provider
        value={{
          cartItems,
          addItemToCart,
          increaseItemQuantity,
          decreaseItemQuantity,
          removeItemFromCart,
          cartVisible,
          setCartVisible,
          cartCount,
          cartTotal,
        }}
      >
        {children}
      </CartContext.Provider>
    );
}
