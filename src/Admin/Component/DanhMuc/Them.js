import React, { useState } from 'react';
import { Form, Input, Button, Space, message, Modal } from 'antd';
import axios from 'axios';
import './DanhMuc.css'; // Import your CSS file

const ThemDanhMuc = () => {
  const [duplicateError, setDuplicateError] = useState(null);

  const onFinish = async (values) => {
    try {
      // Gửi yêu cầu POST đến API để thêm danh mục
      await axios.post('http://localhost:4000/danhmuc/add', values);

      // Xử lý logic tại đây nếu cần

      // Hiển thị thông báo thành công
      message.success('Thêm danh mục thành công');

      // Reset trạng thái lỗi nếu có
      setDuplicateError(null);

      // Hiển thị cửa sổ xác nhận để hỏi người dùng có muốn thêm tiếp không
      Modal.confirm({
        title: 'Thêm danh mục thành công',
        content: 'Bạn muốn thêm tiếp danh mục không?',
        onOk() {
          // Nếu chọn "OK", không cần thực hiện gì cả vì đã ở lại trang thêm danh mục
        },
        onCancel() {
          // Nếu chọn "Cancel", chuyển hướng đến trang danh sách danh mục
          window.location.href = '/admin/danh-sach-danh-mục';
        },
      });
    } catch (error) {
      // Xử lý lỗi
      if (error.response && error.response.status === 400) {
        message.warning('Danh mục đã tồn tại, vui lòng chọn tên khác');
      } else {
        message.error('Thêm danh mục thất bại');
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    // Có thể xử lý thêm nếu cần
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="add-category-container">
      <h2>Thêm Danh Mục</h2> <br />
      {duplicateError && <div className="error-message">{duplicateError}</div>}
      <Form
        name="them-danh-muc-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item label="ID Danh Mục">
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Tên Danh Mục"
          name="ten_danhmuc"
          rules={[{ required: true, message: 'Vui lòng nhập Tên Danh Mục!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
            <Button type="default" htmlType="button">
              Hủy
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ThemDanhMuc;
