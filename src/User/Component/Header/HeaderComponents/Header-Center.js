  import React, { useState } from 'react';
  import { Link } from 'react-router-dom';

  function HeaderCenter() {
    const [activeItem, setActiveItem] = useState(null);

    const handleItemClick = (index) => {
      // Kiểm tra nếu mục đã được chọn, thì không làm gì cả
      if (index === activeItem) {
        return;
      }

      // Cập nhật trạng thái activeItem
      setActiveItem(index);
    };

    return (
      <nav className="header-center">
        <ul className="main-menu">
          <li className="has-dropdown">
          <Link to="/products" style={{color:"black", textDecoration:"none"}}> Sản Phẩm</Link>  <span className="material-icons">arrow_drop_down</span>
            <ul className="sub-menu">
              <li className="has-submenu">  
                Content 1
                <ul className="sub-sub-menu">
                  {[1, 2, 3, 4].map((item) => (
                    <li key={item} className={activeItem === item ? 'active' : ''}>
                      <span onClick={() => handleItemClick(item)}>
                        Content {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="has-submenu">
                Content 2
                <ul className="sub-sub-menu">
                  {[5, 6, 7, 8].map((item) => (
                    <li key={item} className={activeItem === item ? 'active' : ''}>
                      <span onClick={() => handleItemClick(item)}>
                        Content {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </li>
          <li className={activeItem === 9 ? 'active' : ''}><span onClick={() => handleItemClick(9)}>Nam</span></li>
          <li className={activeItem === 10 ? 'active' : ''}><span onClick={() => handleItemClick(10)}>Nữ</span></li>
          <li className={activeItem === 11 ? 'active' : ''}><span onClick={() => handleItemClick(11)}>Liên Hệ</span></li>
          <li className={activeItem === 12 ? 'active' : ''}><span onClick={() => handleItemClick(12)}>Giới Thiệu</span></li>
          <li className={activeItem === 13 ? 'active' : ''}><span onClick={() => handleItemClick(13)}>Bài Viết</span></li>
        </ul>

        <div className='logo-mb'>
        <img src="image/logo-header.gif" alt="" />
        </div>
      </nav>
    );
  }

  export default HeaderCenter;