import { createContext, useContext, useState, useEffect } from "react";

export const Cartcontext = createContext();

export const useCart = () => useContext(Cartcontext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity) => {
        setCartItems(prevItems => {
            const itemExists = prevItems.find(item => item._id === product._id);

            if (itemExists) {
                return prevItems.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems =>
            prevItems.filter(item => item._id !== productId)
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <Cartcontext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </Cartcontext.Provider>
    );
};
