import { useState } from 'react';
import { Search, Grid3x3, List, Plus, Filter } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { NoteCard } from './NoteCard';
import { EmptyState } from './EmptyState';
import { mockNotes, mockFolders } from '../data/mockData';
import { Note, ViewMode } from '../types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface NotesListScreenProps {
  onCreateNote: () => void;
  onSelectNote: (note: Note) => void;
  onSearch: (query: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function NotesListScreen({
  onCreateNote,
  onSelectNote,
  onSearch,
  viewMode,
  onViewModeChange,
}: NotesListScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value.trim()) {
      onSearch(value);
    }
  };

  const filteredNotes = mockNotes.filter((note) => {
    const matchesSearch = searchQuery
      ? note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesFolder =
      selectedFolder === 'all' ? true : note.folderId === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  const pinnedNotes = filteredNotes.filter((note) => note.isPinned);
  const unpinnedNotes = filteredNotes.filter((note) => !note.isPinned);

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-slate-900 dark:text-slate-100 mb-4">My Notes</h1>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters and View Toggle */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="w-4 h-4" />
                    {mockFolders.find((f) => f.id === selectedFolder)?.name || 'All Notes'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {mockFolders.map((folder) => (
                    <DropdownMenuItem
                      key={folder.id}
                      onClick={() => setSelectedFolder(folder.id)}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: folder.color }}
                        />
                        {folder.name}
                        <Badge variant="secondary">{folder.noteCount}</Badge>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('grid')}
                className="w-9 h-9 p-0"
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('list')}
                className="w-9 h-9 p-0"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4">
          {filteredNotes.length === 0 ? (
            <EmptyState type={searchQuery ? 'search' : 'notes'} onAction={onCreateNote} />
          ) : (
            <>
              {/* Pinned Notes */}
              {pinnedNotes.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-slate-700 dark:text-slate-300 mb-3">
                    Pinned
                  </h2>
                  <div
                    className={
                      viewMode === 'grid'
                        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
                        : 'flex flex-col gap-3'
                    }
                  >
                    {pinnedNotes.map((note) => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        viewMode={viewMode}
                        onClick={() => onSelectNote(note)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* All Notes */}
              {unpinnedNotes.length > 0 && (
                <div>
                  <h2 className="text-slate-700 dark:text-slate-300 mb-3">
                    {pinnedNotes.length > 0 ? 'All Notes' : ''}
                  </h2>
                  <div
                    className={
                      viewMode === 'grid'
                        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
                        : 'flex flex-col gap-3'
                    }
                  >
                    {unpinnedNotes.map((note) => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        viewMode={viewMode}
                        onClick={() => onSelectNote(note)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <Button
        onClick={onCreateNote}
        size="lg"
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
}
