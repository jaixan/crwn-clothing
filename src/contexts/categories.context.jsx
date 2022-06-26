import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

export const CategoriesContext = createContext({
  categoriesMap: {},
  setCategoriesMap: () => null,
});

export const CategoriesProvider = ({ children }) => {

    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoriesMap);
        }
        getCategoriesMap();
    }, []);

    return (
        <CategoriesContext.Provider value={{ categoriesMap, setCategoriesMap }}>
            {children}
        </CategoriesContext.Provider>
    );
}
