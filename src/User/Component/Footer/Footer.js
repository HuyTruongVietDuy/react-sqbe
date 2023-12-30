import React from 'react';
import { FacebookProvider, Page } from 'react-facebook';
import "./FooterCSS/Footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer-left">
        <p>Địa chỉ cửa hàng</p>
        <ul>
          <li> V/N: Công viên PMQT Quận 12, TP. HCM</li>
          <li> V/N: 1059 Quang Trung, Gò Vấp, TP. HCM</li>  
          <li>Site Map</li>  
        </ul>
      </div>
      <div className="footer-center">
        <p>Chinh sách</p>
        <ul>
          <li> Chính sách bảo mật</li>
          <li> FAQ</li>  
          <li>Chính sách bảo hành & đổi trả</li> 
          <li>Chính sách thẻ thành viên</li> 
          <li>Chính sách giao hàng hỏa tốc</li> 
        </ul>
      </div>
      <div className="footer-right">
        <p>Mạng xã hội</p>
        <ul>
          <li> <span className="material-icons">facebook</span> </li>
          <li><i className="material-icons">play_circle_filled</i> </li>
          <li> <span className="material-icons">alternate_email</span> </li>                    
        </ul>
        <br />
        <div id="FacebookProvider">
        <FacebookProvider appId="YOUR_APP_ID">
        <Page href="https://www.facebook.com/profile.php?id=61551692137712" tabs="timeline" width="320" height="0" />
      </FacebookProvider>
        </div>
        
      </div>
      <div className="footer-bottom">
        <p>@ Team ‘ Bee F4 ’ for with love</p>
      </div>
    </footer>
  );
}

export default Footer;
