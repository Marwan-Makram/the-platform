import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      phoneNumber: '',
      dob: '',
      role: '',
    },
  });

  const onSubmit = async (data) => {
    console.log('Complete Profile Payload:', data);
    // Future step: send to backend /api/users/profile, then navigate('/dashboard')
  };

  const handleSkip = () => {
    console.log('User skipped profile setup');
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#EAEBED] p-4">
      {/* Container Card */}
      <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">
        
        {/* Left Form Section */}
        <div className="flex w-full flex-col justify-center px-8 py-8 sm:px-12 md:w-[52%] lg:px-14">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              Complete Your Profile
            </h1>
            <p className="mt-1.5 text-xs font-medium text-neutral-500">
              Tell us a bit about yourself to tailor your experience.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Phone number"
              type="tel"
              placeholder="+1 (555) 000-0000"
              {...register('phoneNumber')}
              error={errors.phoneNumber}
            />

            <Input
              label="Date of Birth"
              type="date"
              placeholder="mm-dd-yyyy"
              {...register('dob')}
              error={errors.dob}
            />

            <Input
              label="Role / Job title"
              type="text"
              placeholder="Lead Product Designer"
              {...register('role')}
              error={errors.role}
            />

            <Button type="submit" loading={isSubmitting} className="mt-2">
              Continue
            </Button>
          </form>

          {/* Skip for now Action */}
          <p className="mt-6 text-center text-xs font-medium text-neutral-500">
            <button
              type="button"
              onClick={handleSkip}
              className="text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              Skip for now
            </button>
          </p>
        </div>

        {/* Right Art Panel */}
        <div className="relative hidden md:block md:w-[48%] p-3">
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
            <img
              src={profileArt}
              alt="Workspace and Stationery Art"
              className="h-full w-full object-cover object-center select-none"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </div>
  );
}