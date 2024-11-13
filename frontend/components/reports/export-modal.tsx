interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedYear: string;
  selectedDepartment: string;
  dateRange: {
    start: string;
    end: string;
  };
}

export function ExportModal({ 
  isOpen, 
  onClose, 
  selectedYear,
  selectedDepartment,
  dateRange 
}: ExportModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Example of how to handle the export with filters
    const exportConfig = {
      year: selectedYear,
      department: selectedDepartment,
      dateRange: dateRange,
      // Add other form values here
    };
    
    console.log('Exporting with config:', exportConfig);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Export Reports</h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Report Type</span>
              </label>
              <select className="select select-bordered" required>
                <option value="">Select report type</option>
                <option value="enrollment">Enrollment Report</option>
                <option value="grades">Grade Distribution</option>
                <option value="attendance">Attendance Report</option>
                <option value="revenue">Revenue Analysis</option>
                <option value="all">All Reports</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Format</span>
              </label>
              <select className="select select-bordered" required>
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Current Filters</span>
              </label>
              <div className="text-sm space-y-1 p-2 bg-base-200 rounded-lg">
                <p>Year: {selectedYear === 'all' ? 'All Years' : selectedYear}</p>
                <p>Department: {selectedDepartment === 'all' ? 'All Departments' : selectedDepartment}</p>
                {dateRange.start && dateRange.end && (
                  <p>Date Range: {dateRange.start} to {dateRange.end}</p>
                )}
              </div>
            </div>
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Export
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
} 