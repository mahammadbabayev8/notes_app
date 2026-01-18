import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Note } from '../types';

interface NoteEditorProps {
  note: Note;
  onBack: () => void;
  onSave: (data: Partial<Note>) => void;
}

export function NoteEditor({ note, onBack, onSave }: NoteEditorProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note.id]);

  const handleSave = () => {
    onSave({
      title,
      content,
    });
  };

  return (
    <div className="h-full flex flex-col p-4 gap-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleSave}>
          Save
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto">

        <div className="max-w-4xl mx-auto p-6">

          <Input
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border-none shadow-none p-0 mb-4 placeholder:text-slate-400 dark:placeholder:text-slate-500"

          />

          <Textarea
            placeholder="Write your note..."
            className="min-h-[500px] border-none shadow-none p-0 resize-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
