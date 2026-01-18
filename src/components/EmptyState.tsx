import { FileText, FolderOpen, Search } from 'lucide-react';
import { Button } from './ui/button';

interface EmptyStateProps {
  type: 'notes' | 'folders' | 'search';
  onAction?: () => void;
}

export function EmptyState({ type, onAction }: EmptyStateProps) {
  const configs = {
    notes: {
      icon: FileText,
      title: 'No notes yet',
      description: 'Create your first note to get started',
      actionLabel: 'Create Note',
    },
    folders: {
      icon: FolderOpen,
      title: 'No folders yet',
      description: 'Organize your notes by creating folders',
      actionLabel: 'Create Folder',
    },
    search: {
      icon: Search,
      title: 'No results found',
      description: 'Try adjusting your search terms',
      actionLabel: null,
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
        <Icon className="w-12 h-12 text-slate-400 dark:text-slate-500" />
      </div>
      <h3 className="text-slate-900 dark:text-slate-100 mb-2">{config.title}</h3>
      <p className="text-slate-500 dark:text-slate-400 mb-6 text-center max-w-sm">
        {config.description}
      </p>
      {config.actionLabel && onAction && (
        <Button onClick={onAction}>{config.actionLabel}</Button>
      )}
    </div>
  );
}
