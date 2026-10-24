import React from 'react';

export const ValXMark = ({ size = 42, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`valx-logo-svg ${className}`}
  >
    <defs>
      <linearGradient id="valxGradRed" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF4655" />
        <stop offset="100%" stopColor="#D80027" />
      </linearGradient>
      <linearGradient id="valxGradWhite" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#ECE8E1" />
      </linearGradient>
      <linearGradient id="valxGradAccent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF7A85" />
        <stop offset="100%" stopColor="#FF4655" />
      </linearGradient>
      <filter id="valxGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Tactical diamond base shadow/frame */}
    <rect 
      x="2" 
      y="2" 
      width="44" 
      height="44" 
      rx="10" 
      fill="#0F1923" 
      stroke="rgba(255, 70, 85, 0.35)" 
      strokeWidth="1.5"
    />

    {/* Background tactical corner accents */}
    <path d="M6 14 L6 6 L14 6" stroke="#FF4655" strokeWidth="1.5" fill="none" opacity="0.6" />
    <path d="M42 34 L42 42 L34 42" stroke="#FF4655" strokeWidth="1.5" fill="none" opacity="0.6" />

    {/* Left Arm of the V - Solid Valorant Cream/White */}
    <path 
      d="M12 11 L21 11 L16 35 L12 35 Z" 
      fill="url(#valxGradWhite)" 
    />

    {/* Main Slash of X - Angled Valorant Red Slash with glow */}
    <path 
      d="M36 11 L28 11 L14 37 L22 37 Z" 
      fill="url(#valxGradRed)" 
      filter="url(#valxGlow)"
    />

    {/* Intersecting Slash creating the X */}
    <path 
      d="M23 18 L29 11 L36 11 L27 22 Z" 
      fill="url(#valxGradAccent)" 
    />
    <path 
      d="M25 26 L32 37 L37 37 L29 27 Z" 
      fill="url(#valxGradRed)" 
    />

    {/* Center Radianite Spark Core */}
    <circle cx="25.5" cy="24" r="1.75" fill="#FFFFFF" />
  </svg>
);

export const ValXLogo = ({ showTagline = true, size = 48 }) => {
  return (
    <div className="valx-brand-header">
      <div className="valx-logo-container">
        <ValXMark size={size} />
        <div className="valx-wordmark">
          <span className="brand-val">VAL</span>
          <span className="brand-x">X</span>
          <span className="brand-sub-badge">PRO</span>
        </div>
      </div>
      {showTagline && (
        <div className="valx-tagline-container">
          <span className="valx-tagline">VP & Bundle Optimizer</span>
          <span className="valx-dot">•</span>
          <span className="valx-tagline-sub">Gun Skins & VCT Bundles</span>
        </div>
      )}
    </div>
  );
};

export default ValXLogo;
