'use client';

import { useState } from 'react';

interface BrandLogoProps {
  src?: string;
  alt: string;
  fallbackChar: string;
  className?: string;
}

export default function BrandLogo({ src, alt, fallbackChar, className = '' }: BrandLogoProps) {
  const [imgError, setImgError] = useState(false);

  if (imgError || !src) {
    return (
      <span className={`flex items-center justify-center ${className}`}>
        {fallbackChar}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`object-contain ${className}`}
      onError={() => setImgError(true)}
    />
  );
}
