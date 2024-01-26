// routes/loaisanpham.js
const express = require('express');
const router = express.Router();
const db = require("../models/database");
const multer = require('../models/multerConfig');
const fs = require('fs');
const path = require('path');

// Route để thêm sản phẩm mới
router.post('/add', async (req, res) => {
    try {
        const { ten_sanpham, id_loaisp } = req.body;

        // Thực hiện truy vấn kiểm tra tên sản phẩm đã tồn tại chưa
        const checkSql = 'SELECT id_sanpham FROM SanPham WHERE ten_sanpham = ?';
        const checkResult = await db.queryPromise(checkSql, [ten_sanpham]);

        // Nếu đã tồn tại sản phẩm có cùng tên, trả về lỗi
        if (checkResult.length > 0) {
            return res.status(400).json({ message: 'Sản phẩm với tên này đã tồn tại.' });
        }

        // Nếu không tồn tại, thực hiện thêm sản phẩm vào database
        const addSql = 'INSERT INTO SanPham (ten_sanpham, id_loaisp, trang_thai) VALUES (?, ?, ?)';
        await db.queryPromise(addSql, [ten_sanpham, id_loaisp, 1]); // Giả sử trạng thái mặc định là 1

        // Trả về thông báo thành công
        res.status(200).json({ message: 'Đã thêm sản phẩm mới thành công.' });
    } catch (error) {
        console.error('Lỗi khi thêm sản phẩm mới:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi xử lý yêu cầu.' });
    }
});


// Route để lấy danh sách sản phẩm
router.get('/list', async (req, res) => {
    try {
        // Thực hiện truy vấn để lấy danh sách sản phẩm với tên loại sản phẩm
        const selectSql = `
        SELECT 
        SanPham.id_sanpham, 
        SanPham.ten_sanpham, 
        LoaiSanPham.id_loaisp, 
        LoaiSanPham.ten_loaisp AS ten_loaisp, 
        SanPham.luot_xem, 
        SanPham.trang_thai,
        SanPham.time_add,
        SanPham.time_update
    FROM SanPham
    JOIN LoaiSanPham ON SanPham.id_loaisp = LoaiSanPham.id_loaisp;
    
        `;
        const sanPhamList = await db.queryPromise(selectSql);

        // Trả về danh sách sản phẩm
        res.status(200).json(sanPhamList);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi xử lý yêu cầu.' });
    }
});



// Route để xóa sản phẩm
router.delete('/delete/:id', async (req, res) => {
    try {
        const productId = req.params.id;

        // Thực hiện truy vấn để xóa sản phẩm từ database
        const deleteSql = 'DELETE FROM SanPham WHERE id_sanpham = ?';
        const result = await db.queryPromise(deleteSql, [productId]);

        if (result.affectedRows > 0) {
            // Sản phẩm đã được xóa thành công
            res.status(200).json({ message: 'Đã xóa sản phẩm thành công.' });
        } else {
            // Không tìm thấy sản phẩm để xóa
            res.status(404).json({ message: 'Không tìm thấy sản phẩm để xóa.' });
        }
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi xử lý yêu cầu.' });
    }
});




router.put('/edit/:id', async (req, res) => {
    try {
      const { ten_sanpham, id_loaisp, trang_thai } = req.body;
      const id_sanpham = req.params.id;
  
      // Check if the product with the given id exists
      const checkSql = 'SELECT * FROM SanPham WHERE id_sanpham = ?';
      const checkResult = await db.queryPromise(checkSql, [id_sanpham]);
  
      if (checkResult.length === 0) {
        return res.status(404).json({ "thong bao": "Không tìm thấy sản phẩm với id đã cho" });
      }
  
      // Update ten_sanpham, id_loaisp, and trang_thai fields in the database
      const updateSql = 'UPDATE SanPham SET ten_sanpham = ?, id_loaisp = ?, trang_thai = ?, time_update = CURRENT_TIMESTAMP WHERE id_sanpham = ?';
  
      // Execute the update query
      const updateResult = await db.queryPromise(updateSql, [ten_sanpham, id_loaisp, trang_thai, id_sanpham]);
  
      // Return success response
      res.status(200).json({ "thong bao": "Đã cập nhật tên sản phẩm, loại sản phẩm, và trạng thái", "id_sanpham": id_sanpham });
    } catch (error) {
      console.error("Server error:", error);
      // Handle request processing error
      res.status(500).json({ "thong bao": "Lỗi xử lý yêu cầu", error: error.message });
    }
  });
  

  
  
  // Route để lấy chi tiết sản phẩm dựa trên id_sanpham
router.get('/details/:id', async (req, res) => {
    try {
        const productId = req.params.id;

        // Thực hiện truy vấn để lấy thông tin chi tiết sản phẩm
        const selectSql = `
            SELECT 
                SanPham.id_sanpham, 
                SanPham.ten_sanpham, 
                LoaiSanPham.id_loaisp, 
                LoaiSanPham.ten_loaisp AS ten_loaisp, 
                SanPham.luot_xem, 
                SanPham.trang_thai,
                SanPham.time_add,
                SanPham.time_update
            FROM SanPham
            JOIN LoaiSanPham ON SanPham.id_loaisp = LoaiSanPham.id_loaisp
            WHERE SanPham.id_sanpham = ?;
        `;
        const productDetail = await db.queryPromise(selectSql, [productId]);

        // Kiểm tra xem sản phẩm có tồn tại không
        if (productDetail.length === 0) {
            return res.status(404).json({ "thong bao": "Không tìm thấy sản phẩm với id đã cho" });
        }

        // Trả về thông tin chi tiết của sản phẩm
        res.status(200).json(productDetail[0]);
    } catch (error) {
        console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi xử lý yêu cầu.' });
    }
});

  



module.exports = router;