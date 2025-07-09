import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import KnowledgeBaseCard from './components/KnowledgeBaseCard';
import CreateCentralKBModal from './components/CreateCentralKBModal';
import EditCentralKBModal from './components/EditCentralKBModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import UploadDocumentsPage from './components/UploadDocumentsPage';
import ChatInterface from './components/ChatInterface';

// Permission-based interfaces
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

interface KnowledgeBase {
  id: string;
  title: string;
  emoji: string;
  status: 'Public' | 'Private';
  permissions: KnowledgeBasePermissions;
  createdBy: string;
  createdAt: string;
  lastModified: string;
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'chat' | 'upload'>('home');
  const [currentKB, setCurrentKB] = useState<KnowledgeBase | null>(null);
  const [editingKB, setEditingKB] = useState<KnowledgeBase | null>(null);
  const [deletingKB, setDeletingKB] = useState<KnowledgeBase | null>(null);
  const [currentKBName, setCurrentKBName] = useState('');
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([
    { 
      id: '1', 
      title: 'UNISCO Private', 
      emoji: '📄', 
      status: 'Public',
      permissions: {
        isPublic: false,
        roleGroups: [
          { id: 'rg1', name: 'UNISCO Team', role: 'Editor', memberCount: 15 }
        ],
        individualUsers: [
          { id: 'u1', email: 'admin@unisco.com', name: 'UNISCO Admin', role: 'Owner', isVerified: true }
        ],
        allowPublicAccess: false,
        requireApproval: true
      },
      createdBy: 'unisco-admin',
      createdAt: '2024-01-01T08:00:00Z',
      lastModified: '2024-01-30T10:15:00Z'
    },
    { 
      id: '2', 
      title: 'UNIS Internal', 
      emoji: '🏢', 
      status: 'Public',
      permissions: {
        isPublic: false,
        roleGroups: [
          { id: 'rg2', name: 'UNIS Staff', role: 'Editor', memberCount: 25 }
        ],
        individualUsers: [
          { id: 'u2', email: 'manager@unis.com', name: 'UNIS Manager', role: 'Owner', isVerified: true }
        ],
        allowPublicAccess: false,
        requireApproval: false
      },
      createdBy: 'unis-manager',
      createdAt: '2024-01-02T09:30:00Z',
      lastModified: '2024-01-29T14:20:00Z'
    },
    { 
      id: '3', 
      title: 'Chatbot KB', 
      emoji: '👥', 
      status: 'Public',
      permissions: {
        isPublic: false,
        roleGroups: [
          { id: 'rg3', name: 'AI Development', role: 'Editor', memberCount: 8 },
          { id: 'rg4', name: 'Customer Support', role: 'Viewer', memberCount: 12 }
        ],
        individualUsers: [
          { id: 'u3', email: 'ai.lead@company.com', name: 'AI Lead', role: 'Owner', isVerified: true }
        ],
        allowPublicAccess: false,
        requireApproval: true
      },
      createdBy: 'ai-team',
      createdAt: '2024-01-03T11:45:00Z',
      lastModified: '2024-01-28T16:30:00Z'
    },
    { 
      id: '4', 
      title: 'Samsung Technical', 
      emoji: '🏭', 
      status: 'Public',
      permissions: {
        isPublic: false,
        roleGroups: [
          { id: 'rg5', name: 'Samsung Engineers', role: 'Editor', memberCount: 20 }
        ],
        individualUsers: [
          { id: 'u4', email: 'tech.samsung@samsung.com', name: 'Samsung Tech Lead', role: 'Owner', isVerified: true }
        ],
        allowPublicAccess: false,
        requireApproval: true
      },
      createdBy: 'samsung-tech',
      createdAt: '2024-01-04T13:15:00Z',
      lastModified: '2024-01-27T09:45:00Z'
    },
    { 
      id: '5', 
      title: 'Lenovo Internal', 
      emoji: '📋', 
      status: 'Public',
      permissions: {
        isPublic: false,
        roleGroups: [
          { id: 'rg6', name: 'Lenovo Team', role: 'Editor', memberCount: 18 }
        ],
        individualUsers: [
          { id: 'u5', email: 'internal@lenovo.com', name: 'Lenovo Manager', role: 'Owner', isVerified: true }
        ],
        allowPublicAccess: false,
        requireApproval: false
      },
      createdBy: 'lenovo-manager',
      createdAt: '2024-01-05T15:20:00Z',
      lastModified: '2024-01-26T11:30:00Z'
    },
    { 
      id: '6', 
      title: 'UNIS Accounting', 
      emoji: '📊', 
      status: 'Public',
      permissions: {
        isPublic: false,
        roleGroups: [
          { id: 'rg7', name: 'Accounting Team', role: 'Editor', memberCount: 5 }
        ],
        individualUsers: [],
        allowPublicAccess: false,
        requireApproval: true
      },
      createdBy: 'accounting-lead',
      createdAt: '2024-01-06T08:30:00Z',
      lastModified: '2024-01-25T13:15:00Z'
    },
    { 
      id: '7', 
      title: 'UNIS Transportation', 
      emoji: '🚚', 
      status: 'Public',
      permissions: {
        isPublic: false,
        roleGroups: [
          { id: 'rg8', name: 'Transport Team', role: 'Editor', memberCount: 10 }
        ],
        individualUsers: [],
        allowPublicAccess: false,
        requireApproval: false
      },
      createdBy: 'transport-manager',
      createdAt: '2024-01-07T10:45:00Z',
      lastModified: '2024-01-24T15:20:00Z'
    },
    { 
      id: '8', 
      title: 'ITEM Drop Description', 
      emoji: '📋', 
      status: 'Public',
      permissions: {
        isPublic: true,
        roleGroups: [],
        individualUsers: [],
        allowPublicAccess: true,
        requireApproval: false
      },
      createdBy: 'item-admin',
      createdAt: '2024-01-08T12:00:00Z',
      lastModified: '2024-01-23T14:45:00Z'
    },
    { 
      id: '9', 
      title: 'UNIS Employee Duties and Workflows', 
      emoji: '📝', 
      status: 'Public',
      permissions: {
        isPublic: false,
        roleGroups: [
          { id: 'rg9', name: 'HR Department', role: 'Editor', memberCount: 6 },
          { id: 'rg10', name: 'All Employees', role: 'Viewer', memberCount: 100 }
        ],
        individualUsers: [],
        allowPublicAccess: false,
        requireApproval: false
      },
      createdBy: 'hr-manager',
      createdAt: '2024-01-09T14:30:00Z',
      lastModified: '2024-01-22T10:30:00Z'
    },
    { 
      id: '10', 
      title: 'Industry CubeShip', 
      emoji: '📦', 
      status: 'Private',
      permissions: {
        isPublic: false,
        roleGroups: [
          { id: 'rg11', name: 'Logistics Team', role: 'Editor', memberCount: 7 }
        ],
        individualUsers: [
          { id: 'u6', email: 'logistics@company.com', name: 'Logistics Director', role: 'Owner', isVerified: true }
        ],
        allowPublicAccess: false,
        requireApproval: true
      },
      createdBy: 'logistics-director',
      createdAt: '2024-01-10T16:15:00Z',
      lastModified: '2024-01-21T12:45:00Z'
    },
    { 
      id: '11', 
      title: 'Industry IT', 
      emoji: '💻', 
      status: 'Public',
      permissions: {
        isPublic: false,
        roleGroups: [
          { id: 'rg12', name: 'IT Department', role: 'Editor', memberCount: 15 }
        ],
        individualUsers: [
          { id: 'u7', email: 'it.director@company.com', name: 'IT Director', role: 'Owner', isVerified: true }
        ],
        allowPublicAccess: false,
        requireApproval: false
      },
      createdBy: 'it-director',
      createdAt: '2024-01-11T09:00:00Z',
      lastModified: '2024-01-20T16:20:00Z'
    },
    { 
      id: '12', 
      title: 'Industry Yard Management', 
      emoji: '🏗️', 
      status: 'Public',
      permissions: {
        isPublic: false,
        roleGroups: [
          { id: 'rg13', name: 'Yard Operations', role: 'Editor', memberCount: 12 }
        ],
        individualUsers: [],
        allowPublicAccess: false,
        requireApproval: false
      },
      createdBy: 'yard-manager',
      createdAt: '2024-01-12T11:30:00Z',
      lastModified: '2024-01-19T14:10:00Z'
    },
    { 
      id: '13', 
      title: 'Industry HR', 
      emoji: '👥', 
      status: 'Public',
      permissions: {
        isPublic: false,
        roleGroups: [
          { id: 'rg14', name: 'HR Team', role: 'Editor', memberCount: 8 }
        ],
        individualUsers: [
          { id: 'u8', email: 'hr.director@company.com', name: 'HR Director', role: 'Owner', isVerified: true }
        ],
        allowPublicAccess: false,
        requireApproval: true
      },
      createdBy: 'hr-director',
      createdAt: '2024-01-13T13:45:00Z',
      lastModified: '2024-01-18T11:25:00Z'
    },
    { 
      id: '14', 
      title: 'Industry LSO', 
      emoji: '📦', 
      status: 'Public',
      permissions: {
        isPublic: false,
        roleGroups: [
          { id: 'rg15', name: 'LSO Team', role: 'Editor', memberCount: 9 }
        ],
        individualUsers: [],
        allowPublicAccess: false,
        requireApproval: false
      },
      createdBy: 'lso-manager',
      createdAt: '2024-01-14T15:20:00Z',
      lastModified: '2024-01-17T09:40:00Z'
    },
    { 
      id: '15', 
      title: 'Industry Transportation', 
      emoji: '🚚', 
      status: 'Public',
      permissions: {
        isPublic: true,
        roleGroups: [],
        individualUsers: [],
        allowPublicAccess: true,
        requireApproval: false
      },
      createdBy: 'transport-admin',
      createdAt: '2024-01-15T17:10:00Z',
      lastModified: '2024-01-16T13:55:00Z'
    },
  ]);

  const filteredKnowledgeBases = knowledgeBases.filter(kb =>
    kb.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCentralKB = (name: string, emoji: string) => {
    const newKB: KnowledgeBase = {
      id: Date.now().toString(),
      title: name,
      emoji,
      status: 'Public',
      permissions: {
        isPublic: false,
        roleGroups: [],
        individualUsers: [
          { id: 'current-user', email: 'current.user@company.com', name: 'Current User', role: 'Owner', isVerified: true }
        ],
        allowPublicAccess: false,
        requireApproval: false
      },
      createdBy: 'current-user',
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
    setKnowledgeBases(prev => [newKB, ...prev]);
    setCurrentKB(newKB);
    setCurrentPage('upload');
    setIsCreateModalOpen(false);
  };

  const handleKBClick = (kb: KnowledgeBase) => {
    setCurrentKB(kb);
    setCurrentPage('chat');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setCurrentKB(null);
  };

  const handleGoToUpload = () => {
    setCurrentPage('upload');
  };

  const handleEditKB = (id: string) => {
    const kb = knowledgeBases.find(kb => kb.id === id);
    if (kb) {
      setEditingKB(kb);
      setIsEditModalOpen(true);
    }
  };

  const handleDeleteKB = (id: string) => {
    const kb = knowledgeBases.find(kb => kb.id === id);
    if (kb) {
      setDeletingKB(kb);
      setIsDeleteModalOpen(true);
    }
  };

  const handleEditSubmit = (name: string, emoji: string) => {
    if (editingKB) {
      setKnowledgeBases(prev => 
        prev.map(kb => 
          kb.id === editingKB.id 
            ? { ...kb, title: name, emoji, lastModified: new Date().toISOString() } 
            : kb
        )
      );
      setEditingKB(null);
      setIsEditModalOpen(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (deletingKB) {
      setKnowledgeBases(prev => prev.filter(kb => kb.id !== deletingKB.id));
      setDeletingKB(null);
      setIsDeleteModalOpen(false);
    }
  };

  // Helper function to get permission summary for display
  const getPermissionSummary = (permissions: KnowledgeBasePermissions) => {
    if (permissions.isPublic && permissions.allowPublicAccess) {
      return { type: 'Public', count: 0, color: 'bg-green-400' };
    }
    
    const totalUsers = permissions.individualUsers.length;
    const totalRoleGroupMembers = permissions.roleGroups.reduce((sum, group) => sum + group.memberCount, 0);
    const totalCount = totalUsers + totalRoleGroupMembers;
    
    if (totalCount === 0) {
      return { type: 'Private', count: 0, color: 'bg-gray-400' };
    }
    
    return { type: 'Shared', count: totalCount, color: 'bg-blue-400' };
  };

  // Render Upload Documents Page
  if (currentPage === 'upload' && currentKB) {
    return (
      <UploadDocumentsPage
        knowledgeBaseName={currentKB.title}
        onClose={handleBackToHome}
      />
    );
  }

  // Render Chat Interface
  if (currentPage === 'chat' && currentKB) {
    return (
      <ChatInterface
        knowledgeBaseName={currentKB.title}
        knowledgeBaseEmoji={currentKB.emoji}
        onBack={handleBackToHome}
        onAddDocuments={handleGoToUpload}
      />
    );
  }

  // Render Home Page
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-white mb-2">Knowledge Management</h1>
          <p className="text-gray-300 text-base mb-6">
            Create, manage, and share your organization's knowledge with powerful documentation tools and seamless integration capabilities.
          </p>
          
          {/* Search and Filter Bar */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 justify-between">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search knowledge base..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-purple-600 focus:outline-none"
                />
              </div>
              
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus size={20} />
                Create Central KB
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <button className="px-4 py-2 text-purple-400 hover:text-purple-300 transition-colors border-b border-purple-600">
                All Knowledge Bases
              </button>
            </div>
          </div>
        </div>

        {/* Knowledge Base Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {filteredKnowledgeBases.map((kb) => {
            const permissionSummary = getPermissionSummary(kb.permissions);
            return (
              <KnowledgeBaseCard
                key={kb.id}
                id={kb.id}
                title={kb.title}
                emoji={kb.emoji}
                status={kb.status}
                permissions={kb.permissions}
                permissionSummary={permissionSummary}
                onClick={() => handleKBClick(kb)}
                onEdit={handleEditKB}
                onDelete={handleDeleteKB}
              />
            );
          })}
        </div>

        {/* Empty State */}
        {filteredKnowledgeBases.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No knowledge bases found</div>
            <div className="text-gray-500 text-sm">Try adjusting your search terms</div>
          </div>
        )}
      </div>

      {/* Create Central KB Modal */}
      <CreateCentralKBModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateCentralKB}
      />

      {/* Edit Central KB Modal */}
      <EditCentralKBModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingKB(null);
        }}
        onSubmit={handleEditSubmit}
        currentName={editingKB?.title || ''}
        currentEmoji={editingKB?.emoji || ''}
      />

      {/* Delete Confirm Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingKB(null);
        }}
        onConfirm={handleDeleteConfirm}
        knowledgeBaseName={deletingKB?.title || ''}
      />
    </div>
  );
}

export default App;