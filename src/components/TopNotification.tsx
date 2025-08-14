import React, { useEffect } from 'react';

interface TopNotificationProps {
  message: string;
  isVisible: boolean;
  onHide: () => void;
}

const TopNotification: React.FC<TopNotificationProps> = ({ message, isVisible, onHide }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onHide();
      }, 3000); // Hide after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] animate-slide-down pointer-events-none">
      <div className="pointer-events-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 shadow-lg flex items-center gap-2">
        <p className="text-green-700 dark:text-green-300 text-sm font-medium">{message}</p>
      </div>
    </div>
  );
};

export default TopNotification; 