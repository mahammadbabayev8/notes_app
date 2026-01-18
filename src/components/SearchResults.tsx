import { ArrowLeft, Search } from 'lucide-react';
import { Button } from './ui/button';
import { NoteCard } from './NoteCard';
import { EmptyState } from './EmptyState';
import { mockNotes } from '../data/mockData';
import { Note } from '../types';

interface SearchResultsProps {
  query: string;
  onBack: () => void;
  onSelectNote: (note: Note) => void;
}

export function SearchResults({ query, onBack, onSelectNote }: SearchResultsProps) {
  const searchResults = mockNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.content.toLowerCase().includes(query.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
  );

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-900/50 rounded px-1">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Search className="w-6 h-6 text-slate-400" />
            <div>
              <h1 className="text-slate-900 dark:text-slate-100">
                Search Results
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{query}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4">
          {searchResults.length === 0 ? (
            <EmptyState type="search" />
          ) : (
            <div className="flex flex-col gap-3">
              {searchResults.map((note) => (
                <div
                  key={note.id}
                  className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onSelectNote(note)}
                >
                  <h3 className="text-slate-900 dark:text-slate-100 mb-2">
                    {highlightText(note.title, query)}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 line-clamp-3">
                    {highlightText(note.content, query)}
                  </p>
                  {note.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())) && (
                    <div className="flex gap-2 mt-3">
                      {note.tags
                        .filter((tag) => tag.toLowerCase().includes(query.toLowerCase()))
                        .map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                          >
                            {highlightText(tag, query)}
                          </span>
                        ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
