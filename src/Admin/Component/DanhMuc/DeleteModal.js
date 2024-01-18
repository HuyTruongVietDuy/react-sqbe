import React from 'react';
import { Modal, Button } from 'antd';

const DeleteModal = ({ open, onCancel, onConfirm, record }) => {
  return (
    <Modal
      title="Xác nhận xóa"
      open={open} // Use 'visible' instead of 'open'
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button key="delete" type="danger" onClick={onConfirm}>
          Xóa
        </Button>,
      ]}
    >
      <p>Bạn có chắc chắn muốn xóa danh mục "{record?.ten_danhmuc}" không?</p>
    </Modal>
  );
};

export default DeleteModal;
