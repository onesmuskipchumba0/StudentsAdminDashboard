'use client';

import { useState } from 'react';
import { api, APIError } from '@/lib/api';
import { Document } from '@/types/document';
import { toast } from 'react-hot-toast';

interface DocumentListProps {
  documents: Document[];
  onUpdate: (document: Document) => void;
  onDelete: (id: string) => void;
}

export function DocumentList({ documents, onUpdate, onDelete }: DocumentListProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleToggleStar = async (document: Document) => {
    try {
      const updatedDoc = await api.toggleStar(document._id);
      onUpdate(updatedDoc);
      toast.success(updatedDoc.starred ? 'Document starred' : 'Document unstarred');
    } catch (err) {
      const message = err instanceof APIError ? err.message : 'Failed to update document';
      toast.error(message);
    }
  };

  const handleToggleShare = async (document: Document) => {
    try {
      const updatedDoc = await api.toggleShare(document._id);
      onUpdate(updatedDoc);
      toast.success(updatedDoc.shared ? 'Document shared' : 'Document unshared');
    } catch (err) {
      const message = err instanceof APIError ? err.message : 'Failed to update document';
      toast.error(message);
    }
  };

  return (
    <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Size</th>
            <th>Modified</th>
            <th>Owner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc._id} className="hover">
              <td className="flex items-center gap-2">
                {getFileIcon(doc.type)}
                <span>{doc.name}</span>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => handleToggleStar(doc)}
                    className={`btn btn-ghost btn-xs ${doc.starred ? 'text-yellow-500' : ''}`}
                  >
                    <FaStar />
                  </button>
                  <button 
                    onClick={() => handleToggleShare(doc)}
                    className={`btn btn-ghost btn-xs ${doc.shared ? 'text-blue-500' : ''}`}
                  >
                    <FaShare />
                  </button>
                </div>
              </td>
              <td className="uppercase">{doc.type}</td>
              <td>{doc.size}</td>
              <td>{new Date(doc.updatedAt).toLocaleDateString()}</td>
              <td>{doc.owner}</td>
              <td>
                <div className="flex gap-2">
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => handleDownload(doc)}
                    disabled={loading === doc._id}
                  >
                    {loading === doc._id ? (
                      <span className="loading loading-spinner loading-xs" />
                    ) : (
                      <FaDownload />
                    )}
                  </button>
                  <button
                    className="btn btn-ghost btn-xs text-error"
                    onClick={() => onDelete(doc._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 