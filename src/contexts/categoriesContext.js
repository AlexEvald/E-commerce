import {createContext, useEffect, useState} from "react";
import {addCollectionAndDocuments, getCategoriesAndDocuments} from "../utils/firebase/firebase.utils";
import SHOP_DATA from '../shop-data';

export const CategoriesContext = createContext({
    categoriesMap: {},
});


export const CategoriesProvider = ({children}) => {
    const [categoriesMap,setCategoriesMap] = useState({});
    const value = {categoriesMap};

    // adding values to firebase , just one time thing
    // useEffect(() => {
    //     addCollectionAndDocuments('categories',SHOP_DATA)
    // }, []);


    //anything async you need to ro in a useEffect wrap it in a async function inside the useEffect itself
    //and then call it after
    useEffect(() => {
        const getCategoriesMap = async () =>{
            const categorMap = await getCategoriesAndDocuments();
            setCategoriesMap(categorMap);

        }

        getCategoriesMap();
    }, []);

    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}