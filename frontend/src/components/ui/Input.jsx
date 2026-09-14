import React, { forwardRef } from 'react';

export const Input = forwardRef(
  ({ label, error, type = 'text', ...props }, ref) => {
    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold text-neutral-800">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all ${
            error
              ? 'border-red-500 focus:ring-red-200'
              : 'border-neutral-200 focus:border-neutral-900 focus:ring-neutral-200'
          }`}
          {...props}
        />
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
