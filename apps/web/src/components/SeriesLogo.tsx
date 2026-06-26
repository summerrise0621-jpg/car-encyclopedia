'use client';

import { useState } from 'react';

interface SeriesLogoProps {
  src?: string;
  alt: string;
  fallbackChar: string;
}

export default function SeriesLogo({ src, alt, fallbackChar }: SeriesLogoProps) {
  const [imgError, setImgError] = useState(false);

  if (imgError || !src) {
    return (
      <span className="w-20 h-20 bg-white/10 rounded-xl flex items-center justify-center text-4xl backdrop-blur-sm shrink-0">
        {fallbackChar}
      </span>
    );
  }

  return (
    <div className="w-20 h-20 bg-white/10 rounded-xl overflow-hidden backdrop-blur-sm shrink-0">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => setImgError(true)}
      />
    </div>
  );
}
