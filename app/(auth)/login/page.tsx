"use client";

import React from "react";
import { InputEmail, GoodFoodButton, Logo } from "@goodfoodcesi/goodfood-ui";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const [error, setError] = React.useState<string | undefined>();
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(undefined);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const { data, error: loginError } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/redirect",
    });

    if (loginError) {
      setError(loginError.message ?? "Identifiants invalides.");
      setLoading(false);
      return;
    }

    // Better-Auth redirige automatiquement vers callbackURL
  }

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

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <InputEmail name="email" label="Email" placeholder="test@test.com" />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>

          <input
            name="password"
            id="password"
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            placeholder="••••••••"
          />
        </div>

        <GoodFoodButton
          type="submit"
          variant="solid"
          color="alt"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Connexion..." : "Sign in"}
        </GoodFoodButton>
      </form>

      {error && <span className="text-red-600 p-2">{error}</span>}

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