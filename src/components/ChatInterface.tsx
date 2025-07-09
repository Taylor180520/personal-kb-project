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
    isIntroductory ? [] : [
      { id: '1', name: 'unisco_full_data_version1.json', type: 'json', selected: true },
      { id: '2', name: 'Youtube Videos List.xlsx', type: 'xlsx', selected: true },
      { id: '3', name: 'Facility List 05092025.xlsx', type: 'xlsx', selected: true },
      { id: '4', name: 'Support contact.xlsx', type: 'xlsx', selected: true },
      { id: '5', name: 'OPS Manager.xlsx', type: 'xlsx', selected: true },
    ]
  );

  const introductoryQuestions = [
    "什么是个人知识库？它有什么优势？",
    "如何创建和管理我的知识库？",
    "个人知识库和企业知识库有什么区别？",
    "如何上传文档到知识库？",
    "如何与AI助手进行有效对话？",
    "如何分享我的知识库内容？"
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
      "什么是个人知识库？它有什么优势？": "个人知识库是您专属的智能知识管理系统！🧠✨\n\n主要优势包括：\n• 📚 集中管理：将所有笔记、文档、想法统一存储\n• 🤖 AI助手：通过对话快速找到所需信息\n• 🔒 隐私保护：完全由您控制，数据安全可靠\n• 🔗 智能关联：自动发现知识点之间的联系\n• 📱 随时访问：任何设备都能访问您的知识库\n\n它就像您的第二大脑，帮助您更好地组织和利用知识！",
      
      "如何创建和管理我的知识库？": "创建知识库非常简单！🚀\n\n步骤如下：\n1. 📝 点击\"创建\"按钮\n2. 🎯 选择合适的emoji和名称\n3. 📄 上传文档或添加链接\n4. 💬 开始与AI助手对话\n\n管理技巧：\n• 🏷️ 用清晰的名称和emoji分类\n• 📋 定期整理和更新内容\n• 🔍 使用搜索功能快速定位\n• 🤝 根据需要设置分享权限",
      
      "个人知识库和企业知识库有什么区别？": "两者各有特色，满足不同需求！🎯\n\n个人知识库 👤：\n• 🔒 完全私密，由您掌控\n• 📝 存储个人笔记、学习资料\n• 🎨 自由组织，个性化管理\n• 💡 支持创意思考和个人成长\n\n企业知识库 🏢：\n• 👥 团队共享，协作办公\n• 📊 存储公司文档、流程规范\n• 🔄 统一标准，规范管理\n• 📈 支持业务决策和团队协作\n\n您可以同时使用两者，工作和生活分开管理！",
      
      "如何上传文档到知识库？": "上传文档有多种便捷方式！📁\n\n上传方法：\n• 📎 点击\"添加\"按钮选择文件\n• 🖱️ 直接拖拽文件到界面\n• 🔗 添加网页链接和在线资源\n• 📱 支持多种格式：PDF、Word、Excel等\n\n小贴士：\n• 📋 给文档起有意义的名称\n• 🏷️ 按主题分类整理\n• 🔄 定期更新过时内容\n• 💾 建议单个文件不超过50MB",
      
      "如何与AI助手进行有效对话？": "与AI助手对话是一门艺术！🎨\n\n有效技巧：\n• ❓ 提出具体明确的问题\n• 📝 描述清楚背景和需求\n• 🔍 使用关键词帮助定位\n• 💬 可以追问和深入探讨\n\n示例问题：\n• \"帮我总结项目管理的要点\"\n• \"这个技术方案有什么优缺点？\"\n• \"根据我的笔记，推荐学习路径\"\n\n记住：AI助手会基于您的知识库内容回答，内容越丰富，回答越精准！",
      
      "如何分享我的知识库内容？": "分享知识，传播智慧！🌟\n\n分享方式：\n• 🔗 生成分享链接\n• 👥 邀请特定用户访问\n• 📋 导出为文档格式\n• 🎯 设置访问权限级别\n\n权限控制：\n• 👀 只读权限：只能查看\n• ✏️ 编辑权限：可以修改\n• 👑 管理权限：完全控制\n• ⏰ 设置访问时限\n\n安全提醒：分享前请确认内容的保密级别！"
    };

    // Find the best matching response
    for (const [key, response] of Object.entries(responses)) {
      if (question.includes(key.slice(0, 6)) || key.includes(question.slice(0, 6))) {
        return response;
      }
    }

    // Default response
    return "感谢您的问题！🤔 我是您的知识库向导，专门帮助新用户了解个人知识库的使用方法。\n\n您可以问我关于：\n• 知识库的基本概念和优势\n• 如何创建和管理知识库\n• 个人vs企业知识库的区别\n• 文档上传和管理技巧\n• AI对话的最佳实践\n• 内容分享和权限设置\n\n请随时提出具体问题，我会详细为您解答！✨";
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
            <h2 className="text-lg font-medium text-white">
              {isIntroductory ? '使用指南' : 'Sources'}
            </h2>
            {!isIntroductory && (
              <button className="text-gray-400 hover:text-white">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 3a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2H9v3a1 1 0 1 1-2 0V9H4a1 1 0 0 1 0-2h3V4a1 1 0 0 1 1-1z"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Content based on mode */}
        <div className="flex-1 flex flex-col">
          {isIntroductory ? (
            /* Guidance Content */
            <div className="p-4 space-y-4">
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                  🎯 快速开始
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  点击右侧的预设问题，或在下方输入框中直接提问
                </p>
                <ul className="text-gray-400 text-xs space-y-1">
                  <li>• 了解知识库基本概念</li>
                  <li>• 学习创建和管理技巧</li>
                  <li>• 掌握AI对话要领</li>
                </ul>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                  💡 使用技巧
                </h3>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li>• 提问要具体明确</li>
                  <li>• 可以随时追问细节</li>
                  <li>• 尝试不同的表达方式</li>
                </ul>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                  🚀 下一步
                </h3>
                <p className="text-gray-400 text-sm">
                  了解完基础功能后，返回首页创建您的第一个个人知识库吧！
                </p>
              </div>
            </div>
          ) : (
            /* Original Sources Content */
            <>
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
            </>
          )}
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
                    欢迎来到新手指南！
                  </p>
                  <p className="text-gray-400 text-base max-w-lg mx-auto mb-8">
                    我是您的专属向导，帮助您快速了解个人知识库的强大功能。点击下方问题开始探索，或直接输入您的疑问！
                  </p>
                  
                  {/* Predefined Questions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl">
                    {introductoryQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuestionClick(question)}
                        className="p-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600 hover:border-purple-500 rounded-lg text-left text-white transition-all duration-200 group"
                      >
                        <div className="text-sm text-purple-400 mb-1">💡 常见问题</div>
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
                placeholder={isIntroductory ? "输入您的问题，或点击上方预设问题..." : "Type your message..."}
                className="w-full px-4 py-3 pr-32 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 resize-none"
                rows={1}
                style={{ minHeight: '48px' }}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                {!isIntroductory && (
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <Paperclip size={20} />
                  </button>
                )}
                {!isIntroductory && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-gray-700 rounded text-sm text-gray-300 font-medium">
                    <span>{documents.filter(d => d.selected).length} sources</span>
                  </div>
                )}
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