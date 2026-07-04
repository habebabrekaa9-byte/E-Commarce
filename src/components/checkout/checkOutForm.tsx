"use client";
import { createCashOrder } from "@/app/actions/orders.actions";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { paymentMethod } from "@/schema/checkoutAddress.schema";
import {
    checkoutSchema,
    defaultValues,
    type CheckoutFormValuespayload,
} from "@/schema/checkoutAddress.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
interface CheckoutPageProps {
    cartId: string
}
export default function CkeckOutForm({ cartId }: CheckoutPageProps) {
    const router = useRouter()
    const { updateNumOfCartItems } = useCart()
    const { handleSubmit, control, getValues } = useForm<CheckoutFormValuespayload>({
        defaultValues,
        resolver: zodResolver(checkoutSchema),
        mode: "onChange",
    });
    async function onSubmit(formValues: CheckoutFormValuespayload) {
        console.log(formValues);
        // Call checkout API here
        const res = await createCashOrder(cartId, formValues)
        console.log(res);
        console.log(res.session);
        console.log(res.session?.url);
        if (res?.status) {
            if (getValues('paymentMethod') === "cash") {
                toast.success(res.message)
                updateNumOfCartItems(0)
                router.push("/allOrders")

            }
            else {
                open(res.session.url, "_self")
                updateNumOfCartItems(0)
            }
        } else {
            toast.success("Event has been success..", res.error.message)
        }
    }

    return (
        <FieldGroup>
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* Details */}
                <Controller
                    name="details"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                Address Details
                            </FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                placeholder="Enter your address"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                {/* Phone */}
                <Controller
                    name="phone"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                Phone
                            </FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                placeholder="Enter your phone"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                {/* City */}
                <Controller
                    name="city"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                City
                            </FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                placeholder="Enter your city"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                {/* Postal Code */}
                <Controller
                    name="postalCode"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                Postal Code
                            </FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                placeholder="Enter postal code"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                {/* raido group */}

                <Controller
                    name="paymentMethod"
                    control={control}
                    render={({ field }) => (
                        <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                        >
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value={paymentMethod.CASH} id="cash" />
                                <Label htmlFor="option-one">Cash</Label>
                            </div>

                            <div className="flex items-center gap-3">
                                <RadioGroupItem value={paymentMethod.VISA} id="visa" />
                                <Label htmlFor="option-two">Visa</Label>
                            </div>
                        </RadioGroup>
                    )}
                />
                <Button className="w-full mt-4" type="submit" variant={"secondary"}>
                    Place an Order
                </Button>
            </form>
        </FieldGroup>
    );
}
