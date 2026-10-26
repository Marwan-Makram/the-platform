import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
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
  'Product Strategy',
  'Architecture',
];

const interestsSchema = z.object({
  interests: z
    .array(z.string())
    .min(1, 'Please select at least one interest to continue'),
});

export default function InterestsPage() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const [selectedInterests, setSelectedInterests] = useState(
    user?.interests?.length ? user.interests : ['Design', 'Development', 'Business']
  );

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(interestsSchema),
    defaultValues: {
      interests: selectedInterests,
    },
  });

  const toggleInterest = (interest) => {
    const updated = selectedInterests.includes(interest)
      ? selectedInterests.filter((item) => item !== interest)
      : [...selectedInterests, interest];
    setSelectedInterests(updated);
    setValue('interests', updated, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    updateUser({ interests: data.interests });
    navigate('/success');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#EAEBEC] px-4 sm:px-6 py-6 sm:py-8 lg:py-10 font-poppins selection:bg-[#253C6D] selection:text-white">
      {/* Shadow Box: Responsive on Mobile, Tablet & Desktop */}
      <div className="relative flex w-full max-w-[440px] md:max-w-[720px] lg:max-w-[1033px] min-h-0 md:min-h-[560px] lg:min-h-[748px] rounded-[16px] md:rounded-[12px] bg-white p-5 sm:p-6 md:p-6 lg:p-10 shadow-[3px_15px_24px_rgba(0,0,0,0.12)] justify-between items-center gap-6 lg:gap-10 transition-all">
        {/* Form Column: Frame adapts fluidly on tablet */}
        <div className="flex w-full flex-col justify-center flex-1 min-w-0 max-w-[404px] z-10 mx-auto md:mx-0 space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="space-y-2 sm:space-y-3">
            <h1 className="font-poppins font-semibold text-[26px] sm:text-[30px] lg:text-[32px] leading-[36px] sm:leading-[42px] lg:leading-[48px] text-[#16213E]">
              Choose Your Interests
            </h1>
            <p className="font-poppins font-normal text-[13px] sm:text-[15px] leading-[20px] sm:leading-[22px] text-[#455B8A]">
              Select topics to personalize your dashboard feed and workspace modules.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
            {/* Chips Container */}
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2 md:gap-2.5">
                {AVAILABLE_INTERESTS.map((interest) => {
                  const isSelected = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`h-[36px] sm:h-[40px] px-3 sm:px-[16px] py-[6px] sm:py-[10px] rounded-[30px] border border-[#A9B7D6] font-poppins font-medium text-[12px] sm:text-[13px] leading-[20px] transition-all cursor-pointer select-none active:scale-95 ${
                        isSelected
                          ? 'bg-[#253C6D] text-[#F6F4EF] shadow-xs'
                          : 'bg-[#E4E9F3] text-[#455B8A] hover:bg-[#d8e0ee]'
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>

              {errors.interests && (
                <span className="text-[11px] font-medium text-red-600 block mt-1">
                  {errors.interests.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full max-w-[404px] h-[44px] sm:h-[40px] bg-[#253C6D] hover:bg-[#1d3058] text-white rounded-[12px] font-inter font-medium text-[14px] leading-[25px] flex items-center justify-center transition-colors cursor-pointer shadow-sm active:scale-[0.99] disabled:opacity-70"
            >
              {isSubmitting ? 'Saving...' : 'Continue'}
            </button>
          </form>
        </div>

        {/* Right Panel Graphic: Proportional on Tablet and Desktop */}
        <div className="hidden md:block w-[260px] lg:w-[419px] h-[500px] lg:h-[699px] rounded-[8px] overflow-hidden relative shadow-md shrink-0 transition-all">
          <div
            className="absolute inset-0 bg-cover bg-center select-none"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${interestsArt})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}