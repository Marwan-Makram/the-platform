import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import successArt from '@/assets/success-art.jpg';

export default function SuccessPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#EAEBEC] px-4 sm:px-6 py-6 sm:py-8 lg:py-10 font-poppins selection:bg-[#253C6D] selection:text-white">
      {/* Shadow Box: Responsive on Mobile, Tablet & Desktop */}
      <div className="relative flex w-full max-w-[440px] md:max-w-[720px] lg:max-w-[1033px] min-h-0 md:min-h-[560px] lg:min-h-[748px] rounded-[16px] md:rounded-[12px] bg-white p-5 sm:p-6 md:p-6 lg:p-10 shadow-[3px_15px_24px_rgba(0,0,0,0.12)] justify-between items-center gap-6 lg:gap-10 transition-all">
        {/* Form Column: Frame adapts fluidly on tablet */}
        <div className="flex w-full flex-col justify-center flex-1 min-w-0 max-w-[404px] z-10 mx-auto md:mx-0 space-y-6 sm:space-y-10">
          {/* Header */}
          <div className="space-y-2 sm:space-y-3">
            <h1 className="font-poppins font-semibold text-[26px] sm:text-[30px] lg:text-[32px] leading-[36px] sm:leading-[42px] lg:leading-[48px] text-[#16213E]">
              You&apos;re All Set{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!
            </h1>
            <p className="font-poppins font-normal text-[13px] sm:text-[15px] leading-[20px] sm:leading-[22px] text-[#455B8A]">
              Your account has been fully configured and verified. Welcome aboard to The Platform.
            </p>
          </div>

          {/* Success Circle */}
          <div className="flex items-center justify-center py-2 sm:py-4">
            <div className="flex h-[90px] w-[90px] sm:h-[105px] sm:w-[105px] lg:h-[120px] lg:w-[120px] items-center justify-center rounded-full border-[3px] border-[#A9B7D6] bg-[#F6F4EF] shadow-xs transition-transform hover:scale-105">
              <Check className="h-[32px] w-[32px] sm:h-[38px] sm:w-[38px] lg:h-[44px] lg:w-[44px] stroke-[2.5] text-[#253C6D]" />
            </div>
          </div>

          {/* Button */}
          <div>
            <button
              type="button"
              onClick={handleGoToDashboard}
              className="w-full max-w-[404px] h-[44px] sm:h-[40px] bg-[#253C6D] hover:bg-[#1d3058] text-white rounded-[12px] font-inter font-medium text-[14px] leading-[25px] flex items-center justify-center transition-colors cursor-pointer shadow-sm active:scale-[0.99]"
            >
              Go to Dashboard
            </button>
          </div>
        </div>

        {/* Right Panel Graphic: Proportional on Tablet and Desktop */}
        <div className="hidden md:block w-[260px] lg:w-[419px] h-[500px] lg:h-[699px] rounded-[8px] overflow-hidden relative shadow-md shrink-0 transition-all">
          <div
            className="absolute inset-0 bg-cover bg-center select-none"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${successArt})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}