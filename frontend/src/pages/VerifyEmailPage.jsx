import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import verifyArt from '@/assets/verify-art.jpg';

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, 'Verification code must be exactly 6 digits')
    .regex(/^\d+$/, 'Verification code must contain only numbers'),
});

export default function VerifyEmailPage() {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  const updateOtpValue = (newDigits) => {
    setDigits(newDigits);
    setValue('otp', newDigits.join(''), { shouldValidate: true });
  };

  const handleChange = (index, e) => {
    const value = e.target.value.replace(/\D/g, ''); // Numeric only
    if (!value) return;

    const newDigits = [...digits];
    newDigits[index] = value.slice(-1); // Pick last character entered
    updateOtpValue(newDigits);

    // Auto-advance focus to next input
    if (index < 5 && value) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        // Move backward if current block is empty
        inputRefs.current[index - 1]?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[index] = '';
        updateOtpValue(newDigits);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);
    if (!pasteData) return;

    const newDigits = [...digits];
    for (let i = 0; i < pasteData.length; i++) {
      newDigits[i] = pasteData[i];
    }
    updateOtpValue(newDigits);

    // Shift focus to the last filled box or final box
    const targetIdx = Math.min(pasteData.length, 5);
    inputRefs.current[targetIdx]?.focus();
  };

  const onSubmit = async (data) => {
    console.log('Verifying OTP payload:', data.otp);
  };

  const handleResend = () => {
    console.log('Resending verification email...');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#EAEBED] p-4">
      {/* Container Card */}
      <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">
        
        {/* Left Form Column */}
        <div className="flex w-full flex-col justify-center px-8 py-8 sm:px-12 md:w-[52%] lg:px-14">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              Verify Your Email
            </h1>
            <p className="mt-1.5 text-xs font-medium text-neutral-500">
              We’ve sent a 6-digit confirmation code to your email.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* OTP Input Row */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 sm:gap-3" onPaste={handlePaste}>
                {digits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`h-12 w-full text-center text-lg font-bold rounded-xl border bg-white text-neutral-900 transition-all focus:outline-none focus:ring-2 ${
                      errors.otp
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-neutral-200 focus:border-neutral-900 focus:ring-neutral-200'
                    }`}
                  />
                ))}
              </div>
              {errors.otp && (
                <span className="text-[11px] font-medium text-red-600">
                  {errors.otp.message}
                </span>
              )}
            </div>

            <Button type="submit" loading={isSubmitting}>
              Verify Account
            </Button>
          </form>

          {/* Resend Link */}
          <p className="mt-8 text-center text-xs font-medium text-neutral-600">
            Didn't receive the code?{' '}
            <button
              type="button"
              onClick={handleResend}
              className="font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
            >
              Resend code
            </button>
          </p>
        </div>

        {/* Right Art Panel */}
        <div className="relative hidden md:block md:w-[48%] p-3">
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
            <img
              src={verifyArt}
              alt="Server Core Visual"
              className="h-full w-full object-cover object-center select-none"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </div>
  );
}