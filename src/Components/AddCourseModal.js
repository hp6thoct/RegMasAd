import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Modal, DatePicker } from "antd";
import moment from "moment";
import {
  addCourse,
  updateCourse,
  getInstructorList,
} from "../Api/CourseController";
import { getSubjectList } from "../Api/SubjectController";

const { Option } = Select;

const AddCourseModal = ({
  editCourse,
  addNewCourse,
  editingCourse,
  fetchCourses,
  setEditingCourse,
  setAddNewCourse,
  setEditCourse,
}) => {
  const [form] = Form.useForm();
  const [instructors, setInstructors] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchInstructors();
    fetchSubjects();

    // Prefill form with existing course details when in "edit" mode
    if (editCourse && editingCourse) {
      form.setFieldsValue({
        capacity: editingCourse.capacity,
        room: editingCourse.room,
        schoolYear: editingCourse.schoolYear,
        semester: editingCourse.semester,
        startDate: moment(editingCourse.start_date),
        time: editingCourse.time,
        instructor_id: editingCourse.instructor.id,
        subject_id: editingCourse.subject.id,
      });
    }
  }, [editCourse, editingCourse, form]);

  const fetchInstructors = async () => {
    const res = await getInstructorList();
    setInstructors(res.data);
  };

  const fetchSubjects = async () => {
    const res = await getSubjectList();
    setSubjects(res.data);
  };

  const handleCloseModal = () => {
    setAddNewCourse(false);
    setEditCourse(false);
    setEditingCourse(); // Clear the editingCourse state
    form.resetFields(); // Reset the form fields
  };

  const onFinish = async (values) => {
    const formData = {
      capacity: Number(values.capacity),
      room: values.room,
      schoolYear: Number(values.schoolYear),
      semester: Number(values.semester),
      startDate: values.startDate.format(), // Use default format with timezone information
      time: values.time,
      instructor: instructors[values.instructor_id],
      subject: subjects[values.subject_id],
    };
    
    console.log(formData)
    try {
      if (editCourse) {
        // If in "edit" mode, call updateCourse instead of addCourse
        const res = await updateCourse(editingCourse.id, formData);
        console.log("update course successfully", res.status);
        setEditingCourse();
        fetchCourses();
        handleCloseModal();
      } else {
        // If in "add" mode, call addCourse
        const res = await addCourse(formData);
        console.log("add course successfully", res.status);
        fetchCourses();
        handleCloseModal();
      }
    } catch (e) {
      console.log("add/update course failed", e);
    }
  };

  return (
    <div className="container mt-5">
      <Modal
        title={editCourse ? "Edit Course" : "Add a New Course"}
        visible={addNewCourse || editCourse}
        onCancel={() => handleCloseModal()}
        footer={null}
      >
        <Form
          form={form}
          name="add-course-form"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Capacity"
            name="capacity"
            rules={[{ required: true, message: "Please input the capacity!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Room"
            name="room"
            rules={[{ required: true, message: "Please input the room!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="School Year"
            name="schoolYear"
            rules={[
              { required: true, message: "Please input the school year!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Semester"
            name="semester"
            rules={[{ required: true, message: "Please input the semester!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[
              { required: true, message: "Please input the start date!" },
            ]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>

          <Form.Item
            label="Time"
            name="time"
            rules={[{ required: true, message: "Please input the time!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Instructor"
            name="instructor_id"
            rules={[
              { required: true, message: "Please select the instructor!" },
            ]}
          >
            <Select>
              {instructors.map((instructor,iIndex) => (
                <Option key={instructor.id} value={iIndex}>
                  {instructor.name.firstName} {instructor.name.midName} {instructor.name.lastName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Subject"
            name="subject_id"
            rules={[{ required: true, message: "Please select the subject!" }]}
          >
            <Select>
              {subjects.map((subject,sIndex) => (
                <Option key={subject.id} value={sIndex}>
                  {subject.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {editCourse ? "Edit Course" : "Add a Course"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddCourseModal;
