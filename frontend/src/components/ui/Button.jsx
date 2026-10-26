import React from 'react';

export function Button({
  children,
  variant = 'primary',
  className = '',
  loading = false,
  ...props
}) {
  const baseStyles =
    'flex items-center justify-center rounded-[12px] font-inter font-medium text-[14px] leading-[25px] transition-all duration-150 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variants = {
    primary: 'bg-[#253C6D] hover:bg-[#1d3058] text-white py-2.5 px-4 w-full shadow-sm',
    outline:
      'border border-[#D9D9D9] bg-white text-black hover:bg-neutral-50 py-2 px-4 w-full gap-2 text-xs font-poppins font-medium shadow-xs',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? 'Processing...' : children}
    </button>
  );
}
