'use client';

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdmissionModal({ isOpen, onClose }: AdmissionModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-3xl">
        <h3 className="font-bold text-lg mb-4">New Admission Application</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {/* Personal Information */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered"
                placeholder="Enter email"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="tel"
                className="input input-bordered"
                placeholder="Enter phone number"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Date of Birth</span>
              </label>
              <input
                type="date"
                className="input input-bordered"
                required
              />
            </div>

            {/* Academic Information */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Previous School</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Enter previous school"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">GPA</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Enter GPA"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Department</span>
              </label>
              <select className="select select-bordered" required>
                <option value="">Select department</option>
                <option>Computer Science</option>
                <option>Mathematics</option>
                <option>Physics</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Semester</span>
              </label>
              <select className="select select-bordered" required>
                <option value="">Select semester</option>
                <option>Fall 2024</option>
                <option>Spring 2025</option>
              </select>
            </div>
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit Application
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