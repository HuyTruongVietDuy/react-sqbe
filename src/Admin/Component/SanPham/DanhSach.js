import React, { useEffect, useState } from 'react';
import { Table, Button, message, Form, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setSanPhamList } from '../../../redux/slice/SanPhamSlice';
import {  Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import 'moment-timezone'; 
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

const ListProduct = () => {
  const dispatch = useDispatch();
  const sanPhamList = useSelector(state => state.sanPham.sanPhamList);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch product list from the server
    axios.get('http://localhost:4000/sanpham/list')
      .then(response => {
        dispatch(setSanPhamList(response.data));
      })
      .catch(error => {
        console.error('Error fetching product list:', error);
        message.error('Unable to fetch product list');
      });
  }, [dispatch]);

  const showEditModal = (productId) => {
    const selectedProduct = sanPhamList.find(product => product.id_sanpham === productId);
    setEditFormData(selectedProduct);
    setSelectedProductId(productId);
    setEditModalVisible(true);
  };

  const showDeleteModal = (productId) => {
    setSelectedProductId(productId);
    setDeleteModalVisible(true);
  };

  const handleEdit = async (values) => {
    try {
      const { id_loaisp, ten_sanpham, trang_thai } = values;
      const response = await axios.put(`http://localhost:4000/sanpham/edit/${selectedProductId}`, {
        id_loaisp,
        ten_sanpham,
        trang_thai,
      });

      if (response.status === 200) {
        // Dispatch action to update Redux store
        dispatch(setSanPhamList(sanPhamList.map(product =>
          product.id_sanpham === selectedProductId
            ? { ...product, ten_sanpham, id_loaisp, trang_thai }
            : product
        )));
        
        setEditModalVisible(false);
        message.success('Sản phẩm đã được cập nhật thành công');
      } else {
        message.error('Không thể cập nhật sản phẩm');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật sản phẩm:', error);
      message.error('Không thể cập nhật sản phẩm');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/sanpham/delete/${selectedProductId}`);

      if (response.status === 200) {
        // Dispatch action to update Redux store
        dispatch(setSanPhamList(sanPhamList.filter(product => product.id_sanpham !== selectedProductId)));

        setDeleteModalVisible(false);
        message.success('Product deleted successfully');
      } else {
        message.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      message.error('Failed to delete product');
    }
  };

  const handleCancelEdit = () => {
    setEditModalVisible(false);
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
  };

  const columns = [
    {
      title: 'Loại Sản Phẩm',
      dataIndex: 'ten_loaisp',
      key: 'ten_loaisp',
    },
    {
      title: 'ID',
      dataIndex: 'id_sanpham',
      key: 'id_sanpham',
    },
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'ten_sanpham',
      key: 'ten_sanpham',
    },
    {
      title: 'Lượt Xem',
      dataIndex: 'luot_xem',
      key: 'luot_xem',
    },
    {
      title: 'Ngày Thêm',
      dataIndex: 'time_add',
      key: 'time_add',
      render: (text) => text ? moment.tz(text, 'Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss') : 'Chưa cập nhật bao giờ',
    },
    {
      title: 'Ngày Cập Nhật',
      dataIndex: 'time_update',
      key: 'time_update',
      render: (text) => text ? moment.tz(text, 'Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss') : 'Chưa cập nhật bao giờ',
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
      title: 'Chức Năng',
      key: 'actions',
      render: (text, record) => (
        <span>
        <Link to={`/admin/chi-tiet-san-pham/${record.id_sanpham}`}>
          <Button type="link" style={{ marginRight: 4 }}>
            Xem
          </Button>
        </Link>
          <Button type="primary" style={{ marginRight: 8 }} onClick={() => showEditModal(record.id_sanpham)}>
            Sửa
          </Button>
          <Button type="default" onClick={() => showDeleteModal(record.id_sanpham)}>
            Xóa
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
    <h2>List of Products</h2>
    <Form form={form}>
      <Table dataSource={sanPhamList} columns={columns} rowKey="id_sanpham" />
    </Form>

    <EditModal
      open={editModalVisible}
      onOk={handleEdit}
      onCancel={handleCancelEdit}
      data={editFormData}
      form={form}
    />

    <DeleteModal
      open={deleteModalVisible}
      onOk={handleDelete}
      onCancel={handleCancelDelete}
    />
  </div>
);
};

export default ListProduct;