// routes/loaisanpham.js
const express = require('express');
const router = express.Router();
const db = require("../models/database");
const multer = require('../models/multerConfig');
const fs = require('fs');
const path = require('path');

// Cấu hình để phục vụ tệp tĩnh từ thư mục 'uploads'
router.use('/uploads', express.static('uploads'));



router.get('/list/:idSanPham', async (req, res) => {
  try {
    const idSanPham = req.params.idSanPham;

    // Sử dụng truy vấn JOIN để lấy thông tin từ cả ba bảng
    const selectSql = `
      SELECT ChiTietSanPham.*, MauSanPham.ten_mausac, SanPham.ten_sanpham
      FROM ChiTietSanPham
      INNER JOIN SanPham ON ChiTietSanPham.id_sanpham = SanPham.id_sanpham
      LEFT JOIN MauSanPham ON ChiTietSanPham.id_chitietsp = MauSanPham.id_chitietsp
      WHERE ChiTietSanPham.id_sanpham = ?`;

    const result = await db.queryPromise(selectSql, [idSanPham]);

    if (result.length > 0) {
      res.status(200).json(result); // Trả về danh sách chi tiết sản phẩm với thông tin màu sắc
    } else {
      res.status(404).json({ message: 'Không tìm thấy chi tiết sản phẩm' });
    }
  } catch (error) {
    console.error('Lỗi khi lấy danh sách chi tiết sản phẩm:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi xử lý yêu cầu' });
  }
});




router.post('/add', async (req, res) => {
  try {
    const { idSanPham, gia, gia_khuyenmai, mauSac } = req.body;

    // Kiểm tra xem id_sanpham có giá trị không
    if (idSanPham === null) {
      return res.status(400).json({ message: 'id_sanpham không được phép là null' });
    }

    // Thực hiện truy vấn để thêm chi tiết sản phẩm vào bảng ChiTietSanPham
    const insertChiTietSql = 'INSERT INTO ChiTietSanPham (gia, gia_khuyenmai, id_sanpham) VALUES (?, ?, ?)';
    const resultChiTiet = await db.queryPromise(insertChiTietSql, [gia, gia_khuyenmai, idSanPham]);

    if (resultChiTiet.affectedRows > 0) {
      // Lấy id_chitietsp của chi tiết sản phẩm vừa được thêm
      const idChiTietSP = resultChiTiet.insertId;

      // Thực hiện truy vấn để thêm màu sản phẩm vào bảng MauSanPham
      const insertMauSql = 'INSERT INTO MauSanPham (id_chitietsp, ten_mausac) VALUES (?, ?)';
      const resultMau = await db.queryPromise(insertMauSql, [idChiTietSP, mauSac]);

      if (resultMau.affectedRows > 0) {
        // Lấy id_mausac của màu sắc vừa được thêm
        const idMauSac = resultMau.insertId;

        // Thực hiện truy vấn để thêm hình ảnh màu và đặt giá trị null cho các URL
        const insertHinhAnhMauSql = 'INSERT INTO HinhAnhMau (id_mausac, duong_dan_1, duong_dan_2, duong_dan_3, duong_dan_4) VALUES (?, NULL, NULL, NULL, NULL)';
        await db.queryPromise(insertHinhAnhMauSql, [idMauSac]);

        // Thực hiện truy vấn để thêm số lượng sản phẩm vào bảng SoLuongSanPham với giá trị mặc định là 0 cho tất cả các size
        const sizes = await db.queryPromise('SELECT id_size FROM SizeSanPham');
        const insertSoLuongSql = 'INSERT INTO SoLuongSanPham (id_chitietsp, id_mausac, id_size, so_luong) VALUES (?, ?, ?, 0)';
        for (const size of sizes) {
          await db.queryPromise(insertSoLuongSql, [idChiTietSP, idMauSac, size.id_size]);
        }

        res.status(200).json({ message: 'Thêm chi tiết sản phẩm và màu sắc thành công' });
      } else {
        res.status(500).json({ message: 'Thêm màu sản phẩm thất bại' });
      }
    } else {
      res.status(500).json({ message: 'Thêm chi tiết sản phẩm thất bại' });
    }
  } catch (error) {
    console.error('Lỗi khi thêm chi tiết sản phẩm:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi xử lý yêu cầu' });
  }
});



// Import thêm các thư viện hoặc module cần thiết

router.delete('/delete/:id', async (req, res) => {
  try {
    const chiTietId = req.params.id;

    // Kiểm tra xem id_chitietsp có giá trị không
    if (!chiTietId) {
      return res.status(400).json({ message: 'Vui lòng cung cấp id_chitietsp' });
    }

    // Thực hiện truy vấn để xóa chi tiết sản phẩm
    const deleteChiTietSql = 'DELETE FROM ChiTietSanPham WHERE id_chitietsp = ?';
    const resultDeleteChiTiet = await db.queryPromise(deleteChiTietSql, [chiTietId]);

    if (resultDeleteChiTiet.affectedRows > 0) {
      res.status(200).json({ message: 'Xóa chi tiết sản phẩm thành công' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy chi tiết sản phẩm để xóa' });
    }
  } catch (error) {
    console.error('Lỗi khi xóa chi tiết sản phẩm:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi xử lý yêu cầu' });
  }
});




module.exports = router;
