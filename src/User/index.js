import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Component/Header/Header';
import Footer from './Component/Footer/Footer';
import Loader from './Component/Loader/loader'; // Import the custom Loader component
import '../App.css';

import Home from './Component/Main/Home/Home';
import Products from './Component/Main/Products/Products'
function User() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mô phỏng quá trình tải bằng cách sử dụng setTimeout
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Điều chỉnh thời gian tải theo nhu cầu
  
    // Hủy timeout để tránh rò rỉ bộ nhớ
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className='Container'>
      <Header />
      <section >
        {isLoading ? (
          <Loader />
        ) : (
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/products" element={<Products />} />
            
            {/* Add more routes as needed */}
          </Routes>
        )}
      </section>
      <Footer />
    </div>
  );
}

export default User;
