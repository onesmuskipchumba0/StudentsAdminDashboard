export const studentsData = [
    {
      id: 1,
      studentId: 101,
      name: "John Doe",
      email: "john.doe@example.com",
      course: "Web Development",
      enrollmentDate: "2024-01-15",
      status: "Active",
      attendance: "present",
      grade:{
        assignment: "Final Project",
        grade: "A",
        submissionDate: "2024-03-15"
      }
    },
    {
      id: 2,
      studentId: 102,
      name: "Jane Smith",
      email: "jane.smith@example.com", 
      course: "Data Science",
      enrollmentDate: "2024-02-01",
      status: "Active",
      attendance: "absent",
      grade:{
        assignment: "Final Project",
        grade: "B",
        submissionDate: "2024-03-21"
      }
    },
    {
      id: 3,
      studentId: 103,
      name: "Michael Johnson",
      email: "michael.j@example.com",
      course: "Mobile Development",
      enrollmentDate: "2024-01-20",
      status: "Inactive",
      attendance: "absent",
      grade:{
        assignment: "Final Project",
        grade: "C",
        submissionDate: "2024-03-15"
      }
    },
    {
      id: 4, 
      studentId: 104,
      name: "Sarah Williams",
      email: "sarah.w@example.com",
      course: "UI/UX Design",
      enrollmentDate: "2024-02-15",
      status: "Active",
      attendance: "present",
      grade:{
        assignment: "Mid Term Exam",
        grade: "B",
        submissionDate: "2024-04-13"
      }
    },
    {
      id: 5,
      studentId: 105,
      name: "James Brown",
      email: "james.b@example.com",
      course: "Cloud Computing",
      enrollmentDate: "2024-01-10",
      status: "Suspended",
      attendance: "absent",
      grade:{
        assignment: "Assignment",
        grade: "A",
        submissionDate: "2024-03-11"
      }
    },
    {
      id: 6,
      studentId: 106,
      name: "Emily Davis",
      email: "emily.d@example.com",
      course: "Cybersecurity",
      enrollmentDate: "2024-02-05",
      status: "Active",
      attendance: "present",
      grade:{
        assignment: "Final Project",
        grade: "A",
        submissionDate: "2024-03-15"
      }
    },
    {
      id: 7,
      studentId: 107,
      name: "Robert Wilson",
      email: "robert.w@example.com",
      course: "Data Science",
      enrollmentDate: "2024-01-25",
      status: "Inactive",
      attendance: "absent",
      grade:{
        assignment: "Opening Exam",
        grade: "A",
        submissionDate: "2024-04-11"
      }
    },
    {
      id: 8,
      studentId: 108,
      name: "Lisa Anderson",
      email: "lisa.a@example.com",
      course: "Web Development",
      enrollmentDate: "2024-02-10",
      status: "Active",
      attendance: "present",
      grade:{
        assignment: "Opening Exam",
        grade: "A",
        submissionDate: "2024-04-11"
      }
    },
    {
      id: 9,
      studentId: 109,
      name: "David Taylor",
      email: "david.t@example.com",
      course: "Mobile Development",
      enrollmentDate: "2024-01-15",
      status: "Active",
      attendance: "present",
      grade:{
        assignment: "Opening Exam",
        grade: "A",
        submissionDate: "2024-04-11"
      }
    },
    {
      id: 10,
      studentId: 110,
      name: "Jennifer Martin",
      email: "jennifer.m@example.com",
      course: "UI/UX Design",
      enrollmentDate: "2024-02-20",
      status: "Suspended",
      attendance: "absent",
      grade:{
        assignment: "Final Project",
        grade: "C",
        submissionDate: "2024-02-11"
      }
    },
    // Add more sample data
  ];
export const coursesData = [
    {
      id: 1,
      name: "Web Development Fundamentals",
      description: "Learn the basics of web development including HTML, CSS, and JavaScript.",
      duration: "12 weeks",
      status: "Active",
      instructor: "John Doe",
      startDate: "2024-03-15",
      maxStudents: "30",
      enrolledStudents: 25,
      progress: 65
    },
    {
      id: 2,
      name: "Data Science Essentials",
      description: "Introduction to data analysis, visualization, and machine learning concepts.",
      duration: "16 weeks",
      status: "Upcoming",
      instructor: "Jane Smith",
      startDate: "2024-04-01",
      maxStudents: "25",
      enrolledStudents: 20,
      progress: 0
    },
    {
      id: 3,
      name: "Mobile App Development",
      description: "Build native mobile applications for iOS and Android using React Native.",
      duration: "14 weeks",
      status: "Active",
      instructor: "Mike Wilson",
      startDate: "2024-03-01",
      maxStudents: "25",
      enrolledStudents: 22,
      progress: 45
    },
    {
      id: 4,
      name: "UI/UX Design Principles",
      description: "Master user interface and experience design fundamentals and best practices.",
      duration: "10 weeks", 
      status: "Active",
      instructor: "Sarah Chen",
      startDate: "2024-02-15",
      maxStudents: "20",
      enrolledStudents: 18,
      progress: 80
    },
    {
      id: 5,
      name: "Cloud Computing",
      description: "Learn cloud architecture, deployment and management using AWS and Azure.",
      duration: "12 weeks",
      status: "Upcoming",
      instructor: "David Miller",
      startDate: "2024-04-15",
      maxStudents: "30",
      enrolledStudents: 15,
      progress: 0
    },
    {
      id: 6,
      name: "Cybersecurity Fundamentals",
      description: "Introduction to network security, cryptography and ethical hacking.",
      duration: "16 weeks",
      status: "Active",
      instructor: "Lisa Wong",
      startDate: "2024-02-01",
      maxStudents: "25",
      enrolledStudents: 23,
      progress: 70
    },
    {
      id: 7,
      name: "Machine Learning Basics",
      description: "Introduction to ML algorithms, neural networks and deep learning.",
      duration: "14 weeks",
      status: "Upcoming",
      instructor: "Robert Taylor",
      startDate: "2024-05-01",
      maxStudents: "25",
      enrolledStudents: 10,
      progress: 0
    },
    {
      id: 8,
      name: "DevOps Engineering",
      description: "Learn CI/CD, containerization, and infrastructure automation.",
      duration: "12 weeks",
      status: "Active",
      instructor: "James Anderson",
      startDate: "2024-03-10",
      maxStudents: "20",
      enrolledStudents: 19,
      progress: 35
    },
    {
      id: 9,
      name: "Blockchain Development",
      description: "Build decentralized applications using blockchain technologies.",
      duration: "16 weeks",
      status: "Upcoming",
      instructor: "Emily Brown",
      startDate: "2024-05-15",
      maxStudents: "25",
      enrolledStudents: 12,
      progress: 0
    },
    {
      id: 10,
      name: "Software Testing",
      description: "Master software testing methodologies and automation frameworks.",
      duration: "10 weeks",
      status: "Active",
      instructor: "Thomas Lee",
      startDate: "2024-02-20",
      maxStudents: "30",
      enrolledStudents: 28,
      progress: 60
    },
    {
      id: 11,
      name: "Game Development",
      description: "Create 2D and 3D games using Unity and C#.",
      duration: "14 weeks",
      status: "Upcoming",
      instructor: "Maria Garcia",
      startDate: "2024-04-20",
      maxStudents: "25",
      enrolledStudents: 15,
      progress: 0
    },
    {
      id: 12,
      name: "Data Analytics",
      description: "Learn data analysis using Python, SQL and visualization tools.",
      duration: "12 weeks",
      status: "Active",
      instructor: "Kevin Zhang",
      startDate: "2024-03-05",
      maxStudents: "30",
      enrolledStudents: 27,
      progress: 50
    }
  ];
export const departmentsData = [
    {
      id: '1',
      name: 'Computer Science',
      description: 'Studies in software development, algorithms, and computer systems',
      createdAt: '2024-01-15',
      totalStudents: 150,
      totalTeachers: 12
    },
    {
      id: '2',
      name: 'Data Science',
      description: 'Advanced analytics, machine learning, and statistical analysis',
      createdAt: '2024-01-20',
      totalStudents: 120,
      totalTeachers: 8
    },
    {
      id: '3', 
      name: 'Information Technology',
      description: 'Network administration, cybersecurity, and IT infrastructure',
      createdAt: '2024-01-25',
      totalStudents: 95,
      totalTeachers: 7
    },
    {
      id: '4',
      name: 'Software Engineering',
      description: 'Software development lifecycle, architecture, and best practices',
      createdAt: '2024-02-01',
      totalStudents: 140,
      totalTeachers: 10
    },
    {
      id: '5',
      name: 'Artificial Intelligence',
      description: 'Machine learning, deep learning, and AI applications',
      createdAt: '2024-02-05',
      totalStudents: 85,
      totalTeachers: 6
    },
    {
      id: '6',
      name: 'Cybersecurity',
      description: 'Network security, ethical hacking, and security protocols',
      createdAt: '2024-02-10',
      totalStudents: 75,
      totalTeachers: 5
    },
    {
      id: '7',
      name: 'Cloud Computing',
      description: 'Cloud platforms, distributed systems, and scalable architecture',
      createdAt: '2024-02-15',
      totalStudents: 90,
      totalTeachers: 6
    },
    {
      id: '8',
      name: 'Mobile Development',
      description: 'iOS and Android app development with modern frameworks',
      createdAt: '2024-02-20',
      totalStudents: 110,
      totalTeachers: 8
    },
    {
      id: '9',
      name: 'Game Development',
      description: '2D/3D game design, graphics programming, and game engines',
      createdAt: '2024-02-25',
      totalStudents: 65,
      totalTeachers: 4
    },
    {
      id: '10',
      name: 'Web Technologies',
      description: 'Full-stack web development, modern frameworks, and web services',
      createdAt: '2024-03-01',
      totalStudents: 130,
      totalTeachers: 9
    }

  ];
export const admissionData = [
    {
      id: '1',
      studentName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      department: 'Computer Science',
      semester: 'Fall 2024',
      status: 'pending',
      submittedAt: '2024-03-15',
      previousSchool: 'Lincoln High School',
      gpa: '3.8',
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1234567891',
      department: 'Mathematics',
      semester: 'Fall 2024',
      status: 'approved',
      submittedAt: '2024-03-14',
      previousSchool: 'Washington High School',
      gpa: '3.9',
    },
    {
      id: '3',
      studentName: 'Michael Johnson',
      email: 'michael.j@example.com',
      phone: '+1234567892',
      department: 'Physics',
      semester: 'Fall 2024',
      status: 'rejected',
      submittedAt: '2024-03-13',
      previousSchool: 'Roosevelt High School',
      gpa: '3.2',
    },
    {
      id: '4',
      studentName: 'Sarah Williams',
      email: 'sarah.w@example.com', 
      phone: '+1234567893',
      department: 'Web Technologies',
      semester: 'Spring 2024',
      status: 'pending',
      submittedAt: '2024-03-12',
      previousSchool: 'Jefferson High School',
      gpa: '3.7',
    },
    {
      id: '5',
      studentName: 'David Brown',
      email: 'david.b@example.com',
      phone: '+1234567894',
      department: 'Game Development',
      semester: 'Fall 2024',
      status: 'approved',
      submittedAt: '2024-03-11',
      previousSchool: 'Madison High School',
      gpa: '3.6',
    },
    {
      id: '6',
      studentName: 'Emily Davis',
      email: 'emily.d@example.com',
      phone: '+1234567895',
      department: 'Mobile Development',
      semester: 'Spring 2024',
      status: 'pending',
      submittedAt: '2024-03-10',
      previousSchool: 'Franklin High School',
      gpa: '3.9',
    },
    {
      id: '7',
      studentName: 'James Wilson',
      email: 'james.w@example.com',
      phone: '+1234567896',
      department: 'Computer Science',
      semester: 'Spring 2024',
      status: 'approved',
      submittedAt: '2024-03-09',
      previousSchool: 'Kennedy High School',
      gpa: '4.0',
    },
    {
      id: '8',
      studentName: 'Emma Taylor',
      email: 'emma.t@example.com',
      phone: '+1234567897',
      department: 'Mathematics',
      semester: 'Fall 2024',
      status: 'rejected',
      submittedAt: '2024-03-08',
      previousSchool: 'Adams High School',
      gpa: '3.3',
    },
    {
      id: '9',
      studentName: 'Alexander Martinez',
      email: 'alex.m@example.com',
      phone: '+1234567898',
      department: 'Physics',
      semester: 'Spring 2024',
      status: 'pending',
      submittedAt: '2024-03-07',
      previousSchool: 'Monroe High School',
      gpa: '3.5',
    },
    {
      id: '10',
      studentName: 'Olivia Anderson',
      email: 'olivia.a@example.com',
      phone: '+1234567899',
      department: 'Web Technologies',
      semester: 'Fall 2024',
      status: 'approved',
      submittedAt: '2024-03-06',
      previousSchool: 'Harrison High School',
      gpa: '3.8',
    }
  ];
export const academicEvents = [
    {
      id: '1',
      title: 'Fall Semester Start',
      startDate: '2024-09-01',
      endDate: '2024-09-01',
      type: 'semester',
      description: 'Beginning of Fall Semester 2024',
    },
    {
      id: '2',
      title: 'Mid-term Examinations',
      startDate: '2024-10-15',
      endDate: '2024-10-25',
      type: 'exam',
      description: 'Fall Semester Mid-term Examination Period',
    },
    {
      id: '3',
      title: 'Winter Break',
      startDate: '2024-12-20',
      endDate: '2025-01-05',
      type: 'holiday',
      description: 'Winter Holiday Break',
    },
    {
      id: '4',
      title: 'Spring Registration',
      startDate: '2024-11-15',
      endDate: '2024-12-15',
      type: 'registration',
      description: 'Course Registration for Spring Semester 2025',
    },
    {
      id: '5',
      title: 'Final Examinations',
      startDate: '2024-12-10',
      endDate: '2024-12-20',
      type: 'exam',
      description: 'Fall Semester Final Examination Period',
    },
  ];
export const paymentHistory = [
    {
      id: '1',
      studentName: 'John Doe',
      studentId: 'STU001',
      amount: 5000,
      type: 'Tuition Fee',
      status: 'paid',
      date: '2024-03-15',
      paymentMethod: 'Credit Card',
      semester: 'Fall 2024'
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      studentId: 'STU002',
      amount: 4500,
      type: 'Laboratory Fee',
      status: 'pending',
      date: '2024-03-16',
      paymentMethod: 'Bank Transfer',
      semester: 'Fall 2024'
    },
    {
      id: '3',
      studentName: 'Michael Johnson',
      studentId: 'STU003', 
      amount: 5500,
      type: 'Tuition Fee',
      status: 'paid',
      date: '2024-03-14',
      paymentMethod: 'Debit Card',
      semester: 'Fall 2024'
    },
    {
      id: '4',
      studentName: 'Sarah Williams',
      studentId: 'STU004',
      amount: 2000,
      type: 'Library Fee',
      status: 'overdue',
      date: '2024-03-10',
      paymentMethod: 'Cash',
      semester: 'Fall 2024'
    },
    {
      id: '5', 
      studentName: 'James Brown',
      studentId: 'STU005',
      amount: 4800,
      type: 'Tuition Fee',
      status: 'pending',
      date: '2024-03-18',
      paymentMethod: 'Bank Transfer',
      semester: 'Fall 2024'
    },
    {
      id: '6',
      studentName: 'Emily Davis',
      studentId: 'STU006',
      amount: 3000,
      type: 'Laboratory Fee',
      status: 'paid',
      date: '2024-03-15',
      paymentMethod: 'Credit Card',
      semester: 'Fall 2024'
    },
    {
      id: '7',
      studentName: 'Robert Wilson',
      studentId: 'STU007',
      amount: 5200,
      type: 'Tuition Fee',
      status: 'overdue',
      date: '2024-03-08',
      paymentMethod: 'Bank Transfer',
      semester: 'Fall 2024'
    },
    {
      id: '8',
      studentName: 'Lisa Anderson',
      studentId: 'STU008',
      amount: 1500,
      type: 'Activity Fee',
      status: 'paid',
      date: '2024-03-17',
      paymentMethod: 'Debit Card',
      semester: 'Fall 2024'
    },
    {
      id: '9',
      studentName: 'Thomas Moore',
      studentId: 'STU009',
      amount: 4700,
      type: 'Tuition Fee',
      status: 'pending',
      date: '2024-03-19',
      paymentMethod: 'Credit Card',
      semester: 'Fall 2024'
    },
    {
      id: '10',
      studentName: 'Jennifer Taylor',
      studentId: 'STU010',
      amount: 2500,
      type: 'Laboratory Fee',
      status: 'paid',
      date: '2024-03-16',
      paymentMethod: 'Bank Transfer',
      semester: 'Fall 2024'
    }
  ];
export const announcements = [
    {
      id: '1',
      title: 'Mid-term Examination Schedule',
      content: 'The mid-term examinations will be conducted from October 15th to October 25th. Please check your respective department notice boards for detailed schedules.',
      category: 'academic',
      priority: 'high',
      author: 'Academic Office',
      createdAt: '2024-03-15T10:00:00Z',
      department: 'All Departments',
      attachments: ['schedule.pdf'],
      pinned: true
    },
    {
      id: '2',
      title: 'Campus Maintenance Notice',
      content: 'The main library will be closed for maintenance work this weekend (March 20-21). Online resources will remain accessible.',
      category: 'facility',
      priority: 'medium',
      author: 'Facility Management',
      createdAt: '2024-03-14T15:30:00Z',
      department: 'All Departments',
      attachments: [],
      pinned: false
    },
  ];

  const enrollmentData = [
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
  const gradeData = [
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
  const departmentData = [
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
   const attendanceData = [
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
   const revenueData = [
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
  export const analyticsData = {
      enrollmentData: enrollmentData,
      gradeData: gradeData,
      departmentData: departmentData,
      attendanceData: attendanceData,
      revenueData: revenueData
  }
  export const documents = [
        {
          id: '1',
          name: 'Course Syllabus 2024',
          type: 'pdf',
          size: '2.5 MB',
          modified: '2024-03-15',
          owner: 'John Doe',
          shared: true,
          starred: true,
          tags: ['syllabus', 'course']
        },
        {
          id: '2',
          name: 'Lecture Notes - Week 1',
          type: 'doc',
          size: '1.2 MB',
          modified: '2024-03-14',
          owner: 'John Doe',
          shared: false,
          starred: false,
          tags: ['lectures', 'notes']
        },
        {
          id: '3',
          name: 'Research Paper Draft',
          type: 'doc',
          size: '3.1 MB', 
          modified: '2024-03-13',
          owner: 'Sarah Wilson',
          shared: true,
          starred: false,
          tags: ['research', 'draft']
        },
        {
          id: '4',
          name: 'Lab Report Template',
          type: 'doc',
          size: '850 KB',
          modified: '2024-03-12',
          owner: 'Mike Chen',
          shared: true,
          starred: true,
          tags: ['lab', 'template']
        },
        {
          id: '5',
          name: 'Department Meeting Minutes',
          type: 'pdf',
          size: '1.8 MB',
          modified: '2024-03-11',
          owner: 'Emily Brown',
          shared: true,
          starred: false,
          tags: ['meeting', 'administrative']
        },
        {
          id: '6',
          name: 'Student Handbook 2024',
          type: 'pdf',
          size: '4.2 MB',
          modified: '2024-03-10',
          owner: 'Admin Office',
          shared: true,
          starred: true,
          tags: ['handbook', 'policy']
        },
        {
          id: '7',
          name: 'Research Data Analysis',
          type: 'xlsx',
          size: '2.9 MB',
          modified: '2024-03-09',
          owner: 'David Kim',
          shared: false,
          starred: true,
          tags: ['research', 'data']
        },
        {
          id: '8',
          name: 'Course Schedule - Spring 2024',
          type: 'xlsx',
          size: '1.5 MB',
          modified: '2024-03-08',
          owner: 'Academic Office',
          shared: true,
          starred: false,
          tags: ['schedule', 'academic']
        },
        {
          id: '9',
          name: 'Faculty Directory',
          type: 'pdf',
          size: '1.1 MB',
          modified: '2024-03-07',
          owner: 'HR Department',
          shared: true,
          starred: false,
          tags: ['directory', 'faculty']
        },
        {
          id: '10',
          name: 'Research Grant Proposal',
          type: 'doc',
          size: '2.7 MB',
          modified: '2024-03-06',
          owner: 'Robert Taylor',
          shared: false,
          starred: true,
          tags: ['research', 'grant']
        }
  ]
