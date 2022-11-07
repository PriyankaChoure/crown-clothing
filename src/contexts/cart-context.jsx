import { useEffect } from "react";
import { createContext, useState } from "react";
/**
 *  add item into cart or if already added then increase quantity
 * @param {*} cartItems 
 * @param {*} productToAdd 
 * @returns 
 */
const addCartItem = (cartItems, productToAdd) => {
   const isCartItemExist = cartItems.find((item)=> item.id === productToAdd.id);

   if(isCartItemExist){
    return cartItems.map((item)=> 
        item.id === productToAdd.id ? 
        {...item, quantity : item.quantity +1} 
        : item 
    );
   }


    return [...cartItems, {...productToAdd, quantity : 1}]
}

/**
 *  remove item from cart if quantity is one otherwise decrease quantity by one
 * @param {*} cartItems 
 * @param {*} productToRemove 
 * @returns 
 */
const removeCartItem = (cartItems, productToRemove) => {
    const isCartItemExist = cartItems.find((item)=> item.id === productToRemove.id);
 
    if(isCartItemExist.quantity === 1){

     return cartItems.filter((item) => item.id !== productToRemove.id);
    }
 
 
    return cartItems.map((item)=> 
    item.id === productToRemove.id ? 
    {...item, quantity : item.quantity -1} 
    : item 
);
 }
 
 const clearCartItem =(cartItems, productToClearFromCart)=> 
    cartItems.filter((item)=> item.id !== productToClearFromCart.id);
 


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen : ()=> {},
    cartItems: [],
    addItemToCart : ()=> {},
    removeItemToCart: ()=> {},
    clearItemFromCart: ()=> {},
    cartCount: 0,
    cartTotal: 0,

});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount ] = useState(0);
    const [cartTotal, setCartTotal ] = useState(0);

    useEffect(()=>{
        const cartTotalItems =  cartItems.reduce((total,item)=>total+ item.quantity, 0);
        setCartCount(cartTotalItems);
    },
    [cartItems]);

    useEffect(()=>{
        const cartTotal =  cartItems.reduce((total,item)=>total+ (item.quantity * item.price), 0);
        setCartTotal(cartTotal);
    },
    [cartItems]);


    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemToCart =(productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const clearItemFromCart =(productToClearFromCart) => {
        setCartItems(clearCartItem(cartItems, productToClearFromCart));
    }
    const value = {isCartOpen, setIsCartOpen, addItemToCart ,removeItemToCart,clearItemFromCart,  cartItems, cartCount,cartTotal};
    return (
        <CartContext.Provider value={value} >{children} </CartContext.Provider>
    )
}