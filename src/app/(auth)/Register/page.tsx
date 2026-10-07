"use client";
import { registerHandling } from '@/app/actions/Auth.actions';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { registerSchema, type registerPayLoadType, defaultValues } from '@/schema/register.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function Registerpage() {
  const router = useRouter()
  const { handleSubmit, control } = useForm({
    defaultValues,
    // علشان نربطهم ببعض
    resolver: zodResolver(registerSchema),
    mode: "onChange"
  })
  // async function onSubmit(formValues: registerPayLoadType) {
  //   console.log(formValues);
  //   // fetch api
  //   const res = await signIn("credentials", { ...formValues, redirect: false, callbackUrl: "/" })
  //   console.log(res);
  //   if (res?.ok) {
  //     toast.success("Event has been success.Welcome back")
  //     router.push("/Login")
  //   } else {
  //     toast.error("Event has been not success.")
  //   }

  //   // const data = await registerHandling(formValues);
  //   // console.log("data",data);
  // }
  async function onSubmit(formValues: registerPayLoadType) {
    console.log(formValues);

    // Register
    const data = await registerHandling(formValues);
    console.log("register data", data);

    if (data?.status) {
      toast.success("Account created successfully");

      // Login after successful registration
      const res = await signIn("credentials", {
        email: formValues.email,
        password: formValues.password,
        redirect: false,
      });

      console.log("login response", res);

      if (res?.ok) {
        toast.success("Welcome back");
        router.push("/");
      } else {
        toast.error("Account created, but login failed");
      }
    } else {
      toast.error(data?.message || "Registration failed");
    }
  }
  return (
    <section className='py-12'>
      <div className='container'>
        <div className="max-w-2xl mx-auto ">
          <FieldGroup className='m-3'>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* **************name************* */}
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className='font-bold'>Name</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Your name"
                      autoComplete="off"
                      type=''
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
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
              {/* **************repassword************* */}
              <Controller
                name="rePassword"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className='font-bold'>rePassword</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Your rePassword"
                      autoComplete="off"
                      type='password'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* **************phone************* */}
              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className='font-bold'>Phone</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Your phone"
                      autoComplete="off"
                      type='password'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Button className='w-full mt-3' type='submit'>Register</Button>
            </form>
          </FieldGroup>

        </div>
      </div>
    </section>
  )
}