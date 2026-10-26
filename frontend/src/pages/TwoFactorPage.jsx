import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import verifyArt from '@/assets/verify-art.jpg';

const twoFactorSchema = z.object({
  code: z
    .string()
    .length(6, 'Authentication code must be exactly 6 digits')
    .regex(/^\d+$/, 'Authentication code must contain only numbers'),
});

export default function TwoFactorPage() {
  const navigate = useNavigate();
  const [digits, setDigits] = useState(['5', '2', '0', '', '', '']);
  const [resendStatus, setResendStatus] = useState('');
  const inputRefs = useRef([]);

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: { code: '520' },
  });

  const updateCodeValue = (newDigits) => {
    setDigits(newDigits);
    setValue('code', newDigits.join(''), { shouldValidate: true });
  };

  const handleChange = (index, e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (!value) return;

    const newDigits = [...digits];
    newDigits[index] = value.slice(-1);
    updateCodeValue(newDigits);

    if (index < 5 && value) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[index] = '';
        updateCodeValue(newDigits);
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
    updateCodeValue(newDigits);

    const targetIdx = Math.min(pasteData.length, 5);
    inputRefs.current[targetIdx]?.focus();
  };

  const onSubmit = async (data) => {
    console.log('2FA payload submitted:', data.code);
    navigate('/welcome-back');
  };

  const handleResend = () => {
    setResendStatus('A new 2FA security code was transmitted to your device.');
    setTimeout(() => setResendStatus(''), 4000);
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
              Two-Factor<br />Authentication
            </h1>
            <p className="font-poppins font-normal text-[13px] sm:text-[15px] leading-[20px] sm:leading-[22px] text-[#455B8A]">
              Enter the 6-digit verification code from your authenticator application or device.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
            {/* Input Row: 6 boxes with fluid aspect-square scaling */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3" onPaste={handlePaste}>
                {digits.map((digit, index) => {
                  const hasValue = digit.length > 0;
                  return (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`w-full max-w-[48px] lg:max-w-[54px] aspect-square text-center font-poppins font-semibold text-[18px] sm:text-[20px] leading-[30px] rounded-[10px] bg-[#F6F4EF] text-[#16213E] transition-all focus:outline-none ${
                        errors.code
                          ? 'border-2 border-red-500'
                          : hasValue
                          ? 'border-2 border-[#A9B7D6] focus:border-[#253C6D]'
                          : 'border border-[#A9B7D6] focus:border-2 focus:border-[#253C6D]'
                      }`}
                    />
                  );
                })}
              </div>

              {errors.code && (
                <span className="text-[11px] font-medium text-red-600 block text-center">
                  {errors.code.message}
                </span>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full max-w-[404px] h-[44px] sm:h-[40px] bg-[#253C6D] hover:bg-[#1d3058] text-white rounded-[12px] font-inter font-medium text-[14px] leading-[25px] flex items-center justify-center transition-colors cursor-pointer shadow-sm active:scale-[0.99] disabled:opacity-70"
            >
              {isSubmitting ? 'Authenticating...' : 'Authenticate'}
            </button>
          </form>

          {/* Resend prompt */}
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-1.5 text-[13px] leading-[20px]">
              <span className="font-poppins font-normal text-[#455B8A]">
                Didn&apos;t receive the code?
              </span>
              <button
                type="button"
                onClick={handleResend}
                className="font-poppins font-semibold text-[#30497D] underline cursor-pointer hover:text-[#1d3058]"
              >
                Resend SMS
              </button>
            </div>
            {resendStatus && (
              <span className="text-[11px] font-medium text-emerald-700 block bg-emerald-50 py-1 px-2.5 rounded-lg border border-emerald-200">
                {resendStatus}
              </span>
            )}
          </div>
        </div>

        {/* Right Panel Graphic: Proportional on Tablet and Desktop */}
        <div className="hidden md:block w-[260px] lg:w-[419px] h-[500px] lg:h-[699px] rounded-[8px] overflow-hidden relative shadow-md shrink-0 transition-all">
          <div
            className="absolute inset-0 bg-cover bg-center select-none"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${verifyArt})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}