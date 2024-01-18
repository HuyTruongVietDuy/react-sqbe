import React, { useEffect, useState } from 'react';
import { Table, Button, message, Form, Tag } from 'antd';
import axios from 'axios';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

const ListProduct = () => {
  const [productList, setProductList] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  const [form] = Form.useForm();
  useEffect(() => {
    // Fetch product list from the server
    axios.get('http://localhost:4000/sanpham/list')
      .then(response => {
        setProductList(response.data);
      })
      .catch(error => {
        console.error('Error fetching product list:', error);
        message.error('Unable to fetch product list');
      });
  }, []);

  const showEditModal = (productId) => {
    const selectedProduct = productList.find(product => product.id_sanpham === productId);
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
      const { id_loaisp, ten_sanpham } = values;
  
      const response = await axios.put(`http://localhost:4000/sanpham/edit/${selectedProductId}`, {
        id_loaisp: values.id_loaisp,
        ten_sanpham: values.ten_sanpham,
      });
  
      if (response.status === 200) {
        // Update the product list and close the modal on successful update
        setProductList(productList.map(product =>
          product.id_sanpham === selectedProductId
            ? { ...product, ten_sanpham, id_loaisp }
            : product
        ));
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
      // Perform the delete operation on the server
      const response = await axios.delete(`http://localhost:4000/sanpham/delete/${selectedProductId}`);

      if (response.status === 200) {
        // Update the product list and close the delete modal on successful deletion
        setProductList(productList.filter(product => product.id_sanpham !== selectedProductId));
        setDeleteModalVisible(false);
        message.success('Product deleted successfully');
      } else {
        // Handle other status codes if needed
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
      title: 'Chức Năng',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button type="link" style={{ marginRight: 8 }}>
            Xem
          </Button>
          <Button type="primary" style={{ marginRight: 8 }} onClick={() => showEditModal(record.id_sanpham, record)}>
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
      <Table dataSource={productList} columns={columns} rowKey="id_sanpham" />
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
