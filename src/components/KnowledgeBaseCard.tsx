import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';

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
  onDelete
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

  return (
    <div 
      className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-purple-600 transition-all duration-200 cursor-pointer relative group"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="text-2xl">{emoji}</div>
        {isCentral && (
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={handleMoreClick}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white"
            >
              <MoreHorizontal size={20} />
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 top-8 w-32 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-10">
                <button
                  onClick={handleEdit}
                  className="w-full px-3 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-700 flex items-center gap-2 rounded-t-lg transition-colors"
                >
                  <Edit size={14} />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full px-3 py-2 text-left text-red-400 hover:text-red-300 hover:bg-gray-700 flex items-center gap-2 rounded-b-lg transition-colors"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
        {!isCentral && (
          <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white">
            <MoreHorizontal size={20} />
          </button>
        )}
      </div>
      
      <h3 className="text-white font-medium text-lg mb-2">{title}</h3>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${
          isCentral ? 'bg-purple-400' : status === 'Public' ? 'bg-green-400' : 'bg-gray-400'
        }`}></div>
        <span className="text-gray-400 text-sm">{isCentral ? 'Central' : status}</span>
        </div>
        
        {/* Role Tags */}
        {roleTags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {roleTags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-purple-900/40 text-purple-300 text-xs rounded-md font-medium border border-purple-700/30"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeBaseCard;