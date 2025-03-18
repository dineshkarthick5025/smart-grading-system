import React, { useState, useEffect } from 'react';
import './Teacher.css';

const Teacher = () => {
  // Sample data - in a real app, this would come from your API
  const [classes, setClasses] = useState([
    { id: 1, name: 'Mathematics 101', students: 28, pendingMessages: 5 },
    { id: 2, name: 'Physics 202', students: 22, pendingMessages: 2 },
    { id: 3, name: 'Computer Science 303', students: 34, pendingMessages: 8 }
  ]);
  
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Midterm exam date', content: 'The midterm exam will be held on March 15th', date: '2025-03-02', classId: 1 },
    { id: 2, title: 'Lab report deadline extended', content: 'The deadline for the lab report has been extended to March 20th', date: '2025-03-05', classId: 2 }
  ]);
  
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Problem Set 3', dueDate: '2025-03-10', submitted: 18, total: 28, classId: 1 },
    { id: 2, title: 'Lab Report 2', dueDate: '2025-03-20', submitted: 15, total: 22, classId: 2 },
    { id: 3, title: 'Programming Assignment 4', dueDate: '2025-03-12', submitted: 20, total: 34, classId: 3 }
  ]);
  
  const [messages, setMessages] = useState([
    { id: 1, student: 'Emma Johnson', content: 'I have a question about the assignment', date: '2025-03-06', read: false },
    { id: 2, student: 'Michael Chen', content: 'Can I schedule a meeting to discuss my progress?', date: '2025-03-06', read: false },
    { id: 3, student: 'Sophia Martinez', content: 'I submitted my assignment but it shows as missing', date: '2025-03-05', read: true }
  ]);
  
  // Student performance data
  const [studentPerformance, setStudentPerformance] = useState([
    { 
      classId: 1,
      averageGrade: 78,
      attendanceRate: 92,
      participationRate: 65,
      gradesDistribution: [5, 8, 10, 3, 2], // A, B, C, D, F
      quizScores: [
        { week: 'Week 1', average: 72 },
        { week: 'Week 2', average: 75 },
        { week: 'Week 3', average: 68 },
        { week: 'Week 4', average: 80 },
        { week: 'Week 5', average: 82 }
      ]
    },
    { 
      classId: 2,
      averageGrade: 82,
      attendanceRate: 95,
      participationRate: 78,
      gradesDistribution: [8, 9, 4, 1, 0], // A, B, C, D, F
      quizScores: [
        { week: 'Week 1', average: 79 },
        { week: 'Week 2', average: 81 },
        { week: 'Week 3', average: 84 },
        { week: 'Week 4', average: 80 },
        { week: 'Week 5', average: 86 }
      ]
    },
    { 
      classId: 3,
      averageGrade: 75,
      attendanceRate: 88,
      participationRate: 70,
      gradesDistribution: [6, 12, 10, 4, 2], // A, B, C, D, F
      quizScores: [
        { week: 'Week 1', average: 70 },
        { week: 'Week 2', average: 73 },
        { week: 'Week 3', average: 76 },
        { week: 'Week 4', average: 75 },
        { week: 'Week 5', average: 81 }
      ]
    }
  ]);
  
  // Documents
  const [documents, setDocuments] = useState([
    { id: 1, title: 'Course Syllabus', filename: 'math101_syllabus.pdf', uploadDate: '2025-02-10', classId: 1, size: '420 KB' },
    { id: 2, title: 'Study Guide', filename: 'physics_midterm_study_guide.pdf', uploadDate: '2025-03-01', classId: 2, size: '1.2 MB' },
    { id: 3, title: 'Project Requirements', filename: 'cs303_project_req.pdf', uploadDate: '2025-02-25', classId: 3, size: '860 KB' }
  ]);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedClassForAnalysis, setSelectedClassForAnalysis] = useState(1);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '', classId: '' });
  const [newAssignment, setNewAssignment] = useState({ title: '', dueDate: '', classId: '' });
  const [newDocument, setNewDocument] = useState({ title: '', classId: '', file: null });
  
  const handleAnnouncementChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAssignmentChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment(prev => ({ ...prev, [name]: value }));
  };
  
  const handleDocumentChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setNewDocument(prev => ({ ...prev, file: files[0] }));
    } else {
      setNewDocument(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const submitAnnouncement = (e) => {
    e.preventDefault();
    const announcement = {
      id: announcements.length + 1,
      ...newAnnouncement,
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements([...announcements, announcement]);
    setNewAnnouncement({ title: '', content: '', classId: '' });
  };
  
  const submitAssignment = (e) => {
    e.preventDefault();
    const assignment = {
      id: assignments.length + 1,
      ...newAssignment,
      submitted: 0,
      total: classes.find(c => c.id === parseInt(newAssignment.classId)).students
    };
    setAssignments([...assignments, assignment]);
    setNewAssignment({ title: '', dueDate: '', classId: '' });
  };
  
  const submitDocument = (e) => {
    e.preventDefault();
    // In a real app, you would upload the file to a server
    // Here we just add it to our state
    const document = {
      id: documents.length + 1,
      ...newDocument,
      filename: newDocument.file ? newDocument.file.name : 'unnamed.pdf',
      uploadDate: new Date().toISOString().split('T')[0],
      size: newDocument.file ? `${Math.round(newDocument.file.size / 1024)} KB` : '0 KB'
    };
    setDocuments([...documents, document]);
    setNewDocument({ title: '', classId: '', file: null });
    // Reset the file input
    document.getElementById('file-upload').value = '';
  };
  
  const markAsRead = (id) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, read: true } : msg
    ));
  };
  
  // Get current class performance data
  const currentClassPerformance = studentPerformance.find(p => p.classId === selectedClassForAnalysis) || studentPerformance[0];
  
  return (
    <div className="teacher-dashboard">
      <header className="dashboard-header">
        <h1>Teacher Dashboard</h1>
        <div className="user-info">
          <span>Prof. Alex Johnson</span>
          <button className="logout-btn">Logout</button>
        </div>
      </header>
      
      <div className="dashboard-tabs">
        <button 
          className={activeTab === 'overview' ? 'active' : ''} 
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'messages' ? 'active' : ''} 
          onClick={() => setActiveTab('messages')}
        >
          Messages <span className="badge">{messages.filter(m => !m.read).length}</span>
        </button>
        <button 
          className={activeTab === 'classes' ? 'active' : ''} 
          onClick={() => setActiveTab('classes')}
        >
          Classes
        </button>
        <button 
          className={activeTab === 'announcements' ? 'active' : ''} 
          onClick={() => setActiveTab('announcements')}
        >
          Announcements
        </button>
        <button 
          className={activeTab === 'assignments' ? 'active' : ''} 
          onClick={() => setActiveTab('assignments')}
        >
          Assignments
        </button>
        <button 
          className={activeTab === 'analysis' ? 'active' : ''} 
          onClick={() => setActiveTab('analysis')}
        >
          Student Analysis
        </button>
        <button 
          className={activeTab === 'documents' ? 'active' : ''} 
          onClick={() => setActiveTab('documents')}
        >
          Documents
        </button>
      </div>
      
      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-container">
            <div className="stats-container">
              <div className="stat-card">
                <h3>Total Classes</h3>
                <p className="stat-value">{classes.length}</p>
              </div>
              <div className="stat-card">
                <h3>Total Students</h3>
                <p className="stat-value">{classes.reduce((sum, c) => sum + c.students, 0)}</p>
              </div>
              <div className="stat-card">
                <h3>Unread Messages</h3>
                <p className="stat-value">{messages.filter(m => !m.read).length}</p>
              </div>
              <div className="stat-card">
                <h3>Pending Assignments</h3>
                <p className="stat-value">{assignments.length}</p>
              </div>
            </div>
            
            <div className="recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                {messages.filter(m => !m.read).slice(0, 3).map(message => (
                  <div key={message.id} className="activity-item">
                    <div className="activity-icon message-icon">📨</div>
                    <div className="activity-content">
                      <p className="activity-title">New message from {message.student}</p>
                      <p className="activity-detail">{message.content}</p>
                      <p className="activity-time">{message.date}</p>
                    </div>
                  </div>
                ))}
                {assignments.filter(a => new Date(a.dueDate) >= new Date()).slice(0, 2).map(assignment => (
                  <div key={assignment.id} className="activity-item">
                    <div className="activity-icon assignment-icon">📝</div>
                    <div className="activity-content">
                      <p className="activity-title">Assignment due soon: {assignment.title}</p>
                      <p className="activity-detail">Due: {assignment.dueDate} | Submitted: {assignment.submitted}/{assignment.total}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'messages' && (
          <div className="messages-container">
            <h2>Student Messages</h2>
            <div className="messages-list">
              {messages.map(message => (
                <div key={message.id} className={`message-item ${message.read ? 'read' : 'unread'}`}>
                  <div className="message-header">
                    <h3>{message.student}</h3>
                    <span className="message-date">{message.date}</span>
                  </div>
                  <p className="message-content">{message.content}</p>
                  <div className="message-actions">
                    {!message.read && (
                      <button onClick={() => markAsRead(message.id)}>Mark as Read</button>
                    )}
                    <button>Reply</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'classes' && (
          <div className="classes-container">
            <h2>My Classes</h2>
            <div className="classes-grid">
              {classes.map(cls => (
                <div key={cls.id} className="class-card">
                  <h3>{cls.name}</h3>
                  <div className="class-stats">
                    <p><strong>Students:</strong> {cls.students}</p>
                    <p><strong>Messages:</strong> {cls.pendingMessages}</p>
                    <p><strong>Assignments:</strong> {assignments.filter(a => a.classId === cls.id).length}</p>
                  </div>
                  <div className="class-actions">
                    <button>View Details</button>
                    <button>Message All</button>
                  </div>
                </div>
              ))}
              <div className="class-card add-class">
                <h3>Add New Class</h3>
                <button className="add-class-btn">+</button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'announcements' && (
          <div className="announcements-container">
            <div className="announcements-header">
              <h2>Announcements</h2>
              <button className="create-btn" onClick={() => document.getElementById('announcement-form').classList.toggle('hidden')}>Create New</button>
            </div>
            
            <form id="announcement-form" className="create-form hidden" onSubmit={submitAnnouncement}>
              <h3>New Announcement</h3>
              <div className="form-group">
                <label>Title:</label>
                <input 
                  type="text" 
                  name="title" 
                  value={newAnnouncement.title} 
                  onChange={handleAnnouncementChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Content:</label>
                <textarea 
                  name="content" 
                  value={newAnnouncement.content} 
                  onChange={handleAnnouncementChange} 
                  required 
                ></textarea>
              </div>
              <div className="form-group">
                <label>Class:</label>
                <select 
                  name="classId" 
                  value={newAnnouncement.classId} 
                  onChange={handleAnnouncementChange} 
                  required
                >
                  <option value="">Select a class</option>
                  {classes.map(cls => (
                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-actions">
                <button type="submit">Post Announcement</button>
                <button type="button" onClick={() => document.getElementById('announcement-form').classList.add('hidden')}>Cancel</button>
              </div>
            </form>
            
            <div className="announcements-list">
              {announcements.map(announcement => (
                <div key={announcement.id} className="announcement-item">
                  <div className="announcement-header">
                    <h3>{announcement.title}</h3>
                    <span className="announcement-date">{announcement.date}</span>
                  </div>
                  <p className="announcement-content">{announcement.content}</p>
                  <p className="announcement-class">
                    <strong>Class:</strong> {classes.find(c => c.id === announcement.classId)?.name}
                  </p>
                  <div className="announcement-actions">
                    <button>Edit</button>
                    <button>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'assignments' && (
          <div className="assignments-container">
            <div className="assignments-header">
              <h2>Assignments</h2>
              <button className="create-btn" onClick={() => document.getElementById('assignment-form').classList.toggle('hidden')}>Create New</button>
            </div>
            
            <form id="assignment-form" className="create-form hidden" onSubmit={submitAssignment}>
              <h3>New Assignment</h3>
              <div className="form-group">
                <label>Title:</label>
                <input 
                  type="text" 
                  name="title" 
                  value={newAssignment.title} 
                  onChange={handleAssignmentChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Due Date:</label>
                <input 
                  type="date" 
                  name="dueDate" 
                  value={newAssignment.dueDate} 
                  onChange={handleAssignmentChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Class:</label>
                <select 
                  name="classId" 
                  value={newAssignment.classId} 
                  onChange={handleAssignmentChange} 
                  required
                >
                  <option value="">Select a class</option>
                  {classes.map(cls => (
                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-actions">
                <button type="submit">Create Assignment</button>
                <button type="button" onClick={() => document.getElementById('assignment-form').classList.add('hidden')}>Cancel</button>
              </div>
            </form>
            
            <div className="assignments-list">
              {assignments.map(assignment => (
                <div key={assignment.id} className="assignment-item">
                  <div className="assignment-header">
                    <h3>{assignment.title}</h3>
                    <span className={`due-date ${new Date(assignment.dueDate) < new Date() ? 'overdue' : ''}`}>
                      Due: {assignment.dueDate}
                    </span>
                  </div>
                  <div className="assignment-stats">
                    <p><strong>Class:</strong> {classes.find(c => c.id === assignment.classId)?.name}</p>
                    <p><strong>Submitted:</strong> {assignment.submitted}/{assignment.total}</p>
                    <div className="progress-bar">
                      <div 
                        className="progress" 
                        style={{ width: `${(assignment.submitted / assignment.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="assignment-actions">
                    <button>View Submissions</button>
                    <button>Edit</button>
                    <button>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'analysis' && (
          <div className="analysis-container">
            <div className="analysis-header">
              <h2>Student Performance Analysis</h2>
              <div className="class-selector">
                <label>Select Class:</label>
                <select 
                  value={selectedClassForAnalysis} 
                  onChange={(e) => setSelectedClassForAnalysis(parseInt(e.target.value))}
                >
                  {classes.map(cls => (
                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="analysis-overview">
              <div className="analysis-card">
                <h3>Average Grade</h3>
                <p className="analysis-value">{currentClassPerformance.averageGrade}%</p>
              </div>
              <div className="analysis-card">
                <h3>Attendance Rate</h3>
                <p className="analysis-value">{currentClassPerformance.attendanceRate}%</p>
              </div>
              <div className="analysis-card">
                <h3>Participation Rate</h3>
                <p className="analysis-value">{currentClassPerformance.participationRate}%</p>
              </div>
            </div>
            
            <div className="analysis-charts">
              <div className="chart-container">
                <h3>Grade Distribution</h3>
                <div className="grade-distribution-chart">
                  {currentClassPerformance.gradesDistribution.map((count, index) => {
                    const grades = ['A', 'B', 'C', 'D', 'F'];
                    const maxCount = Math.max(...currentClassPerformance.gradesDistribution);
                    const percentage = (count / maxCount) * 100;
                    
                    return (
                      <div key={index} className="grade-bar-container">
                        <div className="grade-label">{grades[index]}</div>
                        <div className="grade-bar-wrapper">
                          <div 
                            className="grade-bar" 
                            style={{ 
                              height: `${percentage}%`,
                              backgroundColor: index === 0 ? '#4CAF50' : 
                                               index === 1 ? '#8BC34A' :
                                               index === 2 ? '#FFC107' :
                                               index === 3 ? '#FF9800' : '#F44336'
                            }}
                          ></div>
                        </div>
                        <div className="grade-count">{count}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="chart-container">
                <h3>Quiz Performance Trend</h3>
                <div className="quiz-trend-chart">
                  <div className="chart-y-axis">
                    <div>100%</div>
                    <div>75%</div>
                    <div>50%</div>
                    <div>25%</div>
                    <div>0%</div>
                  </div>
                  <div className="chart-content">
                    <div className="chart-lines">
                      <div className="chart-line"></div>
                      <div className="chart-line"></div>
                      <div className="chart-line"></div>
                      <div className="chart-line"></div>
                    </div>
                    <div className="quiz-bars">
                      {currentClassPerformance.quizScores.map((score, index) => (
                        <div key={index} className="quiz-bar-container">
                          <div 
                            className="quiz-bar" 
                            style={{ height: `${score.average}%` }}
                          ></div>
                          <div className="quiz-label">{score.week}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="analysis-actions">
              <button className="export-btn">Export Data as CSV</button>
              <button className="send-report-btn">Send Report to Department</button>
            </div>
          </div>
        )}
        
        {activeTab === 'documents' && (
          <div className="documents-container">
            <div className="documents-header">
              <h2>Course Documents</h2>
              <button className="create-btn" onClick={() => document.getElementById('document-form').classList.toggle('hidden')}>Upload New</button>
            </div>
            
            <form id="document-form" className="create-form hidden" onSubmit={submitDocument}>
              <h3>Upload Document</h3>
              <div className="form-group">
                <label>Document Title:</label>
                <input 
                  type="text" 
                  name="title" 
                  value={newDocument.title} 
                  onChange={handleDocumentChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>File (PDF):</label>
                <input 
                  type="file" 
                  id="file-upload"
                  name="file" 
                  accept=".pdf"
                  onChange={handleDocumentChange} 
                  required 
                  className="file-input"
                />
                <div className="file-input-info">
                  {newDocument.file ? (
                    <span>{newDocument.file.name} ({Math.round(newDocument.file.size / 1024)} KB)</span>
                  ) : (
                    <span>No file selected</span>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label>Class:</label>
                <select 
                  name="classId" 
                  value={newDocument.classId} 
                  onChange={handleDocumentChange} 
                  required
                >
                  <option value="">Select a class</option>
                  {classes.map(cls => (
                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-actions">
                <button type="submit">Upload Document</button>
                <button type="button" onClick={() => document.getElementById('document-form').classList.add('hidden')}>Cancel</button>
              </div>
            </form>
            
            <div className="documents-list">
              {documents.map(document => (
                <div key={document.id} className="document-item">
                  <div className="document-icon">📄</div>
                  <div className="document-info">
                    <h3>{document.title}</h3>
                    <p className="document-filename">{document.filename}</p>
                    <p className="document-details">
                      <span><strong>Class:</strong> {classes.find(c => c.id === document.classId)?.name}</span>
                      <span><strong>Size:</strong> {document.size}</span>
                      <span><strong>Uploaded:</strong> {document.uploadDate}</span>
                    </p>
                  </div>
                  <div className="document-actions">
                    <button className="view-btn">View</button>
                    <button className="share-btn">Share</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teacher;