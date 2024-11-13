interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Record Payment</h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Student ID</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Enter student ID"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Payment Type</span>
              </label>
              <select className="select select-bordered" required>
                <option value="">Select payment type</option>
                <option>Tuition Fee</option>
                <option>Laboratory Fee</option>
                <option>Library Fee</option>
                <option>Activity Fee</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Amount</span>
              </label>
              <input
                type="number"
                className="input input-bordered"
                placeholder="Enter amount"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Payment Method</span>
              </label>
              <select className="select select-bordered" required>
                <option value="">Select payment method</option>
                <option>Cash</option>
                <option>Credit Card</option>
                <option>Bank Transfer</option>
                <option>Online Payment</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Payment Date</span>
              </label>
              <input
                type="date"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Notes</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Enter any additional notes"
                rows={3}
              />
            </div>
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Record Payment
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