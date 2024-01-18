import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, message, Upload, Modal } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;
const { Dragger } = Upload;

const ThemLoaiSanPham = () => {
  const [form] = Form.useForm();
  const [danhMucList, setDanhMucList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchDanhMucList = async () => {
      try {
        const response = await axios.get('http://localhost:4000/danhmuc/list');
        setDanhMucList(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchDanhMucList();
  }, []);

  const onFinish = async (values) => {
    try {
      const { tenLoaiSP, idDanhMuc, hinhLoaiSP } = values;

      const formData = new FormData();
      formData.append('ten_loaisp', tenLoaiSP);
      formData.append('id_danhmuc', idDanhMuc);
      formData.append('hinh_loaisp', hinhLoaiSP[0]?.originFileObj);

      await axios.post('http://localhost:4000/loaisanpham/add', formData);
      message.success('Loại sản phẩm đã được thêm thành công.');

      // Reset other fields excluding 'hinhLoaiSP'
      form.resetFields(['idDanhMuc', 'tenLoaiSP']);

      // Show custom confirmation message
      Modal.confirm({
        title: 'Thêm loại sản phẩm thành công',
        content: 'Bạn muốn thêm tiếp loại sản phẩm không?',
        onOk() {
          // If 'OK' is clicked, do nothing as the user wants to continue adding
          window.location.reload();
        },
        onCancel() {
          // If 'Cancel' is clicked, redirect to the product list page
          window.location.href = '/admin/danh-sach-loại-sản-phẩm';
        },
      });

    } catch (error) {
      console.error(error);
      message.error('Đã có lỗi xảy ra.');
    }
  };


  return (
    <div>
      <h2>Thêm Loại Sản Phẩm</h2>
      <Form
        form={form}
        name="themLoaiSanPhamForm"
        onFinish={onFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        encType='multipart/form-data'
      >
        <Form.Item
          name="idDanhMuc"
          label="Danh Mục"
          rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
        >
          <Select>
            {danhMucList.map((danhMuc) => (
              <Option key={danhMuc.id_DanhMuc} value={danhMuc.id_DanhMuc}>
                {danhMuc.ten_danhmuc}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="tenLoaiSP"
          label="Tên Loại SP"
          rules={[{ required: true, message: 'Vui lòng nhập tên loại sản phẩm!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
  name="hinhLoaiSP"
  label="Hình Ảnh"
  valuePropName="fileList"
  getValueFromEvent={(e) => {
    if (Array.isArray(e)) {
      setSelectedImage(e[0]?.originFileObj); // Set the selected image
      return e;
    }
    setSelectedImage(e && e.fileList[0]?.originFileObj); // Set the selected image
    return e && e.fileList;
  }}
  rules={[{ required: true, message: 'Vui lòng tải lên hình ảnh!' }]}
>
  <Dragger name="file" multiple={false} beforeUpload={() => false}>
    {selectedImage ? (
      <img
        src={URL.createObjectURL(selectedImage)}
        alt="Selected"
        style={{ width: '100%', height: 'auto', maxHeight: '350px' }}
      />
    ) : (
      <>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Kéo thả hoặc nhấn để tải lên</p>
      </>
    )}
  </Dragger>
</Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ThemLoaiSanPham;
