import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const AddProductForm = () => {
  const [form] = Form.useForm();
  const [loaiSanPhamList, setLoaiSanPhamList] = useState([]);

  useEffect(() => {
    const fetchLoaiSanPhamList = async () => {
      try {
        const response = await axios.get('http://localhost:4000/loaisanpham/list');
        setLoaiSanPhamList(response.data);
      } catch (error) {
        console.error('Error fetching loai san pham list:', error);
        message.error('Unable to fetch loai san pham list');
      }
    };

    fetchLoaiSanPhamList();
  }, []);

  const onFinish = async (values) => {
    try {
      // Gửi request API để thêm sản phẩm
      const response = await axios.post('http://localhost:4000/sanpham/add', values);

      // Xử lý kết quả thành công
      if (response.status === 200) {
        message.success('Đã thêm sản phẩm mới thành công');
   
        // Reset form
        form.resetFields();
      } else {
        message.error('Có lỗi xảy ra khi thêm sản phẩm');
      }
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm:', error);
      message.error('Có lỗi xảy ra khi xử lý yêu cầu');
    }
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
    >
    <h2> Thêm Sản Phẩm </h2> <br/>
      <Form.Item
        label="Loại Sản Phẩm"
        name="id_loaisp"
        rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm!' }]}
      >
        {/* Sử dụng dữ liệu loaiSanPhamList từ state để điền vào dropdown */}
        <Select>
          {loaiSanPhamList.map((loaiSanPham) => (
            <Option key={loaiSanPham.id_loaisp} value={loaiSanPham.id_loaisp}>
              {loaiSanPham.ten_loaisp}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Tên Sản Phẩm"
        name="ten_sanpham"
        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
        <Button type="primary" htmlType="submit">
          Thêm Sản Phẩm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProductForm;
