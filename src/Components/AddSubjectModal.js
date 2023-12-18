import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Modal } from "antd";
import {
  addSubject,
  updateSubject,
  setEditingSubject,
} from "../Api/SubjectController";

const { Option } = Select;

const AddSubjectModal = ({
  editSubject,
  addNewSubject,
  editingSubject,
  fetchSubjects,
  setEditingSubject,
  setAddNewSubject,
  setEditSubject,
}) => {
  const [form] = Form.useForm(); // Use form instance to control the form

  useEffect(() => {
    // Prefill form with existing subject details when in "edit" mode
    if (editSubject && editingSubject) {
      form.setFieldsValue({
        name: editingSubject.name,
        classHour: editingSubject.classHour,
        credit: editingSubject.credit,
        faculty: editingSubject.faculty,
        major: editingSubject.major,
      });
    }
  }, [editSubject, editingSubject, form]);

  const handleCloseModal = () => {
    setAddNewSubject(false);
    setEditSubject(false);
    setEditingSubject(); // Clear the editingSubject state
    form.resetFields(); // Reset the form fields
  };

  const onFinish = async (values) => {
    const formData = {
      name: values.name,
      classHour: values.classHour,
      credit: values.credit,
      faculty: values.faculty,
      major: values.major,
    };

    try {
      if (editSubject) {
        // If in "edit" mode, call updateSubject instead of addSubject
        const res = await updateSubject(editingSubject.id, formData);
        console.log("update subject successfully", res.status);
        setEditingSubject();
        fetchSubjects();
        handleCloseModal();
      } else {
        // If in "add" mode, call addSubject
        const res = await addSubject(formData);
        console.log("add subject successfully", res.status);
        fetchSubjects();
        handleCloseModal();
      }
    } catch (e) {
      console.log("add/update subject failed", e);
    }
  };

  return (
    <div className="container mt-5">
      <Modal
        title={editSubject ? "Edit Subject" : "Add a New Subject"}
        visible={addNewSubject || editSubject} // Assuming you pass a prop addNewSubject to control the modal visibility
        onCancel={() => handleCloseModal()} // Assuming you have a function handleCloseModal to close the modal
        footer={null}
      >
        <Form
          form={form}
          name="add-subject-form"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Class Hour"
            name="classHour"
            rules={[
              { required: true, message: "Please input the class hour!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Credit"
            name="credit"
            rules={[{ required: true, message: "Please input the credit!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Faculty"
            name="faculty"
            rules={[{ required: true, message: "Please input the faculty!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Major"
            name="major"
            rules={[{ required: true, message: "Please input the major!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {editSubject ? "Edit Subject" : "Add a Subject"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddSubjectModal;
