import React, { useState, useEffect } from 'react';
import './Header.css';

import HeaderTop from './HeaderComponents/Header-Top';
import HeaderLeft from './HeaderComponents/Header-Left';
import HeaderCenter from './HeaderComponents/Header-Center';
import HeaderRight from './HeaderComponents/Header-Right';
import SearchComponent from './HeaderComponents/Search';
import SideNavMB from './HeaderComponents/Side-Nav-mb';
function Header() {
  const [viTriCuonTrang, setViTriCuonTrang] = useState(0);
  const [isHienThiTimKiem, setIsHienThiTimKiem] = useState(false);
  const [isHienThiSideBar, setIsHienThiSideBar] = React.useState(false);
  const [isOverlayActive, setIsOverlayActive] = useState(false);

  useEffect(() => {
    const xuLyCuonTrang = () => {
      setViTriCuonTrang(window.scrollY);
    };

    window.addEventListener('scroll', xuLyCuonTrang);

    return () => {
      window.removeEventListener('scroll', xuLyCuonTrang);
    };
  }, []);

  useEffect(() => {
    setIsOverlayActive(isHienThiTimKiem);
  
  }, [isHienThiTimKiem  ]);
  

  const chuyenDoiTrangThaiSideBarMB = () => {
    setIsHienThiSideBar(!isHienThiSideBar);
  };

  const chuyenDoiTrangThaiTimKiem = () => {
    setIsHienThiTimKiem(!isHienThiTimKiem);
  };

  const isSmallScreen = window.innerWidth <= 1266; 

  return (
    <div >
      <header id="header"className={isSmallScreen || viTriCuonTrang > 40 ? 'scrolled' : ''}>
        <HeaderTop />
        <HeaderLeft chuyenDoiTrangThaiSideBarMB={chuyenDoiTrangThaiSideBarMB}/>
        <HeaderCenter />
        <HeaderRight chuyenDoiTrangThaiTimKiem={chuyenDoiTrangThaiTimKiem} />
      </header>

      <SearchComponent isHienThiTimKiem={isHienThiTimKiem} chuyenDoiTrangThaiTimKiem={chuyenDoiTrangThaiTimKiem}/>
      <SideNavMB isHienThiSideBar={isHienThiSideBar} chuyenDoiTrangThaiSideBarMB={chuyenDoiTrangThaiSideBarMB}/>

      <div className={`overlay ${isOverlayActive ? 'active' : ''}`}></div>
      <div className={`overlay-mb ${isOverlayActive ? 'active' : ''}`}></div>
    </div>
  );
}

export default Header;
