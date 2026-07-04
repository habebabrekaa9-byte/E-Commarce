// "use client";
// import { createCashOrder } from "@/app/actions/orders.actions";
// import { Button } from "@/components/ui/button";
// import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import {
//   checkoutSchema,
//   defaultValues,
//   type CheckoutFormValues,
// } from "@/schema/checkoutAddress.schema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import { Controller, useForm } from "react-hook-form";

import CkeckOutForm from "@/components/checkout/checkOutForm";

// import { toast } from "sonner";
interface CheckoutPageProps {
  searchParams: {
    id: string
  }
}
export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  console.log(searchParams);
  const { id } = await searchParams
  console.log(id);
  return (
    <>
      <section className="py-12">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <CkeckOutForm cartId ={id}/>
          </div>
        </div>
      </section>
    </>
  )
}

