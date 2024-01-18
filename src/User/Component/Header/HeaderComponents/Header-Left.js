import React from 'react';
import { Link } from 'react-router-dom';
function HeaderLeft({chuyenDoiTrangThaiSideBarMB}) {
  return (
    
    <div className="header-left">
        <div className="logo-gif"> <Link to="/"><img src="image/logo-header.gif" alt="" /></Link></div>

        <div className="menu-icon-mb" onClick={chuyenDoiTrangThaiSideBarMB}>
        <span className="material-icons">menu</span>
      </div>
      </div>
  );
}

export default HeaderLeft;
