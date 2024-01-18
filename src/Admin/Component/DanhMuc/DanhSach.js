import React, { useEffect, useState } from 'react';
import { Table, message, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setDanhMucList } from '../../../redux/slice/DanhMucSlice'; // Import action from danhMucSlice
import axios from 'axios';


import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import DanhMucColumns from './Columns';
const ListDanhMuc = () => {
  const danhMucList = useSelector((state) => state.danhMuc.danhMucList);
  const dispatch = useDispatch();

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deletingRecord, setDeletingRecord] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);

  const [form] = Form.useForm(); // Create a form instance

  useEffect(() => {
    axios.get('http://localhost:4000/danhmuc/list')
      .then(response => {
        dispatch(setDanhMucList(response.data)); // Dispatch the action to update danhMucList in Redux store
      })
      .catch(error => {
        console.error('Lỗi khi tải danh sách danh muc:', error);
        message.error('Không thể lấy danh sách danh mục');
      });
  }, [dispatch]);

  const showDeleteModal = (record) => {
    setDeletingRecord(record);
    setDeleteModalVisible(true);
  };

  const showEditModal = (record) => {
    axios.get(`http://localhost:4000/danhmuc/get/${record.id_DanhMuc}`)
      .then(response => {
        if (response.data) {
          setEditingRecord(response.data);
          setEditModalVisible(true);
        } else {
          console.error('Lỗi khi lấy thông tin danh muc từ server');
          message.error('Không thể lấy thông tin danh muc');
        }
      })
      .catch(error => {
        console.error('Lỗi khi lấy thông tin danh muc:', error);
        message.error('Không thể lấy thông tin danh muc');
      });
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:4000/danhmuc/delete/${deletingRecord.id_DanhMuc}`)
      .then(response => {
        dispatch(setDanhMucList(danhMucList.filter(item => item.id_DanhMuc !== deletingRecord.id_DanhMuc)));
        message.success('Đã xóa danh mục');
        setDeleteModalVisible(false);
      })
      .catch(error => {
        console.error('Lỗi khi xóa danh muc:', error);
        message.error('Không thể xóa danh mục');
        setDeleteModalVisible(false);
      });
  };

  const handleEdit = (editedData) => {
    axios.put(`http://localhost:4000/danhmuc/edit/${editingRecord.id_DanhMuc}`, editedData)
      .then(response => {
        dispatch(setDanhMucList(danhMucList.map(item => (item.id_DanhMuc === editingRecord.id_DanhMuc ? { ...item, ...editedData } : item))));
        message.success('Đã cập nhật danh mục');
        setEditModalVisible(false);
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật danh muc:', error);
        message.error('Không thể cập nhật danh mục');
        setEditModalVisible(false);
      });
  };

  const handleCancelDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const handleCancelEditModal = () => {
    setEditModalVisible(false);
  };

  
  
  const columns = DanhMucColumns({ showEditModal, showDeleteModal });

  return (
    <div>
      <h2>Danh Sách Danh Mục</h2> <br />
      <Form form={form}>
        <Table dataSource={danhMucList} columns={columns} rowKey="id_DanhMuc" />
      </Form>

      {/* Modal xác nhận xóa */}
      <DeleteModal
        open={deleteModalVisible}
        onCancel={handleCancelDeleteModal}
        onConfirm={handleDelete}
        record={deletingRecord}
      />

      {/* Modal chỉnh sửa danh mục */}
      <EditModal
        open={editModalVisible}
        onCancel={handleCancelEditModal}
        onConfirm={handleEdit}
        record={editingRecord}
        form={form} // Pass the form instance as a prop
      />
    </div>
  );
};

export default ListDanhMuc;
