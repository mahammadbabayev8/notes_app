# Notes App UI Design

A modern, responsive, and feature-rich **Notes App** built with React, TailwindCSS, and Radix UI components. The app allows users to **create, edit, pin/unpin, search, and organize notes into folders**. All data is persisted in the browser using **localStorage**, making it a fully client-side solution.

---

## Features

- **Create and Edit Notes** – Add new notes or update existing ones.
- **Pin/Unpin Notes** – Keep important notes at the top.
- **Search Notes** – Quickly find notes by title or content.
- **Grid/List Views** – Toggle between different layouts.
- **Duplicate Notes** – Quickly copy existing notes.
- **Dark/Light Theme** – System or manual theme switching.
- **Responsive UI** – Optimized for desktop and mobile screens.

---

## Tech Stack

- **React 18** – Core UI framework.
- **Vite** – Fast build tool and development server.
- **TailwindCSS** – Utility-first CSS framework for styling.
- **Radix UI** – Accessible components for dropdowns, dialogs, popovers, and more.
- **Lucide React** – Icon library.
- **Sonner** – Toast notifications.
- **Next-Themes** – Theme switching (light/dark/system).
- **Recharts** – For future charting/analytics.
- **React Hook Form** – Form handling for note creation/editing.
- **Other Utilities**: `clsx`, `cmdk`, `embla-carousel-react`, `tailwind-merge` for state management, class composition, and UI helpers.

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/notes-app-ui.git
cd notes-app-ui
Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.
  


##  Folder Structure

  src/
├─ components/       # UI components (NoteCard, NotesListScreen, NoteEditor, EmptyState, etc.)
├─ data/             # Mock data (folders & notes)
├─ types/            # TypeScript types (Note, Folder, ViewMode, etc.)
├─ ui/               # Radix/Tailwind based UI primitives (Button, Input, DropdownMenu, etc.)
└─ App.tsx           # Main app component and state management
