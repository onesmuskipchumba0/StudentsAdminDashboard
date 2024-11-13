interface Payment {
  id: string;
  studentName: string;
  studentId: string;
  amount: number;
  type: string;
  status: string;
  date: string;
  paymentMethod: string;
  semester: string;
}

interface PaymentHistoryProps {
  payments: Payment[];
}

export function PaymentHistory({ payments }: PaymentHistoryProps) {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'paid':
        return 'badge-success';
      case 'pending':
        return 'badge-warning';
      case 'overdue':
        return 'badge-error';
      default:
        return 'badge-ghost';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Student</th>
            <th>Payment Details</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>
                <div className="font-medium">{payment.studentName}</div>
                <div className="text-sm text-gray-500">{payment.studentId}</div>
              </td>
              <td>
                <div className="font-medium">{payment.type}</div>
                <div className="text-sm text-gray-500">
                  {payment.paymentMethod} • {payment.semester}
                </div>
              </td>
              <td className="font-medium">
                {formatCurrency(payment.amount)}
              </td>
              <td>
                <div className={`badge ${getStatusBadgeClass(payment.status)}`}>
                  {payment.status}
                </div>
              </td>
              <td>{new Date(payment.date).toLocaleDateString()}</td>
              <td>
                <div className="flex gap-2">
                  <button className="btn btn-sm btn-ghost">View</button>
                  <button className="btn btn-sm btn-primary">Receipt</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 