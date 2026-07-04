
// context
"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { toast } from "sonner";

type CartContextType = {
    numOfCartItems: number;
    updateNumOfCartItems: (count: number) => void;
};

export const cartContext = createContext<CartContextType>({
    numOfCartItems: 0,
    updateNumOfCartItems: () => { },
});

export default function CartProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [numOfCartItems, setNumOfCartItems] = useState(0);

    function updateNumOfCartItems(count: number) {
        setNumOfCartItems(count);
    }

    return (
        <cartContext.Provider
            value={{
                numOfCartItems,
                updateNumOfCartItems,
            }}
        >
            {children}
        </cartContext.Provider>
    );
}
// custom hook => use cotext
export function useCart(){
    const context= useContext(cartContext);
    if (!context) {
        toast.error("usecart must be used within cartProvider")
    }
    return context
}
