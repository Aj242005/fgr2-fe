"use client";
import React from 'react';
import GlassSurface from './GlassSurface';

export default function DashboardGlassPanel({ children, style = {}, className = "" }) {
  const mergedStyle = { padding: "2rem", ...style, width: "100%", height: "100%" };
  return (
    <GlassSurface 
      width="100%" 
      height="100%" 
      className={`shadow-glow-red rounded-2xl ${className}`} 
      contentClassName="block w-full h-full relative"
      useFallback={true}
    >
      <div style={mergedStyle}>
        {children}
      </div>
    </GlassSurface>
  );
}
