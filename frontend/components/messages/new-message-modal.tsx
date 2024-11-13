'use client';

interface NewMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewMessageModal({ isOpen, onClose }: NewMessageModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">New Message</h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Recipient</span>
              </label>
              <select className="select select-bordered" required>
                <option value="">Select recipient</option>
                <option value="1">Dr. Sarah Johnson</option>
                <option value="2">Prof. Michael Chen</option>
                <option value="3">Dr. Emily Brown</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Type your message..."
                rows={4}
                required
              />
            </div>
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Send Message
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