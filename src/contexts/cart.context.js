import {createContext, useState} from "react";


const addCartItem = (cartItems , productToAdd, totalCount, setTotalCount) => {
    const existingCartItem = cartItems.find(item => item.id===productToAdd.id);
    setTotalCount(totalCount+1);

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
    totalCount: 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen,setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems,productToAdd,totalCount,setTotalCount));

    }
    const value = {isCartOpen,setIsCartOpen,addItemToCart,cartItems,totalCount};

    return (
        <CartContext.Provider value={value}  >{children}</CartContext.Provider>
    )
}