'use client';

import { useState } from 'react';
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
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Course Syllabus 2024',
      type: 'pdf',
      size: '2.5 MB',
      modified: '2024-03-15',
      owner: 'John Doe',
      shared: true,
      starred: true,
      tags: ['syllabus', 'course']
    },
    {
      id: '2',
      name: 'Lecture Notes - Week 1',
      type: 'doc',
      size: '1.2 MB',
      modified: '2024-03-14',
      owner: 'John Doe',
      shared: false,
      starred: false,
      tags: ['lectures', 'notes']
    },
    // Add more dummy documents...
  ]);

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
              />
            ) : (
              <DocumentList 
                documents={filteredDocuments}
                onUpdate={(updatedDoc) => {
                  setDocuments(documents.map(doc => 
                    doc.id === updatedDoc.id ? updatedDoc : doc
                  ));
                }}
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