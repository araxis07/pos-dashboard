import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}
export default function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed z-50 inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg relative">
        <button className="absolute top-2 right-4 text-lg" onClick={onClose}>×</button>
        {title && <h2 className="text-xl font-bold mb-3">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
