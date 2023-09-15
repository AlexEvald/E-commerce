import {createContext, useState} from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {}, // this is needed because in value we are sending also the setting method
});

export const CartProvider = ({children}) => {
    const [isCartOpen,setIsCartOpen] = useState(false);
    const value = {isCartOpen,setIsCartOpen};

    return (
        <CartContext.Provider value={value}  >{children}</CartContext.Provider>
    )
}