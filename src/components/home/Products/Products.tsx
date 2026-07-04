import { getProducts } from '@/app/Services/Products.Service';
import SectionTitle from '@/components/Shared/SectionTitle/SectionTitle';
import { formatprice } from '@/lib/Format';
import type { ProductsResponse } from '@/types/response.type';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import Link from "next/link";
import React from 'react'
import { Star } from 'lucide-react';
import AddToCartButton from './AddToCartButton';

export default async function Products() {
  const Products: ProductsResponse = await getProducts(8);
  console.log(Products.data);

  return (
    <section className='py-14'>
      <div className="container">
        <div>
          <SectionTitle title='Featured' subTitle='Products' />
        </div>
        <div className="grid grid-cols-5 gap-5 ">
          {
            Products.data.map((product) => (
              <div className="col-span-1 border rounded-sm" key={product._id}>
                <Image className="mx-auto" src={product.imageCover} alt='imagies' width={180} height={190} />
                <div className="ps-4 py-2">
                  <Link href={`/Products/${product._id}`} className='text-gray-400  text-sm'>{product.category.name}</Link>
                  <h4 className="truncate w-45 whitespace-break-spaces text-xl">{product.slug}</h4>
                </div>
                <div className="flex justify-between ps-4 py-2">
                  <div><Star className='text-amber-300 shadow-amber-300'></Star></div>
                  <div className='pr-4'>{product.ratingsAverage}({product.ratingsQuantity})</div>
                </div>
                <div className='flex gap-5 ps-4 py-2'>
                  <div className='text-red-500'>
                    {
                      formatprice(product.price)
                    }
                  </div>
                  <div className='line-through text-gray-400'>
                    {
                      product.priceAfterDiscount
                    }
                  </div>
                </div>
                <div className='flex items-center justify-center p-4'>
                  <AddToCartButton ProductId={product._id} className="text-gray-600 text-md" variant={"secondary"} />
                </div>
              </div>
            ))
          }
        </div>
        <div className='flex justify-center items-center py-4'>
          <Button className=" bg-red-500 text-blue-50 w-100 capitalize " asChild><Link href={"/Products"}>View all products</Link></Button>
        </div>
      </div>
    </section>
  )
}
