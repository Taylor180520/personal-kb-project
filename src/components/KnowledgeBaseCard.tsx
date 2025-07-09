import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Edit, Trash2, Users, Lock, Globe } from 'lucide-react';

interface RoleGroup {
  id: string;
  name: string;
  role: 'Owner' | 'Editor' | 'Viewer';
  memberCount: number;
}

interface UserPermission {
  id: string;
  email: string;
  name: string;
  role: 'Owner' | 'Editor' | 'Viewer';
  avatar?: string;
  company?: string;
  isVerified?: boolean;
}

interface KnowledgeBasePermissions {
  isPublic: boolean;
  roleGroups: RoleGroup[];
  individualUsers: UserPermission[];
  allowPublicAccess: boolean;
  requireApproval: boolean;
}

interface PermissionSummary {
  type: string;
  count: number;
  color: string;
}

interface KnowledgeBaseCardProps {
  id: string;
  title: string;
  emoji: string;
  status: 'Public' | 'Private';
  permissions: KnowledgeBasePermissions;
  permissionSummary: PermissionSummary;
  onClick?: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const KnowledgeBaseCard: React.FC<KnowledgeBaseCardProps> = ({
  id,
  title,
  emoji,
  status,
  permissions,
  permissionSummary,
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

  // Check if current user has edit permissions
  const hasEditPermissions = permissions.individualUsers.some(user => 
    user.role === 'Owner' || user.role === 'Editor'
  ) || permissions.roleGroups.some(group => 
    group.role === 'Owner' || group.role === 'Editor'
  ) || permissions.isPublic;

  // Get permission icon
  const getPermissionIcon = () => {
    if (permissions.isPublic && permissions.allowPublicAccess) {
      return <Globe size={14} className="text-green-400" />;
    } else if (permissionSummary.count > 0) {
      return <Users size={14} className="text-blue-400" />;
    } else {
      return <Lock size={14} className="text-gray-400" />;
    }
  };

  // Get permission display text
  const getPermissionText = () => {
    if (permissions.isPublic && permissions.allowPublicAccess) {
      return 'Public';
    } else if (permissionSummary.count > 0) {
      return `Shared (${permissionSummary.count})`;
    } else {
      return 'Private';
    }
  };

  return (
    <div 
      className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-purple-600 transition-all duration-200 cursor-pointer relative group"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="text-2xl">{emoji}</div>
        {hasEditPermissions && (
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
        {!hasEditPermissions && (
          <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white">
            <MoreHorizontal size={20} />
          </button>
        )}
      </div>
      
      <h3 className="text-white font-medium text-lg mb-2">{title}</h3>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${permissionSummary.color}`}></div>
          <span className="text-gray-400 text-sm">{getPermissionText()}</span>
        </div>
        <div className="flex items-center gap-1">
          {getPermissionIcon()}
        </div>
      </div>
      
      {/* Additional permission details on hover */}
      {(permissions.roleGroups.length > 0 || permissions.individualUsers.length > 0) && (
        <div className="mt-2 pt-2 border-t border-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="text-xs text-gray-500 space-y-1">
            {permissions.roleGroups.length > 0 && (
              <div>Role Groups: {permissions.roleGroups.length}</div>
            )}
            {permissions.individualUsers.length > 0 && (
              <div>Users: {permissions.individualUsers.length}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeBaseCard;