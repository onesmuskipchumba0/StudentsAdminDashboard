'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { api, APIError } from '@/lib/api';
import { Document, DocumentStats } from '@/types/document';
import { 
  DocumentList, 
  DocumentUpload,
  DocumentFilters,
  DocumentSearch,
  DocumentGrid
} from '@/components/documents';
import { FaThLarge, FaList, FaUpload } from 'react-icons/fa';

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  modified: string;
  owner: string;
  shared: boolean;
  starred: boolean;
  tags: string[];
}

export default function DocumentsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('modified');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [stats, setStats] = useState<DocumentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [documents, stats] = await Promise.all([
        api.getDocuments(),
        api.getDocumentStats()
      ]);

      setDocuments(documents);
      setStats(stats);
    } catch (err) {
      const message = err instanceof APIError ? err.message : 'Failed to fetch documents';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTagSelect = (tags: string[]) => {
    setSelectedTags(tags);
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };

  const handleSort = (sortKey: string) => {
    setSortBy(sortKey);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this document?')) return;

    try {
      await api.deleteDocument(id);
      toast.success('Document deleted successfully');
      fetchData();
    } catch (err) {
      const message = err instanceof APIError ? err.message : 'Failed to delete document';
      toast.error(message);
    }
  };

  const filteredDocuments = documents
    .filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => doc.tags.includes(tag));
      const matchesType = selectedType === 'all' || doc.type === selectedType;
      return matchesSearch && matchesTags && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'size':
          return parseFloat(a.size) - parseFloat(b.size);
        case 'modified':
          return new Date(b.modified).getTime() - new Date(a.modified).getTime();
        default:
          return 0;
      }
    });

  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Documents</h1>
          <button
            className="btn btn-primary"
            onClick={() => setIsUploadModalOpen(true)}
          >
            <FaUpload className="mr-2" />
            Upload
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <DocumentSearch onSearch={handleSearch} />
          </div>
          <div className="flex gap-2">
            <button
              className={`btn btn-square ${viewMode === 'grid' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setViewMode('grid')}
            >
              <FaThLarge />
            </button>
            <button
              className={`btn btn-square ${viewMode === 'list' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setViewMode('list')}
            >
              <FaList />
            </button>
          </div>
        </div>

        {/* Filters and Content */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64">
            <DocumentFilters
              selectedTags={selectedTags}
              selectedType={selectedType}
              onTagSelect={handleTagSelect}
              onTypeSelect={handleTypeSelect}
              onSort={handleSort}
              sortBy={sortBy}
            />
          </div>

          <div className="flex-1">
            {viewMode === 'grid' ? (
              <DocumentGrid 
                documents={filteredDocuments}
                onUpdate={(updatedDoc) => {
                  setDocuments(documents.map(doc => 
                    doc.id === updatedDoc.id ? updatedDoc : doc
                  ));
                }}
                onDelete={handleDelete}
              />
            ) : (
              <DocumentList 
                documents={filteredDocuments}
                onUpdate={(updatedDoc) => {
                  setDocuments(documents.map(doc => 
                    doc.id === updatedDoc.id ? updatedDoc : doc
                  ));
                }}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>

      <DocumentUpload
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={(newDoc) => {
          setDocuments([...documents, newDoc]);
          setIsUploadModalOpen(false);
        }}
      />
    </div>
  );
} 