'use client';

import { useState, useMemo } from 'react';
import { 
  EnrollmentChart, 
  GradeDistribution,
  DepartmentStats,
  AttendanceChart,
  RevenueChart,
  ExportModal 
} from '@/components/reports';
import { FaDownload, FaChartBar } from 'react-icons/fa';

// Update data interfaces to include all necessary fields
interface EnrollmentData {
  year: string;
  semester: string;
  department: string;
  students: number;
}

interface GradeData {
  grade: string;
  students: number;
  department: string;
  year: string;
  semester: string;
}

interface DepartmentData {
  name: string;
  students: number;
  faculty: number;
  courses: number;
  year: string;
}

interface AttendanceData {
  month: string;
  attendance: number;
  department: string;
  year: string;
}

interface RevenueData {
  month: string;
  tuition: number;
  fees: number;
  other: number;
  department: string;
  year: string;
}

// Update dummy data to include department and year information
const enrollmentData: EnrollmentData[] = [
  {
    year: '2024',
    semester: 'Spring',
    department: 'Computer Science',
    students: 620
  },
  {
    year: '2024',
    semester: 'Spring',
    department: 'Mathematics',
    students: 450
  },
  // Add more data...
];

// Add grade distribution data
const gradeData: GradeData[] = [
  {
    grade: 'A',
    students: 120,
    department: 'Computer Science',
    year: '2024',
    semester: 'Spring'
  },
  {
    grade: 'B',
    students: 200,
    department: 'Computer Science',
    year: '2024',
    semester: 'Spring'
  },
  {
    grade: 'C',
    students: 150,
    department: 'Computer Science',
    year: '2024',
    semester: 'Spring'
  },
  {
    grade: 'D',
    students: 80,
    department: 'Computer Science',
    year: '2024',
    semester: 'Spring'
  },
  {
    grade: 'F',
    students: 50,
    department: 'Computer Science',
    year: '2024',
    semester: 'Spring'
  },
  // Mathematics Department
  {
    grade: 'A',
    students: 90,
    department: 'Mathematics',
    year: '2024',
    semester: 'Spring'
  },
  {
    grade: 'B',
    students: 160,
    department: 'Mathematics',
    year: '2024',
    semester: 'Spring'
  },
  {
    grade: 'C',
    students: 130,
    department: 'Mathematics',
    year: '2024',
    semester: 'Spring'
  },
  {
    grade: 'D',
    students: 60,
    department: 'Mathematics',
    year: '2024',
    semester: 'Spring'
  },
  {
    grade: 'F',
    students: 40,
    department: 'Mathematics',
    year: '2024',
    semester: 'Spring'
  },
  // Physics Department
  {
    grade: 'A',
    students: 80,
    department: 'Physics',
    year: '2024',
    semester: 'Spring'
  },
  {
    grade: 'B',
    students: 140,
    department: 'Physics',
    year: '2024',
    semester: 'Spring'
  },
  {
    grade: 'C',
    students: 120,
    department: 'Physics',
    year: '2024',
    semester: 'Spring'
  },
  {
    grade: 'D',
    students: 70,
    department: 'Physics',
    year: '2024',
    semester: 'Spring'
  },
  {
    grade: 'F',
    students: 45,
    department: 'Physics',
    year: '2024',
    semester: 'Spring'
  },
  // Add Fall semester data
  {
    grade: 'A',
    students: 110,
    department: 'Computer Science',
    year: '2023',
    semester: 'Fall'
  },
  {
    grade: 'B',
    students: 180,
    department: 'Computer Science',
    year: '2023',
    semester: 'Fall'
  },
  {
    grade: 'C',
    students: 140,
    department: 'Computer Science',
    year: '2023',
    semester: 'Fall'
  },
  {
    grade: 'D',
    students: 75,
    department: 'Computer Science',
    year: '2023',
    semester: 'Fall'
  },
  {
    grade: 'F',
    students: 45,
    department: 'Computer Science',
    year: '2023',
    semester: 'Fall'
  }
];

// Department statistics data
const departmentData: DepartmentData[] = [
  {
    name: 'Computer Science',
    students: 250,
    faculty: 20,
    courses: 45,
    year: '2024'
  },
  {
    name: 'Mathematics',
    students: 180,
    faculty: 15,
    courses: 35,
    year: '2024'
  },
  {
    name: 'Physics',
    students: 150,
    faculty: 12,
    courses: 30,
    year: '2024'
  },
  {
    name: 'Engineering',
    students: 220,
    faculty: 18,
    courses: 40,
    year: '2024'
  }
];

// Attendance data
const attendanceData: AttendanceData[] = [
  {
    month: 'Jan',
    attendance: 92,
    department: 'Computer Science',
    year: '2024',
    totalStudents: 250,
    presentStudents: 230
  },
  {
    month: 'Feb',
    attendance: 88,
    department: 'Computer Science',
    year: '2024',
    totalStudents: 250,
    presentStudents: 220
  },
  // Add more months and departments...
];

// Revenue data
const revenueData: RevenueData[] = [
  {
    month: 'Jan',
    tuition: 150000,
    fees: 25000,
    other: 10000,
    department: 'Computer Science',
    year: '2024'
  },
  {
    month: 'Feb',
    tuition: 160000,
    fees: 28000,
    other: 12000,
    department: 'Computer Science',
    year: '2024'
  },
  // Add more months and departments...
];

export default function ReportsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });

  // Filter function for all data
  const filterBySelections = <T extends { department: string; year: string }>(
    data: T[],
    includeSemester = false
  ) => {
    return data.filter(item => {
      const matchYear = selectedYear === 'all' || item.year === selectedYear;
      const matchDepartment = 
        selectedDepartment === 'all' || 
        item.department === selectedDepartment;
      const matchSemester = !includeSemester || 
        selectedSemester === 'all' || 
        (item as any).semester === selectedSemester;
      return matchYear && matchDepartment && matchSemester;
    });
  };

  // Filter all data using the filter function
  const filteredData = useMemo(() => ({
    enrollment: filterBySelections(enrollmentData, true),
    grades: filterBySelections(gradeData, true),
    departments: filterBySelections(departmentData),
    attendance: filterBySelections(attendanceData),
    revenue: filterBySelections(revenueData)
  }), [selectedYear, selectedDepartment, selectedSemester]);

  // Filter attendance data by date range
  const filteredAttendanceData = useMemo(() => {
    let filtered = filteredData.attendance;
    
    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      
      filtered = filtered.filter(item => {
        const itemDate = new Date(`${item.year}-${item.month}-01`);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }
    
    return filtered;
  }, [filteredData.attendance, dateRange]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FaChartBar className="text-2xl" />
          <h1 className="text-2xl font-bold">Analytics & Reports</h1>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
        >
          <FaDownload className="mr-2" /> Export Reports
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <select
          className="select select-bordered w-full"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="all">All Years</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>

        <select
          className="select select-bordered w-full"
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
        >
          <option value="all">All Semesters</option>
          <option value="Fall">Fall</option>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
        </select>

        <select
          className="select select-bordered w-full"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="all">All Departments</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Physics">Physics</option>
          <option value="Engineering">Engineering</option>
        </select>

        <div className="flex gap-2">
          <input
            type="date"
            className="input input-bordered w-full"
            value={dateRange.start}
            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
          />
          <input
            type="date"
            className="input input-bordered w-full"
            value={dateRange.end}
            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
          />
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              Enrollment Trends
              {selectedDepartment !== 'all' && ` - ${selectedDepartment}`}
            </h2>
            <EnrollmentChart 
              data={filteredData.enrollment}
              selectedYear={selectedYear}
              selectedSemester={selectedSemester}
            />
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              Grade Distribution
              {selectedDepartment !== 'all' && ` - ${selectedDepartment}`}
            </h2>
            <GradeDistribution 
              data={filteredData.grades}
              selectedYear={selectedYear}
              selectedSemester={selectedSemester}
            />
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              Department Statistics
              {selectedYear !== 'all' && ` - ${selectedYear}`}
            </h2>
            <DepartmentStats data={filteredData.departments} />
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              Attendance Trends
              {selectedDepartment !== 'all' && ` - ${selectedDepartment}`}
            </h2>
            <AttendanceChart data={filteredAttendanceData} />
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl col-span-full">
          <div className="card-body">
            <h2 className="card-title">
              Revenue Analysis
              {selectedDepartment !== 'all' && ` - ${selectedDepartment}`}
            </h2>
            <RevenueChart 
              data={filteredData.revenue}
              selectedYear={selectedYear}
            />
          </div>
        </div>
      </div>

      {/* Export Modal */}
      <ExportModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        selectedYear={selectedYear}
        selectedDepartment={selectedDepartment}
        dateRange={dateRange}
      />
    </div>
  );
} 