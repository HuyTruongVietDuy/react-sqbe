// Columns.js
import React from 'react';
import { Tag, Space, Button } from 'antd';
import moment from 'moment-timezone';

const Columns = ({ showEditModal, showDeleteModal }) => {
  return [
    {
      title: 'Danh Mục',
      dataIndex: 'ten_danhmuc',
      key: 'ten_danhmuc',
    },
    {
      title: 'ID',
      dataIndex: 'id_loaisp',
      key: 'id_loaisp',
    },
    {
      title: 'Tên Loại Sản Phẩm',
      dataIndex: 'ten_loaisp',
      key: 'ten_loaisp',
    },
    {
      title: 'Hình loại',
      dataIndex: 'hinh_loaisp',
      key: 'hinh_loaisp',
      render: (text, record) => (
        <img
          src={`http://localhost:4000/loaisanpham/uploads/${record.hinh_loaisp}`}
          alt="Hình loại"
          style={{ width: '70px', height: '100px' }}
        />
      ),
    },
    {
      title: 'Ngày thêm',
      dataIndex: 'time_add',
      key: 'time_add',
      render: (text, record) => (
        <span key={`time_add_${record.id_loaisp}`}>
          {moment.tz(text, 'Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss')}
        </span>
      ),
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'time_update',
      key: 'time_update',
      render: (text, record) => (
        <span key={`time_update_${record.id_loaisp}`}>
          {text ? moment.tz(text, 'Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss') : 'Chưa cập nhật bao giờ'}
        </span>
      ),
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'trang_thai',
      key: 'trang_thai',
      render: (text) => (
        <Tag color={text === 1 ? 'red' : 'green'} style={{ padding: '5px 20px' }}>
          {text === 1 ? 'Ẩn' : text === 2 ? 'Hiện' : 'Không xác định'}
        </Tag>
      ),
    },
    {
      title: 'Thao Tác',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button key={`edit_${record.id_loaisp}`} type="primary" onClick={() => showEditModal(record)}>
            Sửa
          </Button>
          <Button key={`delete_${record.id_loaisp}`} type="danger" onClick={() => showDeleteModal(record)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
};

export default Columns;
