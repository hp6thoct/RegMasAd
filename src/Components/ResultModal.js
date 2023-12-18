import React, { useEffect, useRef } from 'react';
import { Modal } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const ResultModal = ({ visible, onOk, onCancel, title, content, isSuccess }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (visible && inputRef.current) {
      // Focus on the input when the modal becomes visible
      inputRef.current.focus();
    }
  }, [visible]);

    

  const renderIcon = () => {
    return isSuccess ? (
      <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '24px' }} />
    ) : (
      <CloseCircleOutlined style={{ color: '#f5222d', fontSize: '24px' }} />
    );
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onOk}  // Use the new handler for the OK button
      onCancel={onCancel}
    >
      {renderIcon()}
      <p>{content}</p>
    </Modal>
  );
};

export default ResultModal;
