# Permission Modal Project

A modern React-based permission management interface with an integrated invite system.

## Features

### 🎯 Main Functionality
- **Knowledge Base Management**: Create, edit, and manage knowledge bases
- **Permission Control**: Set different access levels (View-only, Can edit, Full access)
- **Team Management**: Organize users into teams and groups
- **Invite System**: Streamlined user invitation with integrated permission selection

### 🚀 Key Improvements
- **Integrated Search & Invite**: Permission selector is now embedded within the search box for better UX
- **Wider Modal Layout**: Increased modal width for better content display
- **Optimized Layout**: Invite button positioned alongside search for improved workflow

### 🎨 UI/UX Features
- **Dark/Light Theme**: Toggle between dark and light modes
- **Responsive Design**: Works seamlessly across different screen sizes
- **Modern Interface**: Clean, professional design with smooth transitions
- **Real-time Search**: Instant search results as you type

## Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **ESLint** for code quality

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Taylor180520/personal-kb-project.git
cd personal-kb-project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/           # React components
│   ├── SharePermissionModal.tsx    # Main permission modal
│   ├── KnowledgeBaseCard.tsx      # Knowledge base cards
│   ├── MyTeamsTab.tsx             # Teams management
│   └── ...                        # Other components
├── hooks/               # Custom React hooks
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## Key Components

### SharePermissionModal
The main permission management interface featuring:
- Integrated search box with permission selector
- User and group invitation system
- Real-time search suggestions
- Import contacts functionality

### Knowledge Base Management
- Create and manage knowledge bases
- Set privacy levels (Public/Private)
- Role-based access control
- Central knowledge base support

### Teams Management
- Create and manage teams
- Add/remove team members
- Role group assignments
- Bulk operations support

## Usage

### Inviting Users
1. Click the "Share" button on any knowledge base
2. Click "Invite people" to enter invite mode
3. Type usernames, emails, or group names in the search box
4. Select the appropriate permission level from the dropdown inside the search box
5. Click "Invite" to send invitations

### Managing Permissions
- Use the permission dropdown to set access levels
- View current permissions in the main sharing interface
- Revoke access or modify permissions as needed

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Recent Updates

### UI Improvements (Latest)
- ✅ Integrated permission selector within search box
- ✅ Repositioned Invite button for better workflow
- ✅ Increased modal width for improved layout
- ✅ Fixed permission selector positioning to stay in top-right corner
- ✅ Removed redundant import contacts section

### Contact

For questions or support, please open an issue on GitHub. 