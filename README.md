# Portfolio late 2025: I vibe-coded that `TunaOS`

In order to just going full out for using TypeScript, I vibe-coded this.

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd 2na3k-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

## Project Structure

```
src/
├── components/          # React components
│   ├── DesktopIcon.tsx  # Desktop icon component
│   ├── Window.tsx       # Window component
│   ├── AboutContent.tsx # About window content
│   └── ProjectsContent.tsx # Projects window content
├── types/               # TypeScript type definitions
│   └── index.ts         # Main types file
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles and Tailwind imports
```

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool and dev server
- **Lucide React** - Icons
- **ESLint** - Code linting

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the classic Mac OS interface design
- Built with modern web technologies for the best of both worlds
- Icons provided by [Lucide React](https://lucide.dev/)

## TODOS:
- 
- Thinking how to mock the icon of MacOS
- Add proper topbar, another dropdown button to navigate (search?)
- Features: Photo
- Features: Audio player
- Features: Folder-in-folder
- Features: CV folder
- Features: Easter Egg