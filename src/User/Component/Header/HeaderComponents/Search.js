import React from 'react';

function SearchComponent({ isHienThiTimKiem, chuyenDoiTrangThaiTimKiem }) {
  return (
    <div id="search-side-nav" className={isHienThiTimKiem ? 'open' : ''}>
      <div className="close-icon" onClick={chuyenDoiTrangThaiTimKiem}>x</div>
      <div className="header-side-search">
        <p>TÌM KIẾM</p>
      </div>
      <div className="main-side-search">
        <input type="text" placeholder="TÌM KIẾM SẢN PHẨM..." />
      </div>
    </div>
  );
}

export default SearchComponent;
