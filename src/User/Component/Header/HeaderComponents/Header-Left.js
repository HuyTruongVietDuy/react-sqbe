import React from 'react';

function HeaderLeft({chuyenDoiTrangThaiSideBarMB}) {
  return (
    
    <div className="header-left">
        <div className="logo-gif"> <img src="image/logo-header.gif" alt="" /></div>

        <div className="menu-icon-mb" onClick={chuyenDoiTrangThaiSideBarMB}>
        <span className="material-icons">menu</span>
      </div>
      </div>
  );
}

export default HeaderLeft;
