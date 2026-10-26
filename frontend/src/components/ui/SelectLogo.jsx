import React from 'react';

const SELECT_ICON_PNG = '/assets/aistudio/image_5c9b5f72.png';
const SELECT_LOCKUP_PNG = '/assets/aistudio/image_47385bfa.png';

export default function SelectLogo({
  variant = 'lockup',
  size = 'md',
  className = '',
}) {
  const heightMap = {
    sm: 'h-6 sm:h-7',
    md: 'h-7 sm:h-8',
    lg: 'h-10 sm:h-11',
    xl: 'h-13 sm:h-15',
  };

  const currentHeight = heightMap[size] || heightMap.md;

  // 1. App Icon / Standalone Icon Variant (uses exact uploaded square icon PNG)
  if (variant === 'app' || variant === 'icon') {
    return (
      <img
        src={SELECT_ICON_PNG}
        alt="Select"
        className={`${currentHeight} aspect-square object-contain shrink-0 select-none ${className}`}
      />
    );
  }

  // 2. Full Horizontal Lockup Variant (uses exact uploaded SELECT wordmark lockup PNG)
  return (
    <img
      src={SELECT_LOCKUP_PNG}
      alt="Select"
      className={`${currentHeight} w-auto max-w-[220px] object-contain shrink-0 select-none ${className}`}
    />
  );
}
