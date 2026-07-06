import React from 'react';

interface ApexLogoProps {
  className?: string;
}

export default function ApexLogo({ className = 'h-10 w-10' }: ApexLogoProps) {
  return (
    <svg 
      viewBox="0 0 500 500" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      id="apex-athletics-svg-logo"
    >
      <defs>
        {/* Glow effect */}
        <filter id="orange-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        {/* Gradient for the orange glowing outline */}
        <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="50%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>

        {/* Metallic silver/gray gradient */}
        <linearGradient id="silverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
        
        {/* Dark plate background */}
        <linearGradient id="darkPlateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#18181b" />
          <stop offset="50%" stopColor="#09090b" />
          <stop offset="100%" stopColor="#18181b" />
        </linearGradient>
      </defs>

      {/* 1. Glowing outer orange neon hexagon frame */}
      <path 
        d="M 250,30 L 450,110 L 450,330 L 250,470 L 50,330 L 50,110 Z" 
        stroke="url(#orangeGradient)" 
        strokeWidth="14" 
        strokeLinejoin="round"
        fill="url(#darkPlateGradient)"
        filter="url(#orange-glow)"
      />

      {/* 2. Inner silver/gray metallic bevel border */}
      <path 
        d="M 250,48 L 430,120 L 430,320 L 250,448 L 70,320 L 70,120 Z" 
        stroke="url(#silverGradient)" 
        strokeWidth="6" 
        strokeLinejoin="round"
        fill="#1c1917"
      />

      {/* 3. High-tech geometric metallic support ribs */}
      <path d="M 250,48 L 250,120" stroke="url(#silverGradient)" strokeWidth="3" />
      <path d="M 250,48 L 430,120" stroke="url(#silverGradient)" strokeWidth="3" />
      <path d="M 250,48 L 70,120" stroke="url(#silverGradient)" strokeWidth="3" />
      <path d="M 70,120 L 210,180" stroke="url(#silverGradient)" strokeWidth="3" />
      <path d="M 430,120 L 290,180" stroke="url(#silverGradient)" strokeWidth="3" />
      <path d="M 70,320 L 250,448 L 430,320" stroke="url(#orangeGradient)" strokeWidth="4" />
      <path d="M 110,340 L 250,420 L 390,340" stroke="url(#silverGradient)" strokeWidth="3" />

      {/* Center Plate for the Text */}
      <path 
        d="M 90,140 L 410,140 L 420,295 L 250,380 L 80,295 Z" 
        fill="#09090b" 
        stroke="url(#silverGradient)" 
        strokeWidth="4" 
        strokeLinejoin="round"
      />

      {/* Inner orange subtle shield contour */}
      <path 
        d="M 105,155 L 395,155 L 403,280 L 250,355 L 97,280 Z" 
        stroke="#f97316" 
        strokeWidth="1.5" 
        strokeOpacity="0.5"
      />

      {/* 4. "APEX" Bold Title Text */}
      <text 
        x="250" 
        y="215" 
        fill="url(#silverGradient)" 
        fontFamily="sans-serif" 
        fontWeight="900" 
        fontSize="78" 
        textAnchor="middle" 
        letterSpacing="4"
        style={{ textTransform: 'uppercase', fontStyle: 'italic' }}
      >
        APEX
      </text>

      {/* 5. "ATHLETICS" Sub-title */}
      <text 
        x="250" 
        y="262" 
        fill="#ffffff" 
        fontFamily="sans-serif" 
        fontWeight="800" 
        fontSize="32" 
        textAnchor="middle" 
        letterSpacing="8"
        style={{ textTransform: 'uppercase' }}
      >
        ATHLETICS
      </text>

      {/* 6. "GET STRONGER" Badge */}
      <rect 
        x="110" 
        y="292" 
        width="280" 
        height="44" 
        rx="8" 
        fill="url(#orangeGradient)" 
        stroke="url(#silverGradient)" 
        strokeWidth="2.5"
      />
      
      <text 
        x="250" 
        y="322" 
        fill="#000000" 
        fontFamily="sans-serif" 
        fontWeight="900" 
        fontSize="21" 
        textAnchor="middle" 
        letterSpacing="2"
      >
        GET STRONGER
      </text>
    </svg>
  );
}
