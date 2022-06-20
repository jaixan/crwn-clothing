import { createContext, useState, useEffect } from "react";
import SHOP_DATA from '../shop-data.json';

export const ProductsContext = createContext({
  products: [],
  setProducts: () => null,
});

export const ProductsProvider = ({ children }) => {

    const [products, setProducts] = useState(null);

    useEffect(() => {
            setProducts(SHOP_DATA);
    }, []);

    return (
        <ProductsContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductsContext.Provider>
    );
}
