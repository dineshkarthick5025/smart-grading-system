import React from "react";
import "./StudentPage.css";

const StudentPage = () => {
  return (
    
    <div className="student-page">
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* Dashboard Overview */}
      <section className="dashboard">
        <h1>Welcome, [Student Name]!</h1>
        <div className="stats">
          <div className="stat">
            <h3>Courses Enrolled</h3>
            <p>5</p>
          </div>
          <div className="stat">
            <h3>Upcoming Assignments</h3>
            <p>3</p>
          </div>
          <div className="stat">
            <h3>Overall Progress</h3>
            <p>75%</p>
          </div>
        </div>
      </section>

      {/* Enrolled Courses */}
      <section className="courses">
        <h2>Your Courses</h2>
        <div className="course-list">
          {[1, 2, 3].map((course) => (
            <div className="course-card" key={course}>
              <h3>Course {course}</h3>
              <p>Progress: 60%</p>
              <button>Continue Learning</button>
            </div>
          ))}
        </div>
      </section>

      {/* Assignments and Quizzes */}
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
      </section>

      {/* AI Study Buddy */}
      <section className="study-buddy">
        <h2>AI Study Buddy</h2>
        <div className="chatbot">
          <p>Ask me anything about your courses!</p>
          <input type="text" placeholder="Type your question..." />
        </div>
      </section>
    </div>
  );
};

export default StudentPage;