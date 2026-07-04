import { getBrands } from '@/app/Services/Brand.Service'
import { Card, CardContent } from '@/components/ui/card';
import type { BrandsResponse } from '@/types/response.type';
import { CalendarDays } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function Brandspage() {
  const brands: BrandsResponse = await getBrands()
  console.log(brands);

  return (
    <section className="py-12">
      <div className="container">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Brands</h1>
          <p className="text-muted-foreground mt-2">
            Browse all available brands.
          </p>
        </div>

        {/* Top Bar */}
        <div className="mb-8 flex items-center justify-between rounded-xl border bg-card p-5">
          <h2 className="text-lg font-semibold">
            Total Brands:
            <span className="ml-2 text-primary">
              {brands.metadata.limit}
            </span>
          </h2>
        </div>

        {/* Brands Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {brands.data.map((brand) => (
            <Card
              key={brand._id}
              className="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <CardContent className="p-5">
                <div className="flex h-52 items-center justify-center rounded-lg bg-muted">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    className="max-h-36 object-contain"
                    width={80}
                    height={50}
                  />
                </div>

                <div className="mt-5 space-y-2">
                  <h3 className="text-xl font-bold">
                    <Link href={`/Brands/${brand._id}`} className='text-gray-400  text-sm'>{brand.name}</Link>

                  </h3>
                  <p className="text-sm text-primary">
                    {brand.slug}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    {new Date(brand.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
