import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  titleRight?: React.ReactNode;
  footer?: React.ReactNode;
  noPadding?: boolean;
  border?: boolean;
  hoverable?: boolean;
  variant?: 'default' | 'gradient' | 'flat' | 'outlined';
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export function Card({
  children,
  className = "",
  title,
  subtitle,
  titleRight,
  footer,
  noPadding = false,
  border = false,
  hoverable = false,
  variant = 'default',
  elevation = 'sm',
  icon,
}: CardProps) {
  // Determine card styling based on variant
  const variantStyles = {
    default: "bg-white",
    gradient: "bg-gradient-to-br from-gray-50 to-gray-100",
    flat: "bg-gray-50",
    outlined: "bg-white border-2",
  };
  
  // Determine shadow styling
  const shadowStyles = {
    none: "",
    sm: "shadow-sm",
    md: "shadow",
    lg: "shadow-md",
  };
  
  return (
    <div 
      className={`
        ${variantStyles[variant]} rounded-xl 
        ${border ? 'border border-gray-200' : ''} 
        ${elevation !== 'none' ? shadowStyles[elevation] : ''}
        ${hoverable ? 'transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px]' : ''}
        ${noPadding ? '' : 'p-6'} 
        ${className}
      `}
    >
      {(title || subtitle || titleRight) && (
        <div className={`${!noPadding ? 'mb-4' : 'p-4 border-b'} flex items-center justify-between`}>
          <div className="flex items-center">
            {icon && (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center mr-3">
                {icon}
              </div>
            )}
            <div>
              {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
              {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
            </div>
          </div>
          {titleRight && (
            <div>
              {titleRight}
            </div>
          )}
        </div>
      )}
      
      <div className={noPadding && (title || subtitle || titleRight) ? 'p-4 pt-0' : ''}>
        {children}
      </div>
      
      {footer && (
        <div className={`${!noPadding ? 'mt-4 pt-4 border-t' : 'p-4 border-t'} border-gray-100`}>
          {footer}
        </div>
      )}
    </div>
  );
}
