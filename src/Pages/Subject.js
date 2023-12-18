import React, { useEffect, useState } from "react";
import { Button, Table, Space, Typography, Popconfirm } from "antd";
import { deleteSubject, getSubjectList } from "../Api/SubjectController";
import AddSubjectModal from "../Components/AddSubjectModal";

const { Title } = Typography;

const SubjectManagement = () => {
  const [subjects, setSubjects] = useState([]);
  const [addNewSubject, setAddNewSubject] = useState(false);
  const [editSubject, setEditSubject] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);

  const fetchSubjects = async () => {
    const res = await getSubjectList();
    setSubjects(res.data);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleAddSubject = () => {
    setAddNewSubject(true);
    setEditSubject(false);
    setEditingSubject(null);
  };

  const handleEdit = (record) => {
    setEditingSubject(record);
    setEditSubject(true);
    setAddNewSubject(false);
  };

  const handleDelete = async (record) => {
    const res = await deleteSubject(record.id);
    fetchSubjects();
    console.log(`Delete subject with ID: ${record.id}`);
  };

  const columns = [
    {
      title: "Subject Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Credit",
      dataIndex: "credit",
      key: "credit",
    },
    {
      title: "Faculty",
      dataIndex: "faculty",
      key: "faculty",
    },
    {
      title: "Major",
      dataIndex: "major",
      key: "major",
    },
    {
      title: "Class Hour",
      dataIndex: "classHour",
      key: "classHour",
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
            title="Are you sure to delete this subject?"
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
      <Title level={2}>Subject Management</Title>
      <Button
        type="primary"
        style={{ marginBottom: "16px" }}
        onClick={handleAddSubject}
      >
        Create New Subject
      </Button>
      <AddSubjectModal
        editSubject={editSubject}
        addNewSubject={addNewSubject}
        editingSubject={editingSubject}
        setAddNewSubject={setAddNewSubject}
        setEditSubject={setEditSubject}
        fetchSubjects={fetchSubjects}
        setEditingSubject={setEditingSubject}
      />
      <Table
        dataSource={subjects}
        columns={columns}
        rowKey={(record) => record.id}
      />
    </div>
  );
};

export default SubjectManagement;
