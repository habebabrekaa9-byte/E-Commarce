"use client";

import { clearUserCart } from '@/app/actions/cart.actions';
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext';
import { useRouter } from "next/navigation";
import React from 'react'
import { toast } from 'sonner';

export default function ClearAllProduct() {
    const { updateNumOfCartItems } = useCart()
    const router = useRouter();
    async function removeProductItem() {
        const res = await clearUserCart()
        if (res.status) {
            toast.success(res.message);
            updateNumOfCartItems(0)
            router.refresh();
        } else {
            toast.error(res.error.message)
        }
    }
    return (
        <>
            <Button onClick={removeProductItem} variant="destructive">
                Remove All Items
            </Button>
        </>
    )
}
