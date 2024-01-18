// EditModal.js
import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, message, Upload, Modal, Radio } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;
const { Dragger } = Upload;

const EditModal = ({ open, record, onCancel, form, onFinishCallback    }) => {
  const [danhMucList, setDanhMucList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    form.setFieldsValue({
      idDanhMuc: { key: record?.id_danhmuc, label: record?.ten_danhmuc },
      tenLoaiSP: record?.ten_loaisp,
      
    });
  }, [record, form]);

  useEffect(() => {
    setSelectedImage(null); // Reset selectedImage when modal visibility changes
  }, [open]);

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
      const { tenLoaiSP, idDanhMuc, trangThai } = values;
  
      // Extract id and label from the Select's labelInValue prop
      const idDanhMucValue = idDanhMuc.key;
      const hinhLoaiSPValue = selectedImage;
  
      // Prepare form data for multipart/form-data
      const formData = new FormData();
      formData.append('ten_loaisp', tenLoaiSP);
      formData.append('id_danhmuc', idDanhMucValue);
      formData.append('hinh_loaisp', hinhLoaiSPValue);
      formData.append('trang_thai', trangThai);
  
      // Make the API request to update the product type
      const response = await axios.put(`http://localhost:4000/loaisanpham/edit/${record.id_loaisp}`, formData);
  
      // Handle success
      if (response.status === 200) {
        message.success('Đã cập nhật loại sản phẩm');
        
        onCancel(); // Close the modal after successful update
        onFinishCallback();
      } else {
        message.error('Có lỗi xảy ra khi cập nhật loại sản phẩm');
      }
    } catch (error) {
      console.error('Error updating product type:', error);
      message.error('Có lỗi xảy ra khi xử lý yêu cầu');
    }
  };
    

  return (
    <Modal
      title={`Sửa Loại Sản Phẩm - ${record?.ten_loaisp}`}
      open={open} // Use 'visible' instead of 'open'
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        name="editLoaiSanPhamForm"
        onFinish={onFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        initialValues={{ ...record }}
        encType='multipart/form-data'
      >
        <Form.Item
          name="idDanhMuc"
          label="Danh Mục"
          rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
          initialValue={{ key: record?.id_danhmuc, label: record?.ten_danhmuc }}
        >
          <Select labelInValue>
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
          initialValue={record?.ten_loaisp}
        >
          <Input />
        </Form.Item>

        <Form.Item
  name="trangThai"
  label="Trạng Thái"
  rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
  initialValue={record?.trang_thai || 2} // Giá trị mặc định là 2 (Hiện)
>
  <Radio.Group>
    <Radio value={1}>Ẩn</Radio>
    <Radio value={2}>Hiện</Radio>
  </Radio.Group>
</Form.Item>

        <Form.Item
        name="hinhLoaiSP"
        label="Hình Ảnh"
        valuePropName="fileList"
        getValueFromEvent={(e) => {
          if (Array.isArray(e)) {
            setSelectedImage(e[0]?.originFileObj);
            return e;
          }
          setSelectedImage(e && e.fileList[0]?.originFileObj);
          return e && e.fileList;
        }}
        
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
          {(record && record.hinh_loaisp) && !selectedImage && (
            <img
              src={`http://localhost:4000/loaisanpham/uploads/${record.hinh_loaisp}`}
              style={{ width: '100px', height: 'auto' }}
              alt="Hình ảnh"
            />
          )}
          {(!selectedImage && !record?.hinh_loaisp) && (
            <p className="ant-upload-text">Không có hình ảnh</p>
          )}
        </Dragger>
      </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
          <Button type="primary" htmlType="submit">
            Cập Nhật
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
