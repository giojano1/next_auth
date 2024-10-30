"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import { z } from "zod";
import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { registerUser } from "./action";
import Link from "next/link";
const formSchema = z
  .object({
    email: z.string().email(),
  })
  .and(passwordMatchSchema);

export default function RegisterPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await registerUser({
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    });
    if (response?.error) {
      form.setError("email", {
        type: "manual",
        message: response?.message,
      });
    }
    console.log(form.formState);
  };
  return (
    <div>
      <main className="flex justify-center items-center min-h-screen">
        {form.formState.isSubmitSuccessful ? (
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>Regsiter for new account</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/login">Login to your account</Link>
            </CardContent>
          </Card>
        ) : (
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>Regsiter for new account</CardDescription>
            </CardHeader>
            <CardContent>
              <FormProvider {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="gap-5 flex flex-col"
                >
                  <fieldset
                    disabled={form.formState.isSubmitting}
                    className="gap-5 flex flex-col"
                  >
                    {/* email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* password */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Passowrd</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="password"
                              {...field}
                              type="password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* password confirm */}
                    <FormField
                      control={form.control}
                      name="passwordConfirm"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Passowrd</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="confirm password"
                              {...field}
                              type="password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Register</Button>
                  </fieldset>
                </form>
              </FormProvider>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
