import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { RichTextToolbar } from './RichTextToolbar';
import { Note } from '../types';

interface NoteEditorProps {
  note: Note | null;
  onBack: () => void;
  onSave: (note: Partial<Note>) => void;
}

export function NoteEditor({ note, onBack, onSave }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  useEffect(() => {
    // Simulate auto-save
    const timer = setTimeout(() => {
      if (title || content) {
        setIsAutoSaving(true);
        setTimeout(() => {
          setIsAutoSaving(false);
          onSave({ title, content });
        }, 500);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [title, content, onSave]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-slate-200 dark:border-slate-700">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div className="flex-1" />
        {isAutoSaving && (
          <span className="text-slate-500 dark:text-slate-400">
            Auto-saving...
          </span>
        )}
      </div>

      {/* Rich Text Toolbar */}
      <RichTextToolbar isAutoSaving={isAutoSaving} />

      {/* Editor */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6">
          <Input
            type="text"
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-none shadow-none p-0 mb-4 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          <Textarea
            placeholder="Start writing..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[500px] border-none shadow-none p-0 resize-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>
      </div>
    </div>
  );
}
