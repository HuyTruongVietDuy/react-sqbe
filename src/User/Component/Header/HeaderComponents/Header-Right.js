import React from 'react';

function HeaderRight({ chuyenDoiTrangThaiTimKiem }) {
  return (
    <div className="header-right"> 
      <ul>
        <li id="hide-mb"><a href="/#">Đăng Nhập </a> | <a href="/#">Đăng Ký</a></li>
        <li id="hide-des">  <span className="material-icons">person</span></li>
        <li id="search-icon" onClick={chuyenDoiTrangThaiTimKiem}><span className="material-icons">search</span></li>
        <li><span className="material-icons">favorite</span></li>
        <li  ><span className="material-icons">shopping_cart </span> </li>
      </ul>
    </div>
  );
}

export default HeaderRight;
