interface Application {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  department: string;
  semester: string;
  status: string;
  submittedAt: string;
  previousSchool: string;
  gpa: string;
}

interface AdmissionsListProps {
  applications: Application[];
}

export function AdmissionsList({ applications }: AdmissionsListProps) {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'approved':
        return 'badge-success';
      case 'rejected':
        return 'badge-error';
      default:
        return 'badge-warning';
    }
  };

  return (
    <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Contact</th>
            <th>Department</th>
            <th>Previous School</th>
            <th>GPA</th>
            <th>Status</th>
            <th>Submitted</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td className="font-medium">{app.studentName}</td>
              <td>
                <div className="text-sm">{app.email}</div>
                <div className="text-xs text-gray-500">{app.phone}</div>
              </td>
              <td>
                <div className="text-sm">{app.department}</div>
                <div className="text-xs text-gray-500">{app.semester}</div>
              </td>
              <td>{app.previousSchool}</td>
              <td>{app.gpa}</td>
              <td>
                <div className={`badge ${getStatusBadgeClass(app.status)}`}>
                  {app.status}
                </div>
              </td>
              <td>{new Date(app.submittedAt).toLocaleDateString()}</td>
              <td>
                <div className="flex gap-2">
                  <button className="btn btn-sm btn-ghost">View</button>
                  <button className="btn btn-sm btn-primary">Update</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 