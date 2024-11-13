interface DocumentFiltersProps {
  selectedTags: string[];
  selectedType: string;
  onTagSelect: (tags: string[]) => void;
  onTypeSelect: (type: string) => void;
  onSort: (sortKey: string) => void;
  sortBy: string;
}

export function DocumentFilters({
  selectedTags,
  selectedType,
  onTagSelect,
  onTypeSelect,
  onSort,
  sortBy
}: DocumentFiltersProps) {
  const availableTags = [
    'syllabus',
    'lectures',
    'notes',
    'assignments',
    'exams',
    'research',
    'admin'
  ];

  const documentTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'pdf', label: 'PDF' },
    { value: 'doc', label: 'Word' },
    { value: 'xls', label: 'Excel' },
    { value: 'ppt', label: 'PowerPoint' },
    { value: 'img', label: 'Images' }
  ];

  const sortOptions = [
    { value: 'modified', label: 'Last Modified' },
    { value: 'name', label: 'Name' },
    { value: 'size', label: 'Size' }
  ];

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body space-y-4">
        <h3 className="font-medium">Filters</h3>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Document Type</span>
          </label>
          <select
            className="select select-bordered"
            value={selectedType}
            onChange={(e) => onTypeSelect(e.target.value)}
          >
            {documentTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Tags</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <label
                key={tag}
                className={`badge badge-lg cursor-pointer ${
                  selectedTags.includes(tag) ? 'badge-primary' : 'badge-outline'
                }`}
                onClick={() => {
                  if (selectedTags.includes(tag)) {
                    onTagSelect(selectedTags.filter(t => t !== tag));
                  } else {
                    onTagSelect([...selectedTags, tag]);
                  }
                }}
              >
                {tag}
              </label>
            ))}
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Sort By</span>
          </label>
          <select
            className="select select-bordered"
            value={sortBy}
            onChange={(e) => onSort(e.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
} 