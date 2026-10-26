import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import authArt from '@/assets/auth-art.jpg';

const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the terms & policy' }),
  }),
});

export default function SignUpPage() {
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      terms: false,
    },
  });

  const onSubmit = async (data) => {
    updateUser({ name: data.name, email: data.email });
    navigate('/verify-email');
  };

  const handleSocialAuth = (provider) => {
    updateUser({ name: `${provider} User`, email: `user@${provider.toLowerCase()}.com` });
    navigate('/welcome-back');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#EAEBEC] px-4 sm:px-6 py-6 sm:py-8 lg:py-10 font-poppins selection:bg-[#253C6D] selection:text-white">
      {/* Shadow Box: Responsive on Mobile, Tablet (768px-1024px) & Desktop */}
      <div className="relative flex w-full max-w-[440px] md:max-w-[720px] lg:max-w-[1033px] min-h-0 md:min-h-[560px] lg:min-h-[748px] rounded-[16px] md:rounded-[12px] bg-white p-5 sm:p-6 md:p-6 lg:p-10 shadow-[3px_15px_24px_rgba(0,0,0,0.12)] justify-between items-center gap-6 lg:gap-10 transition-all">
        {/* Left Form: Frame 57 (adapts fluidly on tablet) */}
        <div className="flex w-full flex-col justify-center flex-1 min-w-0 max-w-[404px] z-10 mx-auto md:mx-0">
          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <h1 className="font-poppins font-medium text-[26px] sm:text-[30px] lg:text-[32px] leading-[36px] sm:leading-[42px] lg:leading-[48px] text-[#253C6D]">
              Get Started Now
            </h1>
            <p className="font-poppins font-medium text-[14px] sm:text-[15px] lg:text-[16px] leading-[22px] sm:leading-[24px] text-[#16213E] mt-0.5">
              New here ? No problem.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
            {/* Name Input */}
            <div className="space-y-1">
              <label className="block font-poppins font-medium text-[13px] sm:text-[14px] leading-[21px] text-[#16213E]">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                {...register('name')}
                className={`w-full h-[36px] sm:h-[32px] rounded-[10px] border px-[10px] font-poppins font-medium text-[12px] placeholder:text-[#455B8A] placeholder:text-[11px] sm:placeholder:text-[10px] text-[#16213E] focus:outline-none transition-all ${
                  errors.name
                    ? 'border-red-500 ring-1 ring-red-200'
                    : 'border-[#A9B7D6] focus:border-[#253C6D]'
                }`}
              />
              {errors.name && (
                <span className="text-[10px] font-medium text-red-600 block">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label className="block font-poppins font-medium text-[13px] sm:text-[14px] leading-[21px] text-[#16213E]">
                Email address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register('email')}
                className={`w-full h-[36px] sm:h-[32px] rounded-[10px] border px-[10px] font-poppins font-medium text-[12px] placeholder:text-[#455B8A] placeholder:text-[11px] sm:placeholder:text-[10px] text-[#16213E] focus:outline-none transition-all ${
                  errors.email
                    ? 'border-red-500 ring-1 ring-red-200'
                    : 'border-[#A9B7D6] focus:border-[#253C6D]'
                }`}
              />
              {errors.email && (
                <span className="text-[10px] font-medium text-red-600 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label className="block font-poppins font-medium text-[13px] sm:text-[14px] leading-[21px] text-[#16213E]">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register('password')}
                className={`w-full h-[36px] sm:h-[32px] rounded-[10px] border px-[10px] font-poppins font-medium text-[12px] placeholder:text-[#455B8A] placeholder:text-[11px] sm:placeholder:text-[10px] text-[#16213E] focus:outline-none transition-all ${
                  errors.password
                    ? 'border-red-500 ring-1 ring-red-200'
                    : 'border-[#A9B7D6] focus:border-[#253C6D]'
                }`}
              />
              {errors.password && (
                <span className="text-[10px] font-medium text-red-600 block">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Checkbox Group */}
            <div className="flex items-center gap-2 pt-1">
              <input
                id="terms"
                type="checkbox"
                {...register('terms')}
                className="w-[14px] h-[14px] sm:w-[12px] sm:h-[12px] rounded-[2px] border border-[#A9B7D6] text-[#253C6D] focus:ring-0 cursor-pointer"
              />
              <label
                htmlFor="terms"
                className="font-poppins font-medium text-[11px] sm:text-[9px] leading-[14px] text-[#16213E] cursor-pointer select-none"
              >
                I agree to the terms & policy
              </label>
            </div>
            {errors.terms && (
              <span className="text-[10px] font-medium text-red-600 block">
                {errors.terms.message}
              </span>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full max-w-[403px] h-[46px] sm:h-[49px] bg-[#253C6D] hover:bg-[#1d3058] text-white rounded-[12px] font-inter font-medium text-[14px] leading-[25px] flex items-center justify-center transition-colors cursor-pointer shadow-sm active:scale-[0.99] disabled:opacity-70 mt-2"
            >
              {isSubmitting ? 'Signing up...' : 'Sign up'}
            </button>
          </form>

          {/* Divider: Line 2 with #F6F4EF and Or badge */}
          <div className="relative my-3.5 sm:my-4 flex items-center justify-center">
            <div className="w-full border-t-2 border-[#F6F4EF]" />
            <div className="absolute bg-[#F6F4EF] px-[8px] py-[1px] rounded">
              <span className="font-poppins font-medium text-[9px] leading-[14px] text-[#16213E]">
                Or
              </span>
            </div>
          </div>

          {/* Social OAuth Buttons */}
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            {/* Google */}
            <button
              type="button"
              onClick={() => handleSocialAuth('Google')}
              className="flex-1 min-w-0 max-w-[190px] h-[36px] sm:h-[32px] border border-[#D9D9D9] hover:border-neutral-400 rounded-[10px] px-2 sm:px-[10px] py-[4px] flex items-center justify-center gap-1.5 sm:gap-[6px] font-poppins font-medium text-[11px] sm:text-[12px] leading-[18px] text-black bg-white hover:bg-neutral-50 transition-colors cursor-pointer shrink-0"
            >
              <svg className="w-[15px] h-[15px] sm:w-[16px] sm:h-[16px] shrink-0" viewBox="0 0 24 24">
                <path fill="#FFC107" d="M4.36 12.04c0-.72.12-1.41.34-2.06L1.13 7.37C.41 8.79 0 10.37 0 12.04s.41 3.25 1.13 4.67l3.57-2.61c-.22-.65-.34-1.34-.34-2.06z" />
                <path fill="#FF3D00" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.17 0 12 0 7.39 0 3.44 2.61 1.47 6.42l3.57 2.61c.95-2.85 3.65-4.88 6.96-4.88z" />
                <path fill="#4CAF50" d="M12 24c3.24 0 6.07-1.12 8.09-3.05l-3.56-2.73c-1.12.75-2.55 1.2-4.53 1.2-3.31 0-6.01-2.03-6.96-4.88L1.47 17.15C3.44 20.96 7.39 24 12 24z" />
                <path fill="#1976D2" d="M23.74 12.27c0-.82-.07-1.61-.21-2.37H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66l3.56 2.73c2.08-1.92 3.98-5.11 3.98-8.53z" />
              </svg>
              <span className="truncate">Sign in with Google</span>
            </button>

            {/* Apple */}
            <button
              type="button"
              onClick={() => handleSocialAuth('Apple')}
              className="flex-1 min-w-0 max-w-[190px] h-[36px] sm:h-[32px] border border-[#A9B7D6] hover:border-[#253C6D] rounded-[10px] px-2 sm:px-[10px] py-[4px] flex items-center justify-center gap-1.5 sm:gap-[6px] font-poppins font-medium text-[11px] sm:text-[12px] leading-[18px] text-[#16213E] bg-white hover:bg-neutral-50 transition-colors cursor-pointer shrink-0"
            >
              <svg className="w-[14px] h-[14px] sm:w-[15px] sm:h-[15px] shrink-0 fill-current text-black" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 1.01-2.87-.96.04-2.13.64-2.79 1.41-.58.68-1.1 1.75-.97 2.8 1.08.08 2.13-.59 2.75-1.34z" />
              </svg>
              <span className="truncate">Sign in with Apple</span>
            </button>
          </div>

          {/* Switch to Sign In */}
          <div className="mt-4 sm:mt-6 text-center">
            <span className="font-poppins font-medium text-[13px] sm:text-[14px] leading-[21px] text-black">
              Have an account?{' '}
            </span>
            <Link
              to="/login"
              className="font-poppins font-medium text-[13px] sm:text-[14px] leading-[21px] text-[#253C6D] hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Right Panel Graphic: Proportional on Tablet (260x500) and Desktop (419x699) */}
        <div className="hidden md:block w-[260px] lg:w-[419px] h-[500px] lg:h-[699px] rounded-[8px] overflow-hidden relative shadow-md shrink-0 transition-all">
          <div
            className="absolute inset-0 bg-cover bg-center select-none"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${authArt})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}