import React, { useState } from 'react';
import { ArrowLeft, Plus, Send, Paperclip } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  selected: boolean;
}

interface ChatInterfaceProps {
  knowledgeBaseName: string;
  knowledgeBaseEmoji: string;
  onBack: () => void;
  onAddDocuments: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  knowledgeBaseName,
  knowledgeBaseEmoji,
  onBack,
  onAddDocuments
}) => {
  const [message, setMessage] = useState('');
  const [selectAllSources, setSelectAllSources] = useState(true);
  const [documents] = useState<Document[]>([
    { id: '1', name: 'unisco_full_data_version1.json', type: 'json', selected: true },
    { id: '2', name: 'Youtube Videos List.xlsx', type: 'xlsx', selected: true },
    { id: '3', name: 'Facility List 05092025.xlsx', type: 'xlsx', selected: true },
    { id: '4', name: 'Support contact.xlsx', type: 'xlsx', selected: true },
    { id: '5', name: 'OPS Manager.xlsx', type: 'xlsx', selected: true },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'json':
        return '📄';
      case 'xlsx':
        return '📊';
      case 'pdf':
        return '📕';
      default:
        return '📄';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Sidebar - Sources */}
      <div className="w-80 bg-gray-900 border-r border-gray-700 flex flex-col">
        {/* Back Button and Sources Header */}
        <div className="p-4 border-b border-gray-700">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-white">Sources</h2>
            <button className="text-gray-400 hover:text-white">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 3a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2H9v3a1 1 0 1 1-2 0V9H4a1 1 0 0 1 0-2h3V4a1 1 0 0 1 1-1z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Add Button, Select All, and Document List */}
        <div className="flex-1 flex flex-col">
          {/* Add Button */}
          <div className="p-4">
            <button
              onClick={onAddDocuments}
              className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Plus size={16} />
              Add
            </button>
          </div>

          {/* Select All Sources */}
          <div className="px-4 pb-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectAllSources}
                onChange={(e) => setSelectAllSources(e.target.checked)}
                className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-600 focus:ring-2"
              />
              <span className="text-white font-medium">Select all sources</span>
            </label>
          </div>

          {/* Document List */}
          <div className="flex-1 overflow-y-auto">
            {documents.map((doc) => (
              <div key={doc.id} className="px-4 py-3 border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={doc.selected}
                    onChange={() => {}}
                    className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-600 focus:ring-2"
                  />
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-lg">{getFileIcon(doc.type)}</span>
                    <span className="text-white text-sm">{doc.name}</span>
                  </div>
                  <button className="text-gray-400 hover:text-white">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                    </svg>
                  </button>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Chat */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-medium text-white">Chat</h1>
        </div>

        {/* Chat Content */}
        <div className="flex-1 p-6 flex flex-col justify-center items-center">
          <div className="max-w-2xl text-center">
            <div className="text-6xl mb-6">{knowledgeBaseEmoji}</div>
            <h2 className="text-3xl font-medium text-white mb-4">{knowledgeBaseName}</h2>
            <p className="text-gray-400 text-lg mb-8">
              {documents.length} sources
            </p>
            <p className="text-gray-400 text-base max-w-lg mx-auto">
              Welcome to the Knowledge Base Assistant, you can ask me any questions about this knowledge base.
            </p>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-6 border-t border-gray-700">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full px-4 py-3 pr-32 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 resize-none"
                rows={1}
                style={{ minHeight: '48px' }}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Paperclip size={20} />
                </button>
                <div className="flex items-center gap-1 px-3 py-1 bg-gray-700 rounded text-sm text-gray-300 font-medium">
                  <span>{documents.filter(d => d.selected).length} sources</span>
                </div>
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface; 