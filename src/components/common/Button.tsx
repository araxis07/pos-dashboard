import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  rounded = "md",
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  // Base styles
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  // Size styles
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };
  
  // Rounded styles
  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full"
  };
  
  // Variant styles
  const variantStyles = {
    primary: "bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-yellow-400 text-gray-900 border border-yellow-400 hover:bg-yellow-500 focus:ring-yellow-400",
    danger: "bg-red-600 text-white border border-red-600 hover:bg-red-700 focus:ring-red-500",
    success: "bg-green-600 text-white border border-green-600 hover:bg-green-700 focus:ring-green-500",
    outline: "bg-transparent text-blue-600 border border-blue-300 hover:bg-blue-50 focus:ring-blue-300",
    ghost: "bg-transparent text-blue-600 border-none hover:bg-blue-50 focus:ring-blue-300"
  };
  
  // Disabled state
  const disabledStyles = "opacity-50 cursor-not-allowed";
  
  // Loading state
  const loadingStyles = "relative !text-transparent";
  
  return (
    <button 
      disabled={disabled || isLoading}
      className={clsx(
        baseStyles,
        sizeStyles[size],
        roundedStyles[rounded],
        variantStyles[variant],
        fullWidth ? "w-full" : "",
        (disabled || isLoading) && disabledStyles,
        isLoading && loadingStyles,
        className
      )} 
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
      
      {icon && iconPosition === "left" && !isLoading && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && !isLoading && <span className="ml-2">{icon}</span>}
    </button>
  );
}
