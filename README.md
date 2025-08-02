# Classic Mac OS Desktop

A nostalgic recreation of the classic Mac OS desktop experience from the 1990s, built with modern web technologies while maintaining the iconic visual design and user experience of Apple's classic operating system.

## Features

- 🖥️ **Authentic Classic Mac OS UI**: Recreated with attention to detail
- 🪟 **Draggable Windows**: Windows can be moved around the desktop
- 📱 **Desktop Icons**: Clickable and draggable desktop icons
- 🌙 **Dark/Light Mode**: Toggle between classic and modern themes
- ⚡ **Modern Tech Stack**: Built with React, TypeScript, and Tailwind CSS
- 🎨 **Responsive Design**: Works on different screen sizes
- 🚀 **Fast Development**: Hot reload with Vite

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd classic-mac-desktop
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

## Features in Detail

### Desktop Icons
- Click to open windows
- Drag to reposition
- Hover effects with color changes
- Authentic 90s styling

### Windows
- Draggable title bars
- Minimize and close buttons
- Resizable content areas
- Classic window styling

### Menu Bar
- Apple logo and system name
- Theme toggle (light/dark mode)
- Classic Mac OS styling

### Taskbar
- Shows open windows
- Click to restore minimized windows
- Real-time clock display

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the classic Mac OS interface design
- Built with modern web technologies for the best of both worlds
- Icons provided by [Lucide React](https://lucide.dev/)

## Screenshots

[Add screenshots here when available]

---

Built with ❤️ using React & TypeScript 