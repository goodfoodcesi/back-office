"use client";
import { useActionState } from "react";
import { useFormState } from "react-dom";
type FormState = {
  error?: string;
  success?: boolean;
} | null;

async function handleFormAction(
  _: FormState,
  formData: FormData
): Promise<FormState> {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;

  if (!email.includes("@")) {
    return { error: "Email invalide", success: false };
  }

  console.log("Form data:", { username, email });
  return { success: true };
}

export default function OnboardingPage() {
  // const [state, formAction, pending] = useActionState<FormState>(
  //   async (prevState, formData) => {
  //     const username = formData.get("username") as string;
  //     const email = formData.get("email") as string;

  //     // 🧩 petite validation côté client/serveur
  //     if (!email.includes("@")) {
  //       return { error: "Email invalide", success: false };
  //     }

  //     // tu pourrais aussi faire un appel serveur ici
  //     console.log("Form data:", { username, email });
  //     return { success: true };
  //   },
  //   null
  // );

  const [state, formAction, pending] = useFormState(handleFormAction, null);

  return (
    <main className="max-w-md mx-auto p-8 space-y-4">
      <h1 className="text-2xl font-bold">Onboarding</h1>

      <form action={formAction} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          className="border rounded-md px-3 py-2 w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Adresse email"
          className="border rounded-md px-3 py-2 w-full"
        />

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-blue-600 text-white py-2 rounded-md"
        >
          {pending ? "Envoi..." : "Suivant"}
        </button>
      </form>

      {state?.error && <p className="text-red-500">{state.error}</p>}
      {state?.success && (
        <p className="text-green-500">✅ Inscription réussie !</p>
      )}
    </main>
  );
}
