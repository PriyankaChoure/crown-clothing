import {createContext, useState, useEffect } from "react";

import SHOP_DATA from '../data/shop-data.js';
// import { addCollectionsAndDocuments } from '../utils/firebase/firebase.utils';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';
export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({children}) =>{
    const [categoriesMap, setCategoriesMap ] = useState({});
    //  this code is used to save json data in firebase database
    // useEffect(()=>{
    //     addCollectionsAndDocuments('categories', SHOP_DATA);
    // },[]);

    useEffect(()=>{
        const getCategoriesMap = async()=>{
            const categoryMap = await getCategoriesAndDocuments();
            console.log("category map -", categoryMap);
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();

    },[]);
    
    const value = {categoriesMap};


    return(
        <CategoriesContext.Provider value={value}>{children} </CategoriesContext.Provider>
    );
}