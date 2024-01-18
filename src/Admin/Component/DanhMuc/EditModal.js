// EditModal.js
import React, { useEffect } from 'react';
import { Modal, Button, Form, Input, Radio } from 'antd';

const EditModal = ({ open, onCancel, onConfirm, record, form }) => {
  useEffect(() => {
    // Set the initial form values when the record changes
    form.setFieldsValue({
      id_DanhMuc: record?.id_DanhMuc || '',
      ten_danhmuc: record?.ten_danhmuc || '',
      trang_thai: record?.trang_thai || 1, // Assuming 'trang_thai' is the field for status (1 for 'ẩn' and 2 for 'hiện')
      // Add other fields you want to edit
    });
  }, [form, record]);

  const handleInputChange = (e) => {
    // Handle input changes if needed
  };

  return (
    <Modal
      title="Chỉnh Sửa Danh Mục"
      open={open} // Use 'visible' instead of 'open'
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button key="save" type="primary" onClick={() => form.submit()}>
          Lưu
        </Button>,
      ]}
    >
      <Form form={form} onFinish={(values) => onConfirm(values)}>
        <Form.Item label="ID Danh Mục" name="id_DanhMuc">
          <Input name="id_DanhMuc" disabled />
        </Form.Item>
        
        <Form.Item
        label="Tên Danh Mục"
        name="ten_danhmuc"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập tên danh mục!',
          },
        ]}
      >
        <Input name="ten_danhmuc" onChange={handleInputChange} />
      </Form.Item>
        <Form.Item label="Trạng Thái" name="trang_thai">
          <Radio.Group>
            <Radio value={1}>Ẩn</Radio>
            <Radio value={2}>Hiện</Radio>
          </Radio.Group>
        </Form.Item>
        {/* Add other form items for additional fields */}
      </Form>
    </Modal>
  );
};

export default EditModal;
