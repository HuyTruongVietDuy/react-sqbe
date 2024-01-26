import React from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const AddChiTietSanPhamForm = ({ open, onOk, onCancel, form, id }) => {
  const validatePrice = (rule, value) => {
    return new Promise((resolve, reject) => {
      const floatValue = parseFloat(value);

      if (isNaN(floatValue)) {
        reject('Vui lòng nhập một giá trị số');
      } else {
        resolve();
      }
    });
  };

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          const response = await axios.post('http://localhost:4000/chitietsanpham/add', {
            idSanPham: id,
            gia: values.gia,
            gia_khuyenmai: values.gia_khuyenmai,
            mauSac: values.mauSac,
          });

          console.log('Server Response:', response);

          if (response.status === 200) {
            message.success('Thêm chi tiết sản phẩm thành công');
            onOk(values);
          } else {
            message.error('Thêm chi tiết sản phẩm thất bại');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      })
      .catch((errorInfo) => {
        console.error('Validation Failed:', errorInfo);
      });
  };

  const availableColors = ['Black', 'White', 'Red', 'Pink', 'Silver', 'Blue']; // Add more colors as needed

  return (
    <Modal
      title="Thêm Chi Tiết Sản Phẩm"
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">

      <Form.Item
      label="Màu sản phẩm"
      name="mauSac"
      rules={[{ required: true, message: 'Vui lòng chọn màu sản phẩm' }]}
    >
      <Select placeholder="Chọn màu sản phẩm">
        {availableColors.map((color) => (
          <Option key={color} value={color}>
            {color}
          </Option>
        ))}
      </Select>
    </Form.Item>
    
        <Form.Item
          label="Giá"
          name="gia"
          rules={[
            { required: true, message: 'Vui lòng nhập giá' },
            { validator: validatePrice },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Giá khuyến mãi"
          name="gia_khuyenmai"
          rules={[
            { validator: validatePrice },
          ]}
        >
          <Input />
        </Form.Item>
      
      </Form>
    </Modal>
  );
};

export default AddChiTietSanPhamForm;
