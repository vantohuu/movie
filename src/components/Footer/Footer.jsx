import React from 'react';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section" style={{marginLeft:'50px'}}>
          <img src="/logoPtit.png" style={{width:'100px'}} alt="" />
          <p>Phim chất lượng cao</p>
        </div>
        <div className="footer-section" >
          <h5>Thông tin</h5>
          <p>PTITHCM</p>
          <p>Nhóm 10 - HDV</p>
        </div>
        <div className="footer-section">
          <h5>Liên kết nhanh</h5>
          <ul className="footer-links">
            <li><a href="#">Trang chủ</a></li>
            <li><a href="#">Phim mới</a></li>
            {/* <li><a href="#">Diễn viên</a></li> */}
          </ul>
        </div>
        <div className="footer-section">
          <h5>Liên hệ</h5>
          <p>Email: contact@example.com</p>
          <p>Điện thoại: 0123456789</p>
        </div>
      </div>
      <button className="back-to-top" onClick={scrollToTop}>^</button>
    </footer>
  );
};

export default Footer;
