import React, { useState } from 'react';

function SidebarMB({ isHienThiSideBar, chuyenDoiTrangThaiSideBarMB }) {
  const [isMenuCap2Open, setIsMenuCap2Open] = useState(false);
  const [isMenuCap3Open, setIsMenuCap3Open] = useState(false);

  const handleClickMenuCap1 = () => {
    // Handle clicking on the menu item text here if needed
  };

  const handleClickMenuCap2 = () => {
    // Do nothing when clicking on menu cấp 2 text
  };

  const handleIconClickMenuCap1 = () => {
    setIsMenuCap2Open(!isMenuCap2Open);
    setIsMenuCap3Open(false); // Close menu level 3 when level 2 is clicked
  };

  const handleIconClickMenuCap2 = () => {
    setIsMenuCap3Open(!isMenuCap3Open);
  };

  return (
    <div className={`sidebar ${isHienThiSideBar ? 'open' : ''}`}>
      <ul className="menu-list">
        <li className={`menu-item ${isMenuCap2Open ? 'open' : ''}`} onClick={handleClickMenuCap1}>
          Sản Phẩm
          <span
            className={`material-icons ${isMenuCap2Open ? 'arrow-up' : 'arrow-down'}`}
            style={{ float: 'right', cursor: 'pointer' }}
            onClick={handleIconClickMenuCap1}
          >
            {isMenuCap2Open ? 'expand_less' : 'expand_more'}
          </span>
        </li>
        <ul className={`submenu ${isMenuCap2Open ? 'open' : ''}`}>
          <li className="menu-item" onClick={handleClickMenuCap2}>
            Content 1
            <span
              className={`material-icons ${isMenuCap3Open ? 'arrow-up' : 'arrow-down'}`}
              style={{ float: 'right', cursor: 'pointer' }}
              onClick={handleIconClickMenuCap2}
            >
              {isMenuCap3Open ? 'expand_less' : 'expand_more'}
            </span>
          </li>
          
          <ul className={`sub-submenu ${isMenuCap3Open ? 'open' : ''}`}>
            {[1, 2, 3, 4].map((item) => (
              <li key={item}>Content {item}</li>
            ))}
          </ul>
        </ul>
        <li className="menu-item">Nam</li>
        <li className="menu-item">Nữ</li>
        <li className="menu-item">Liên Hệ</li>
        <li className="menu-item">Giới Thiệu</li>
        <li className="menu-item">Bài Viết</li>
      </ul>

    
      <button onClick={chuyenDoiTrangThaiSideBarMB} className="material-icons" id="close-sidebar">
        close
      </button>
    </div>
  );
}

export default SidebarMB;
