import { Note } from '../types';
import { Pin, Image as ImageIcon, Mic } from 'lucide-react';
import { Badge } from './ui/badge';

interface NoteCardProps {
  note: Note;
  viewMode: 'grid' | 'list';
  onClick: () => void;
}

export function NoteCard({ note, viewMode, onClick }: NoteCardProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const truncateContent = (content: string, maxLength: number) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (viewMode === 'list') {
    return (
      <div
        onClick={onClick}
        className={`p-4 rounded-lg border transition-all cursor-pointer hover:shadow-md ${
          note.isPinned
            ? 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/30'
            : 'bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700'
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {note.isPinned && (
                <Pin className="w-4 h-4 text-amber-600 dark:text-amber-500 fill-amber-600 dark:fill-amber-500" />
              )}
              <h3 className="text-slate-900 dark:text-slate-100 truncate">
                {note.title}
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">
              {note.content}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-500 dark:text-slate-400">
                {formatDate(note.updatedAt)}
              </span>
              {note.hasImage && (
                <Badge variant="secondary" className="gap-1">
                  <ImageIcon className="w-3 h-3" />
                </Badge>
              )}
              {note.hasVoiceNote && (
                <Badge variant="secondary" className="gap-1">
                  <Mic className="w-3 h-3" />
                </Badge>
              )}
              {note.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg border transition-all cursor-pointer hover:shadow-md h-full ${
        note.isPinned
          ? 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/30'
          : 'bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-slate-900 dark:text-slate-100 line-clamp-2 flex-1">
            {note.title}
          </h3>
          {note.isPinned && (
            <Pin className="w-4 h-4 text-amber-600 dark:text-amber-500 fill-amber-600 dark:fill-amber-500 flex-shrink-0" />
          )}
        </div>
        <p className="text-slate-600 dark:text-slate-400 line-clamp-4 mb-3 flex-1">
          {note.content}
        </p>
        <div className="flex items-center gap-2 flex-wrap mt-auto">
          <span className="text-slate-500 dark:text-slate-400">
            {formatDate(note.updatedAt)}
          </span>
          {note.hasImage && (
            <Badge variant="secondary" className="gap-1">
              <ImageIcon className="w-3 h-3" />
            </Badge>
          )}
          {note.hasVoiceNote && (
            <Badge variant="secondary" className="gap-1">
              <Mic className="w-3 h-3" />
            </Badge>
          )}
        </div>
        {note.tags.length > 0 && (
          <div className="flex gap-1 mt-2 flex-wrap">
            {note.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
