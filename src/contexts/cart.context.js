import {createContext, useEffect, useState} from "react";


const addCartItem = (cartItems , productToAdd) => {
    const existingCartItem = cartItems.find(item => item.id===productToAdd.id);
    //createing new list because we don't want to mutate the existing list
    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem,quantity: cartItem.quantity +1} : cartItem )
    }


    return [...cartItems, {...productToAdd,quantity: 1}]
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {}, // this is needed because in value we are sending also the setting method
    cartItems: [],
    addItemToCart : () =>{},
    cartCount: 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen,setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems,productToAdd));

    }

    //The reduce() method iterates through the array from left to right, calling the callback function for each element.
    useEffect(() => {
        const newCartCount = cartItems.reduce((total,cartItem) => total+cartItem.quantity, 0 );
        setCartCount(newCartCount);
    }, [cartItems]);
    const value = {isCartOpen,setIsCartOpen,addItemToCart,cartItems,cartCount};

    return (
        <CartContext.Provider value={value}  >{children}</CartContext.Provider>
    )
}