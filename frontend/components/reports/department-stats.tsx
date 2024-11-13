import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface DepartmentData {
  name: string;
  students: number;
  faculty: number;
  courses: number;
  year: string;
}

interface DepartmentStatsProps {
  data: DepartmentData[];
}

export function DepartmentStats({ data }: DepartmentStatsProps) {
  // Aggregate data by department
  const aggregatedData = data.reduce((acc, curr) => {
    if (!acc[curr.name]) {
      acc[curr.name] = {
        name: curr.name,
        students: 0,
        faculty: 0,
        courses: 0,
        studentRatio: 0,
        courseLoad: 0
      };
    }
    acc[curr.name].students += curr.students;
    acc[curr.name].faculty += curr.faculty;
    acc[curr.name].courses += curr.courses;
    
    // Calculate ratios
    acc[curr.name].studentRatio = Math.round(curr.students / curr.faculty);
    acc[curr.name].courseLoad = Math.round(curr.courses / curr.faculty);
    
    return acc;
  }, {} as Record<string, {
    name: string;
    students: number;
    faculty: number;
    courses: number;
    studentRatio: number;
    courseLoad: number;
  }>);

  const chartData = Object.values(aggregatedData).sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  // Calculate max values for scaling
  const maxValues = chartData.reduce((acc, curr) => ({
    students: Math.max(acc.students, curr.students),
    faculty: Math.max(acc.faculty, curr.faculty),
    courses: Math.max(acc.courses, curr.courses),
    studentRatio: Math.max(acc.studentRatio, curr.studentRatio),
    courseLoad: Math.max(acc.courseLoad, curr.courseLoad)
  }), {
    students: 0,
    faculty: 0,
    courses: 0,
    studentRatio: 0,
    courseLoad: 0
  });

  // Scale values to percentages for better visualization
  const scaledData = chartData.map(dept => ({
    name: dept.name,
    students: Math.round((dept.students / maxValues.students) * 100),
    faculty: Math.round((dept.faculty / maxValues.faculty) * 100),
    courses: Math.round((dept.courses / maxValues.courses) * 100),
    studentRatio: Math.round((dept.studentRatio / maxValues.studentRatio) * 100),
    courseLoad: Math.round((dept.courseLoad / maxValues.courseLoad) * 100),
    // Keep original values for tooltip
    originalValues: {
      students: dept.students,
      faculty: dept.faculty,
      courses: dept.courses,
      studentRatio: dept.studentRatio,
      courseLoad: dept.courseLoad
    }
  }));

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dept = chartData.find(d => d.name === label);
      if (!dept) return null;

      return (
        <div className="bg-base-100 p-4 rounded-lg shadow border">
          <h3 className="font-bold mb-2">{label}</h3>
          <div className="space-y-1">
            <p>Students: {dept.students}</p>
            <p>Faculty: {dept.faculty}</p>
            <p>Courses: {dept.courses}</p>
            <p>Student/Faculty Ratio: {dept.studentRatio}:1</p>
            <p>Courses/Faculty: {dept.courseLoad}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={scaledData}>
          <PolarGrid />
          <PolarAngleAxis
            dataKey="name"
            tick={{ fill: 'currentColor', fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: 'currentColor', fontSize: 10 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Radar
            name="Students"
            dataKey="students"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Radar
            name="Faculty"
            dataKey="faculty"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
          <Radar
            name="Courses"
            dataKey="courses"
            stroke="#ffc658"
            fill="#ffc658"
            fillOpacity={0.6}
          />
          <Radar
            name="Student/Faculty Ratio"
            dataKey="studentRatio"
            stroke="#ff7300"
            fill="#ff7300"
            fillOpacity={0.6}
          />
          <Radar
            name="Course Load"
            dataKey="courseLoad"
            stroke="#00bcd4"
            fill="#00bcd4"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
} 