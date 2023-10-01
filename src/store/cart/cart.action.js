import {createAction} from "../../utils/reducer/reducer.utils";
import {CART_ACTIONS_TYPES} from "./cart.types";
import {CART_ACTIONS} from "../../contexts/cart.context";




export const setIsCartOpen = (boolean) =>{
    return createAction(CART_ACTIONS_TYPES.SET_IS_CART_OPEN, boolean);
}

export const addItemToCart = (cartItems,productToAdd) => {
    const newCartItems = addCartItem(cartItems,productToAdd);
    return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS,newCartItems);

}

export const removeItemFromCart = (cartItems,cartItemToRemove) => {
    const newCartItems =  removeCartItem(cartItems,cartItemToRemove);
    return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS,newCartItems);
}

export const clearItemFromCart = (cartItems,cartItemToClear) =>{
    const newCartItems = clearICartItem(cartItems,cartItemToClear);
    return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS,newCartItems);

}

// const updateCartItemsReducer = (newCartItems) =>{
//     const newCartCount = newCartItems.reduce((total,cartItem) => total+cartItem.quantity, 0 );
//     const newCartTotal = newCartItems.reduce((total,cartItem) => total +cartItem.quantity * cartItem.price, 0 );
//     dispatch(createAction(CART_ACTIONS.SET_CART_ITEMS,{cartItems:newCartItems, cartTotal:newCartTotal,cartCount:newCartCount}));
//
// }


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