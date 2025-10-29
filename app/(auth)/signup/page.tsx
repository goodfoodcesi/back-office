"use client";

import { useState } from "react";
import { useActionState } from "react";
import {
  MultiStepForm,
  InputText,
  InputEmail,
  InputPassword,
  InputFile,
} from "@goodfoodcesi/goodfood-ui";

export default function OnboardingPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    shopName: "",
    postalCode: "",
    city: "",
    lat: "",
    long: "",
    siret: "",
    kbis: "",
    idCard: "",
  });

  const [state, formAction, pending] = useActionState(
    async (_prev, formData) => {
      console.log(
        "🎯 Données envoyées :",
        Object.fromEntries(formData.entries())
      );
      return { success: true };
    },
    null
  );

  const onBeforeNext = (currentStep: number) => {
    if (currentStep === 0) {
      // if (!formData.username || formData.username.length < 2) {
      //   alert("Nom trop court");
      //   return false;
      // }
      // if (!formData.email.includes("@")) {
      //   alert("Email invalide");
      //   return false;
      // }
    }

    if (currentStep === 1) {
      // if (formData.password.length < 6) {
      //   alert("Mot de passe trop court");
      //   return false;
      // }
      // if (formData.password !== formData.confirm) {
      //   alert("Les mots de passe ne correspondent pas");
      //   return false;
      // }
    }

    return true;
  };

  const onFinish = () => {
    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      fd.append(key, value as string)
    );

    console.log(
      "📦 FormData prête à l’envoi :",
      Object.fromEntries(fd.entries())
    );

    formAction(fd);
  };

  return (
    <div className=" mx-auto p-8 space-y-6">
      <form action={formAction} onSubmit={(e) => e.preventDefault()}>
        <MultiStepForm
          onBeforeNext={onBeforeNext}
          onFinish={onFinish}
          showDefaultActions
          renderHeader={({ step }) => {
            const titles = [
              "01. Parlez-nous de vous",
              "02. Votre établissement",
              "03. Vos documents administratifs",
              "04. Confirmation",
            ];
            const subtitles = [
              "Créez votre compte personnel pour accéder à la plateforme.",
              "Renseignez les informations de votre restaurant.",
              "Ajoutez les justificatifs nécessaires à la validation.",
              "Vérifiez vos informations avant de terminer.",
            ];

            return (
              <div className="mb-6 space-y-1">
                <h1 className="text-2xl font-bold text-left">{titles[step]}</h1>
                <p className="text-gray-500 text-sm">{subtitles[step]}</p>
              </div>
            );
          }}
        >
          <MultiStepForm.Step>
            <div className="w-full flex items-start gap-4">
              <InputText
                label="Nom"
                value={formData.username}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, username: e.target.value }))
                }
              />
              <InputText
                label="Prénom"
                value={formData.username}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, username: e.target.value }))
                }
              />
            </div>

            <InputEmail
              label="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />

            <InputPassword
              label="mot de passe"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
            />

            <InputPassword
              label="Confirmation du mot de passe"
              value={formData.confirm}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, confirm: e.target.value }))
              }
            />
          </MultiStepForm.Step>

          <MultiStepForm.Step>
            <InputText
              label="N° SIRET"
              value={formData.siret}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, siret: e.target.value }))
              }
            />
            <InputText
              label="Nom de votre restaurant"
              value={formData.shopName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, shopName: e.target.value }))
              }
            />
            <InputText
              label="Adresse"
              value={formData.shopName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, shopName: e.target.value }))
              }
            />
            <div className="flex items-center justify-center gap-4">
              <InputText
                label="Code postal"
                value={formData.postalCode}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    postalCode: e.target.value,
                  }))
                }
              />
              <InputText
                label="Ville"
                value={formData.city}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, city: e.target.value }))
                }
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <InputText
                label="Latitude"
                value={formData.lat}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    lat: e.target.value,
                  }))
                }
              />
              <InputText
                label="Longitude"
                value={formData.long}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, long: e.target.value }))
                }
              />
            </div>
          </MultiStepForm.Step>
          <MultiStepForm.Step>
            <InputFile
              label="KBIS"
              value={formData.kbis}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, kbis: e.target.value }))
              }
            />
            <InputFile
              label="Carte d'identité"
              value={formData.idCard}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, idCard: e.target.value }))
              }
            />
          </MultiStepForm.Step>

          <MultiStepForm.Step>
            {pending ? (
              <p className="text-center text-gray-500">Envoi en cours...</p>
            ) : state?.success ? (
              <p className="text-center text-green-600">
                🎉 Formulaire terminé avec succès !
              </p>
            ) : (
              <p className="text-center text-gray-500">
                Vérifie tes informations avant de terminer.
              </p>
            )}
          </MultiStepForm.Step>
        </MultiStepForm>
      </form>
    </div>
  );
}
