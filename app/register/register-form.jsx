"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/lib/apis/server";
import { signUp } from "@/lib/auth-client";

const DEFAULT_ERROR = {
  error: false,
  message: "",
};

// Keep this as a client component (functional component)
export default function RegisterForm() {
  const [error, setError] = useState(DEFAULT_ERROR);
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const formData = new FormData(event?.currentTarget);
    const name = formData.get("name").toString();
    const email = formData.get("email").toString();
    const password = formData.get("password") ?? "";
    const confirmPassword = formData.get("confirm-password") ?? "";
    // Basic frontend validation logic
    // if (name && email && password && confirmPassword) {
    try {
      if (password === confirmPassword) {
        setError(DEFAULT_ERROR);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
        const nameRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces
        const passwordValidation = {
          minLength: 8,
          uppercase: /[A-Z]/,
          lowercase: /[a-z]/,
          number: /[0-9]/,
          specialCharacter: /[@$!%*?&]/,
        };

        // setLoading(true);
        // Name Validation
        if (!name) {
          setError({ error: true, message: "Name is required." });
          return;
        }
        if (!nameRegex.test(name)) {
          setError({
            error: true,
            message: "Name can only contain letters and spaces.",
          });
          return;
        }
        // Email Validation
        if (!email) {
          setError({ error: true, message: "Email is required." });
          return;
        }
        if (!emailRegex.test(email)) {
          setError({ error: true, message: "Invalid email format." });
          return;
        }
        // Password Validation
        if (confirmPassword !== null && password !== confirmPassword) {
          setError({ error: true, message: "Passwords do not match." });
          return;
        }
        if (password.length < passwordValidation.minLength) {
          setError({
            error: true,
            message: `Password must be at least ${passwordValidation.minLength} characters long.`,
          });
          return;
        }
        if (!passwordValidation.uppercase.test(password)) {
          setError({
            error: true,
            message: "Password must contain at least one uppercase letter.",
          });
          return;
        }

        if (!passwordValidation.lowercase.test(password)) {
          setError({
            error: true,
            message: "Password must contain at least one lowercase letter.",
          });
          return;
        }
        if (!passwordValidation.number.test(password)) {
          setError({
            error: true,
            message: "Password must contain at least one number.",
          });
          return;
        }
        if (!passwordValidation.specialCharacter.test(password)) {
          setError({
            error: true,
            message:
              "Password must contain at least one special character (@, $, !, %, *, ?, &).",
          });
          return;
        }
        console.log("All validations passed"); // If all validations pass
        setLoading(true);
        const { data, error } = await signUp.email(
          {
            email: email,
            password: password,
            name: name,
            image: undefined,
          },
          {
            onRequest: () => {
              // console.log("onRequest", ctx);
            },
            onSuccess: (ctx) => {
              console.log("onSuccess", ctx);
              setLoading(false);
              toast({
                variant: "success",
                title: "Account created",
                description: "Your account has been successfully created.",
                action: (
                  <ToastAction
                    className="bg-green-600 hover:bg-green-600/90"
                    altText="Close"
                  >
                    <Link href={"/login"}>Login</Link>
                  </ToastAction>
                ),
              });

              formElement.reset(); // Reset the form
            },
            onError: (ctx) => {
              if (ctx) {
                setError({ error: true, message: ctx.error.message });
                setLoading(false);
              }
            },
          }
        );
        if (data) {
          console.log("data", data);
        }
      } else {
        setError({ error: true, message: "Passwords doesn't match" });
      }
    } catch (error) {
      console.log("ERROR:: ", error);
    }
    // }
    // console.log("Error!", error);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="bg-blue-50/90 w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Create an account</CardTitle>
          <CardDescription className="text-xs text-center">
            Enter your information to get started
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmitForm}>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="John Doe" />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter new password"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  placeholder="Enter password again to confirm"
                />
              </div>

              {/* form errors */}
              <div className="flex justify-center">
                {error?.error && (
                  <span className="text-red-600 text-xs text-center animate-pulse duration-1000">
                    {error.message}
                  </span>
                )}
              </div>

              <div className="flex justify-center gap-1 text-xs">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center">
            <Button className="flex-1" type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="animate-spin" />}
              Register
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
