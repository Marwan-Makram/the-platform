import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const Input = forwardRef(
  ({ label, error, type = 'text', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold text-neutral-800">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <input
            ref={ref}
            type={isPassword ? (showPassword ? 'text' : 'password') : type}
            className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all ${
              isPassword ? 'pr-10' : ''
            } ${
              error
                ? 'border-red-500 focus:ring-red-200'
                : 'border-neutral-200 focus:border-neutral-900 focus:ring-neutral-200'
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