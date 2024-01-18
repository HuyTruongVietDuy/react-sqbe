// DanhMucColumns.js
import React from 'react';
import { Tag, Space, Button } from 'antd';
import moment from 'moment-timezone';

const DanhMucColumns = ({ showEditModal, showDeleteModal }) => {
  return [
    { title: 'ID', dataIndex: 'id_DanhMuc', key: 'id_DanhMuc' },
    { title: 'Tên Danh Mục', dataIndex: 'ten_danhmuc', key: 'ten_danhmuc' },
    {
      title: 'Ngày Thêm',
      dataIndex: 'time_add',
      key: 'time_add',
      render: (text, record) => (
        <span key={`time_add_${record.id_DanhMuc}`}>
          {moment.tz(text, 'Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss')}
        </span>
      ),
    },
    {
      title: 'Ngày Cập Nhật',
      dataIndex: 'time_update',
      key: 'time_update',
      render: (text, record) => (
        <span key={`time_update_${record.id_DanhMuc}`}>
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
        <Space size="middle" key={`action_${record.id_DanhMuc}`}>
          <Button type="primary" onClick={() => showEditModal(record)}>
            Sửa
          </Button>
          <Button type="danger" onClick={() => showDeleteModal(record)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
};

export default DanhMucColumns;
