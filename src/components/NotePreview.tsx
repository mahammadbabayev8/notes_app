import { ArrowLeft, Edit, Share2, Trash2, Copy, Pin } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Note } from '../types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface NotePreviewProps {
  note: Note;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function NotePreview({ note, onBack, onEdit, onDelete }: NotePreviewProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleShare = () => {
    toast.success('Share link copied to clipboard');
  };

  const handleDuplicate = () => {
    toast.success('Note duplicated');
  };

  const handlePin = () => {
    toast.success(note.isPinned ? 'Note unpinned' : 'Note pinned');
  };

  const handleDeleteConfirm = () => {
    onDelete();
    setDeleteDialogOpen(false);
    toast.success('Note deleted');
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePin}
                className="gap-2"
              >
                <Pin
                  className={`w-4 h-4 ${
                    note.isPinned ? 'fill-current text-amber-600' : ''
                  }`}
                />
                {note.isPinned ? 'Unpin' : 'Pin'}
              </Button>
              <Button variant="ghost" size="sm" onClick={onEdit} className="gap-2">
                <Edit className="w-4 h-4" />
                Edit
              </Button>
              <Button variant="ghost" size="sm" onClick={handleShare} className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDuplicate}
                className="gap-2"
              >
                <Copy className="w-4 h-4" />
                Duplicate
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDeleteDialogOpen(true)}
                className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Note Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8">
            {/* Title */}
            <h1 className="text-slate-900 dark:text-slate-100 mb-4">
              {note.title}
            </h1>

            {/* Metadata */}
            <div className="flex items-center gap-4 pb-4 mb-6 border-b border-slate-200 dark:border-slate-700 flex-wrap">
              <div className="flex flex-col gap-1">
                <span className="text-slate-500 dark:text-slate-400">Created</span>
                <span className="text-slate-700 dark:text-slate-300">
                  {formatFullDate(note.createdAt)}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-slate-500 dark:text-slate-400">
                  Last updated
                </span>
                <span className="text-slate-700 dark:text-slate-300">
                  {formatFullDate(note.updatedAt)}
                </span>
              </div>
            </div>

            {/* Tags */}
            {note.tags.length > 0 && (
              <div className="mb-6">
                <div className="flex gap-2 flex-wrap">
                  {note.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                {note.content}
              </p>
            </div>

            {/* Attachments */}
            {(note.hasImage || note.hasVoiceNote) && (
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <h3 className="text-slate-900 dark:text-slate-100 mb-3">
                  Attachments
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {note.hasImage && (
                    <Badge variant="outline" className="gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      Image attachment
                    </Badge>
                  )}
                  {note.hasVoiceNote && (
                    <Badge variant="outline" className="gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500" />
                      Voice recording
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Note</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{note.title}"? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
