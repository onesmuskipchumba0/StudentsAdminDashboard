import axios from "axios";

const url = "http://localhost:5000/api/students";
const data ={
  "students": [
    {
      "studentId": 1001,
      "name": "John Smith",
      "email": "john.smith@example.com",
      "course": "Web Development",
      "enrollmentDate": "2024-01-15",
      "status": "Active",
      "attendance": "present",
      "grade": {
        "assignment": "Final Project",
        "grade": "A",
        "submissionDate": "2024-03-15"
      }
    },
    {
      "studentId": 1002,
      "name": "Sarah Williams",
      "email": "sarah.w@example.com",
      "course": "Data Science",
      "enrollmentDate": "2024-02-01",
      "status": "Active",
      "attendance": "present",
      "grade": {
        "assignment": "Mid Term",
        "grade": "B+",
        "submissionDate": "2024-03-20"
      }
    },
    {
      "studentId": 1003,
      "name": "David Brown",
      "email": "david.b@example.com",
      "course": "Game Development",
      "enrollmentDate": "2024-01-20",
      "status": "Active",
      "attendance": "absent",
      "grade": {
        "assignment": "Project Phase 1",
        "grade": "A-",
        "submissionDate": "2024-03-10"
      }
    },
    {
      "studentId": 1004,
      "name": "Emily Davis",
      "email": "emily.d@example.com",
      "course": "Mobile App Development",
      "enrollmentDate": "2024-02-05",
      "status": "Active",
      "attendance": "present",
      "grade": {
        "assignment": "Code Review",
        "grade": "A",
        "submissionDate": "2024-03-25"
      }
    }
  ]
}

data.students.forEach(payment => {
  axios.post(url, payment)
    .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error.message);
  });
});


