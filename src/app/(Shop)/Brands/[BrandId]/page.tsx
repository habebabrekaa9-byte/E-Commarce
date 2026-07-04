import { getBrandDetails } from '@/app/Services/Brand.Service';
import type { BrandDetails } from '@/types/response.type';
import React from 'react'
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from 'next/image';

interface brandDetailsProps {
    params: Promise<{ BrandId: string }>
}
export default async function BrandDetails({ params }: brandDetailsProps) {
    const { BrandId } = await params
    console.log(BrandId);
    const brand: BrandDetails = await getBrandDetails(BrandId);
    console.log(brand);
    const brandItem = brand.data;
    return (

        <section className="py-12">
            <div className="container">
                <div className="grid gap-10 lg:grid-cols-2">

                    {/* Brand Image */}
                    <Card>
                        <CardContent className="flex h-112.5 items-center justify-center p-8">
                            <Image
                                src={brandItem.image}
                                alt={brandItem.name}
                                className="max-h-80 object-contain"
                                width={400}
                                height={400}
                            />
                        </CardContent>ق
                    </Card>

                    {/* Brand Details */}
                    <div className="flex flex-col justify-center space-y-6">

                        <Badge className="w-fit">
                            Brand
                        </Badge>

                        <h1 className="text-5xl font-bold">
                            {brandItem.name}
                        </h1>

                        <p className="text-muted-foreground text-lg">
                            {brandItem.slug}
                        </p>

                        <Separator />

                        <div className="space-y-4">

                            <div className="flex justify-between">
                                <span className="font-medium">
                                    Brand ID
                                </span>

                                <span>{brandItem._id}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="font-medium">
                                    Created
                                </span>

                                <span>
                                    {new Date(brandItem.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="font-medium">
                                    Updated
                                </span>

                                <span>
                                    {new Date(brandItem.updatedAt).toLocaleDateString()}
                                </span>
                            </div>

                        </div>

                        <div className="flex gap-3">
                            <Button>
                                Browse Products
                            </Button>

                            <Button variant="outline">
                                Back
                            </Button>
                        </div>

                    </div>

                </div>

                {/* About */}
                <Card className="mt-12">
                    <CardHeader>
                        <CardTitle>
                            About {brandItem.name}
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-muted-foreground leading-7">
                            Explore the latest products from <strong>{brandItem.name}</strong>.
                            This brand is available in our store with high-quality items,
                            competitive prices, and fast delivery.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}