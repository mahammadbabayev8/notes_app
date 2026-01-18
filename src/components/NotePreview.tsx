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
import { toast } from 'sonner';

interface NotePreviewProps {
  note: Note;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePin: () => void;
  onDuplicate: () => void;
}

export function NotePreview({
  note,
  onBack,
  onEdit,
  onDelete,
  onTogglePin,
  onDuplicate,
}: NotePreviewProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const formatFullDate = (date: Date) =>
    date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(note.content);
      toast.success('Note content copied to clipboard');
    } catch {
      toast.error('Failed to copy note');
    }
  };

  const handleDeleteConfirm = () => {
    onDelete();
    setDeleteDialogOpen(false);
    toast.success('Note deleted');
  };

  const handlePin = () => {
    onTogglePin();
    toast.success(note.isPinned ? 'Note unpinned' : 'Note pinned');
  };

  const handleDuplicate = () => {
    onDuplicate();
    toast.success('Note duplicated');
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4 cursor-pointer" />
            Back
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handlePin} className="gap-2">
              <Pin
                className={`w-4 h-4 ${
                  note.isPinned ? 'fill-current text-amber-600' : ''
                }`}
              />
              {note.isPinned ? 'Unpin' : 'Pin'}
            </Button>

            <Button variant="ghost" size="sm" onClick={onEdit} className="gap-2">
              <Edit className="w-4 h-4 " />
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
              className="gap-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg border p-8">
            <h1 className="mb-4">{note.title}</h1>

            <div className="flex gap-6 pb-4 mb-6 border-b text-sm text-slate-500">
              <div>
                <div>Created</div>
                <div>{formatFullDate(note.createdAt)}</div>
              </div>
              <div>
                <div>Updated</div>
                <div>{formatFullDate(note.updatedAt)}</div>
              </div>
            </div>

            {note.tags.length > 0 && (
              <div className="mb-6 flex gap-2 flex-wrap">
                {note.tags.map(tag => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            )}

            <p className="whitespace-pre-wrap">{note.content}</p>
          </div>
        </div>
      </div>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Note</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{note.title}"?
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
