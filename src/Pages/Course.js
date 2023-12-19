import React, { useEffect, useState } from "react";
import { Button, Table, Space, Typography, Popconfirm, Select } from "antd";
import {
  deleteCourse,
  getCourse,
  getCourseList,
} from "../Api/CourseController";
import AddCourseModal from "../Components/AddCourseModal";

const { Title } = Typography;

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [addNewCourse, setAddNewCourse] = useState(false);
  const [editCourse, setEditCourse] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [selectedYear, setSelectedYear] = useState(2023);
  const { Option } = Select;
  const fetchCourses = async () => {
    const res = await getCourse(selectedYear, selectedSemester);
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, [selectedYear, selectedSemester]);

  const handleAddCourse = () => {
    setAddNewCourse(true);
    setEditCourse(false);
    setEditingCourse(null);
  };

  const handleEdit = (record) => {
    setEditingCourse(record);
    setEditCourse(true);
    setAddNewCourse(false);
  };

  const handleDelete = async (record) => {
    const res = await deleteCourse(record.id);
    fetchCourses();
    console.log(`Delete course with ID: ${record.id}`);
  };
  const handleSemesterChange = (value) => {
    setSelectedSemester(value);
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };
  const columns = [
    {
      title: "Course Name",
      dataIndex: "subject",
      key: "subject",
      render: (subject) => subject?.name || "N/A",
    },
    {
        title: "Instructor",
        dataIndex: "instructor",
        key: "instructor",
        render: (subject) => subject?.name.firstName || "N/A",
      },
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      // Assuming the start_date is in a date format, adjust the render function accordingly
      render: (text, record) => new Date(record.startDate).toLocaleDateString(),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this course?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Course Management</Title>
      <Space>
        <Select defaultValue={1} onChange={handleSemesterChange}>
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="4">4</Option>
        </Select>
        <Select defaultValue={2023} onChange={handleYearChange}>
          <Option value={2022}>2022</Option>
          <Option value={2023}>2023</Option>
        </Select>
      </Space>
      <Button
        type="primary"
        style={{ marginBottom: "16px" }}
        onClick={handleAddCourse}
      >
        Create New Course
      </Button>
      <AddCourseModal
        editCourse={editCourse}
        addNewCourse={addNewCourse}
        editingCourse={editingCourse}
        setAddNewCourse={setAddNewCourse}
        setEditCourse={setEditCourse}
        fetchCourses={fetchCourses}
        setEditingCourse={setEditingCourse}
      />
      <Table
        dataSource={courses}
        columns={columns}
        rowKey={(record) => record.id}
      />
    </div>
  );
};

export default CourseManagement;
