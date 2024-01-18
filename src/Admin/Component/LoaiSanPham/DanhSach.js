import React, { useEffect, useState } from 'react';
import { Table, message, Form } from 'antd'; // Added Modal
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoaiSanPhamList } from '../../../redux/slice/LoaiSanPhamSlice';

import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import Columns from './Columns';

const ListLoaiSanPham = () => {
  const dispatch = useDispatch();
  const loaiSanPhamList = useSelector((state) => state.loaiSanPham.loaiSanPhamList);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deletingRecord, setDeletingRecord] = useState(null);
  
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentEditingRecord, setCurrentEditingRecord] = useState(null);
  const [form] = Form.useForm(); 


  useEffect(() => {
    axios.get('http://localhost:4000/loaisanpham/list')
      .then(response => {
        dispatch(setLoaiSanPhamList(response.data));
      })
      .catch(error => {
        console.error('Error fetching loai san pham list:', error);
        message.error('Unable to fetch loai san pham list');
      });
  }, [dispatch]);

  const handleEditFinish = () => {
    axios.get('http://localhost:4000/loaisanpham/list')
      .then(response => {
        dispatch(setLoaiSanPhamList(response.data));
      })
      .catch(error => {
        console.error('Error fetching loai san pham list:', error);
        message.error('Unable to fetch loai san pham list');
      });
  };

  const showEditModal = (record) => {
    setCurrentEditingRecord(record);
    setEditModalVisible(true);
  };

  const showDeleteModal = (record) => {
    setDeletingRecord(record);
    setDeleteModalVisible(true);
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:4000/loaisanpham/delete/${deletingRecord.id_loaisp}`)
      .then(response => {
        dispatch(setLoaiSanPhamList(loaiSanPhamList.filter(item => item.id_loaisp !== deletingRecord.id_loaisp)));
        message.success('Đã xóa loại sản phẩm');
        setDeleteModalVisible(false);
      })
      .catch(error => {
        console.error('Error deleting loai san pham:', error);
        message.error('Không thể xóa loại sản phẩm');
        setDeleteModalVisible(false);
      });
  };

  const handleCancelDeleteModal = () => {
    setDeleteModalVisible(false);
  };



  return (
    <div>
      <h2>Danh Sách Loại Sản Phẩm</h2>
      <Form form={form}>
      <Table
      dataSource={loaiSanPhamList}
      columns={Columns({ showEditModal, showDeleteModal })}
      rowKey={(record) => record.id_loaisp}
    />
      </Form>
 
      <DeleteModal
        open={deleteModalVisible}
        onOk={handleDelete}
        onCancel={handleCancelDeleteModal}
      />

    
      <EditModal
        open={editModalVisible}
        record={currentEditingRecord}
        onCancel={() => setEditModalVisible(false)}
        form={form}
        onFinishCallback={handleEditFinish}
      />
    </div>
  );
};

export default ListLoaiSanPham;
