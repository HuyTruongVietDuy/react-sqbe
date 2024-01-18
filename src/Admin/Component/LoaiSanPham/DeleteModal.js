import React from 'react';
import { Modal } from 'antd';

const DeleteModal = ({ open, onOk, onCancel }) => {
  return (
    <Modal
      title="Xác nhận xóa"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
    >
      <p>Bạn có chắc chắn muốn xóa loại sản phẩm này không?</p>
    </Modal>
  );
};

export default DeleteModal;
