// StudentManagement.js

import React, { useState, useEffect } from "react";
import { Button, Row, Col, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { getStudent } from "../Api/CourseController";

const { Title } = Typography;

const StudentManagement = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const res = await getStudent();
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Student Management</Title>
      <Row gutter={16}>
        {students.map((student) => (
          <Col key={student.id} xs={24} sm={12} md={8} lg={6}>
            <StudentCard student={student} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

const StudentCard = ({ student }) => {
  const navigate = useNavigate();

  const handleView = () => {
    // Use navigate to go to the student's register course page with state
    console.log(student)
    navigate(`/student/${student.id}/register-course`, { state: { student: student } });
  };

  return (
    <div style={{ marginBottom: "16px", border: "1px solid #e8e8e8", padding: "16px", borderRadius: "8px" }}>
      <Title level={4}>
        {student.name.firstName} {student.name.midName} {student.name.lastName}
      </Title>
      <p>Email: {student.account.email}</p>
      <p>ID: {student.studentID}</p>
      <Button type="primary" onClick={handleView}>
        View
      </Button>
    </div>
  );
};

export default StudentManagement;
