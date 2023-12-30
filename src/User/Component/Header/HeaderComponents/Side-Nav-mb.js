// SidebarMB.js
import React from 'react';

function SidebarMB({ isHienThiSideBar, chuyenDoiTrangThaiSideBarMB }) {
  return (
    <div className={`sidebar ${isHienThiSideBar ? 'open' : ''}`}>
      {/* Add your sidebar content here */}
      <p>Sidebar Content</p>
      <button onClick={chuyenDoiTrangThaiSideBarMB} className="material-icons " id="close-sidebar">close</button>

    </div>
  );
}

export default SidebarMB;
