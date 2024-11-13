'use client';

interface DepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DepartmentModal({ isOpen, onClose }: DepartmentModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Add New Department</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Department Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              placeholder="Enter department name"
              required
            />
          </div>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              placeholder="Enter description"
              rows={4}
            />
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
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