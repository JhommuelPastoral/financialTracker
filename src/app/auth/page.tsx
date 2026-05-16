"use client";
import { Button } from "@/components/ui/button"
import { ChartNoAxesColumn } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import { signIn } from "next-auth/react"

export default function Login() {
  return (
    <div className="w-full h-dvh flex items-center justify-center ">
      <Card className="max-w-md w-full bg-none shadow-none ring-0">
        <CardHeader className="w-full flex items-center justify-center flex-col">
          <ChartNoAxesColumn size={30}/>
          <CardTitle>Welcome to Zentra.</CardTitle>
          <CardDescription className="text-center ">
            Sign in to your account to continue to Zentra.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button className="w-full flex items-center gap-3 font-bold" onClick={() => signIn("google", {redirectTo: "/dashboard"})}>
            <Image src="https://thesvg.org/icons/google/default.svg" alt="google" width={20} height={20}/>
            <p>Sign in with Google</p>
          </Button>
          <Button className="w-full" onClick={() => signIn("github", {redirectTo: "/dashboard"})}>
            <Image src="https://thesvg.org/icons/github/dark.svg" alt="github" width={20} height={20}/>
            <p>Sign in with GitHub</p>
          </Button>
        </CardContent>
        <CardFooter className="flex items-center justify-center text-center p-2">
          By clicking continue, you agree to our Terms of Service and Privacy Policy.
        </CardFooter>
      </Card>
    </div>
  );
}