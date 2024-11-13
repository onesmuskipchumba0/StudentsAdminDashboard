interface DocumentSearchProps {
  onSearch: (query: string) => void;
}

export function DocumentSearch({ onSearch }: DocumentSearchProps) {
  return (
    <div className="form-control">
      <input
        type="text"
        placeholder="Search documents..."
        className="input input-bordered w-full"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
} 