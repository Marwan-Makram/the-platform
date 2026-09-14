import React from 'react';

export function Button({
  children,
  variant = 'primary',
  className = '',
  loading = false,
  ...props
}) {
  const baseStyles =
    'flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-150 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variants = {
    primary: 'bg-black text-white hover:bg-neutral-800 py-3 w-full shadow-sm',
    outline:
      'border border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50 py-2.5 px-4 w-full gap-2 text-xs font-semibold shadow-xs',
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
