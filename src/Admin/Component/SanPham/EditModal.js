import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, message, Radio } from 'antd';
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
        id_loaisp: data.id_loaisp,
        ten_sanpham: data.ten_sanpham,
        trang_thai: data.trang_thai,
      });
      setSelectedLoaiSanPham(data.id_loaisp);
    }
  }, [data, form, loaiSanPhamList]);

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

        <Form.Item
          name="trang_thai"
          label="Trạng thái"
          rules={[
            { required: true, message: 'Vui lòng chọn trạng thái' },
          ]}
        >
          <Radio.Group>
            <Radio value={1}>Ẩn</Radio>
            <Radio value={2}>Hiện</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
