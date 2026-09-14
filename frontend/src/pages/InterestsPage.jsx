import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import interestsArt from '@/assets/interests-art.jpg';

const AVAILABLE_INTERESTS = [
  'Design',
  'Development',
  'Marketing',
  'Photography',
  'Business',
  'Analytics',
  'Writing',
  'Music',
];

// Validation schema enforcing at least one selected skill
const interestsSchema = z.object({
  interests: z
    .array(z.string())
    .min(1, 'Please select at least one interest to continue'),
});

export default function InterestsPage() {
  const navigate = useNavigate();
  // 1. Initialized with an empty array so nothing is selected at start
  const [selectedInterests, setSelectedInterests] = useState([]);

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(interestsSchema),
    defaultValues: {
      interests: [],
    },
  });

  const toggleInterest = (interest) => {
    const updated = selectedInterests.includes(interest)
      ? selectedInterests.filter((item) => item !== interest)
      : [...selectedInterests, interest];

    setSelectedInterests(updated);
    // Update react-hook-form value and trigger validation state
    setValue('interests', updated, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    console.log('User Interests payload:', data.interests);
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#EAEBED] p-4">
      {/* Outer Card */}
      <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">
        
        {/* Left Interactive Selection Column */}
        <div className="flex w-full flex-col justify-center px-8 py-8 sm:px-12 md:w-[52%] lg:px-14">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              Choose Your Interests
            </h1>
            <p className="mt-1.5 text-xs font-medium text-neutral-500">
              Select topics to personalize your dashboard feed.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Tag / Pill Grid */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2.5">
                {AVAILABLE_INTERESTS.map((interest) => {
                  const isSelected = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`rounded-full px-5 py-2 text-xs font-semibold transition-all duration-150 cursor-pointer select-none active:scale-95 ${
                        isSelected
                          ? 'bg-black text-white shadow-sm hover:bg-neutral-800'
                          : 'bg-[#F2F2F2] text-neutral-800 hover:bg-neutral-200'
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>

              {/* Error displayed when Continue is clicked without selection */}
              {errors.interests && (
                <span className="text-[11px] font-medium text-red-600 mt-1">
                  {errors.interests.message}
                </span>
              )}
            </div>

            <Button type="submit" loading={isSubmitting}>
              Continue
            </Button>
          </form>
        </div>

        {/* Right Art Panel */}
        <div className="relative hidden md:block md:w-[48%] p-3">
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
            <img
              src={interestsArt}
              alt="Magnifying Glass Exploration Visual"
              className="h-full w-full object-cover object-center select-none"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </div>
  );
}