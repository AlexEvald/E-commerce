import {createContext, useEffect, useState} from "react";


const addCartItem = (cartItems , productToAdd) => {
    const existingCartItem = cartItems.find(item => item.id===productToAdd.id);
    //createing new list because we don't want to mutate the existing list
    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem,quantity: cartItem.quantity +1} : cartItem )
    }


    return [...cartItems, {...productToAdd,quantity: 1}]
}

const removeCartItem = (cartItems , cartItemToRemove) => {
    const existingCartItem = cartItems.find(item => item.id===cartItemToRemove.id);
    //you filter out the items that are quantity 1 , this way you remove it from the items completely
    if(existingCartItem.quantity === 1 ){
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id )
    }else{
        return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? {...cartItem,quantity: cartItem.quantity -1} : cartItem )

    }

}
const clearICartItem = (cartItems , cartItemToClear) =>{
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id )

}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {}, // this is needed because in value we are sending also the setting method
    cartItems: [],
    addItemToCart : () =>{},
    removeItemFromCart : () => {},
    cartCount: 0,
    clearCartItem: () =>{},
    cartTotal: 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen,setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems,productToAdd));

    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems,cartItemToRemove));

    }

    const clearItemFromCart = (cartItemToClear) =>{
        setCartItems(clearICartItem(cartItems,cartItemToClear));

    }

    //The reduce() method iterates through the array from left to right, calling the callback function for each element.
    useEffect(() => {
        const newCartCount = cartItems.reduce((total,cartItem) => total+cartItem.quantity, 0 );
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total,cartItem) => total +cartItem.quantity * cartItem.price, 0 );
        setCartTotal(newCartTotal);
    }, [cartItems]);


    const value = {isCartOpen,setIsCartOpen,addItemToCart,removeItemFromCart,cartItems,cartCount,clearItemFromCart,cartTotal};

    return (
        <CartContext.Provider value={value} >{children}</CartContext.Provider>
    )
}