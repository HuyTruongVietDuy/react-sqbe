// routes/loaisanpham.js
const express = require('express');
const router = express.Router();
const db = require("../models/database");
const multer = require('../models/multerConfig');
const fs = require('fs');
const path = require('path');

// Cấu hình để phục vụ tệp tĩnh từ thư mục 'uploads'
router.use('/uploads', express.static('uploads'));

// Route to add a product type
router.post('/add', multer.single('hinh_loaisp'), async (req, res) => {
  try {
    const { ten_loaisp, id_danhmuc } = req.body;
    const hinh_loaisp = req.file ? req.file.filename : null;

    // Check if the product type already exists (if needed)
    // ...

    // If it doesn't exist, insert into the database
    const insertSql = 'INSERT INTO LoaiSanPham (ten_loaisp, hinh_loaisp, id_danhmuc) VALUES (?, ?, ?)';
    const result = await db.queryPromise(insertSql, [ten_loaisp, hinh_loaisp, id_danhmuc]);

    // Return success response
    res.status(200).json({ "thong bao": "Đã thêm loại sản phẩm", "id_loaisp": result.insertId });
  } catch (error) {
    console.error("Server error:", error);
    // Handle request processing error
    res.status(500).json({ "thong bao": "Lỗi xử lý yêu cầu", error: error.message });
  }
});

// Endpoint to get the list of loaisanpham with danh muc
router.get('/list', (req, res) => {
  const selectSql = 'SELECT LoaiSanPham.*, DanhMuc.ten_danhmuc FROM LoaiSanPham LEFT JOIN DanhMuc ON LoaiSanPham.id_danhmuc = DanhMuc.id_danhmuc';

  db.query(selectSql, (error, results) => {
    if (error) {
      console.error('Error fetching loaisanpham list:', error);
      res.status(500).json({ error: 'Unable to fetch loaisanpham list' });
    } else {
      res.status(200).json(results);
    }
  });
});

  
// Route để xóa loại sản phẩm
router.delete('/delete/:id', async (req, res) => {
  const loaispId = req.params.id;

  // Truy vấn để lấy tên hình ảnh của loại sản phẩm
  const selectSql = 'SELECT hinh_loaisp FROM LoaiSanPham WHERE id_loaisp = ?';
  db.query(selectSql, [loaispId], async (selectErr, selectResult) => {
    if (selectErr) {
      return res.status(500).json({ "thong bao": "Lỗi truy vấn loại sản phẩm", selectErr });
    }

    const hinhLoaiSP = selectResult[0].hinh_loaisp;

    // Xóa loại sản phẩm từ cơ sở dữ liệu
    const deleteSql = 'DELETE FROM LoaiSanPham WHERE id_loaisp = ?';
    db.query(deleteSql, [loaispId], async (deleteErr, result) => {
      if (deleteErr) {
        return res.status(500).json({ "thong bao": "Lỗi xóa loại sản phẩm", deleteErr });
      }

      // Kiểm tra xem hinhLoaiSP có giá trị không rỗng (null hoặc undefined)
      if (hinhLoaiSP && hinhLoaiSP !== null) {
        // Xóa hình ảnh từ thư mục uploads
        const imagePath = path.join(__dirname, '../uploads/', hinhLoaiSP);
        try {
          fs.unlinkSync(imagePath);
          console.log(`Deleted image: ${imagePath}`);
        } catch (unlinkErr) {
          console.error(`Error deleting image: ${imagePath}`, unlinkErr);
        }
      }

      // Trả về kết quả thành công
      res.status(200).json({ "thong bao": "Đã xóa loại sản phẩm", "id_loaisp": loaispId });
    });
  });
});


  // Endpoint to get details of a specific loaisanpham by ID
  router.get('/get/:id', (req, res) => {
    const loaispId = req.params.id;
  
    // Fetch details of the loai san pham with the given ID
    const selectSql = 'SELECT * FROM LoaiSanPham WHERE id_loaisp = ?';
    db.query(selectSql, [loaispId], (error, result) => {
      if (error) {
        console.error('Error fetching loaisanpham details:', error);
        res.status(500).json({ error: 'Unable to fetch loaisanpham details' });
      } else {
        if (result.length === 0) {
          res.status(404).json({ error: 'Loai san pham not found' });
        } else {
          res.status(200).json(result[0]);
        }
      }
    });
  });
  
  

// Route to edit a product type
router.put('/edit/:id', multer.single('hinh_loaisp'), async (req, res) => {
  try {
    const { ten_loaisp, id_danhmuc, trang_thai } = req.body;
    const id_loaisp = req.params.id;

    // Check if the product type with the given id exists
    const checkSql = 'SELECT * FROM LoaiSanPham WHERE id_loaisp = ?';
    const checkResult = await db.queryPromise(checkSql, [id_loaisp]);

    if (checkResult.length === 0) {
      return res.status(404).json({ "thong bao": "Không tìm thấy loại sản phẩm với id đã cho" });
    }

    let hinh_loaisp = checkResult[0].hinh_loaisp; // Keep the existing value by default

    // If a new image is provided, delete the old image and update the hinh_loaisp
    if (req.file) {
      // Delete old image file
      const oldImagePath = path.join(__dirname, '../uploads/', hinh_loaisp);
      fs.unlinkSync(oldImagePath);

      // Update the hinh_loaisp with the new file name
      hinh_loaisp = req.file.filename;
    }

    // Update the information in the database, including trang_thai
    const updateSql = 'UPDATE LoaiSanPham SET ten_loaisp = ?, hinh_loaisp = ?, id_danhmuc = ?, trang_thai = ?, time_update = CURRENT_TIMESTAMP WHERE id_loaisp = ?';
    await db.queryPromise(updateSql, [ten_loaisp, hinh_loaisp, id_danhmuc, trang_thai, id_loaisp]);

    // Return success response
    res.status(200).json({ "thong bao": "Đã cập nhật loại sản phẩm", "id_loaisp": id_loaisp });
  } catch (error) {
    console.error("Server error:", error);
    // Handle request processing error
    res.status(500).json({ "thong bao": "Lỗi xử lý yêu cầu", error: error.message });
  }
});


module.exports = router;
