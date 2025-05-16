import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}
export function Button({
  children,
  variant = "primary",
  ...props
}: ButtonProps) {
  const base = "px-5 py-2 rounded-full font-semibold transition shadow";
  const color =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : variant === "secondary"
      ? "bg-yellow-300 text-gray-900 hover:bg-yellow-400"
      : "bg-red-600 text-white hover:bg-red-700";
  return (
    <button className={`${base} ${color}`} {...props}>
      {children}
    </button>
  );
}
