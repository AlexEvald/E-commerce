import {createContext, useEffect, useReducer, useState} from "react";
import {createAction} from "../utils/reducer/reducer.utils";


const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

export const CART_ACTIONS = {
    CART_OPEN_TOGGLE : 'CART_OPEN_TOGGLE',
    SET_CART_ITEMS : 'SET_CART_ITEMS'
}

const cartReducer = (state,action) =>{
    const {type,payload} = action;

    switch (type){
        case CART_ACTIONS.CART_OPEN_TOGGLE:
            return {
                ...state,
                isCartOpen:payload.bool
            }
        case CART_ACTIONS.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        default:
            throw new Error(`There is no supported action for ${type}`)
    }
}

const addCartItem = (cartItems , productToAdd) => {
    const existingCartItem = cartItems.find(item => item.id===productToAdd.id);
    //creating new list because we don't want to mutate the existing list
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
    const [{isCartOpen,cartItems,cartCount,cartTotal},dispatch] = useReducer(cartReducer,INITIAL_STATE);

    const setIsCartOpen = (bool) =>{
        dispatch(createAction(CART_ACTIONS.CART_OPEN_TOGGLE, {bool}));
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems,productToAdd);
        updateCartItemsReducer(newCartItems);

    }

    const removeItemFromCart = (cartItemToRemove) => {
       const newCartItems =  removeCartItem(cartItems,cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (cartItemToClear) =>{
        const newCartItems = clearICartItem(cartItems,cartItemToClear);
        updateCartItemsReducer(newCartItems);

    }

    const updateCartItemsReducer = (newCartItems) =>{
        const newCartCount = newCartItems.reduce((total,cartItem) => total+cartItem.quantity, 0 );
        const newCartTotal = newCartItems.reduce((total,cartItem) => total +cartItem.quantity * cartItem.price, 0 );
        dispatch(createAction(CART_ACTIONS.SET_CART_ITEMS,{cartItems:newCartItems, cartTotal:newCartTotal,cartCount:newCartCount}));

    }

    const value = {isCartOpen,setIsCartOpen,addItemToCart,removeItemFromCart,cartItems,cartCount,clearItemFromCart,cartTotal};

    return (
        <CartContext.Provider value={value} >{children}</CartContext.Provider>
    )
}