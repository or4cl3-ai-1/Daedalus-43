import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer Glow */}
      <div className="absolute inset-0 bg-daedalus-accent/20 blur-xl rounded-full animate-pulse" />
      
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full"
      >
        {/* Outer Rings */}
        <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" className="text-daedalus-accent/30" />
        <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="1" className="text-daedalus-accent/50" />
        
        {/* Technical Circular Elements */}
        <path d="M50 8 A42 42 0 0 1 92 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-daedalus-accent" />
        <path d="M50 92 A42 42 0 0 1 8 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-daedalus-accent" />
        
        {/* Dots and Markers */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <circle 
            key={angle}
            cx={50 + 42 * Math.cos((angle * Math.PI) / 180)} 
            cy={50 + 42 * Math.sin((angle * Math.PI) / 180)} 
            r="1.5" 
            fill="currentColor" 
            className="text-daedalus-accent"
          />
        ))}

        {/* The "D" Shape */}
        <path 
          d="M35 30 V70 H50 C65 70 75 60 75 50 C75 40 65 30 50 30 H35Z" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinejoin="round"
          className="text-daedalus-accent"
        />
        
        {/* Inner Triangle */}
        <path 
          d="M45 42 L58 50 L45 58 Z" 
          fill="currentColor" 
          className="text-daedalus-accent"
        />
        
        {/* Circuit Lines */}
        <path d="M35 40 H25 M35 60 H25 M75 50 H85" stroke="currentColor" strokeWidth="1" className="text-daedalus-accent/60" />
        <circle cx="25" cy="40" r="1" fill="currentColor" className="text-daedalus-accent" />
        <circle cx="25" cy="60" r="1" fill="currentColor" className="text-daedalus-accent" />
        <circle cx="85" cy="50" r="1" fill="currentColor" className="text-daedalus-accent" />
      </svg>
    </div>
  );
};
