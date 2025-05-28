import React from 'react';

interface ProductPlaceholderProps {
  category?: string;
  name: string;
  className?: string;
}

/**
 * A component that renders a placeholder for a product image with a colored background
 * and emoji based on category
 */
export default function ProductPlaceholder({ category, name, className = '' }: ProductPlaceholderProps) {
  // Determine the emoji and colors based on category
  const getCategoryStyles = (category?: string) => {
    const lowerCategory = category?.toLowerCase() || '';
    
    switch (lowerCategory) {
      case 'drinks':
        return { emoji: '🥤', bgColor: 'bg-blue-100', textColor: 'text-blue-800' };
      case 'food':
        return { emoji: '🍜', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' };
      case 'snacks':
        return { emoji: '🍪', bgColor: 'bg-orange-100', textColor: 'text-orange-800' };
      case 'electronics':
        return { emoji: '📱', bgColor: 'bg-indigo-100', textColor: 'text-indigo-800' };
      default:
        return { emoji: '📦', bgColor: 'bg-gray-100', textColor: 'text-gray-800' };
    }
  };

  const { emoji, bgColor, textColor } = getCategoryStyles(category);
  
  // Get the first letter of the product name
  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <div className={`w-full h-full flex items-center justify-center ${bgColor} ${className}`}>
      <div className="flex flex-col items-center justify-center">
        <span className="text-4xl mb-2">{emoji}</span>
        <div className={`text-xl font-bold ${textColor}`}>{firstLetter}</div>
      </div>
    </div>
  );
}
