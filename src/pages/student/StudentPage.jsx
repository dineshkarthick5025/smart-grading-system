import React, { useState } from "react";
import "./StudentPage.css";

const StudentPage = () => {
  // Assignment submission state and submission history
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [submittedAssignments, setSubmittedAssignments] = useState([]);

  // Teacher messaging state and history
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [teacherMessage, setTeacherMessage] = useState("");
  const [teacherMessageHistory, setTeacherMessageHistory] = useState([]);

  // AI Study Buddy chat state
  const [chatMessage, setChatMessage] = useState("");
  const [chatResponse, setChatResponse] = useState("");

  // Mock data for the student dashboard
  const studentData = {
    name: "John Doe",
    coursesEnrolled: 5,
    upcomingAssignments: 3,
    overallProgress: 75,
    marks: {
      Mathematics: 85,
      Physics: 90,
      "Computer Science": 78,
    },
    cgpa: 3.8,
    attendance: {
      Mathematics: "95%",
      Physics: "90%",
      "Computer Science": "85%",
    },
    ongoingCourses: [
      { id: 1, name: "Mathematics", progress: 60 },
      { id: 2, name: "Physics", progress: 45 },
      { id: 3, name: "Computer Science", progress: 75 },
    ],
    upcomingCourses: [
      { id: 4, name: "Chemistry", startDate: "11/15/2023" },
      { id: 5, name: "Biology", startDate: "12/01/2023" },
    ],
  };

  // Dummy teacher list for messaging
  const teachers = [
    { id: 1, name: "Prof. Smith" },
    { id: 2, name: "Dr. Johnson" },
    { id: 3, name: "Ms. Davis" },
  ];

  // Handle assignment file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAssignmentFile(file);
      setSubmissionStatus("File uploaded successfully!");
    } else {
      setSubmissionStatus("No file selected.");
    }
  };

  // Handle assignment submission
  const handleAssignmentSubmit = () => {
    if (assignmentFile) {
      // Simulate submission process
      setTimeout(() => {
        const newSubmission = {
          fileName: assignmentFile.name,
          submittedAt: new Date().toLocaleString(),
        };
        setSubmittedAssignments([...submittedAssignments, newSubmission]);
        setSubmissionStatus("Assignment submitted successfully!");
        setAssignmentFile(null);
      }, 2000);
    } else {
      setSubmissionStatus("Please upload a file first.");
    }
  };

  // Handle teacher messaging
  const handleTeacherMessageSubmit = (e) => {
    e.preventDefault();
    if (selectedTeacher && teacherMessage.trim() !== "") {
      const newMessage = {
        teacher: selectedTeacher,
        message: teacherMessage,
        sentAt: new Date().toLocaleString(),
      };
      setTeacherMessageHistory([...teacherMessageHistory, newMessage]);
      setTeacherMessage("");
    }
  };

  // Handle AI Study Buddy chat
  const handleChatSubmit = (e) => {
    e.preventDefault();
    // Simulate AI response
    setChatResponse(`AI: You asked, "${chatMessage}". Here's a detailed answer...`);
    setChatMessage("");
  };

  return (
    <div className="student-page">
      {/* Dashboard Section */}
      <section className="dashboard">
        <h1>Welcome, {studentData.name}!</h1>
        <div className="stats">
          <div className="stat">
            <h3>Courses Enrolled</h3>
            <p>{studentData.coursesEnrolled}</p>
          </div>
          <div className="stat">
            <h3>Upcoming Assignments</h3>
            <p>{studentData.upcomingAssignments}</p>
          </div>
          <div className="stat">
            <h3>Overall Progress</h3>
            <p>{studentData.overallProgress}%</p>
          </div>
        </div>

        <div className="performance">
          <h2>Academic Performance</h2>
          <div className="marks-list">
            {Object.keys(studentData.marks).map((course, index) => (
              <div className="mark-card" key={index}>
                <h3>{course}</h3>
                <p>Marks: {studentData.marks[course]}</p>
              </div>
            ))}
          </div>
          <div className="cgpa">
            <h3>Current CGPA</h3>
            <p>{studentData.cgpa}</p>
          </div>
        </div>

        <div className="attendance">
          <h2>Attendance</h2>
          <div className="attendance-list">
            {Object.keys(studentData.attendance).map((course, index) => (
              <div className="attendance-card" key={index}>
                <h3>{course}</h3>
                <p>Attendance: {studentData.attendance[course]}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="study-buddy">
          <h2>AI Study Buddy</h2>
          <div className="chatbot">
            <p>Ask me anything about your courses!</p>
            <form onSubmit={handleChatSubmit}>
              <input
                type="text"
                placeholder="Type your question..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
              />
              <button type="submit">Ask</button>
            </form>
            {chatResponse && <p className="chat-response">{chatResponse}</p>}
          </div>
        </div>
      </section>

      {/* Ongoing Courses Section */}
      <section className="ongoing-courses">
        <h2>Ongoing Courses</h2>
        <div className="course-list">
          {studentData.ongoingCourses.map((course) => (
            <div className="course-card" key={course.id}>
              <h3>{course.name}</h3>
              <p>Progress: {course.progress}%</p>
              <button>Continue Learning</button>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Courses Section */}
      <section className="upcoming-courses">
        <h2>Upcoming Courses</h2>
        <div className="course-list">
          {studentData.upcomingCourses.map((course) => (
            <div className="course-card" key={course.id}>
              <h3>{course.name}</h3>
              <p>Starts on: {course.startDate}</p>
              <button>View Details</button>
            </div>
          ))}
        </div>
      </section>

      {/* Assignments and Quizzes Section */}
      <section className="assignments">
        <h2>Assignments and Quizzes</h2>
        <div className="assignment-list">
          {[1, 2, 3].map((assignment) => (
            <div className="assignment-card" key={assignment}>
              <h3>Assignment {assignment}</h3>
              <p>Due: 10/31/2023</p>
              <p>Status: Submitted</p>
            </div>
          ))}
        </div>

        <div className="assignment-submission">
          <h3>Submit Assignment</h3>
          <input type="file" onChange={handleFileUpload} />
          <button onClick={handleAssignmentSubmit}>Submit</button>
          {submissionStatus && (
            <p className="submission-status">{submissionStatus}</p>
          )}
        </div>

        <div className="submission-history">
          <h3>Submitted Assignment History</h3>
          {submittedAssignments.length === 0 ? (
            <p>No assignments submitted yet.</p>
          ) : (
            <ul>
              {submittedAssignments.map((submission, index) => (
                <li key={index}>
                  {submission.fileName} - {submission.submittedAt}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Message Teachers Section */}
      <section className="message-teachers">
        <h2>Message Your Teachers</h2>
        <form onSubmit={handleTeacherMessageSubmit} className="message-form">
          <div>
            <label htmlFor="teacherSelect">Select Teacher:</label>
            <select
              id="teacherSelect"
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
            >
              <option value="">-- Select a teacher --</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.name}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="teacherMessage">Message:</label>
            <textarea
              id="teacherMessage"
              placeholder="Type your message..."
              value={teacherMessage}
              onChange={(e) => setTeacherMessage(e.target.value)}
            />
          </div>
          <button type="submit">Send Message</button>
        </form>

        <div className="message-history">
          <h3>Message History</h3>
          {teacherMessageHistory.length === 0 ? (
            <p>No messages sent yet.</p>
          ) : (
            <ul>
              {teacherMessageHistory.map((msg, index) => (
                <li key={index}>
                  <strong>{msg.teacher}</strong> ({msg.sentAt}): {msg.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default StudentPage;
