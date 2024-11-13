import { useState } from 'react';
import { Document } from '@/app/(dashboard)/documents/page';
import { FaUpload } from 'react-icons/fa';

interface DocumentUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (document: Document) => void;
}

export function DocumentUpload({ isOpen, onClose, onUpload }: DocumentUploadProps) {
  const [files, setFiles] = useState<FileList | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files && files.length > 0) {
      const file = files[0];
      const newDoc: Document = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.name.split('.').pop() || 'unknown',
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        modified: new Date().toISOString(),
        owner: 'Current User',
        shared: false,
        starred: false,
        tags: tags
      };
      
      onUpload(newDoc);
      setFiles(null);
      setTags([]);
      setNewTag('');
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()]);
      }
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Upload Document</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Select File</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                onChange={(e) => setFiles(e.target.files)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Tags</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Type a tag and press Enter"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="badge badge-primary gap-2"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    {tag}
                    <button type="button">&times;</button>
                  </span>
                ))}
              </div>
            </div>

            <div className="modal-action">
              <button type="button" className="btn" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <FaUpload className="mr-2" />
                Upload
              </button>
            </div>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
} 