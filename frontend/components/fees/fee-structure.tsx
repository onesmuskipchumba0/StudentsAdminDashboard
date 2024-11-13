const feeStructure = [
  {
    department: 'Computer Science',
    semester: 'Fall 2024',
    tuitionFee: 5000,
    labFee: 500,
    libraryFee: 200,
    activityFee: 100,
    total: 5800
  },
  {
    department: 'Mathematics',
    semester: 'Fall 2024',
    tuitionFee: 4500,
    labFee: 300,
    libraryFee: 200,
    activityFee: 100,
    total: 5100
  },
  // Add more departments
];

export function FeeStructure() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
      <table className="table">
        <thead>
          <tr>
            <th>Department</th>
            <th>Semester</th>
            <th>Tuition Fee</th>
            <th>Lab Fee</th>
            <th>Library Fee</th>
            <th>Activity Fee</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {feeStructure.map((fee, index) => (
            <tr key={index}>
              <td className="font-medium">{fee.department}</td>
              <td>{fee.semester}</td>
              <td>{formatCurrency(fee.tuitionFee)}</td>
              <td>{formatCurrency(fee.labFee)}</td>
              <td>{formatCurrency(fee.libraryFee)}</td>
              <td>{formatCurrency(fee.activityFee)}</td>
              <td className="font-medium">{formatCurrency(fee.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 