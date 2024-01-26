import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Button, Form, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddChiTietSanPhamForm from './them';
import DeleteModal from './DeleteModal'; // Import the DeleteModal component

const ChiTietSanPham = () => {
  const { id } = useParams();
  const [chiTietSanPham, setChiTietSanPham] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // State for delete modal
  const [deleteItemId, setDeleteItemId] = useState(null); // State to track the item to be deleted
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchChiTietSanPham = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/chitietsanpham/list/${id}`);
        setChiTietSanPham(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách chi tiết sản phẩm:', error);
      }
    };

    fetchChiTietSanPham();
  }, [id]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsDeleteModalVisible(false); // Hide delete modal when closing the main modal
  };

  const handleAddChiTiet = async () => {
    try {
      // Your logic for adding a new item
    } catch (error) {
      console.error('Lỗi khi thêm chi tiết sản phẩm:', error);
    }
  };

  const handleDeleteChiTiet = (id) => {
    setDeleteItemId(id); // Set the item ID to be deleted
    setIsDeleteModalVisible(true); // Show the delete modal
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/chitietsanpham/delete/${deleteItemId}`);
      message.success('Xóa thành công');
      setChiTietSanPham((prevChiTietSanPham) =>
        prevChiTietSanPham.filter((item) => item.id_chitietsp !== deleteItemId)
      );
      setIsDeleteModalVisible(false); // Hide the delete modal after successful deletion
    } catch (error) {
      console.error('Lỗi khi xóa chi tiết sản phẩm:', error);
      message.error('Xóa thất bại');
    }
  };

  const cancelDelete = () => {
    setDeleteItemId(null); // Reset the delete item ID
    setIsDeleteModalVisible(false); // Hide the delete modal
  };
  

  const columns = [
    {
      title: 'tên sản phẩm',
      dataIndex: 'ten_sanpham',
      key: 'ten_sanpham',
    },
    {
      title: 'ID chi tiết',
      dataIndex: 'id_chitietsp',
      key: 'id_chitiet',
    },
    {
      title: 'Màu sản phẩm',
      dataIndex: 'ten_mausac',
      key: 'ten_mausac',
    },
    {
      title: 'Giá',
      dataIndex: 'gia',
      key: 'gia',
    },
    {
      title: 'Giá khuyến mãi',
      dataIndex: 'gia_khuyenmai',
      key: 'gia_khuyenmai',
    },
    {
      title: 'Chức Năng',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Link to={`/admin/chi-tiet-mot-san-pham/${record.id_chitietsp}`}>
            <Button type="link" style={{ marginRight: 4 }}>
              Xem
            </Button>
          </Link>

          <Button type="primary" style={{ marginRight: 8 }}>
            Sửa
          </Button>
          <Button type="default" onClick={() => handleDeleteChiTiet(record.id_chitietsp)}>
            Xóa
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Chi tiết sản phẩm</h2>
      <Button type="default" onClick={showModal} style={{ marginBottom: 16 }}>
        Thêm Chi Tiết Sản Phẩm
      </Button>
      <Table columns={columns} dataSource={chiTietSanPham} pagination={false} rowKey="id_chitietsp" />

      <AddChiTietSanPhamForm
        open={isModalVisible}
        onOk={handleAddChiTiet}
        onCancel={handleCancel}
        form={form}
        id={id}
      />

      <DeleteModal
      open={isDeleteModalVisible}
      onOk={confirmDelete}
      onCancel={cancelDelete}
    />
    </div>
  );
};

export default ChiTietSanPham;
