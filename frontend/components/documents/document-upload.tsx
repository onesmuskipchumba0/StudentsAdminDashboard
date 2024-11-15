'use client';

import { useState } from 'react';
import { api, APIError } from '@/lib/api';
import { Document } from '@/types/document';
import { toast } from 'react-hot-toast';
import { FaUpload, FaTimes } from 'react-icons/fa';

interface DocumentUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (document: Document) => void;
}

export function DocumentUpload({ isOpen, onClose, onSuccess }: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('tags', JSON.stringify(tags));

      const document = await api.uploadDocument(formData);
      onSuccess(document);
      toast.success('Document uploaded successfully');
      resetForm();
      onClose();
    } catch (err) {
      const message = err instanceof APIError ? err.message : 'Failed to upload document';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Invalid file type. Please upload PDF, DOC, DOCX, JPG or PNG files.');
        return;
      }

      setFile(selectedFile);
      setError(null);
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

  const resetForm = () => {
    setFile(null);
    setTags([]);
    setNewTag('');
    setError(null);
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
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                required
              />
              {file && (
                <div className="mt-2 flex items-center justify-between bg-base-200 p-2 rounded">
                  <span className="text-sm truncate">{file.name}</span>
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs"
                    onClick={() => setFile(null)}
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
              {error && (
                <label className="label">
                  <span className="label-text-alt text-error">{error}</span>
                </label>
              )}
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
              <button 
                type="button" 
                className="btn" 
                onClick={() => {
                  resetForm();
                  onClose();
                }}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading || !file}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm mr-2"></span>
                    Uploading...
                  </>
                ) : (
                  <>
                    <FaUpload className="mr-2" />
                    Upload
                  </>
                )}
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