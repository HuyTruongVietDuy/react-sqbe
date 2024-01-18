// controllers/danhmucController.js
const db = require('./database');

// Controller xử lý yêu cầu thêm danh mục
exports.themDanhMuc = function (req, res) {
  let data = req.body;

  let sql = 'INSERT INTO danhmuc (ten_danhmuc) VALUES (?)';
  db.query(sql, [data.ten_danhmuc], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ "thong bao": "Lỗi chèn danh mục", err });
    } else {
      res.status(201).json({ "thong bao": "Đã chèn danh mục", "id_DanhMuc": result.insertId });
    }
  });
};
