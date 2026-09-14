import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import authArt from '@/assets/auth-art.jpg';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    console.log('Login credentials payload:', data);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#EAEBED] p-4">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">
        
        {/* Left Form Section */}
        <div className="flex w-full flex-col justify-center px-8 py-6 sm:px-12 md:w-[52%] lg:px-14">
          <div className="mb-5">
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              Let’s get you back on track
            </h1>
            <p className="mt-1 text-xs font-medium text-neutral-500">
              Enter your Credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <Input
              label="Email address"
              type="email"
              placeholder="Enter your email"
              {...register('email')}
              error={errors.email}
            />

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-neutral-800">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  forgot password
                </Link>
              </div>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className={`w-full rounded-lg border bg-white px-3.5 py-2.5 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.password
                      ? 'border-red-500 focus:ring-red-200'
                      : 'border-neutral-200 focus:border-neutral-900 focus:ring-neutral-200'
                  }`}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 text-neutral-400 hover:text-neutral-600 focus:outline-none cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-[11px] font-medium text-red-600">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Remember for 30 days */}
            <div className="flex items-center gap-2 pt-0.5">
              <input
                id="rememberMe"
                type="checkbox"
                {...register('rememberMe')}
                className="h-3.5 w-3.5 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 cursor-pointer"
              />
              <label
                htmlFor="rememberMe"
                className="text-[11px] font-medium text-neutral-700 select-none cursor-pointer"
              >
                Remember for 30 days
              </label>
            </div>

            <Button type="submit" loading={isSubmitting} className="mt-1">
              Login
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-semibold">
              <span className="bg-white px-3 text-neutral-400">Or</span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              type="button"
              className="py-2.5 px-3 text-xs whitespace-nowrap gap-2 font-medium"
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
                />
              </svg>
              <span>Sign in with Google</span>
            </Button>

            <Button
              variant="outline"
              type="button"
              className="py-2.5 px-3 text-xs whitespace-nowrap gap-2 font-medium"
            >
              <svg className="h-4 w-4 shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 1.01-2.87-.96.04-2.13.64-2.79 1.41-.58.68-1.1 1.75-.97 2.8 1.08.08 2.13-.59 2.75-1.34z" />
              </svg>
              <span>Sign in with Apple</span>
            </Button>
          </div>

          {/* Switch to SignUp */}
          <p className="mt-5 text-center text-xs font-medium text-neutral-600">
            Don’t have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Right Art Panel */}
        <div className="relative hidden md:block md:w-[48%] p-3">
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
            <img
              src={authArt}
              alt="Monochrome Architectural Art"
              className="h-full w-full object-cover object-center select-none"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </div>
  );
}