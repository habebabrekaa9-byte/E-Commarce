import { getProductDetails } from '@/app/Services/Products.Service';
import { formatprice } from '@/lib/Format';
import type { ProductDetails } from '@/types/response.type';
import { Heart, Star } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import Image from 'next/image';
import React from 'react'
import { Button } from '@/components/ui/button';
import ProductSlider from '@/components/Products/ProductSlider/ProductSlider';
import AddToCartButton from '@/components/home/Products/AddToCartButton';
interface productDetailsProps {
    params: Promise<{ ProductId: string }>
}
export default async function productDetails({ params }: productDetailsProps) {
    const { ProductId } = await params
    const product: ProductDetails = await getProductDetails(ProductId);
    console.log(product);
    const productItem = product.data;
    console.log(ProductId);
    return (
        <section className='py-12'>
            <div className="container">
                <div className='grid grid-cols-3 gap-7 items-center'>
                    <div className='col-span-2'>
                        {/* <div className='bg-gray-200'>
                            {
                                <Image className='mx-auto' src={productItem.imageCover} alt={productItem.title} width={500} height={400} />
                            }
                        </div> */}
                        <ProductSlider images={productItem.images} />
                    </div>
                    <div className='col-span-1 '>
                        <p className='text-xl font-bold text-gray-400'>{productItem.category.name}</p>
                        <h3 className='text-xl font-bold'>{productItem.title}</h3>
                        <div>
                            <Star className='text-yellow-300 fill-amber-300' />
                            <span className='me-2'>{productItem.ratingsAverage}</span>
                            <span className='text-gray-300'>({productItem.ratingsQuantity})</span>
                        </div>
                        <div className='flex gap-5 py-2'>
                            <div className='text-red-500'>
                                {
                                    formatprice(productItem.price)
                                }
                            </div>
                            <div className='line-through text-gray-400'>
                                {
                                    productItem.priceAfterDiscount ? formatprice(productItem.priceAfterDiscount) : ""
                                }
                            </div>
                        </div>
                        <p>{productItem.description}</p>
                        <Separator className='m-3 ' />
                        <div className='flex'>
                            <AddToCartButton ProductId={ProductId} className='capitalize me-3 w-full' variant={'destructive'} />
                            <Button className='' variant={"outline"} size={"icon"}> <Heart /></Button>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
