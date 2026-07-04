import { getUserCart } from '@/app/actions/cart.actions'
import type { ProductCartResponse } from '@/types/response.type';
// import Image from 'next/image';
import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
// import { Minus, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CartTableRow from '@/components/Cart/CartTableRow/CartTableRow';
import ClearAllProduct from '@/components/Cart/ClearAllProduct/ClearAllProduct';
import Link from 'next/link';


export default async function cartPage() {
  // call api for getUserCart() fn :
  const cartDetails: ProductCartResponse = await getUserCart()
  const Products = cartDetails.data.products
  console.log(Products);

  return (
    // المستخدم يضغط أو يكتب أو يستخدم المتصفح
    // ↓
    // Client
    // لو الكود يحتاج:
    // أسرار، قاعدة بيانات، Cookies، Authentication، Environment Variables
    // ↓
    // Server
    // ولو لقيتِ نفسك بتكتبي:
    <section>
      <div className="container my-12">
        <div className="w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-100">Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Products?.map((item) => (
                <CartTableRow Products={item} key={item.product._id} />
                // <TableRow key={item.product._id}>

                //   {/* Product */}
                //   <TableCell>
                //     <div className="flex items-center gap-3">
                //       {/* زرار الحذف */}
                //       <Button
                //         className="text-destructive hover:opacity-70 transition-opacity"
                //         aria-label="Remove item"
                //       >
                //         <X className="h-4 w-4" />
                //       </Button>
                //       {/* صورة المنتج */}
                //       <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border">
                //         <Image className="mx-auto" src={item.product.imageCover} alt='imagies' width={180} height={190} />
                //       </div>
                //       {/* اسم المنتج */}
                //       <span className="text-sm font-medium line-clamp-2">
                //         {item.product.title}
                //       </span>
                //     </div>
                //   </TableCell>
                //   {/* Price */}
                //   <TableCell className="text-sm">
                //     {item.price}
                //   </TableCell>
                //   {/* Quantity */}
                //   <TableCell>
                //     <div className="flex items-center gap-2">
                //       <Button
                //         variant="outline"
                //         size="icon"
                //         className="h-7 w-7"
                //       // disabled={item.count <= 1}
                //       >
                //         <Minus className="h-3 w-3" />
                //       </Button>
                //       <span className="w-6 text-center text-sm font-medium">
                //         {item.count}
                //       </span>
                //       <Button
                //         variant="outline"
                //         size="icon"
                //         className="h-7 w-7"
                //       >
                //         <Plus className="h-3 w-3" />
                //       </Button>
                //     </div>
                //   </TableCell>
                //   {/* Subtotal */}
                //   <TableCell className="text-right text-sm font-medium">
                //     {item.price * item.count}
                //   </TableCell>
                // </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Footer Buttons */}
          <div className="mt-6 my-12 flex items-center justify-between">
            <Button variant="outline" asChild >
              <Link href="/Products">
                Return To Shop
              </Link>
            </Button>
            <ClearAllProduct />
          </div>
          <div className='my-16'>
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              {/* Coupon Input */}
              <div className="flex items-center gap-3">
                <Input
                  placeholder="Coupon Code"
                  className="w-80"
                />
                <Button
                  variant="destructive"
                >
                  Apply Coupon
                </Button>
              </div>
              {/* Cart Total Card */}
              <Card className="w-full md:w-96">
                <CardHeader>
                  <CardTitle className='text-xl font-bold'>Order Summary Cart:</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>{cartDetails.data.totalCartPrice} EGP</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-sm">
                    <span>Shipping:</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span>Estimated Total:</span>
                    <span>{cartDetails.data.totalCartPrice} EGP</span>
                  </div>
                  <Button
                    variant="destructive"
                    className="w-full" asChild
                  >
                    <Link href={`/checkout?id=${cartDetails.cartId}`}> Proceed to checkout</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
