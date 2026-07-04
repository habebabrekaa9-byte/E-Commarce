"use client";
import type { ProductCart } from '@/app/interface/cart.interface'
import Image from 'next/image';
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Minus, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react'
import { removeProductFromCart, updateCartProduct } from '@/app/actions/cart.actions';
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import { useCart } from '@/context/CartContext';

export default function CartTableRow({ Products }: { Products: ProductCart }) {
    const { updateNumOfCartItems } = useCart()
    const router = useRouter();
    async function updateProductQuantity(id: string, count: number) {
        const res = await updateCartProduct(id, count)
        if (res.status) {
            toast.success(res.message);
            router.refresh();
        } else {
            toast.error(res.error.message)
        }
    }
    async function removeProductItem(id: string) {
        const res = await removeProductFromCart(id)
        if (res.status) {
            toast.success(res.message);
            updateNumOfCartItems(res.numOfCartItems)
            router.refresh();
        } else {
            toast.error(res.error.message)
        }
    }
    return (
        <>
            <TableRow >
                {/* Product */}
                <TableCell>
                    <div className="flex items-center gap-3">
                        <Button onClick={() => removeProductItem(Products.product.id)}
                            className="text-destructive hover:opacity-70 transition-opacity"
                            aria-label="Remove item"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border">
                            <Image
                                className="mx-auto"
                                src={Products.product.imageCover}
                                alt="images"
                                width={180}
                                height={190}
                            />
                        </div>
                        <span className="text-sm font-medium line-clamp-2">
                            {Products.product.title}
                        </span>
                    </div>
                </TableCell>
                {/* Price */}
                <TableCell className="text-sm">
                    {Products.price}
                </TableCell>

                {/* Quantity */}
                <TableCell>
                    <div className="flex items-center gap-2">
                        <Button onClick={() => updateProductQuantity(Products.product.id, Products.count - 1)} variant="outline" size="icon" className="h-7 w-7">
                            <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-sm font-medium">
                            {Products.count}
                        </span>
                        <Button onClick={() => updateProductQuantity(Products.product.id, Products.count + 1)} variant="outline" size="icon" className="h-7 w-7">
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>
                </TableCell>

                {/* Subtotal */}
                <TableCell className="text-right text-sm font-medium">
                    {Products.price * Products.count}
                </TableCell>

            </TableRow>

        </>
    )
}

