import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Edit, Trash2, Users, Megaphone } from 'lucide-react';
import Tooltip from './Tooltip';

interface KnowledgeBaseCardProps {
  id: string;
  title: string;
  emoji: string;
  status: 'Public' | 'Private';
  isCentral?: boolean;
  roleTags?: string[];
  onClick?: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onPermissions?: (id: string) => void;
}

const KnowledgeBaseCard: React.FC<KnowledgeBaseCardProps> = ({
  id,
  title,
  emoji,
  status,
  isCentral = false,
  roleTags = [],
  onClick,
  onEdit,
  onDelete,
  onPermissions
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(false);
    onEdit?.(id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(false);
    onDelete?.(id);
  };

  const handlePermissions = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(false);
    onPermissions?.(id);
  };

  const isSystem = roleTags.some(tag => tag.toLowerCase() === 'system');

  // Deterministic pseudo-random selection per id so UI doesn't flicker
  const hashString = (s: string) => {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = (h * 31 + s.charCodeAt(i)) | 0;
    }
    return Math.abs(h);
  };
  const hash = hashString(id);
  const showYouShare = !isSystem && hash % 4 === 0;      // ~25% cards
  const showOthersShare = !isSystem && hash % 4 === 1;   // ~25% cards

  return (
    <div 
      className="bg-white dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-purple-600 transition-all duration-200 cursor-pointer relative group shadow-sm dark:shadow-none"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="text-2xl">{emoji}</div>
        <div className="flex items-center gap-2">
          {isSystem && (
            <Megaphone size={18} className="text-purple-600 dark:text-purple-400" />
          )}
          {!isSystem && showYouShare && (
            <Tooltip text="You share this folder to others." position="left">
              <span className="text-base" aria-label="you-share" role="img">👤</span>
            </Tooltip>
          )}
          {!isSystem && showOthersShare && (
            <Tooltip text="Others share this folder with you." position="left">
              <span className="text-base" aria-label="others-share" role="img">👥</span>
            </Tooltip>
          )}
          {isCentral ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={handleMoreClick}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-white"
              >
                <MoreHorizontal size={20} />
              </button>
              {showDropdown && (
                <div className="absolute right-0 top-8 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10">
                  <button
                    onClick={handlePermissions}
                    className="w-full px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 rounded-t-lg transition-colors"
                  >
                    <Users size={14} />
                    Permissions
                  </button>
                  <button
                    onClick={handleEdit}
                    className="w-full px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
                  >
                    <Edit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full px-3 py-2 text-left text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 rounded-b-lg transition-colors"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white">
              <MoreHorizontal size={20} />
            </button>
          )}
        </div>
      </div>
      
      <h3 className="text-gray-900 dark:text-white font-medium text-lg mb-2">{title}</h3>

    </div>
  );
};

export default KnowledgeBaseCard;