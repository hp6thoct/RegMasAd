import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Header from "./Components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from "./Context/UserContext";
import 'antd/dist/reset.css';
import Timetable from "./Pages/Timetable";
import SubjectManagement from "./Pages/Subject";
import CourseManagement from "./Pages/Course";
import StudentManagement from "./Pages/Student";



function App() {
  return (
    <UserProvider>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/subject" element={<SubjectManagement/>}/>
          <Route path="/student/:studentid/register-course" element={<Timetable />} />
          <Route path="/student" element={<StudentManagement />} />
          <Route path="/course" element={<CourseManagement />} />
        </Routes>
        
      </div>
    </UserProvider>
  );
}

export default App;
