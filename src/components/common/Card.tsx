import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  noPadding?: boolean;
  border?: boolean;
  hoverable?: boolean;
}

export function Card({
  children,
  className = "",
  title,
  subtitle,
  footer,
  noPadding = false,
  border = false,
  hoverable = false,
}: CardProps) {
  return (
    <div 
      className={`
        bg-white rounded-xl 
        ${border ? 'border border-gray-200' : 'shadow-sm'} 
        ${hoverable ? 'transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]' : ''}
        ${noPadding ? '' : 'p-6'} 
        ${className}
      `}
    >
      {(title || subtitle) && (
        <div className={`${!noPadding ? 'mb-4' : 'p-4 border-b'}`}>
          {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      )}
      
      <div className={noPadding && (title || subtitle) ? 'p-4 pt-0' : ''}>
        {children}
      </div>
      
      {footer && (
        <div className={`${!noPadding ? 'mt-4 pt-4 border-t' : 'p-4 border-t'}`}>
          {footer}
        </div>
      )}
    </div>
  );
}
