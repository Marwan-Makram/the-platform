import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import profileArt from '@/assets/profile-art.jpg';

const profileSchema = z.object({
  phoneNumber: z
    .string()
    .min(7, 'Please enter a valid phone number')
    .regex(/^[+0-9\s\-()]+$/, 'Invalid phone number format'),
  dob: z
    .string()
    .min(1, 'Date of birth is required'),
  role: z
    .string()
    .min(2, 'Job title or role must be at least 2 characters'),
});

export default function CompleteProfilePage() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      phoneNumber: user?.phone || '',
      dob: user?.dob || '',
      role: user?.role || '',
    },
  });

  const onSubmit = async (data) => {
    updateUser({
      phone: data.phoneNumber,
      dob: data.dob,
      role: data.role,
    });
    navigate('/interests');
  };

  const handleSkip = () => {
    navigate('/interests');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#EAEBEC] px-4 sm:px-6 py-6 sm:py-8 lg:py-10 font-poppins selection:bg-[#253C6D] selection:text-white">
      {/* Shadow Box: Responsive on Mobile, Tablet & Desktop */}
      <div className="relative flex w-full max-w-[440px] md:max-w-[720px] lg:max-w-[1033px] min-h-0 md:min-h-[560px] lg:min-h-[748px] rounded-[16px] md:rounded-[12px] bg-white p-5 sm:p-6 md:p-6 lg:p-10 shadow-[3px_15px_24px_rgba(0,0,0,0.12)] justify-between items-center gap-6 lg:gap-10 transition-all">
        {/* Form Column: Frame adapts fluidly on tablet */}
        <div className="flex w-full flex-col justify-center flex-1 min-w-0 max-w-[404px] z-10 mx-auto md:mx-0 space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="space-y-1.5 sm:space-y-3">
            <h1 className="font-poppins font-semibold text-[26px] sm:text-[30px] lg:text-[32px] leading-[36px] sm:leading-[42px] lg:leading-[48px] text-[#16213E]">
              Complete Your Profile
            </h1>
            <p className="font-poppins font-normal text-[13px] sm:text-[15px] leading-[20px] sm:leading-[22px] text-[#455B8A]">
              Tell us a bit about yourself to tailor your experience.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
            {/* Phone Number */}
            <div className="space-y-1">
              <label className="block font-poppins font-medium text-[13px] sm:text-[14px] leading-[21px] text-[#16213E]">
                Phone number
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                {...register('phoneNumber')}
                className={`w-full h-[36px] sm:h-[32px] rounded-[10px] border px-[10px] font-poppins font-medium text-[12px] placeholder:text-[#455B8A] placeholder:text-[11px] sm:placeholder:text-[10px] text-[#16213E] focus:outline-none transition-all ${
                  errors.phoneNumber
                    ? 'border-red-500 ring-1 ring-red-200'
                    : 'border-[#A9B7D6] focus:border-[#253C6D]'
                }`}
              />
              {errors.phoneNumber && (
                <span className="text-[10px] font-medium text-red-600 block">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>

            {/* Date of Birth */}
            <div className="space-y-1">
              <label className="block font-poppins font-medium text-[13px] sm:text-[14px] leading-[21px] text-[#16213E]">
                Date of Birth
              </label>
              <input
                type="date"
                placeholder="mm-dd-yyyy"
                {...register('dob')}
                className={`w-full h-[36px] sm:h-[32px] rounded-[10px] border px-[10px] font-poppins font-medium text-[12px] placeholder:text-[#455B8A] placeholder:text-[11px] sm:placeholder:text-[10px] text-[#16213E] focus:outline-none transition-all ${
                  errors.dob
                    ? 'border-red-500 ring-1 ring-red-200'
                    : 'border-[#A9B7D6] focus:border-[#253C6D]'
                }`}
              />
              {errors.dob && (
                <span className="text-[10px] font-medium text-red-600 block">
                  {errors.dob.message}
                </span>
              )}
            </div>

            {/* Role / Job Title */}
            <div className="space-y-1">
              <label className="block font-poppins font-medium text-[13px] sm:text-[14px] leading-[21px] text-[#16213E]">
                Role / Job title
              </label>
              <input
                type="text"
                placeholder="Lead Product Designer"
                {...register('role')}
                className={`w-full h-[36px] sm:h-[32px] rounded-[10px] border px-[10px] font-poppins font-medium text-[12px] placeholder:text-[#455B8A] placeholder:text-[11px] sm:placeholder:text-[10px] text-[#16213E] focus:outline-none transition-all ${
                  errors.role
                    ? 'border-red-500 ring-1 ring-red-200'
                    : 'border-[#A9B7D6] focus:border-[#253C6D]'
                }`}
              />
              {errors.role && (
                <span className="text-[10px] font-medium text-red-600 block">
                  {errors.role.message}
                </span>
              )}
            </div>

            {/* Form Footer */}
            <div className="pt-1.5 sm:pt-2 space-y-3 sm:space-y-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full max-w-[404px] h-[44px] sm:h-[40px] bg-[#253C6D] hover:bg-[#1d3058] text-white rounded-[12px] font-inter font-medium text-[14px] leading-[25px] flex items-center justify-center transition-colors cursor-pointer shadow-sm active:scale-[0.99] disabled:opacity-70"
              >
                {isSubmitting ? 'Saving...' : 'Continue'}
              </button>

              <button
                type="button"
                onClick={handleSkip}
                className="w-full text-center font-poppins font-medium text-[13px] leading-[20px] text-[#455B8A] hover:text-[#16213E] transition-colors cursor-pointer block"
              >
                Skip for now
              </button>
            </div>
          </form>
        </div>

        {/* Right Panel Graphic: Proportional on Tablet and Desktop */}
        <div className="hidden md:block w-[260px] lg:w-[419px] h-[500px] lg:h-[699px] rounded-[8px] overflow-hidden relative shadow-md shrink-0 transition-all">
          <div
            className="absolute inset-0 bg-cover bg-center select-none"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${profileArt})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}