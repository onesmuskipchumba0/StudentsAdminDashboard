import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

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
  const [loading, setLoading] = useState(false);
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [format, setFormat] = useState<'pdf' | 'excel'>('pdf');

  const reportTypes = [
    { id: 'enrollment', label: 'Enrollment Report' },
    { id: 'grades', label: 'Grade Distribution Report' },
    { id: 'departments', label: 'Department Statistics' },
    { id: 'attendance', label: 'Attendance Report' },
    { id: 'revenue', label: 'Revenue Analysis' }
  ];

  const handleExport = async () => {
    if (selectedReports.length === 0) {
      toast.error('Please select at least one report to export');
      return;
    }

    try {
      setLoading(true);
      // Call your API to generate the report
      const response = await fetch('/api/reports/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reports: selectedReports,
          format,
          filters: {
            year: selectedYear,
            department: selectedDepartment,
            dateRange
          }
        }),
      });

      if (!response.ok) throw new Error('Failed to export reports');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reports-${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export reports');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Export Reports</h3>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Select Reports to Export</span>
          </label>
          <div className="space-y-2">
            {reportTypes.map(report => (
              <label key={report.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectedReports.includes(report.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedReports([...selectedReports, report.id]);
                    } else {
                      setSelectedReports(selectedReports.filter(id => id !== report.id));
                    }
                  }}
                />
                <span>{report.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Export Format</span>
          </label>
          <select
            className="select select-bordered"
            value={format}
            onChange={(e) => setFormat(e.target.value as 'pdf' | 'excel')}
          >
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
          </select>
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleExport}
            disabled={loading || selectedReports.length === 0}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Exporting...
              </>
            ) : (
              'Export'
            )}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
} 