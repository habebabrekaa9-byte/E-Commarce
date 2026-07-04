"use client";
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { LoginSchema, defaultValues, type loginPayLoadType } from '@/schema/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';


export default function Loginpage() {
  const router=useRouter()
  const { handleSubmit, control } = useForm({
    defaultValues,
    // علشان نربطهم ببعض
    resolver: zodResolver(LoginSchema),
    mode: "onChange"
  })
   async function onSubmit(formValues: loginPayLoadType) {
    console.log(formValues);
    // fetch api
    const res = await signIn("credentials", { ...formValues, redirect: false, callbackUrl: "/" })
    console.log(res);
    if (res?.ok) {
      toast.success("Event has been success.Welcome back")
      router.push("/")
    } else {
      toast.error("Event has been not success.")
    }

    //     const data= await loginHandling(formValues);
    //     if (data.message === "success") {
    //     alert("Welcome Back")
    //    }else{
    //     alert("faild ...")
    //    }

  }
  return (
    <section className='py-12'>
      <div className='container'>
        <div className="max-w-2xl mx-auto ">
          <FieldGroup>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* **************email************* */}
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className='font-bold'>Email</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Your Email"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* **************password************* */}
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className='font-bold'>Password</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Your password"
                      autoComplete="off"
                      type='password'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Button className='w-full mt-3' type='submit'>Login</Button>
            </form>
          </FieldGroup>

        </div>
      </div>
    </section>
  )
}
