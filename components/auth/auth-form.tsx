"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { GoogleLogo } from "../ui/google-icon";
import { GithubLogo } from "../ui/github-icon";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export function AuthForm({ type }: { type: "login" | "register" }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formSchema = z.object({
    name:
      type === "register"
        ? z.string().min(2, { message: "Name must be at least 2 characters." })
        : z.string().optional(),
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
  });

  type AuthFormSchema = z.infer<typeof formSchema>;

  const form = useForm<AuthFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: AuthFormSchema) => {
    setIsLoading(true);

    try {
      const payload =
        type === "register"
          ? values
          : { email: values.email, password: values.password };

      const endpoint =
        type === "register" ? "/api/auth/register" : "/api/auth/login";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      if (type === "register") {
        toast.success("Please check your email to verify your account.");
        router.push("/auth/login");
      } else {
        toast.success("Login successful!");
        router.push("/");
        router.refresh();
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    await signIn(provider);
  };

  return (
    <div className="space-y-6 w-full sm:w-[350px]">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {type === "login" ? "Welcome back" : "Create an account"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {type === "login"
            ? "Enter your credentials to sign in"
            : "Enter your information to create an account"}
        </p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {type === "register" && (
          <div>
            <Input
              {...form.register("name")}
              placeholder="Name"
              disabled={isLoading}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
        )}
        <div>
          <Input
            {...form.register("email")}
            type="email"
            placeholder="Email"
            disabled={isLoading}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
        <div>
          <Input
            {...form.register("password")}
            type="password"
            placeholder="Password"
            disabled={isLoading}
          />
          {form.formState.errors.password && (
            <p className="text-sm text-red-500">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>
        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {type === "login" ? "Log In" : "Register"}
        </Button>
      </form>
      <div className="flex flex-col space-y-2">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleSocialLogin("google")}
        >
          <GoogleLogo className="w-6 h-6 mr-2" />
          Continue with Google
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleSocialLogin("github")}
        >
          <GithubLogo className="w-6 h-6 mr-2" />
          Continue with GitHub
        </Button>
      </div>
      {type === "login" && (
        <Button
          variant="link"
          className="w-full"
          onClick={() => router.push("/auth/forgot-password")}
        >
          Forgot password?
        </Button>
      )}
      <p className="text-center text-sm text-muted-foreground">
        {type === "login" ? (
          <>
            Don’t have an account?{" "}
            <span
              onClick={() => router.push("/auth/register")}
              className="underline cursor-pointer text-primary"
            >
              Register
            </span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span
              onClick={() => router.push("/auth/login")}
              className="underline cursor-pointer text-primary"
            >
              Login
            </span>
          </>
        )}
      </p>
    </div>
  );
}
