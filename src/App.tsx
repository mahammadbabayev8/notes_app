import { useState, useEffect } from 'react';
import { Menu, FileText, FolderOpen, Settings as SettingsIcon } from 'lucide-react';
import { Button } from './components/ui/button';
import { NotesListScreen } from './components/NotesListScreen';
import { NoteEditor } from './components/NoteEditor';
import { FoldersScreen } from './components/FoldersScreen';
import { NotePreview } from './components/NotePreview';
import { SettingsScreen } from './components/SettingsScreen';
import { SearchResults } from './components/SearchResults';
import { Toaster } from './components/ui/sonner';
import { mockNotes } from './data/mockData';
import { Note, Screen, ViewMode } from './types';
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Apply theme
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const handleCreateNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      isPinned: false,
      folderId: null,
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setEditingNote(newNote);
    setCurrentScreen('editor');
  };

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
    setCurrentScreen('preview');
  };

  const handleEditNote = () => {
    setEditingNote(selectedNote);
    setCurrentScreen('editor');
  };

  const handleDeleteNote = () => {
    setSelectedNote(null);
    setCurrentScreen('home');
  };

  const handleSaveNote = (noteData: Partial<Note>) => {
    // In a real app, this would save to a database
    console.log('Saving note:', noteData);
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setSelectedNote(null);
    setEditingNote(null);
    setSearchQuery('');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentScreen('search');
  };

  const navigationItems = [
    { id: 'home' as Screen, label: 'All Notes', icon: FileText },
    { id: 'folders' as Screen, label: 'Folders', icon: FolderOpen },
    { id: 'settings' as Screen, label: 'Settings', icon: SettingsIcon },
  ];

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
    setSidebarOpen(false);
  };

  const Sidebar = () => (
    <nav className="p-4 space-y-2">
      <div className="mb-6">
        <h2 className="text-slate-900 dark:text-slate-100 px-3 mb-2">Notes App</h2>
        <p className="text-slate-500 dark:text-slate-400 px-3">
          {mockNotes.length} notes
        </p>
      </div>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.id}
            variant={currentScreen === item.id ? 'default' : 'ghost'}
            className="w-full justify-start gap-3"
            onClick={() => handleNavigate(item.id)}
          >
            <Icon className="w-5 h-5" />
            {item.label}
          </Button>
        );
      })}
    </nav>
  );

  return (
    <div className="h-screen flex overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <Sidebar />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>
          <h2 className="text-slate-900 dark:text-slate-100">Notes App</h2>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden md:mt-0 mt-16">
        {currentScreen === 'home' && (
          <NotesListScreen
            onCreateNote={handleCreateNote}
            onSelectNote={handleSelectNote}
            onSearch={handleSearch}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        )}
        {currentScreen === 'editor' && (
          <NoteEditor
            note={editingNote}
            onBack={handleBackToHome}
            onSave={handleSaveNote}
          />
        )}
        {currentScreen === 'folders' && <FoldersScreen onBack={handleBackToHome} />}
        {currentScreen === 'preview' && selectedNote && (
          <NotePreview
            note={selectedNote}
            onBack={handleBackToHome}
            onEdit={handleEditNote}
            onDelete={handleDeleteNote}
          />
        )}
        {currentScreen === 'settings' && (
          <SettingsScreen
            onBack={handleBackToHome}
            theme={theme}
            onThemeChange={setTheme}
          />
        )}
        {currentScreen === 'search' && (
          <SearchResults
            query={searchQuery}
            onBack={handleBackToHome}
            onSelectNote={handleSelectNote}
          />
        )}
      </main>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}
