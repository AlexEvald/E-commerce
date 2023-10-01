


export const selectCartItems = state => state.cart.cartItems;

export const selectIsCartOpen = state => state.cart.isCartOpen;

export const selectCartCount = state => {
    return state.cart.cartItems.reduce((total,cartItem) => total+cartItem.quantity, 0 );
}

export const selectCartTotal = state => {
    return state.cart.cartItems.reduce((total,cartItem) => total +cartItem.quantity * cartItem.price, 0 );
}
