import axios from "axios";

const url = "http://localhost:5000/api/documents";
const data = {
    "documents": [
      {
        "name": "Student Handbook 2024",
        "type": "pdf",
        "size": "4.2 MB",
        "modified": "2024-03-10",
        "owner": "Admin Office",
        "shared": true,
        "starred": true,
        "tags": ["handbook", "policy"]
      },
      {
        "name": "Research Data Analysis",
        "type": "xlsx",
        "size": "2.9 MB",
        "modified": "2024-03-09",
        "owner": "David Kim",
        "shared": false,
        "starred": true,
        "tags": ["research", "data"]
      },
      {
        "name": "Course Schedule - Spring 2024",
        "type": "xlsx",
        "size": "1.5 MB",
        "modified": "2024-03-08",
        "owner": "Academic Office",
        "shared": true,
        "starred": false,
        "tags": ["schedule", "academic"]
      }
    ]
  }

data.documents.forEach(payment => {
  axios.post(url, payment)
    .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
});


