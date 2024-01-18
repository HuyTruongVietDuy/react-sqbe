import React, { useState, useEffect, useCallback } from 'react';
import '../HomeCSS/CategorySlide.css';

const CategorySlide = () => {
  // Trạng thái hiện tại của chỉ số (index) danh mục
  const [chiSoHienTai, setChiSoHienTai] = useState(0);
  
  // Tổng số danh mục
  const [tongSoDanhMuc, setTongSoDanhMuc] = useState(0);

  // Danh sách danh mục
  const [danhSachDanhMuc, setDanhSachDanhMuc] = useState([]);

  // Khi component được mount, lấy danh sách danh mục
  useEffect(() => {
    const danhSachDanhMuc = document.querySelectorAll('.category');
    setTongSoDanhMuc(danhSachDanhMuc.length);
    setDanhSachDanhMuc(danhSachDanhMuc);
  }, []); // Chạy một lần duy nhất khi component được mount

  // Hàm hiển thị danh mục
  const hienThiDanhMuc = useCallback(() => {
    for (let i = 0; i < tongSoDanhMuc; i++) {
      const chiSoDaChinhSua = (i + chiSoHienTai) % tongSoDanhMuc;
      if (i < 6) {
        danhSachDanhMuc[chiSoDaChinhSua].style.display = 'flex';
        danhSachDanhMuc[chiSoDaChinhSua].classList.remove('previous');
        danhSachDanhMuc[chiSoDaChinhSua].classList.remove('active');
        void danhSachDanhMuc[chiSoDaChinhSua].offsetWidth;
        danhSachDanhMuc[chiSoDaChinhSua].classList.add('active');
      } else {
        danhSachDanhMuc[chiSoDaChinhSua].style.display = 'none';
      }
    }
  }, [tongSoDanhMuc, chiSoHienTai, danhSachDanhMuc]);

  // Khi component được render lại, gọi hàm hiển thị danh mục
  useEffect(() => {
    hienThiDanhMuc();
  }, [chiSoHienTai, tongSoDanhMuc, danhSachDanhMuc, hienThiDanhMuc]);

  // Hàm chuyển đến danh mục kế tiếp
  const chuyenDenDanhMucKeTiep = useCallback(() => {
    setChiSoHienTai((chiSoTruocDo) => (chiSoTruocDo + 1) % tongSoDanhMuc);
  }, [tongSoDanhMuc]);

  // Hàm chuyển đến danh mục trước đó
  const chuyenDenDanhMucTruocDo = useCallback(() => {
    setChiSoHienTai((chiSoTruocDo) => (chiSoTruocDo - 1 + tongSoDanhMuc) % tongSoDanhMuc);
    for (let i = 0; i < tongSoDanhMuc; i++) {
      const chiSoDaChinhSua = (i + chiSoHienTai) % tongSoDanhMuc;
      if (i >= 6) {
        danhSachDanhMuc[chiSoDaChinhSua].classList.remove('active');
        danhSachDanhMuc[chiSoDaChinhSua].classList.add('previous');
      }
    }
    setTimeout(() => {
      hienThiDanhMuc();
    }, 500);
  }, [chiSoHienTai, tongSoDanhMuc, danhSachDanhMuc, hienThiDanhMuc]);

  // Khi component được mount, tạo interval để tự động chuyển đến danh mục kế tiếp sau 3 giây
  useEffect(() => {
    const intervalId = setInterval(() => {
      chuyenDenDanhMucKeTiep();
    }, 3000);

    // Clear interval khi component bị unmount
    return () => clearInterval(intervalId);
  }, [chiSoHienTai, tongSoDanhMuc, chuyenDenDanhMucKeTiep]);

  return (
    <div className='container-slide'>
      <div className='container-left'>
        <h1> Danh Mục SQ&BE</h1>
      </div>

      <div className="container-right">
        <div className="container">
          <div className="categories-container" id="categoriesContainer">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((danhMuc) => (
              <div className="category" key={danhMuc}>
                <div className="image-category"></div>
                <div className="name-category">Danh mục {danhMuc}</div>
              </div>
            ))}
          </div>

          <div className="button-container">
            <button onClick={chuyenDenDanhMucTruocDo} id="button-left">
              <i className="material-icons">keyboard_arrow_left</i>
            </button>
            <button onClick={chuyenDenDanhMucKeTiep} id="button-right">
              <i className="material-icons">keyboard_arrow_right</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySlide;
