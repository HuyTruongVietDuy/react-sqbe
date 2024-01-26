import React from 'react';
import { Modal } from 'antd';

const DeleteModal = ({ open, onOk, onCancel }) => {
  return (
    <Modal
      title="Xác nhận xóa"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText="Xóa"
      cancelText="Hủy"
    >
      <p>Bạn có chắc chắn muốn xóa?</p>
    </Modal>
  );
};

export default DeleteModal;
