"use client";
import { InputEmail, GoodFoodButton, Logo } from "@goodfoodcesi/goodfood-ui";
import { NextURL } from "next/dist/server/web/next-url";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

type ErrorLoginForm = {
  code: string | undefined;
  message: string | undefined;
};

export default function LoginPage() {
  const [errors, setErrors] = useState({ email: "", password: "", other: "" });

  const handleErrors = ({ code, message }: ErrorLoginForm) => {
    if (code && message) {
      if (code === "INVALID_EMAIL") {
        setErrors((prevState) => ({
          ...prevState,
          email: message,
        }));
      } else if (code === "INVALID_PASSWORD") {
        setErrors((prevState) => ({
          ...prevState,
          password: message,
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          other: message,
        }));
      }
    }
  };

  const login = async (form: FormData) => {
    const email = form.get("email") ?? "";
    const password = form.get("password") ?? "";
    console.log("check");
    const { data, error } = await authClient.signIn.email({
      email: email as string,
      password: password as string,
    });

    if (error) {
      const { code, message } = error;
      handleErrors({ code, message });
    }

    if (data) {
      console.log("c'est passer: ", data);
    }
  };

  const handleResetError = (key: string) => {
    setErrors((prevState) => ({
      ...prevState,
      [key]: "",
    }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left">
        <div className="flex justify-center items-center">
          <Logo width={64} height={64} theme="dark" variant="2" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Bienvenue</h2>
        <p className="mt-2 text-gray-600">
          Accédez à votre espace administrateur
        </p>
      </div>

      <form className="space-y-4" action={login}>
        <div>
          <InputEmail
            label="Email"
            placeholder="test@test.com"
            onChange={() => handleResetError("email")}
          />

          {errors.email ? (
            <span className=" text-red-600 p-2">
              {errors.email ? errors.email : null}
            </span>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            placeholder="••••••••"
            onChange={() => handleResetError("password")}
          />
          <span>{errors.password ? errors.password : null} </span>
        </div>

        <GoodFoodButton variant="solid" color="alt" className="w-full">
          Sign in
        </GoodFoodButton>
      </form>

      <div className="w-full h-[1px] bg-[var(--color-gray-200)]"></div>

      <p className="text-center text-sm text-gray-600">
        Vous ne possédez pas de compte ?{" "}
        <Link className="text-black font-medium underline" href="/signup">
          {"S'inscrire"}
        </Link>
      </p>
    </div>
  );
}
