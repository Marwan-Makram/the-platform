import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const Input = forwardRef(
  ({ label, error, type = 'text', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label className="font-poppins font-medium text-[14px] leading-[21px] text-[#16213E]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <input
            ref={ref}
            type={isPassword ? (showPassword ? 'text' : 'password') : type}
            className={`w-full h-[32px] rounded-[10px] border bg-white px-[10px] font-poppins font-medium text-[12px] placeholder:text-[#455B8A] placeholder:text-[10px] text-[#16213E] focus:outline-none transition-all ${
              isPassword ? 'pr-9' : ''
            } ${
              error
                ? 'border-red-500 ring-1 ring-red-200'
                : 'border-[#A9B7D6] focus:border-[#253C6D]'
            }`}
            {...props}
          />
          {isPassword && (
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
          )}
        </div>
        {error && (
          <span className="text-[11px] font-medium text-red-600">
            {error.message}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';