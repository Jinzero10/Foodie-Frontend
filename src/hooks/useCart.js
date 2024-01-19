import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext(null);
const CART_KEY = "cart";
const EMPTY_CART = {
    items: [],
    totalPrice: 0,
    totalCount: 0,
};
export function cartMenuPrice(cartMenu) {
    let price = cartMenu.price;

    if (cartMenu.size) {
        price = cartMenu.size.price;
    }
    if (cartMenu.extras?.length > 0) {
        for (const extra of cartMenu.extras) {
            price += extra.price;
        }
    }
    return price * cartMenu.quantity;
}

export default function CartProvider({ children }) {
    const initCart = getCartFromLocalStorage();
    const [cartItems, setCartItems] = useState(initCart.items);

    const [totalPrice, setTotalPrice] = useState(initCart.totalPrice);
    const [totalCount, setTotalCount] = useState(initCart.totalCount);

    useEffect(() => {
        const totalPrice = sum(cartItems.map((item) => cartMenuPrice(item)));
        const totalCount = sum(cartItems.map((item) => item.quantity));

        setTotalPrice(totalPrice);
        setTotalCount(totalCount);

        localStorage.setItem(
            CART_KEY,
            JSON.stringify({
                items: cartItems,
                totalPrice,
                totalCount,
            })
        );
    }, [cartItems]);

    function getCartFromLocalStorage() {
        const storedCart = localStorage.getItem(CART_KEY);
        return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
    }

    const sum = (items) => {
        return items.reduce((prevValue, curValue) => prevValue + curValue, 0);
    };

    const removeFromCart = (foodId) => {
        const filteredCartItems = cartItems.filter(
            (item) => item.food._id !== foodId
        );
        setCartItems(filteredCartItems);
    };

    const changeQuantity = (cartItem, newQauntity) => {
        const { food } = cartItem;

        const changedCartItem = {
            ...cartItem,
            quantity: newQauntity,
            price: food.price * newQauntity,
        };

        setCartItems(
            cartItems.map((item) =>
                item.food._id === food._id ? changedCartItem : item
            )
        );
    };
    const incrementQuantity = (cartItem, itemQuantity, newQauntity) => {
        const { food } = cartItem;

        const changedCartItem = {
            ...cartItem,
            quantity: itemQuantity + newQauntity,
            price: food.price * (itemQuantity + newQauntity),
        };

        setCartItems(
            cartItems.map((item) =>
                item.food._id === food._id ? changedCartItem : item
            )
        );
    };

    const decrementQuantity = (cartItem, itemQuantity, newQauntity) => {
        const { food } = cartItem;

        const changedCartItem = {
            ...cartItem,
            quantity: itemQuantity - newQauntity,
            price: food.price * (itemQuantity - newQauntity),
        };

        setCartItems(
            cartItems.map((item) =>
                item.food._id === food._id ? changedCartItem : item
            )
        );
    };

    const addToCart = (food, size = null, extras = []) => {
        const cartItem = cartItems.find((item) => item.food._id === food._id);

        if (cartItem) {
            changeQuantity(cartItem, cartItem.quantity + 1);
        } else {
            setCartItems([
                ...cartItems,
                {
                    food,
                    quantity: 1,
                    price: size ? size.price : food.price,
                    size,
                    extras,
                }, //change this
            ]);
        }

        toast.success("Added to Cart", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    const clearCart = () => {
        localStorage.removeItem(CART_KEY);
        const { items, totalPrice, totalCount } = EMPTY_CART;
        setCartItems(items);
        setTotalPrice(totalPrice);
        setTotalCount(totalCount);
    };

    return (
        <CartContext.Provider
            value={{
                cart: { items: cartItems, totalPrice, totalCount },
                removeFromCart,
                changeQuantity,
                incrementQuantity,
                decrementQuantity,
                addToCart,
                clearCart,
                cartMenuPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
