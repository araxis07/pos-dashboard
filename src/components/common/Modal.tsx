"use client";
import React, { useEffect, useRef } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnClickOutside?: boolean;
  footer?: React.ReactNode;
  showCloseButton?: boolean;
}

export default function Modal({ 
  open, 
  onClose, 
  title, 
  description,
  children,
  size = "md",
  closeOnClickOutside = true,
  footer,
  showCloseButton = true
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);
  
  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (closeOnClickOutside && modalRef.current && !modalRef.current.contains(e.target as Node) && open) {
        onClose();
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeOnClickOutside, open, onClose]);
  
  // Block scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  
  // Modal size styles
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-4xl",
  };
  
  if (!open) return null;
  
  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/50 transition-opacity" aria-hidden="true" />
        
        {/* Modal */}
        <div 
          ref={modalRef}
          className={`
            bg-white rounded-xl shadow-xl transform transition-all w-full ${sizeClasses[size]}
            p-0 overflow-hidden relative
          `}
        >
          {/* Close button */}
          {showCloseButton && (
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
              onClick={onClose}
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          )}
          
          {/* Header */}
          {(title || description) && (
            <div className="px-6 py-4 border-b">
              {title && <h3 className="text-xl font-semibold text-gray-900">{title}</h3>}
              {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
            </div>
          )}
          
          {/* Content */}
          <div className="px-6 py-4 overflow-y-auto max-h-[calc(100vh-14rem)]">
            {children}
          </div>
          
          {/* Footer */}
          {footer && (
            <div className="px-6 py-3 border-t bg-gray-50 flex justify-end gap-2">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
