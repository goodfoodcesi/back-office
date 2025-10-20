"use client"
import {Logo} from "@goodfoodcesi/goodfood-ui"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side - Logo & Black Background (disparaît sur petit écran) */}
      <div className="  auth-side md:w-1/2 items-center justify-center">
        <div className="text-center">
          {/* Replace with your actual logo component or image */}
          <Logo theme="light" variant={3} />

          <h1 className="text-white text-2xl font-semibold">BACK-OFFICE</h1>
        </div>
      </div>

      {/* Right Side - Dynamic Content (prend tout l'écran sur mobile) */}
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}