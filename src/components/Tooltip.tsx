import React, { useState, ReactNode, useRef, useLayoutEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

interface TooltipProps {
  text: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);

  const updatePosition = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const spacing = 8; // gap between trigger and tooltip
    let top = 0;
    let left = 0;
    switch (position) {
      case 'top':
        top = rect.top - spacing;
        left = rect.left + rect.width / 2;
        break;
      case 'bottom':
        top = rect.bottom + spacing;
        left = rect.left + rect.width / 2;
        break;
      case 'left':
        top = rect.top + rect.height / 2;
        left = rect.left - spacing;
        break;
      case 'right':
        top = rect.top + rect.height / 2;
        left = rect.right + spacing;
        break;
      default:
        top = rect.top - spacing;
        left = rect.left + rect.width / 2;
    }
    setCoords({ top, left });
  }, [position]);

  useLayoutEffect(() => {
    if (!isVisible) return;
    updatePosition();
    const onScroll = () => updatePosition();
    const onResize = () => updatePosition();
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onResize);
    };
  }, [isVisible, updatePosition]);

  const tooltipNode = isVisible ? (
    <div
      className="fixed z-[9999] pointer-events-none"
      style={{ top: coords.top, left: coords.left, transform: position === 'top' || position === 'bottom' ? 'translate(-50%, -100%)' : position === 'left' ? 'translate(-100%, -50%)' : 'translate(0, -50%)' }}
    >
      <div className="px-3 py-2 text-xs font-medium text-white bg-gray-900 dark:bg-gray-800 rounded-lg shadow-xl border border-gray-600 dark:border-gray-500 whitespace-nowrap">
        {text}
      </div>
    </div>
  ) : null;

  return (
    <span
      ref={triggerRef}
      className="inline-block align-middle"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {tooltipNode && ReactDOM.createPortal(tooltipNode, document.body)}
    </span>
  );
};

export default Tooltip; 