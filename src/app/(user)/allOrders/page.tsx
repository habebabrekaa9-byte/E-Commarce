import { getAllUserOrders } from '@/app/actions/orders.actions'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { OrdersResponse } from '@/types/response.type';

export default async function AllOrdersPage() {
    const orderRes: OrdersResponse = await getAllUserOrders()
    console.log(orderRes);

    return (

        <section className='py-12'>
            <div className="container">
                {orderRes.map((order) => (
                    <Card key={order._id} className="mb-8 shadow-md">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>
                                    Order #{order._id.slice(-8)}
                                </CardTitle>

                                <div className="flex gap-2">
                                    <Badge variant={order.isPaid ? "default" : "destructive"}>
                                        {order.isPaid ? "Paid" : "Unpaid"}
                                    </Badge>

                                    <Badge variant={order.isDelivered ? "default" : "secondary"}>
                                        {order.isDelivered ? "Delivered" : "Pending"}
                                    </Badge>
                                </div>
                            </div>

                            <p className="text-sm text-muted-foreground">
                                {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                        </CardHeader>

                        <CardContent className="space-y-5">
                            {/* Products */}
                            <div className="space-y-4">
                                {order.cartItems.map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex items-center justify-between rounded-lg border p-4"
                                    >
                                        <div>
                                            <h3 className="font-semibold">
                                                {item.product.title}
                                            </h3>

                                            <p className="text-sm text-muted-foreground">
                                                Quantity: {item.count}
                                            </p>
                                        </div>

                                        <div className="font-semibold">
                                            {item.price} EGP
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Separator />

                            {/* Order Summary */}
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Payment Method</span>
                                    <span>{order.paymentMethodType}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>{order.shippingPrice} EGP</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>{order.taxPrice} EGP</span>
                                </div>

                                <Separator />

                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>{order.totalOrderPrice} EGP</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}
