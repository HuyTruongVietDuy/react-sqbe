import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import axios from 'axios';

const EditModal = ({ open, onOk, onCancel, data, form }) => {
  const [loaiSanPhamList, setLoaiSanPhamList] = useState([]);
  const [selectedLoaiSanPham, setSelectedLoaiSanPham] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/loaisanpham/list')
      .then(response => {
        setLoaiSanPhamList(response.data);
      })
      .catch(error => {
        console.error('Error fetching loai san pham list:', error);
        message.error('Unable to fetch loai san pham list');
      });
  }, []);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        id_loaisp: data.ten_loaisp,
        ten_sanpham: data.ten_sanpham,
      });
     
    }
  }, [data, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        onOk(values);
        form.resetFields();
        setSelectedLoaiSanPham(values.id_loaisp);
      })
      .catch(error => {
        console.error('Validation error:', error);
      });
  };

  return (
    <Modal
      title="Chỉnh sửa sản phẩm"
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="id_loaisp"
          label="Loại sản phẩm"
          rules={[
            { required: true, message: 'Vui lòng chọn loại sản phẩm' },
          ]}
        >
          <Select
            placeholder="Chọn loại sản phẩm"
            value={selectedLoaiSanPham}
            onChange={value => setSelectedLoaiSanPham(value)}
          >
            {loaiSanPhamList.map(loaiSanPham => (
              <Select.Option key={loaiSanPham.id_loaisp} value={loaiSanPham.id_loaisp}>
                {loaiSanPham.ten_loaisp}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="ten_sanpham"
          label="Tên sản phẩm"
          rules={[
            { required: true, message: 'Vui lòng nhập tên sản phẩm' },
          ]}
        >
          <Input />
        </Form.Item>

        
      </Form>
    </Modal>
  );
};

export default EditModal;
