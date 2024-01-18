import React from 'react';
import "../ProductCSS/nav-product.css"
const Filter = () => {
  return (
    <nav className='nav-product'>
    <div className='Container-item-nav'>
    <div className='item-nav-left'>
    
  <select id="priceFilter">
    <option value="0">Lọc Giá</option>
    <option value="0-100000">Dưới 100,000 VND</option>
    <option value="100000-300000">100,000 VND - 300,000 VND</option>
    <option value="300000-500000">300,000 VND - 500,000 VND</option>
    <option value="500000-800000">500,000 VND - 800,000 VND</option>
    <option value="800000+">Trên 800,000 VND</option>
</select>


<select id="loaiFilter" >
  <option value="0">Loại</option>
  <option value="1">Tên loại 1</option>
  <option value="2">Tên loại 2</option>
  <option value="3">Tên loại 3</option>
  <option value="4">Tên loại 3</option>
</select>

<select id="colorFilter">
<option value="0">Màu Sắc</option>
<option value="1">Đỏ</option>
<option value="2">Hồng</option>
<option value="3">Tím</option>
<option value="4">Vàng</option>
<option value="5">Xanh</option>
</select>
    </div>
    
    <div className='item-nav-right'>
    <select id="thutuFilter" >
    <option value="0">Thứ Tự</option>
    <option value="1">Mới Nhất</option>
    <option value="2">Giá Tăng Dần</option>
    <option value="3">Giá giảm Dần</option>
</select>
    </div>
    </div>
   
    
    </nav>
  );
};

export default Filter;
