"use client"
import {InputEmail, GoodFoodButton, Logo} from "@goodfoodcesi/goodfood-ui"

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left">
        <div className="flex justify-center items-center">
         <Logo width={128} height={128} theme="dark" variant={2} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
        <p className="mt-2 text-gray-600">Sign in to your account</p>
      </div>

      <form className="space-y-4">
        <div>
          <InputEmail label="Email" placeholder="test@test.com"/>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            placeholder="••••••••"
          />
        </div>

        {/* <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <a href="#" className="text-sm text-black hover:underline">
            Forgot password?
          </a>
        </div> */}
        <GoodFoodButton variable="solid" color="alt" className="w-full">Sign in</GoodFoodButton>
      </form>

      <p className="text-center text-sm text-gray-600">
        Vous ne possédez pas de compte ? {' '}
        <a href="/signup" className="text-black font-medium underline">
          S'inscrire
        </a>
      </p>
    </div>
  );
}