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
  isIntroductory?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  knowledgeBaseName,
  knowledgeBaseEmoji,
  onBack,
  onAddDocuments,
  isIntroductory = false
}) => {
  const [message, setMessage] = useState('');
  const [selectAllSources, setSelectAllSources] = useState(true);
  const [chatHistory, setChatHistory] = useState<Array<{id: string, type: 'user' | 'assistant', content: string}>>([]);
  const [documents] = useState<Document[]>(
    isIntroductory ? [
      { id: '1', name: 'Getting Started Guide.pdf', type: 'pdf', selected: true },
      { id: '2', name: 'Knowledge Base Best Practices.docx', type: 'docx', selected: true },
      { id: '3', name: 'Feature Overview.xlsx', type: 'xlsx', selected: true },
      { id: '4', name: 'Quick Start Tutorial.mp4', type: 'video', selected: true },
      { id: '5', name: 'FAQ and Tips.json', type: 'json', selected: true },
    ] : [
      { id: '1', name: 'unisco_full_data_version1.json', type: 'json', selected: true },
      { id: '2', name: 'Youtube Videos List.xlsx', type: 'xlsx', selected: true },
      { id: '3', name: 'Facility List 05092025.xlsx', type: 'xlsx', selected: true },
      { id: '4', name: 'Support contact.xlsx', type: 'xlsx', selected: true },
      { id: '5', name: 'OPS Manager.xlsx', type: 'xlsx', selected: true },
    ]
  );

  const introductoryQuestions = [
    "What is a personal knowledge base? What are its advantages?",
    "How do I create and manage my knowledge base?",
    "What's the difference between personal and enterprise knowledge bases?",
    "How do I upload documents to my knowledge base?",
    "How can I have effective conversations with the AI assistant?",
    "How do I share content from my knowledge base?"
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const userMessage = {
        id: Date.now().toString(),
        type: 'user' as const,
        content: message.trim()
      };
      
      setChatHistory(prev => [...prev, userMessage]);
      
      // Simulate AI response for introductory mode
      if (isIntroductory) {
        setTimeout(() => {
          const aiResponse = generateIntroductoryResponse(message.trim());
          setChatHistory(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            type: 'assistant',
            content: aiResponse
          }]);
        }, 1000);
      }
      
      setMessage('');
    }
  };

  const generateIntroductoryResponse = (question: string): string => {
    const responses: {[key: string]: string} = {
      "What is a personal knowledge base? What are its advantages?": "A personal knowledge base is your own intelligent knowledge management system! 🧠✨\n\nKey advantages include:\n• 📚 Centralized management: Store all notes, documents, and ideas in one place\n• 🤖 AI assistant: Quickly find information through conversation\n• 🔒 Privacy protection: Completely under your control, secure and reliable data\n• 🔗 Smart connections: Automatically discover relationships between knowledge points\n• 📱 Access anytime: Access your knowledge base from any device\n\nIt's like your second brain, helping you better organize and utilize knowledge!",
      
      "How do I create and manage my knowledge base?": "Creating a knowledge base is very simple! 🚀\n\nSteps:\n1. 📝 Click the \"Create\" button\n2. 🎯 Choose an appropriate emoji and name\n3. 📄 Upload documents or add links\n4. 💬 Start conversing with the AI assistant\n\nManagement tips:\n• 🏷️ Use clear names and emojis for categorization\n• 📋 Regularly organize and update content\n• 🔍 Use the search function to quickly locate information\n• 🤝 Set sharing permissions as needed",
      
      "What's the difference between personal and enterprise knowledge bases?": "Each has its own features to meet different needs! 🎯\n\nPersonal Knowledge Base 👤:\n• 🔒 Completely private, under your control\n• 📝 Store personal notes, learning materials\n• 🎨 Free organization, personalized management\n• 💡 Support creative thinking and personal growth\n\nEnterprise Knowledge Base 🏢:\n• 👥 Team sharing, collaborative work\n• 📊 Store company documents, process standards\n• 🔄 Unified standards, standardized management\n• 📈 Support business decisions and team collaboration\n\nYou can use both simultaneously, keeping work and life separate!",
      
      "How do I upload documents to my knowledge base?": "There are multiple convenient ways to upload documents! 📁\n\nUpload methods:\n• 📎 Click the \"Add\" button to select files\n• 🖱️ Directly drag and drop files to the interface\n• 🔗 Add web links and online resources\n• 📱 Support various formats: PDF, Word, Excel, etc.\n\nTips:\n• 📋 Give meaningful names to documents\n• 🏷️ Organize by topic\n• 🔄 Regularly update outdated content\n• 💾 Recommended file size under 50MB",
      
      "How can I have effective conversations with the AI assistant?": "Conversing with the AI assistant is an art! 🎨\n\nEffective techniques:\n• ❓ Ask specific, clear questions\n• 📝 Clearly describe background and needs\n• 🔍 Use keywords to help locate information\n• 💬 You can ask follow-up questions and explore deeper\n\nExample questions:\n• \"Help me summarize the key points of project management\"\n• \"What are the pros and cons of this technical solution?\"\n• \"Based on my notes, recommend a learning path\"\n\nRemember: The AI assistant will answer based on the content in your knowledge base. The richer the content, the more precise the answers!",
      
      "How do I share content from my knowledge base?": "Share knowledge, spread wisdom! 🌟\n\nSharing methods:\n• 🔗 Generate sharing links\n• 👥 Invite specific users to access\n• 📋 Export as document formats\n• 🎯 Set access permission levels\n\nPermission control:\n• 👀 Read-only permission: Can only view\n• ✏️ Edit permission: Can modify\n• 👑 Admin permission: Full control\n• ⏰ Set access time limits\n\nSecurity reminder: Please confirm the confidentiality level of content before sharing!"
    };

    // Find the best matching response
    for (const [key, response] of Object.entries(responses)) {
      if (question.includes(key.slice(0, 6)) || key.includes(question.slice(0, 6))) {
        return response;
      }
    }

    // Default response
    return "Thank you for your question! 🤔 I'm your knowledge base guide, specifically helping new users understand how to use personal knowledge bases.\n\nYou can ask me about:\n• Basic concepts and advantages of knowledge bases\n• How to create and manage knowledge bases\n• Differences between personal vs enterprise knowledge bases\n• Document upload and management tips\n• Best practices for AI conversations\n• Content sharing and permission settings\n\nFeel free to ask specific questions, and I'll answer in detail! ✨";
  };

  const handleQuestionClick = (question: string) => {
    setMessage(question);
    handleSendMessage();
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
      case 'docx':
        return '📄';
      case 'video':
        return '🎥';
      default:
        return '📄';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Sidebar - Sources or Guidance */}
      <div className="w-80 bg-gray-900 border-r border-gray-700 flex flex-col">
        {/* Back Button and Header */}
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

        {/* Content based on mode */}
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
          {chatHistory.length === 0 ? (
            <div className="max-w-2xl text-center">
              <div className="text-6xl mb-6">{knowledgeBaseEmoji}</div>
              <h2 className="text-3xl font-medium text-white mb-4">{knowledgeBaseName}</h2>
              {isIntroductory ? (
                <>
                  <p className="text-gray-400 text-lg mb-8">
                    Welcome to the Beginner's Guide!
                  </p>
                  <p className="text-gray-400 text-base max-w-lg mx-auto mb-8">
                    I'm your personal guide, helping you quickly understand the powerful features of personal knowledge bases. Click on the questions below to start exploring, or directly enter your questions!
                  </p>
                  
                  {/* Predefined Questions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl">
                    {introductoryQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuestionClick(question)}
                        className="p-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600 hover:border-purple-500 rounded-lg text-left text-white transition-all duration-200 group"
                      >
                        
                        <div className="text-base group-hover:text-purple-300 transition-colors">{question}</div>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-400 text-lg mb-8">
                    {documents.length} sources
                  </p>
                  <p className="text-gray-400 text-base max-w-lg mx-auto">
                    Welcome to the Knowledge Base Assistant, you can ask me any questions about this knowledge base.
                  </p>
                </>
              )}
            </div>
          ) : (
            /* Chat History */
            <div className="w-full max-w-4xl">
              <div className="space-y-6">
                {chatHistory.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-3xl p-4 rounded-lg ${
                      msg.type === 'user' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-800 text-gray-100 border border-gray-700'
                    }`}>
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="p-6 border-t border-gray-700">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isIntroductory ? "Enter your question, or click on the preset questions above..." : "Type your message..."}
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