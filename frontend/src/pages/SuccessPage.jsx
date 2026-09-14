import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import successArt from '@/assets/success-art.jpg';

export default function SuccessPage() {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#EAEBED] p-4">
      {/* Outer Container Card */}
      <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">
        
        {/* Left Information & Confirmation Column */}
        <div className="flex w-full flex-col justify-center px-8 py-8 sm:px-12 md:w-[52%] lg:px-14">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              You're All Set!
            </h1>
            <p className="mt-1.5 text-xs font-medium text-neutral-500">
              Your account is verified and ready. Welcome aboard.
            </p>
          </div>

          {/* Centered Circular Confirmation Badge */}
          <div className="my-6 flex items-center justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-black bg-white shadow-sm transition-transform hover:scale-105">
              <Check className="h-8 w-8 stroke-[2.5] text-neutral-900" />
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="mt-6">
            <Button type="button" onClick={handleGoToDashboard}>
              Go to Dashboard
            </Button>
          </div>
        </div>

        {/* Right Art Panel */}
        <div className="relative hidden md:block md:w-[48%] p-3">
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
            <img
              src={successArt}
              alt="Neon Hello Artwork"
              className="h-full w-full object-cover object-center select-none"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </div>
  );
}