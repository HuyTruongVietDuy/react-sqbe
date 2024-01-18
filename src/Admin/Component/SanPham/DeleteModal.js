// DeleteConfirmationModal.js
import React from 'react';
import { Modal } from 'antd';

const DeleteConfirmationModal = ({ open, onOk, onCancel }) => {
  return (
    <Modal
      title="Xác nhận xóa"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
    >
      <p>Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
    </Modal>
  );
};

export default DeleteConfirmationModal;
