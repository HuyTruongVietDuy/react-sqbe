const express = require('express');
const router = express.Router();
const db = require("../models/database");

const checkDuplicateCategory = (id_DanhMuc) => {
  return new Promise((resolve, reject) => {
    const checkDuplicateSql = 'SELECT * FROM danhmuc WHERE id_DanhMuc = ?';
    db.query(checkDuplicateSql, [id_DanhMuc], (checkErr, checkResult) => {
      if (checkErr) {
        reject(checkErr);
      } else {
        resolve(checkResult.length > 0);
      }
    });
  });
};

router.post('/add', async (req, res) => {
  try {
    const data = req.body;
    const isDuplicate = await checkDuplicateCategory(data.ten_danhmuc);

    if (isDuplicate) {
      return res.status(400).json({ "thong bao": "Danh mục đã tồn tại, vui lòng chọn tên khác" });
    }

    const insertSql = 'INSERT INTO danhmuc (ten_danhmuc) VALUES (?)';
    db.query(insertSql, [data.ten_danhmuc], (insertErr, result) => {
      if (insertErr) {
        return res.status(500).json({ "thong bao": "Lỗi chèn danh mục", insertErr });
      }
      res.status(201).json({ "thong bao": "Đã chèn danh mục", "id_DanhMuc": result.insertId });
    });
  } catch (error) {
    res.status(500).json({ "thong bao": "Lỗi xử lý yêu cầu", error });
  }
});

router.get('/list', (req, res) => {
  const selectSql = 'SELECT * FROM danhmuc';
  db.query(selectSql, (selectErr, results) => {
    if (selectErr) {
      return res.status(500).json({ "thong bao": "Lỗi truy vấn danh sách danh mục", selectErr });
    }
    res.status(200).json(results);
  });
});

router.delete('/delete/:id', (req, res) => {
  const categoryId = req.params.id;

  const checkAssociatedRecordsSql = 'SELECT COUNT(*) AS recordCount FROM loaisanpham WHERE id_DanhMuc = ?';
  db.query(checkAssociatedRecordsSql, [categoryId], (checkError, result) => {
    if (checkError) {
      return res.status(500).json({ "thong bao": "Lỗi kiểm tra dữ liệu liên quan", checkError });
    }

    const recordCount = result[0].recordCount;

    if (recordCount > 0) {
      return res.status(400).json({ "thong bao": "Không thể xóa danh mục. Có giá trị tồn tại ở trong loaisanpham." });
    }

    const deleteSql = 'DELETE FROM danhmuc WHERE id_DanhMuc = ?';
    db.query(deleteSql, [categoryId], (deleteErr, deleteResult) => {
      if (deleteErr) {
        return res.status(500).json({ "thong bao": "Lỗi xóa danh mục", deleteErr });
      }
      res.status(200).json({ "thong bao": "Đã xóa danh mục", "id_DanhMuc": categoryId });
    });
  });
});

router.get('/get/:id', (req, res) => {
  const categoryId = req.params.id;
  const selectOneSql = 'SELECT * FROM danhmuc WHERE id_DanhMuc = ?';
  db.query(selectOneSql, [categoryId], (selectOneErr, result) => {
    if (selectOneErr) {
      return res.status(500).json({ "thong bao": "Lỗi truy vấn chi tiết danh mục", selectOneErr });
    }

    if (result.length === 0) {
      return res.status(404).json({ "thong bao": "Không tìm thấy danh mục" });
    }

    res.status(200).json(result[0]);
  });
});

router.put('/edit/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updatedData = req.body;
    const isDuplicate = await checkDuplicateCategory(updatedData.ten_danhmuc, categoryId);

    if (isDuplicate) {
      return res.status(400).json({ "thong bao": "Danh mục đã tồn tại, vui lòng chọn tên khác" });
    }

    const updateSql = 'UPDATE danhmuc SET ten_danhmuc = ?, trang_thai = ?, time_update = NOW() WHERE id_DanhMuc = ?';
    db.query(updateSql, [updatedData.ten_danhmuc, updatedData.trang_thai, categoryId], (updateErr, result) => {
      if (updateErr) {
        return res.status(500).json({ "thong bao": "Lỗi cập nhật danh mục", updateErr });
      }
      res.status(200).json({ "thong bao": "Đã cập nhật danh mục", "id_DanhMuc": categoryId });
    });
  } catch (error) {
    res.status(500).json({ "thong bao": "Lỗi xử lý yêu cầu", error });
  }
});

module.exports = router;
