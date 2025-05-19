"use client";

interface LoadingStateProps {
  loading: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  error?: Error | null;
  onRetry?: () => void;
}

export default function LoadingState({ 
  loading, 
  children, 
  fallback, 
  error, 
  onRetry 
}: LoadingStateProps) {
  // If there's an error, show error UI
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-medium text-red-800 mb-2">เกิดข้อผิดพลาด</h3>
          <p className="text-sm text-red-600 mb-4">{error.message || 'ไม่สามารถโหลดข้อมูลได้'}</p>
          
          {onRetry && (
            <button 
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              onClick={onRetry}
            >
              ลองใหม่อีกครั้ง
            </button>
          )}
        </div>
      </div>
    );
  }
  
  // If loading, show loading UI
  if (loading) {
    // If custom fallback is provided, use it
    if (fallback) {
      return <>{fallback}</>;
    }
    
    // Default loading UI
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="h-4 w-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="h-4 w-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        <p className="text-gray-500 mt-4">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }
  
  // Not loading and no error, render children
  return <>{children}</>;
}
