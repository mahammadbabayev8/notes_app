export type ViewMode = 'grid' | 'list';

export interface Note {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  folderId: string | null;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  hasImage?: boolean;
  hasVoiceNote?: boolean;
}

export interface Folder {
  id: string;
  name: string;
  color: string;
  noteCount: number;
}

export type Screen = 'home' | 'editor' | 'folders' | 'preview' | 'settings' | 'search';

export interface AppState {
  currentScreen: Screen;
  selectedNote: Note | null;
  editingNote: Note | null;
  viewMode: ViewMode;
  theme: 'light' | 'dark' | 'system';
  searchQuery: string;
}
