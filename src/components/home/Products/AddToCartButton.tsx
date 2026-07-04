"use client";
import addToCart from '@/app/actions/cart.actions';
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext';
import React from 'react'
import { toast } from 'sonner';
type ButtonVariant = React.ComponentProps<typeof Button>["variant"];
interface AddToCartButtonProps {
    className: string,
    variant?: ButtonVariant;
    ProductId: string
}
export default function AddToCartButton({ ProductId, className, variant }: AddToCartButtonProps) {
    const { updateNumOfCartItems } = useCart()
    // fetch api
    async function addProductToCart(ProductId: string) {
        const res = await addToCart(ProductId)
        console.log("add to cart ProductId", ProductId);

        console.log(res);
        if (res.status) {
            toast.success(res.message)

            updateNumOfCartItems(res.numOfCartItems)
        }
        else {
            toast.error(res.message.error)
        }
    }
    return (
        <>
            <Button onClick={() => addProductToCart(ProductId)} className={className} variant={variant} > add to cart</Button>
        </>
    )
}
